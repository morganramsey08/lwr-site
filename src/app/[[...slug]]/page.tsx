import Hero from '@/components/Hero/Hero';
// import DefaultPageTemplate from '@/components/Templates/DefaultPageTemplate';

export default function Page({ params }: { params: { slug?: string[] } }) {
  const isHomePage = !params.slug || params.slug.length === 0;

  if (isHomePage) {
    return (
      <main>
        <Hero />
        {/* Soon we will add your WhatsApp and Map sections here */}
      </main>
    );
  }

  // This part handles all other pages (About, Retreats, Contact, etc.)
  return (
    <main className="internal-page">
      <div style={{ padding: '100px 10%' }}>
        <h1>{params.slug?.join(' ').replace(/-/g, ' ')}</h1>
        <p>This is where your WordPress content will load automatically.</p>
      </div>
    </main>
  );
}