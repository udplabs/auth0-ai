import z from 'zod';

export const ContentSchema = z.object({
	id: z.string(),
	textData: z
		.string()
		.optional()
		.describe(
			'The text of the given content if the mimeType is of `text/*`. This is the value to present to end users if present.'
		),
	applicationData: z
		.json()
		.optional()
		.describe(
			'The data if the mimeType is of `application/*`. Present this value to end users if present.'
		),
	name: z
		.string()
		.describe(
			'A name/code for the content. Not intended to be human readable.'
		),
	contentType: z
		.enum([
			'guide/step',
			'guide/lab',
			'prompt/step',
			'prompt/system',
			'prompt/lab',
			'prompt/unknown',
			'reference/code',
		])
		.describe(
			'The type and subtype of content. Similar to mimetype but more specific to the application domain.'
		),
	labStep: z
		.string()
		.optional()
		.describe(
			'The lab step the content relates to. Steps are formatted as `step-00` where `00` is a zero-padded number. i.e. `step-01` `step-02`, etc.'
		),
	labModule: z
		.number()
		.optional()
		.describe('The lab module the content relates to.'),
	contentPlacement: z
		.enum(['aiya', 'labs', 'secret'])
		.optional()
		.describe(
			'The primary presenter of the content. The platform that will be showing the content. If `aiya` this indicates that the user will consume the content in the chat dialog. If `labs` they will have consumed it via https://labs.demo.okta.com.'
		),
	mimeType: z
		.enum([
			'text/markdown',
			'text/plain',
			'text/html',
			'text/typescript',
			'text/csv',
			'application/json',
			'application/xml',
		])
		.describe('The mime type of the content data (e.g. text/markdown).'),
	createdAt: z.string(),
	updatedAt: z.string().optional(),
});
