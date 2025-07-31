import { getFgaClient } from './client';

const fga = getFgaClient();

interface AccountPermissionsCheckResult {
  [key: string]: Permissions;
}
interface Permissions {
  canView?: boolean;
  canViewBalances?: boolean;
  canViewTransactions?: boolean;
  canTransfer?: boolean;
}

// export async function canTransfer(
//   userId: string,
//   accounts: string[],
// ): Promise<TransferCheckResult[]> {
//   const checks: ClientBatchCheckItem[] = accounts.map((accountId) => ({
//     user: `user:${userId}`,
//     relation: 'can_transfer',
//     object: `account:${accountId}`,
//   }));

//   const { result = [] } = await fga.batchCheck({
//     checks,
//   });

//   return result.map(({ allowed, request }) => {
//     return {
//       allowed,
//       accountId: request.object.split(':')[1],
//     };
//   });
// }

export async function canTransferFunds(
  userId: string,
  accountId: string,
  transaction_amount: number,
) {
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
  accounts: string[],
) {
  const user = `user:${userId}`;
  const permissions = [
    'can_view',
    'can_view_balances',
    'can_view_transactions',
    'can_transfer',
  ];

  const accountPermissions: AccountPermissionsCheckResult = {};

  const { result } = await fga.batchCheck({
    checks: accounts.flatMap((accountId) => {
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

  return accountPermissions;
}
