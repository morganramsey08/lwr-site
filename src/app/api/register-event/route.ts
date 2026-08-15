import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Grab form inputs
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

    // 2. Fetch event details from WordPress
    const postRes = await fetch(`${wpUrl}/wp-json/wp/v2/events?slug=${slug}`);
    const posts = await postRes.json();
    if (!posts || posts.length === 0) throw new Error('Event not found');

    const postId = posts[0].id;
    const currentMeta = posts[0].acf || {};
    
    // Parse existing registrants
    let existingRegistrants: any[] = [];
    if (currentMeta.event_registrants_json) {
      try { 
        existingRegistrants = JSON.parse(currentMeta.event_registrants_json); 
      } catch (e) { 
        console.error("Failed to parse existing registrants JSON:", e); 
      }
    }

    // 3. CAPACITY CHECK
    const rawCapacity = currentMeta.capacity_text;
    if (rawCapacity) {
      const maxCapacity = parseInt(rawCapacity, 10);
      if (!isNaN(maxCapacity) && existingRegistrants.length >= maxCapacity) {
        return NextResponse.json(
          { message: 'Sorry, this event has reached full capacity!' }, 
          { status: 403 }
        );
      }
    }

    // 4. Append new registrant as UNPAID
    const updatedRegistrants = [
      ...existingRegistrants,
      { 
        name, 
        email, 
        phone: phone || '', 
        paymentStatus: 'Unpaid', 
        registeredAt: new Date().toISOString() 
      }
    ];

    // 5. Save registration to WordPress database
    const updateRes = await fetch(`${wpUrl}/wp-json/wp/v2/events/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Buffer.from(`${username}:${appPassword}`).toString('base64')
      },
      body: JSON.stringify({ 
        acf: { 
          ...currentMeta, 
          event_registrants_json: JSON.stringify(updatedRegistrants) 
        } 
      })
    });

    if (!updateRes.ok) throw new Error('Failed to save registration to WordPress');

    // ==========================================
    // 6. DYNAMIC PRICE PARSING & VALOR INTEGRATION
    // ==========================================
    const rawPriceString = currentMeta.price || '';

    // Clean string down to numbers/decimals
    const basePrice = parseFloat(rawPriceString.replace(/[^0-9.]/g, '')) || 0;

    if (basePrice > 0) {
      // Pass the original base price to Valor (Valor will add its 4% fee during checkout)
      const amountToCharge = parseFloat(basePrice.toFixed(2));

      const valorResponse = await fetch('https://securelink.valorpaytech.com/?pagesale=', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          appid: process.env.VALOR_APP_ID,
          appkey: process.env.VALOR_APP_KEY,
          epi: process.env.VALOR_EPI,
          txn_type: 'sale',
          epage: 1,
          amount: amountToCharge, // Pass basePrice directly
          customer_name: name,
          email: email,
          phone: phone ? phone.replace(/\D/g, '') : '', 
          shipping_country: 'US',
          success_url: `https://www.lightworkerranch.com/offerings/${slug}?payment=success`,
          failure_url: `https://www.lightworkerranch.com/offerings/${slug}?payment=failed`
        })
      });

      const valorData = await valorResponse.json();
      console.log("VALOR API RESPONSE:", valorData);

      const checkoutUrl = valorData?.paynow_url || valorData?.url || valorData?.redirect_url;

      if (checkoutUrl) {
        return NextResponse.json({ success: true, redirectUrl: checkoutUrl });
      } else {
        const errorDetails = valorData?.message || valorData?.error || JSON.stringify(valorData);
        throw new Error(`Valor error: ${errorDetails}`);
      }
    }

    // Free event fallback
    return NextResponse.json({ success: true, redirectUrl: null });

  } catch (error: any) {
    console.error('Registration/Payment error:', error);
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}