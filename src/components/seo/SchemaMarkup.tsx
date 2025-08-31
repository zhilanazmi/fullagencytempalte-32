import { Helmet } from 'react-helmet-async';

interface SchemaMarkupProps {
  type: 'organization' | 'website' | 'product' | 'faq' | 'video';
  data?: any;
}

const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Webfluin",
          "description": "Premium web templates, UI components, and design resources for modern websites",
          "url": "https://webfluin.com",
          "logo": "https://webfluin.com/lovable-uploads/73bf5b70-4fb0-451c-bc96-8c24ab3ae497.png",
          "sameAs": [
            "https://twitter.com/webfluin"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "English"
          }
        };
      
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Webfluin",
          "description": "Discover premium web templates, UI components, and design resources. Build beautiful websites with our curated collection of modern, responsive templates.",
          "url": "https://webfluin.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://webfluin.com/?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };
      
      case 'product':
        return data ? {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.name,
          "description": data.description || `Premium ${data.page_type || 'web'} template - ${data.name}`,
          "image": data.thumbnail_url,
          "url": `https://webfluin.com/product/${data.id}`,
          "brand": {
            "@type": "Brand",
            "name": "Webfluin"
          },
          "category": "Web Templates",
          "offers": {
            "@type": "Offer",
            "price": data.price_type === 'Free' ? "0" : "29.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        } : null;
      
      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data?.faqs?.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          })) || []
        };
      
      case 'video':
        return data ? {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": data.title,
          "description": data.description,
          "thumbnailUrl": `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`,
          "uploadDate": data.date,
          "embedUrl": `https://www.youtube.com/embed/${data.videoId}`,
          "contentUrl": data.url
        } : null;
      
      default:
        return null;
    }
  };

  const schema = getSchema();
  
  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaMarkup;