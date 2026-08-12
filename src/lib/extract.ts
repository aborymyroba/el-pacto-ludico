export function extractIntro(body: string, maxLength = 180): string {
  const lines = body.split('\n');
  let paragraph = '';
  for (const line of lines) {
    const clean = line.trim();
    if (!clean || clean.startsWith('#') || clean.startsWith('>')) continue;
    paragraph = clean;
    break;
  }

  const plain = paragraph
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!plain) return '';
  if (plain.length <= maxLength) return plain;
  return plain.slice(0, maxLength - 1).trimEnd() + '…';
}
