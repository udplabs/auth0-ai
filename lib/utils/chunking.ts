export function chunkByWords(text: string) {
	const words = text.split(/\s+/);
	const chunks: string[] = [];
	let buf = '';
	for (const w of words) {
		const next = buf ? `${buf} ${w}` : w;
		if (next.length > 12) {
			chunks.push(buf);
			buf = w;
		} else {
			buf = next;
		}
	}
	if (buf) chunks.push(buf);
	return chunks;
}

export function chunkByParagraph(text: string) {
	const paras = text.split(/\r?\n\s*\r?\n/);
	return paras.map((p, i) => (i < paras.length - 1 ? p + '\n\n' : p));
}

function chunkByLine(text: string) {
	const lines = text.split(/\r?\n/);
	return lines.map((l, i) => (i < lines.length - 1 ? l + '\n' : l));
}

export function chunk(
	text: string,
	method: 'words' | 'paragraphs' | 'lines' = 'words'
) {
	if (method === 'words') return chunkByWords(text);
	if (method === 'lines') return chunkByLine(text);
	return chunkByParagraph(text);
}
