namespace NodeJS {
	interface ProcessEnv {
		/**
		 * The Auth0 domain for your tenant.
		 *
		 * @example `your-tenant.auth0.com`
		 * @see https://auth0.com/docs/get-started/auth0-overview/create-tenants
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_DOMAIN: string;
		/**
		 * The Auth0 Management API domain for your tenant, e.g. `your-tenant.auth0.com`
		 *
		 * Only required if `AUTH0_ISSUER_DOMAIN` is set to a custom domain.
		 *
		 * Should be the same as your Auth0 domain if you are not using a custom domain.
		 *
		 * _Do not include the `https://` prefix._
		 *
		 * @see https://auth0.com/docs/customize/custom-domains
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_MANAGEMENT_API_DOMAIN?: string;
		/**
		 * The Auth0 Management API scopes for your application
		 *
		 * @default `read:users update:users create:authentication_methods read:authentication_methods update:authentication_methods delete:authentication_methods read:guardian_factors update:guardian_factors read:guardian_enrollments delete:guardian_enrollments create:guardian_enrollment_tickets`
		 * @see https://auth0.github.io/node-auth0/index.html#md:configure-the-sdk
		 * @readonly
		 */
		readonly AUTH0_MANAGEMENT_API_SCOPES?: string;
		/**
		 * The Auth0 Client ID for accessing the Auth0 management API (if different from `AUTH0_CLIENT_ID`).
		 *
		 * Found in Auth0 Dashboard > Applications > [Your App] > Settings > Basic Information
		 *
		 * @see https://auth0.com/docs/get-started/applications/application-settings
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_MANAGEMENT_API_CLIENT_ID?: string;
		/**
		 * The Auth0 Client Secret for accessing the Auth0 management API (if different from `AUTH0_CLIENT_SECRET`)
		 *
		 * Found in Auth0 Dashboard > Applications > [Your App] > Settings > Basic Information
		 *
		 * @see https://auth0.com/docs/get-started/applications/application-settings
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_MANAGEMENT_API_CLIENT_SECRET?: string;
		/**
		 * The Auth0 Client ID for your application
		 *
		 * Found in Auth0 Dashboard > Applications > [Your App] > Settings > Basic Information
		 *
		 * @see https://auth0.com/docs/get-started/applications/application-settings
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_CLIENT_ID: string;
		/**
		 * The Auth0 Client Secret for your application
		 *
		 * Found in Auth0 Dashboard > Applications > [Your App] > Settings > Basic Information
		 *
		 * @see https://auth0.com/docs/get-started/applications/application-settings
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_CLIENT_SECRET: string;
		/**
		 * The Auth0 Secret for your application to encrypt the session and transaction cookies.
		 *
		 * Generate a random secret using [Vercel](https://generate-secret.vercel.app/32) or running `openssl rand -base64 32`
		 *
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly AUTH0_SECRET: string;
		/**
		 * The base URL for your application
		 *
		 * @default `http://localhost:3000` for development, or your app URL for production
		 * @see https://github.com/auth0/nextjs-auth0/tree/main?tab=readme-ov-file#2-add-the-environment-variables
		 * @readonly
		 */
		readonly APP_BASE_URL: string;
		/**
		 * Changes based on locality, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 *
		 * @default `https://api.us1.fga.dev``
		 * @readonly
		 */
		readonly FGA_API_URL?: string;
		/**
		 * The Store ID for your FGA store
		 *
		 * Get this from your store settings in the dashboard, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 *
		 * @readonly
		 */
		readonly FGA_STORE_ID: string;
		/**
		 * The API Token Issuer for your FGA store
		 * Get this from your store settings in the dashboard, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 * @readonly
		 * @default `auth.fga.dev` (for US1 region)
		 */
		readonly FGA_API_TOKEN_ISSUER?: string;
		/**
		 * The API Audience for your FGA store
		 * Get this from your store settings in the dashboard, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 * @readonly
		 * @default `https://api.us1.fga.dev/` (for US1 region)
		 */
		readonly FGA_API_AUDIENCE: string;
		/**
		 * The Client ID for your FGA store
		 * Get this from your store settings in the dashboard, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 * @readonly
		 */
		readonly FGA_CLIENT_ID: string;
		/**
		 * The Client Secret for your FGA store
		 * Get this from your store settings in the dashboard, refer to ["How to get your API Keys"](https://docs.fga.dev/integration/getting-your-api-keys)
		 * @readonly
		 */
		readonly FGA_CLIENT_SECRET: string;
		/**
		 * The FGA Model ID for your particular model. This is not required but it improves latency if you provide it.
		 * @readonly
		 */
		readonly FGA_MODEL_ID?: string;
		/**
		 * The database connection URL for Prisma
		 *
		 * @see https://www.prisma.io/docs/concepts/database-connectors/postgresql
		 *
		 * @default `file:./dev.db` for development, or your production database URL
		 * @readonly
		 */
		readonly DATABASE_URL: string;
		/**
		 * The OpenAI API key for accessing OpenAI services
		 *
		 * Get this from your OpenAI account dashboard: https://platform.openai.com/account/api-keys
		 *
		 * @readonly
		 */
		readonly OPENAI_API_KEY?: string;
	}
}
