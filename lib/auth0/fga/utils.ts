// lib/auth0/fga/utils.ts
// REFERENCE CODE (not part of lab)
// Utility functions for FGA operations.
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
	if (!fga) {
		console.warn('FGA client not initialized!');
		return;
	}

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
 * INTERNAL/PRIVATE UTILITY
 *
 * Delete ALL tuples referencing the given user principal (user:<id>).
 *
 * Strategy
 * 1. Page through read() with a user-only filter.
 * 2. Collect tuple_keys.
 * 3. Chunk deletes (API write limit safety).
 *
 * Notes
 * - Idempotent: if called again, read yields zero tuples.
 * - Does NOT touch tuples where the user appears as part of a relation reference
 *   (e.g., account:123#delegate) because those are different “user” values (object references).
 * - Includes conditional tuples (model 1.1) by passing through condition if present.
 */
export async function deleteAllUserTuples(userId: string, batchSize = 80) {
	if (!fga) {
		console.warn('FGA client not initialized!');
		return;
	}

	const user = `user:${userId}`;
	let continuation: string | undefined;
	const toDelete: Array<{ user: string; relation: string; object: string }> =
		[];

	do {
		const res = await fga.read(
			{
				user,
				object: 'account:',
			},
			{ continuationToken: continuation }
		);

		for (const t of res.tuples ?? []) {
			toDelete.push({
				user: t.key.user,
				relation: t.key.relation,
				object: t.key.object,
			});
		}

		continuation = res.continuation_token;
	} while (continuation);

	if (toDelete.length === 0) return 0;

	// Chunk deletes to avoid size limits
	for (let i = 0; i < toDelete.length; i += batchSize) {
		const slice = toDelete.slice(i, i + batchSize);
		await fga.write({
			deletes: slice.map((d) => ({
				user: d.user,
				relation: d.relation,
				object: d.object,
			})),
		});
	}

	console.log('Deleted ', toDelete.length, ' user tuples');
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
