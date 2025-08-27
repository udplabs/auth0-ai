import assert from 'assert';
import { ManagementClient } from 'auth0';
import { concat, orderBy } from 'lodash-es';

import type { ManagementClientOptionsWithClientSecret as ManagementClientOptions } from 'auth0';

export default class Auth0ManagementClient extends ManagementClient {
	domain: string;
	clientId: string;
	clientSecret: string;

	constructor(options?: ManagementClientOptions) {
		const {
			domain = process.env.AUTH0_MANAGEMENT_API_DOMAIN ||
				process.env.AUTH0_DOMAIN,
			clientId = process.env.AUTH0_MANAGEMENT_API_CLIENT_ID ||
				process.env.AUTH0_CLIENT_ID,
			clientSecret = process.env.AUTH0_MANAGEMENT_API_CLIENT_SECRET ||
				process.env.AUTH0_CLIENT_SECRET,
		} = options || {};

		assert.ok(domain, "You must include your API application's domain");
		assert.ok(clientId, "You must include your API application's clientId");
		assert.ok(
			clientSecret,
			"You must include your API application's clientSecret"
		);

		super({ domain, clientId, clientSecret });

		this.domain = domain;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	async getFactors(id: string) {
		const { data: user } = await this.users.get({ id });

		const { data: allFactors } = await this.guardian.getFactors();

		const { data: enrollments = [] } =
			await this.users.getAuthenticationMethods({ id });

		const enabledFactors: Factor[] = allFactors.flatMap((factor) => {
			if (factor.enabled && factor?.name && factor.name !== 'duo') {
				switch (factor.name) {
					case 'otp':
						return [{ type: 'totp', enrolled: false } as Factor];
					case 'push-notification':
						return [{ type: 'push', enrolled: false } as Factor];
					case 'email':
						return [
							{ type: 'email', enrolled: user?.email_verified } as Factor,
						];
					default:
						return [{ type: factor.name, enrolled: false } as Factor];
				}
			}

			return [];
		});

		const enrolledFactors: Factor[] = enrollments.flatMap((enrollment) => {
			const {
				id,
				type: enrollmentType,
				enrolled_at: enrolledAt,
				created_at: createdAt,
				last_auth_at: lastAuthAt,
				authentication_methods = [],
				name: displayName,
			} = enrollment || {};

			const factor: Factor = {
				createdAt,
				displayName,
				enrolled: true,
				enrolledAt,
				lastAuthAt,
				type: enrollmentType as FactorType,
			};

			if (authentication_methods.length > 0) {
				return authentication_methods?.flatMap((method) => {
					if (method?.type) {
						return [
							{
								...factor,
								...method,
							} as Factor,
						];
					}
					return [];
				});
			}

			return [
				{
					id,
					displayName,
					enrolled: true,
					type: enrollmentType,
				} as Factor,
			];
		});

		return orderBy(
			concat(enabledFactors, enrolledFactors),
			['enrolled', 'type'],
			['desc', 'asc']
		);
	}
}
