/**
 * API Cache Keys are formatted in the following manner. Values that are optional and not provided are, obviously, omitted:
 *
 * `${userId}${joinSymbol}${resource | resource.join(joinSymbol)}${joinSymbol}${id}${joinSymbol}${metadata.join(joinSymbol)}`
 *
 * @example `auth0|123:chat:9876`, `auth0|123:chat:history:grouped`
 */
export function getCacheKey({
	userId,
	id,
	resource = ['user'],
	metadata = [],
	joinSymbol = ':',
}: GetCacheKeyOptions) {
	const key = [];

	if (userId) key.push(userId);
	if (resource.length > 0) key.push(resource.join(joinSymbol));
	if (id) key.push(id);
	if (metadata.length > 0) key.push(metadata.join(joinSymbol));

	if (key.length === 0) {
		throw new Error('Cache keys cannot be blank. You must provide something!');
	}

	return key.join(joinSymbol);
}
