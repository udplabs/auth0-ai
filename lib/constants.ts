export const LS_KEY_AUTH = 'auth-message-sent';
export const LS_KEY_FIRST = 'first-message-sent';
export const CONTENT_FIRST_MESSAGE_ID = '01K3VDGK1XKJR87HZZS1JY57HJ';
export const CONTENT_AUTHENTICATED_MESSAGE_ID = '01K3VDJ331E72V2RE00M81J9WR';
export const DB_SQL_URL = 'file:./lib/db/drizzle/sql/dev.db';
export const isDev = process.env.MODE === 'development';
export const isTest = process.env.MODE === 'test';
export const ASSET_URL =
	isDev || isTest
		? '/assets/docs/demo-platform'
		: 'https://cdn.demo.okta.com/labs/devcamp-agentic';
