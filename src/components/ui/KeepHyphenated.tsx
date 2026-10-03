/**
 * Prevents line breaks inside hyphenated words ("AI-powered") in large
 * headings, where a break at the hyphen reads as a typo.
 */
export function KeepHyphenated({ text }: { text: string }) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
