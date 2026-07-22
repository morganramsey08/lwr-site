import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { slug, name, email, phone } = await request.json();

    if (!email || !slug || !name) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    const username = process.env.WORDPRESS_ADMIN_USER; 
    const appPassword = process.env.WORDPRESS_APP_PASSWORD; 

    if (!wpUrl || !username || !appPassword) {
      return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
    }

    // 1. Fetch the event post ID by slug
    const postRes = await fetch(`${wpUrl}/wp-json/wp/v2/events?slug=${slug}`);
    const posts = await postRes.json();

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: 'Event not found' }, { status: 404 });
    }

    const postId = posts[0].id;
    const currentMeta = posts[0].acf || {};
    
    // 2. Parse the existing JSON string from the Text Area (fallback to empty array if blank)
    let existingRegistrants: any[] = [];
    if (currentMeta.event_registrants_json) {
      try {
        existingRegistrants = JSON.parse(currentMeta.event_registrants_json);
      } catch (e) {
        console.error("Failed to parse existing registrants, starting fresh.", e);
      }
    }

    // ==========================================
    // 3. THE CAPACITY CHECK
    // ==========================================
    const rawCapacity = currentMeta.capacity_text; 
    
    if (rawCapacity) {
      // Convert the ACF field to a JavaScript integer
      const maxCapacity = parseInt(rawCapacity, 10);
      
      // If parsing succeeded and the array is full, block registration
      if (!isNaN(maxCapacity) && existingRegistrants.length >= maxCapacity) {
        return NextResponse.json(
          { message: 'Sorry, this event has reached full capacity!' }, 
          { status: 403 }
        );
      }
    }

    // 4. Append the new registrant
    const updatedRegistrants = [
      ...existingRegistrants,
      { name, email, phone: phone || '', registeredAt: new Date().toISOString() }
    ];

    // 5. Convert back to a JSON string and update WordPress
    const updateRes = await fetch(`${wpUrl}/wp-json/wp/v2/events/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${appPassword}`).toString('base64')
      },
      body: JSON.stringify({
        acf: {
          ...currentMeta,
          event_registrants_json: JSON.stringify(updatedRegistrants) // Save as string
        }
      })
    });

    if (!updateRes.ok) {
      const errorData = await updateRes.json();
      throw new Error(errorData.message || 'Failed to save to WordPress');
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}