import { serializeJsonLd } from '@/lib/structured-data';

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Serialised with `<` escaped, so content cannot close the script tag.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
