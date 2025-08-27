import { getFgaClient } from './client';

const fga = await getFgaClient();

interface AccountPermissionsCheckResult {
	[key: string]: Permissions;
}
interface Permissions {
	canView?: boolean;
	canViewBalances?: boolean;
	canViewTransactions?: boolean;
	canTransfer?: boolean;
}

// if (!fga) checks are for this sample app only to handle pre-configured state.
// don't try this at home kids.
export async function createOwnerPermissions(
	userId: string,
	accountIds: string[]
) {
	if (!fga) throw new Error('FGA Client not initialized!');

	console.log('=== CREATE OWNER PERMISSIONS ===');
	console.log('userId:', userId, '| accountIds:', accountIds);
	const permissions = accountIds.map((accountId) => ({
		user: `user:${userId}`,
		relation: 'owner',
		object: `account:${accountId}`,
	}));
	const { writes } = await fga.writeTuples(permissions);

	if (writes.length !== permissions.length) {
		console.warn(
			'Failed to create owner permissions for some accounts! Double check your work.'
		);
	}
}

export async function canTransferFunds(
	userId: string,
	accountId: string,
	transaction_amount: number
) {
	if (!fga) throw new Error('FGA Client not initialized!');

	const response = await fga.check({
		user: `user:${userId}`,
		relation: 'can_transfer',
		object: `account:${accountId}`,
		context: {
			transaction_amount,
		},
	});

	return response.allowed || false;
}

export async function getAccountPermissions(
	userId: string,
	accountIds: string[]
) {
	if (!fga) throw new Error('FGA Client not initialized!');

	console.log('=== GET ACCOUNT PERMISSIONS ===');
	console.log('userId:', userId, '| accountIds:', accountIds);

	const user = `user:${userId}`;
	const permissions = [
		'can_view',
		'can_view_balances',
		'can_view_transactions',
		'can_transfer',
	];

	const accountPermissions: AccountPermissionsCheckResult = {};

	const { result } = await fga.batchCheck({
		checks: accountIds.flatMap((accountId) => {
			// Initialize the result with false values
			accountPermissions[accountId] = {
				canTransfer: false,
				canView: false,
				canViewBalances: false,
				canViewTransactions: false,
			};

			return permissions.map((relation) => ({
				user,
				relation,
				object: `account:${accountId}`,
			}));
		}),
	});

	result.forEach(({ allowed, request }) => {
		const accountId = request.object.split(':')[1];
		const relation = request.relation as keyof Permissions;

		if (allowed) {
			accountPermissions[accountId][relation] = true;
		}
	});

	console.log('=== ACCOUNT PERMISSIONS ===');
	console.log(accountPermissions);

	return accountPermissions;
}
