import { getFgaClient } from './client';

const fga = await getFgaClient();

/**
 * Write “owner” relations for a user across a set of accounts.
 *
 * Notes
 * - This is a convenience for workshop/demo setup. In production, ownership should be written by
 *   the system that creates the account (or via a controlled admin tool) and audited.
 * - The tuple namespace format is "user:<id>" and "account:<id>" (consistent with the FGA model).
 *
 * @param userId - Subject who will become owner.
 * @param accountIds - Accounts to which owner relation is granted.
 * @throws Error if FGA client is not initialized.
 */
export async function createOwnerPermissions(
	userId: string,
	accountIds: string[]
) {
	if (!fga) throw new Error('FGA Client not initialized!');

	console.log('=== CREATE OWNER PERMISSIONS ===');
	console.log('userId:', userId, '| accountIds:', accountIds);

	// Build tuples for batch write; each tuple is (user, relation, object)
	const permissions = accountIds.map((accountId) => ({
		user: `user:${userId}`,
		relation: 'owner',
		object: `account:${accountId}`,
	}));

	// Write tuples to the FGA store. Some backends may be eventually consistent,
	// so a subsequent check might need a small delay in hard real-world setups.
	const { writes } = await fga.writeTuples(permissions);

	// Quick sanity: confirm everything was accepted. This does not guarantee
	// relation semantics, only that the tuples were accepted for write.
	if (writes.length !== permissions.length) {
		console.warn(
			'Failed to create owner permissions for some accounts! Double check your work.'
		);
	}
}

/**
 * Check if a user can transfer a given amount from an account.
 *
 * This uses contextual attributes (transaction_amount) to evaluate a dynamic rule.
 * Your authorization model must reference this context in its conditions.
 *
 * @param userId - The user attempting the transfer.
 * @param accountId - The source account.
 * @param transaction_amount - Amount to transfer; passed in “context”.
 * @returns boolean indicating whether the action is allowed.
 * @throws Error if FGA client is not initialized.
 */
export async function canTransferFunds(
	userId: string,
	accountId: string,
	transaction_amount: number
) {
	if (!fga) throw new Error('FGA Client not initialized!');

	// Evaluate a single relation with dynamic context
	const response = await fga.check({
		user: `user:${userId}`,
		relation: 'can_transfer',
		object: `account:${accountId}`,
		context: {
			transaction_amount,
		},
	});

	// Defensive: normalize to boolean
	return response.allowed || false;
}

/**
 * Aggregated permission results keyed by account id.
 *
 * Example:
 * {
 *   "acc_123": ["can_view_transactions", "can_transfer"],
 *   "acc_456": []
 * }
 */
interface AccountPermissionsCheckResult {
	[key: string]: Accounts.AccountPermissions[];
}
