
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Chat
 * 
 */
export type Chat = $Result.DefaultSelection<Prisma.$ChatPayload>
/**
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model SampleAccount
 * 
 */
export type SampleAccount = $Result.DefaultSelection<Prisma.$SampleAccountPayload>
/**
 * Model SampleTransaction
 * 
 */
export type SampleTransaction = $Result.DefaultSelection<Prisma.$SampleTransactionPayload>
/**
 * Model SampleDocument
 * 
 */
export type SampleDocument = $Result.DefaultSelection<Prisma.$SampleDocumentPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const VoteType: {
  up: 'up',
  down: 'down'
};

export type VoteType = (typeof VoteType)[keyof typeof VoteType]


export const TransactionType: {
  credit: 'credit',
  debit: 'debit'
};

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType]

}

export type VoteType = $Enums.VoteType

export const VoteType: typeof $Enums.VoteType

export type TransactionType = $Enums.TransactionType

export const TransactionType: typeof $Enums.TransactionType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Chats
 * const chats = await prisma.chat.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Chats
   * const chats = await prisma.chat.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.chat`: Exposes CRUD operations for the **Chat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chats
    * const chats = await prisma.chat.findMany()
    * ```
    */
  get chat(): Prisma.ChatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stream`: Exposes CRUD operations for the **Stream** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Streams
    * const streams = await prisma.stream.findMany()
    * ```
    */
  get stream(): Prisma.StreamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sampleAccount`: Exposes CRUD operations for the **SampleAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SampleAccounts
    * const sampleAccounts = await prisma.sampleAccount.findMany()
    * ```
    */
  get sampleAccount(): Prisma.SampleAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sampleTransaction`: Exposes CRUD operations for the **SampleTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SampleTransactions
    * const sampleTransactions = await prisma.sampleTransaction.findMany()
    * ```
    */
  get sampleTransaction(): Prisma.SampleTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.sampleDocument`: Exposes CRUD operations for the **SampleDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SampleDocuments
    * const sampleDocuments = await prisma.sampleDocument.findMany()
    * ```
    */
  get sampleDocument(): Prisma.SampleDocumentDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Chat: 'Chat',
    Stream: 'Stream',
    Message: 'Message',
    Account: 'Account',
    Transaction: 'Transaction',
    Document: 'Document',
    SampleAccount: 'SampleAccount',
    SampleTransaction: 'SampleTransaction',
    SampleDocument: 'SampleDocument'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "chat" | "stream" | "message" | "account" | "transaction" | "document" | "sampleAccount" | "sampleTransaction" | "sampleDocument"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Chat: {
        payload: Prisma.$ChatPayload<ExtArgs>
        fields: Prisma.ChatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ChatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ChatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findFirst: {
            args: Prisma.ChatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ChatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          findMany: {
            args: Prisma.ChatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          create: {
            args: Prisma.ChatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          createMany: {
            args: Prisma.ChatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ChatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          delete: {
            args: Prisma.ChatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          update: {
            args: Prisma.ChatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          deleteMany: {
            args: Prisma.ChatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ChatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ChatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>[]
          }
          upsert: {
            args: Prisma.ChatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ChatPayload>
          }
          aggregate: {
            args: Prisma.ChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateChat>
          }
          groupBy: {
            args: Prisma.ChatGroupByArgs<ExtArgs>
            result: $Utils.Optional<ChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.ChatCountArgs<ExtArgs>
            result: $Utils.Optional<ChatCountAggregateOutputType> | number
          }
        }
      }
      Stream: {
        payload: Prisma.$StreamPayload<ExtArgs>
        fields: Prisma.StreamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StreamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StreamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findFirst: {
            args: Prisma.StreamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StreamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          findMany: {
            args: Prisma.StreamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          create: {
            args: Prisma.StreamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          createMany: {
            args: Prisma.StreamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StreamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          delete: {
            args: Prisma.StreamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          update: {
            args: Prisma.StreamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          deleteMany: {
            args: Prisma.StreamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StreamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StreamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>[]
          }
          upsert: {
            args: Prisma.StreamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StreamPayload>
          }
          aggregate: {
            args: Prisma.StreamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStream>
          }
          groupBy: {
            args: Prisma.StreamGroupByArgs<ExtArgs>
            result: $Utils.Optional<StreamGroupByOutputType>[]
          }
          count: {
            args: Prisma.StreamCountArgs<ExtArgs>
            result: $Utils.Optional<StreamCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      SampleAccount: {
        payload: Prisma.$SampleAccountPayload<ExtArgs>
        fields: Prisma.SampleAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SampleAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SampleAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          findFirst: {
            args: Prisma.SampleAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SampleAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          findMany: {
            args: Prisma.SampleAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>[]
          }
          create: {
            args: Prisma.SampleAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          createMany: {
            args: Prisma.SampleAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SampleAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>[]
          }
          delete: {
            args: Prisma.SampleAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          update: {
            args: Prisma.SampleAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          deleteMany: {
            args: Prisma.SampleAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SampleAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SampleAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>[]
          }
          upsert: {
            args: Prisma.SampleAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleAccountPayload>
          }
          aggregate: {
            args: Prisma.SampleAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSampleAccount>
          }
          groupBy: {
            args: Prisma.SampleAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<SampleAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.SampleAccountCountArgs<ExtArgs>
            result: $Utils.Optional<SampleAccountCountAggregateOutputType> | number
          }
        }
      }
      SampleTransaction: {
        payload: Prisma.$SampleTransactionPayload<ExtArgs>
        fields: Prisma.SampleTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SampleTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SampleTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          findFirst: {
            args: Prisma.SampleTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SampleTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          findMany: {
            args: Prisma.SampleTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>[]
          }
          create: {
            args: Prisma.SampleTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          createMany: {
            args: Prisma.SampleTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SampleTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>[]
          }
          delete: {
            args: Prisma.SampleTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          update: {
            args: Prisma.SampleTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          deleteMany: {
            args: Prisma.SampleTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SampleTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SampleTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>[]
          }
          upsert: {
            args: Prisma.SampleTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleTransactionPayload>
          }
          aggregate: {
            args: Prisma.SampleTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSampleTransaction>
          }
          groupBy: {
            args: Prisma.SampleTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SampleTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SampleTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<SampleTransactionCountAggregateOutputType> | number
          }
        }
      }
      SampleDocument: {
        payload: Prisma.$SampleDocumentPayload<ExtArgs>
        fields: Prisma.SampleDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SampleDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SampleDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          findFirst: {
            args: Prisma.SampleDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SampleDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          findMany: {
            args: Prisma.SampleDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>[]
          }
          create: {
            args: Prisma.SampleDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          createMany: {
            args: Prisma.SampleDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SampleDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>[]
          }
          delete: {
            args: Prisma.SampleDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          update: {
            args: Prisma.SampleDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          deleteMany: {
            args: Prisma.SampleDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SampleDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SampleDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>[]
          }
          upsert: {
            args: Prisma.SampleDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SampleDocumentPayload>
          }
          aggregate: {
            args: Prisma.SampleDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSampleDocument>
          }
          groupBy: {
            args: Prisma.SampleDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<SampleDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.SampleDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<SampleDocumentCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    chat?: ChatOmit
    stream?: StreamOmit
    message?: MessageOmit
    account?: AccountOmit
    transaction?: TransactionOmit
    document?: DocumentOmit
    sampleAccount?: SampleAccountOmit
    sampleTransaction?: SampleTransactionOmit
    sampleDocument?: SampleDocumentOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChatCountOutputType
   */

  export type ChatCountOutputType = {
    messages: number
    streams: number
  }

  export type ChatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatCountOutputTypeCountMessagesArgs
    streams?: boolean | ChatCountOutputTypeCountStreamsArgs
  }

  // Custom InputTypes
  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatCountOutputType
     */
    select?: ChatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * ChatCountOutputType without action
   */
  export type ChatCountOutputTypeCountStreamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    transactions: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | AccountCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Count Type SampleAccountCountOutputType
   */

  export type SampleAccountCountOutputType = {
    transactions: number
  }

  export type SampleAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | SampleAccountCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * SampleAccountCountOutputType without action
   */
  export type SampleAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccountCountOutputType
     */
    select?: SampleAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SampleAccountCountOutputType without action
   */
  export type SampleAccountCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SampleTransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ChatMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chat to aggregate.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Chats
    **/
    _count?: true | ChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChatMaxAggregateInputType
  }

  export type GetChatAggregateType<T extends ChatAggregateArgs> = {
        [P in keyof T & keyof AggregateChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChat[P]>
      : GetScalarType<T[P], AggregateChat[P]>
  }




  export type ChatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ChatWhereInput
    orderBy?: ChatOrderByWithAggregationInput | ChatOrderByWithAggregationInput[]
    by: ChatScalarFieldEnum[] | ChatScalarFieldEnum
    having?: ChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChatCountAggregateInputType | true
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: string
    userId: string
    title: string | null
    createdAt: Date
    updatedAt: Date
    _count: ChatCountAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  type GetChatGroupByPayload<T extends ChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChatGroupByOutputType[P]>
            : GetScalarType<T[P], ChatGroupByOutputType[P]>
        }
      >
    >


  export type ChatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    messages?: boolean | Chat$messagesArgs<ExtArgs>
    streams?: boolean | Chat$streamsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "createdAt" | "updatedAt", ExtArgs["result"]["chat"]>
  export type ChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Chat$messagesArgs<ExtArgs>
    streams?: boolean | Chat$streamsArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chat"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      streams: Prisma.$StreamPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["chat"]>
    composites: {}
  }

  type ChatGetPayload<S extends boolean | null | undefined | ChatDefaultArgs> = $Result.GetResult<Prisma.$ChatPayload, S>

  type ChatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ChatCountAggregateInputType | true
    }

  export interface ChatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Chat'], meta: { name: 'Chat' } }
    /**
     * Find zero or one Chat that matches the filter.
     * @param {ChatFindUniqueArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChatFindUniqueArgs>(args: SelectSubset<T, ChatFindUniqueArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Chat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChatFindUniqueOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChatFindUniqueOrThrowArgs>(args: SelectSubset<T, ChatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChatFindFirstArgs>(args?: SelectSubset<T, ChatFindFirstArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Chat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindFirstOrThrowArgs} args - Arguments to find a Chat
     * @example
     * // Get one Chat
     * const chat = await prisma.chat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChatFindFirstOrThrowArgs>(args?: SelectSubset<T, ChatFindFirstOrThrowArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Chats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chats
     * const chats = await prisma.chat.findMany()
     * 
     * // Get first 10 Chats
     * const chats = await prisma.chat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chatWithIdOnly = await prisma.chat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ChatFindManyArgs>(args?: SelectSubset<T, ChatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Chat.
     * @param {ChatCreateArgs} args - Arguments to create a Chat.
     * @example
     * // Create one Chat
     * const Chat = await prisma.chat.create({
     *   data: {
     *     // ... data to create a Chat
     *   }
     * })
     * 
     */
    create<T extends ChatCreateArgs>(args: SelectSubset<T, ChatCreateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Chats.
     * @param {ChatCreateManyArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ChatCreateManyArgs>(args?: SelectSubset<T, ChatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Chats and returns the data saved in the database.
     * @param {ChatCreateManyAndReturnArgs} args - Arguments to create many Chats.
     * @example
     * // Create many Chats
     * const chat = await prisma.chat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ChatCreateManyAndReturnArgs>(args?: SelectSubset<T, ChatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Chat.
     * @param {ChatDeleteArgs} args - Arguments to delete one Chat.
     * @example
     * // Delete one Chat
     * const Chat = await prisma.chat.delete({
     *   where: {
     *     // ... filter to delete one Chat
     *   }
     * })
     * 
     */
    delete<T extends ChatDeleteArgs>(args: SelectSubset<T, ChatDeleteArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Chat.
     * @param {ChatUpdateArgs} args - Arguments to update one Chat.
     * @example
     * // Update one Chat
     * const chat = await prisma.chat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ChatUpdateArgs>(args: SelectSubset<T, ChatUpdateArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Chats.
     * @param {ChatDeleteManyArgs} args - Arguments to filter Chats to delete.
     * @example
     * // Delete a few Chats
     * const { count } = await prisma.chat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ChatDeleteManyArgs>(args?: SelectSubset<T, ChatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ChatUpdateManyArgs>(args: SelectSubset<T, ChatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chats and returns the data updated in the database.
     * @param {ChatUpdateManyAndReturnArgs} args - Arguments to update many Chats.
     * @example
     * // Update many Chats
     * const chat = await prisma.chat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Chats and only return the `id`
     * const chatWithIdOnly = await prisma.chat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ChatUpdateManyAndReturnArgs>(args: SelectSubset<T, ChatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Chat.
     * @param {ChatUpsertArgs} args - Arguments to update or create a Chat.
     * @example
     * // Update or create a Chat
     * const chat = await prisma.chat.upsert({
     *   create: {
     *     // ... data to create a Chat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chat we want to update
     *   }
     * })
     */
    upsert<T extends ChatUpsertArgs>(args: SelectSubset<T, ChatUpsertArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Chats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatCountArgs} args - Arguments to filter Chats to count.
     * @example
     * // Count the number of Chats
     * const count = await prisma.chat.count({
     *   where: {
     *     // ... the filter for the Chats we want to count
     *   }
     * })
    **/
    count<T extends ChatCountArgs>(
      args?: Subset<T, ChatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChatAggregateArgs>(args: Subset<T, ChatAggregateArgs>): Prisma.PrismaPromise<GetChatAggregateType<T>>

    /**
     * Group by Chat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChatGroupByArgs['orderBy'] }
        : { orderBy?: ChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Chat model
   */
  readonly fields: ChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Chat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ChatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    messages<T extends Chat$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Chat$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    streams<T extends Chat$streamsArgs<ExtArgs> = {}>(args?: Subset<T, Chat$streamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Chat model
   */
  interface ChatFieldRefs {
    readonly id: FieldRef<"Chat", 'String'>
    readonly userId: FieldRef<"Chat", 'String'>
    readonly title: FieldRef<"Chat", 'String'>
    readonly createdAt: FieldRef<"Chat", 'DateTime'>
    readonly updatedAt: FieldRef<"Chat", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Chat findUnique
   */
  export type ChatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findUniqueOrThrow
   */
  export type ChatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat findFirst
   */
  export type ChatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findFirstOrThrow
   */
  export type ChatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chat to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Chats.
     */
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat findMany
   */
  export type ChatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter, which Chats to fetch.
     */
    where?: ChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Chats to fetch.
     */
    orderBy?: ChatOrderByWithRelationInput | ChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Chats.
     */
    cursor?: ChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Chats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Chats.
     */
    skip?: number
    distinct?: ChatScalarFieldEnum | ChatScalarFieldEnum[]
  }

  /**
   * Chat create
   */
  export type ChatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to create a Chat.
     */
    data: XOR<ChatCreateInput, ChatUncheckedCreateInput>
  }

  /**
   * Chat createMany
   */
  export type ChatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
  }

  /**
   * Chat createManyAndReturn
   */
  export type ChatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to create many Chats.
     */
    data: ChatCreateManyInput | ChatCreateManyInput[]
  }

  /**
   * Chat update
   */
  export type ChatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The data needed to update a Chat.
     */
    data: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
    /**
     * Choose, which Chat to update.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat updateMany
   */
  export type ChatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chat updateManyAndReturn
   */
  export type ChatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * The data used to update Chats.
     */
    data: XOR<ChatUpdateManyMutationInput, ChatUncheckedUpdateManyInput>
    /**
     * Filter which Chats to update
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to update.
     */
    limit?: number
  }

  /**
   * Chat upsert
   */
  export type ChatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * The filter to search for the Chat to update in case it exists.
     */
    where: ChatWhereUniqueInput
    /**
     * In case the Chat found by the `where` argument doesn't exist, create a new Chat with this data.
     */
    create: XOR<ChatCreateInput, ChatUncheckedCreateInput>
    /**
     * In case the Chat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChatUpdateInput, ChatUncheckedUpdateInput>
  }

  /**
   * Chat delete
   */
  export type ChatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
    /**
     * Filter which Chat to delete.
     */
    where: ChatWhereUniqueInput
  }

  /**
   * Chat deleteMany
   */
  export type ChatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Chats to delete
     */
    where?: ChatWhereInput
    /**
     * Limit how many Chats to delete.
     */
    limit?: number
  }

  /**
   * Chat.messages
   */
  export type Chat$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Chat.streams
   */
  export type Chat$streamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    cursor?: StreamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Chat without action
   */
  export type ChatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Chat
     */
    select?: ChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Chat
     */
    omit?: ChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ChatInclude<ExtArgs> | null
  }


  /**
   * Model Stream
   */

  export type AggregateStream = {
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  export type StreamMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    chatId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StreamMinAggregateInputType = {
    id?: true
    chatId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    chatId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    chatId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StreamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Stream to aggregate.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Streams
    **/
    _count?: true | StreamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StreamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StreamMaxAggregateInputType
  }

  export type GetStreamAggregateType<T extends StreamAggregateArgs> = {
        [P in keyof T & keyof AggregateStream]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStream[P]>
      : GetScalarType<T[P], AggregateStream[P]>
  }




  export type StreamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StreamWhereInput
    orderBy?: StreamOrderByWithAggregationInput | StreamOrderByWithAggregationInput[]
    by: StreamScalarFieldEnum[] | StreamScalarFieldEnum
    having?: StreamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StreamCountAggregateInputType | true
    _min?: StreamMinAggregateInputType
    _max?: StreamMaxAggregateInputType
  }

  export type StreamGroupByOutputType = {
    id: string
    chatId: string
    createdAt: Date
    updatedAt: Date
    _count: StreamCountAggregateOutputType | null
    _min: StreamMinAggregateOutputType | null
    _max: StreamMaxAggregateOutputType | null
  }

  type GetStreamGroupByPayload<T extends StreamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StreamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StreamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StreamGroupByOutputType[P]>
            : GetScalarType<T[P], StreamGroupByOutputType[P]>
        }
      >
    >


  export type StreamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    chatId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "createdAt" | "updatedAt", ExtArgs["result"]["stream"]>
  export type StreamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type StreamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type StreamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $StreamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Stream"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stream"]>
    composites: {}
  }

  type StreamGetPayload<S extends boolean | null | undefined | StreamDefaultArgs> = $Result.GetResult<Prisma.$StreamPayload, S>

  type StreamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StreamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StreamCountAggregateInputType | true
    }

  export interface StreamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Stream'], meta: { name: 'Stream' } }
    /**
     * Find zero or one Stream that matches the filter.
     * @param {StreamFindUniqueArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StreamFindUniqueArgs>(args: SelectSubset<T, StreamFindUniqueArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Stream that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StreamFindUniqueOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StreamFindUniqueOrThrowArgs>(args: SelectSubset<T, StreamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StreamFindFirstArgs>(args?: SelectSubset<T, StreamFindFirstArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Stream that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindFirstOrThrowArgs} args - Arguments to find a Stream
     * @example
     * // Get one Stream
     * const stream = await prisma.stream.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StreamFindFirstOrThrowArgs>(args?: SelectSubset<T, StreamFindFirstOrThrowArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Streams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Streams
     * const streams = await prisma.stream.findMany()
     * 
     * // Get first 10 Streams
     * const streams = await prisma.stream.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const streamWithIdOnly = await prisma.stream.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StreamFindManyArgs>(args?: SelectSubset<T, StreamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Stream.
     * @param {StreamCreateArgs} args - Arguments to create a Stream.
     * @example
     * // Create one Stream
     * const Stream = await prisma.stream.create({
     *   data: {
     *     // ... data to create a Stream
     *   }
     * })
     * 
     */
    create<T extends StreamCreateArgs>(args: SelectSubset<T, StreamCreateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Streams.
     * @param {StreamCreateManyArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StreamCreateManyArgs>(args?: SelectSubset<T, StreamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Streams and returns the data saved in the database.
     * @param {StreamCreateManyAndReturnArgs} args - Arguments to create many Streams.
     * @example
     * // Create many Streams
     * const stream = await prisma.stream.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StreamCreateManyAndReturnArgs>(args?: SelectSubset<T, StreamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Stream.
     * @param {StreamDeleteArgs} args - Arguments to delete one Stream.
     * @example
     * // Delete one Stream
     * const Stream = await prisma.stream.delete({
     *   where: {
     *     // ... filter to delete one Stream
     *   }
     * })
     * 
     */
    delete<T extends StreamDeleteArgs>(args: SelectSubset<T, StreamDeleteArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Stream.
     * @param {StreamUpdateArgs} args - Arguments to update one Stream.
     * @example
     * // Update one Stream
     * const stream = await prisma.stream.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StreamUpdateArgs>(args: SelectSubset<T, StreamUpdateArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Streams.
     * @param {StreamDeleteManyArgs} args - Arguments to filter Streams to delete.
     * @example
     * // Delete a few Streams
     * const { count } = await prisma.stream.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StreamDeleteManyArgs>(args?: SelectSubset<T, StreamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StreamUpdateManyArgs>(args: SelectSubset<T, StreamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Streams and returns the data updated in the database.
     * @param {StreamUpdateManyAndReturnArgs} args - Arguments to update many Streams.
     * @example
     * // Update many Streams
     * const stream = await prisma.stream.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Streams and only return the `id`
     * const streamWithIdOnly = await prisma.stream.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StreamUpdateManyAndReturnArgs>(args: SelectSubset<T, StreamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Stream.
     * @param {StreamUpsertArgs} args - Arguments to update or create a Stream.
     * @example
     * // Update or create a Stream
     * const stream = await prisma.stream.upsert({
     *   create: {
     *     // ... data to create a Stream
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stream we want to update
     *   }
     * })
     */
    upsert<T extends StreamUpsertArgs>(args: SelectSubset<T, StreamUpsertArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Streams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamCountArgs} args - Arguments to filter Streams to count.
     * @example
     * // Count the number of Streams
     * const count = await prisma.stream.count({
     *   where: {
     *     // ... the filter for the Streams we want to count
     *   }
     * })
    **/
    count<T extends StreamCountArgs>(
      args?: Subset<T, StreamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StreamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StreamAggregateArgs>(args: Subset<T, StreamAggregateArgs>): Prisma.PrismaPromise<GetStreamAggregateType<T>>

    /**
     * Group by Stream.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StreamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StreamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StreamGroupByArgs['orderBy'] }
        : { orderBy?: StreamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StreamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStreamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Stream model
   */
  readonly fields: StreamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Stream.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StreamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Stream model
   */
  interface StreamFieldRefs {
    readonly id: FieldRef<"Stream", 'String'>
    readonly chatId: FieldRef<"Stream", 'String'>
    readonly createdAt: FieldRef<"Stream", 'DateTime'>
    readonly updatedAt: FieldRef<"Stream", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Stream findUnique
   */
  export type StreamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findUniqueOrThrow
   */
  export type StreamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream findFirst
   */
  export type StreamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findFirstOrThrow
   */
  export type StreamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Stream to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Streams.
     */
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream findMany
   */
  export type StreamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter, which Streams to fetch.
     */
    where?: StreamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Streams to fetch.
     */
    orderBy?: StreamOrderByWithRelationInput | StreamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Streams.
     */
    cursor?: StreamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Streams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Streams.
     */
    skip?: number
    distinct?: StreamScalarFieldEnum | StreamScalarFieldEnum[]
  }

  /**
   * Stream create
   */
  export type StreamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to create a Stream.
     */
    data: XOR<StreamCreateInput, StreamUncheckedCreateInput>
  }

  /**
   * Stream createMany
   */
  export type StreamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
  }

  /**
   * Stream createManyAndReturn
   */
  export type StreamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to create many Streams.
     */
    data: StreamCreateManyInput | StreamCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream update
   */
  export type StreamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The data needed to update a Stream.
     */
    data: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
    /**
     * Choose, which Stream to update.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream updateMany
   */
  export type StreamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
  }

  /**
   * Stream updateManyAndReturn
   */
  export type StreamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * The data used to update Streams.
     */
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyInput>
    /**
     * Filter which Streams to update
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Stream upsert
   */
  export type StreamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * The filter to search for the Stream to update in case it exists.
     */
    where: StreamWhereUniqueInput
    /**
     * In case the Stream found by the `where` argument doesn't exist, create a new Stream with this data.
     */
    create: XOR<StreamCreateInput, StreamUncheckedCreateInput>
    /**
     * In case the Stream was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StreamUpdateInput, StreamUncheckedUpdateInput>
  }

  /**
   * Stream delete
   */
  export type StreamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
    /**
     * Filter which Stream to delete.
     */
    where: StreamWhereUniqueInput
  }

  /**
   * Stream deleteMany
   */
  export type StreamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Streams to delete
     */
    where?: StreamWhereInput
    /**
     * Limit how many Streams to delete.
     */
    limit?: number
  }

  /**
   * Stream without action
   */
  export type StreamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Stream
     */
    select?: StreamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Stream
     */
    omit?: StreamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StreamInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    vote: $Enums.VoteType | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    userId: string | null
    role: string | null
    createdAt: Date | null
    updatedAt: Date | null
    vote: $Enums.VoteType | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    chatId: number
    userId: number
    role: number
    parts: number
    metadata: number
    createdAt: number
    updatedAt: number
    attachments: number
    vote: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    vote?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    vote?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    chatId?: true
    userId?: true
    role?: true
    parts?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    attachments?: true
    vote?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    chatId: string
    userId: string
    role: string
    parts: JsonValue
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    attachments: JsonValue | null
    vote: $Enums.VoteType | null
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    chatId?: boolean
    userId?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attachments?: boolean
    vote?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "userId" | "role" | "parts" | "metadata" | "createdAt" | "updatedAt" | "attachments" | "vote", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      chat: Prisma.$ChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      userId: string
      role: string
      parts: Prisma.JsonValue
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
      attachments: Prisma.JsonValue | null
      vote: $Enums.VoteType | null
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends ChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ChatDefaultArgs<ExtArgs>>): Prisma__ChatClient<$Result.GetResult<Prisma.$ChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly chatId: FieldRef<"Message", 'String'>
    readonly userId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly parts: FieldRef<"Message", 'Json'>
    readonly metadata: FieldRef<"Message", 'Json'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
    readonly attachments: FieldRef<"Message", 'Json'>
    readonly vote: FieldRef<"Message", 'VoteType'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    balance: number | null
    currencyNumericCode: number | null
    balanceDue: number | null
    currentPrincipal: number | null
    interestRate: number | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
  }

  export type AccountSumAggregateOutputType = {
    balance: number | null
    currencyNumericCode: number | null
    balanceDue: number | null
    currentPrincipal: number | null
    interestRate: number | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    balance: number | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string | null
    number: string | null
    openedDate: Date | null
    closedDate: Date | null
    routingNumber: string | null
    type: string | null
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    balance: number | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string | null
    number: string | null
    openedDate: Date | null
    closedDate: Date | null
    routingNumber: string | null
    type: string | null
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    customerId: number
    isExternal: number
    externalConnectionId: number
    externalConnectionName: number
    balance: number
    currencyCode: number
    currencyName: number
    currencySymbol: number
    currencyNumericCode: number
    displayName: number
    name: number
    number: number
    openedDate: number
    closedDate: number
    routingNumber: number
    type: number
    subType: number
    status: number
    balanceDue: number
    currentPrincipal: number
    dueDate: number
    interestRate: number
    lastPaymentDate: number
    nextPaymentDate: number
    originalPrincipal: number
    paymentAmount: number
    paymentDate: number
    term: number
    cardNumber: number
    creditLimit: number
    minimumPaymentAmount: number
    statementBalance: number
    availableBalance: number
    dividendRate: number
    interestYTD: number
    cashBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    balance?: true
    currencyNumericCode?: true
    balanceDue?: true
    currentPrincipal?: true
    interestRate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
  }

  export type AccountSumAggregateInputType = {
    balance?: true
    currencyNumericCode?: true
    balanceDue?: true
    currentPrincipal?: true
    interestRate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    customerId: string
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    balance: number
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string
    number: string
    openedDate: Date
    closedDate: Date | null
    routingNumber: string
    type: string
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactions?: boolean | Account$transactionsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "isExternal" | "externalConnectionId" | "externalConnectionName" | "balance" | "currencyCode" | "currencyName" | "currencySymbol" | "currencyNumericCode" | "displayName" | "name" | "number" | "openedDate" | "closedDate" | "routingNumber" | "type" | "subType" | "status" | "balanceDue" | "currentPrincipal" | "dueDate" | "interestRate" | "lastPaymentDate" | "nextPaymentDate" | "originalPrincipal" | "paymentAmount" | "paymentDate" | "term" | "cardNumber" | "creditLimit" | "minimumPaymentAmount" | "statementBalance" | "availableBalance" | "dividendRate" | "interestYTD" | "cashBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | Account$transactionsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      isExternal: boolean | null
      externalConnectionId: string | null
      externalConnectionName: string | null
      balance: number
      currencyCode: string | null
      currencyName: string | null
      currencySymbol: string | null
      currencyNumericCode: number | null
      displayName: string | null
      name: string
      number: string
      openedDate: Date
      closedDate: Date | null
      routingNumber: string
      type: string
      subType: string | null
      status: string | null
      balanceDue: number | null
      currentPrincipal: number | null
      dueDate: Date | null
      interestRate: number | null
      lastPaymentDate: Date | null
      nextPaymentDate: Date | null
      originalPrincipal: number | null
      paymentAmount: number | null
      paymentDate: number | null
      term: number | null
      cardNumber: string | null
      creditLimit: number | null
      minimumPaymentAmount: number | null
      statementBalance: number | null
      availableBalance: number | null
      dividendRate: number | null
      interestYTD: number | null
      cashBalance: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends Account$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Account$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly customerId: FieldRef<"Account", 'String'>
    readonly isExternal: FieldRef<"Account", 'Boolean'>
    readonly externalConnectionId: FieldRef<"Account", 'String'>
    readonly externalConnectionName: FieldRef<"Account", 'String'>
    readonly balance: FieldRef<"Account", 'Float'>
    readonly currencyCode: FieldRef<"Account", 'String'>
    readonly currencyName: FieldRef<"Account", 'String'>
    readonly currencySymbol: FieldRef<"Account", 'String'>
    readonly currencyNumericCode: FieldRef<"Account", 'Float'>
    readonly displayName: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly number: FieldRef<"Account", 'String'>
    readonly openedDate: FieldRef<"Account", 'DateTime'>
    readonly closedDate: FieldRef<"Account", 'DateTime'>
    readonly routingNumber: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly subType: FieldRef<"Account", 'String'>
    readonly status: FieldRef<"Account", 'String'>
    readonly balanceDue: FieldRef<"Account", 'Float'>
    readonly currentPrincipal: FieldRef<"Account", 'Float'>
    readonly dueDate: FieldRef<"Account", 'DateTime'>
    readonly interestRate: FieldRef<"Account", 'Float'>
    readonly lastPaymentDate: FieldRef<"Account", 'DateTime'>
    readonly nextPaymentDate: FieldRef<"Account", 'DateTime'>
    readonly originalPrincipal: FieldRef<"Account", 'Float'>
    readonly paymentAmount: FieldRef<"Account", 'Float'>
    readonly paymentDate: FieldRef<"Account", 'Int'>
    readonly term: FieldRef<"Account", 'Int'>
    readonly cardNumber: FieldRef<"Account", 'String'>
    readonly creditLimit: FieldRef<"Account", 'Float'>
    readonly minimumPaymentAmount: FieldRef<"Account", 'Float'>
    readonly statementBalance: FieldRef<"Account", 'Float'>
    readonly availableBalance: FieldRef<"Account", 'Float'>
    readonly dividendRate: FieldRef<"Account", 'Float'>
    readonly interestYTD: FieldRef<"Account", 'Float'>
    readonly cashBalance: FieldRef<"Account", 'Float'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.transactions
   */
  export type Account$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: number | null
    currencyNumericCode: number | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: number | null
    currencyNumericCode: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    customerId: string | null
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    payee: string | null
    rawPayee: string | null
    description: string | null
    memo: string | null
    amount: number | null
    date: Date | null
    type: $Enums.TransactionType | null
    categoryId: string | null
    categoryName: string | null
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    customerId: string | null
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    payee: string | null
    rawPayee: string | null
    description: string | null
    memo: string | null
    amount: number | null
    date: Date | null
    type: $Enums.TransactionType | null
    categoryId: string | null
    categoryName: string | null
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    accountId: number
    customerId: number
    isExternal: number
    externalConnectionId: number
    externalConnectionName: number
    payee: number
    rawPayee: number
    description: number
    memo: number
    amount: number
    date: number
    type: number
    categoryId: number
    categoryName: number
    budgetCategoryId: number
    budgetCategory: number
    budgetSubcategory: number
    tags: number
    currencyCode: number
    currencyName: number
    currencySymbol: number
    currencyNumericCode: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
    currencyNumericCode?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
    currencyNumericCode?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    isExternal?: true
    externalConnectionId?: true
    externalConnectionName?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    tags?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    accountId: string
    customerId: string
    isExternal: boolean | null
    externalConnectionId: string | null
    externalConnectionName: string | null
    payee: string
    rawPayee: string
    description: string
    memo: string | null
    amount: number
    date: Date
    type: $Enums.TransactionType
    categoryId: string | null
    categoryName: string
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    tags: JsonValue | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date
    updated_at: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    isExternal?: boolean
    externalConnectionId?: boolean
    externalConnectionName?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "customerId" | "isExternal" | "externalConnectionId" | "externalConnectionName" | "payee" | "rawPayee" | "description" | "memo" | "amount" | "date" | "type" | "categoryId" | "categoryName" | "budgetCategoryId" | "budgetCategory" | "budgetSubcategory" | "tags" | "currencyCode" | "currencyName" | "currencySymbol" | "currencyNumericCode" | "created_at" | "updated_at", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | Transaction$accountArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      account: Prisma.$AccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      customerId: string
      isExternal: boolean | null
      externalConnectionId: string | null
      externalConnectionName: string | null
      payee: string
      rawPayee: string
      description: string
      memo: string | null
      amount: number
      date: Date
      type: $Enums.TransactionType
      categoryId: string | null
      categoryName: string
      budgetCategoryId: string | null
      budgetCategory: string | null
      budgetSubcategory: string | null
      tags: Prisma.JsonValue | null
      currencyCode: string | null
      currencyName: string | null
      currencySymbol: string | null
      currencyNumericCode: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends Transaction$accountArgs<ExtArgs> = {}>(args?: Subset<T, Transaction$accountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly accountId: FieldRef<"Transaction", 'String'>
    readonly customerId: FieldRef<"Transaction", 'String'>
    readonly isExternal: FieldRef<"Transaction", 'Boolean'>
    readonly externalConnectionId: FieldRef<"Transaction", 'String'>
    readonly externalConnectionName: FieldRef<"Transaction", 'String'>
    readonly payee: FieldRef<"Transaction", 'String'>
    readonly rawPayee: FieldRef<"Transaction", 'String'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly memo: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Float'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly type: FieldRef<"Transaction", 'TransactionType'>
    readonly categoryId: FieldRef<"Transaction", 'String'>
    readonly categoryName: FieldRef<"Transaction", 'String'>
    readonly budgetCategoryId: FieldRef<"Transaction", 'String'>
    readonly budgetCategory: FieldRef<"Transaction", 'String'>
    readonly budgetSubcategory: FieldRef<"Transaction", 'String'>
    readonly tags: FieldRef<"Transaction", 'Json'>
    readonly currencyCode: FieldRef<"Transaction", 'String'>
    readonly currencyName: FieldRef<"Transaction", 'String'>
    readonly currencySymbol: FieldRef<"Transaction", 'String'>
    readonly currencyNumericCode: FieldRef<"Transaction", 'Float'>
    readonly created_at: FieldRef<"Transaction", 'DateTime'>
    readonly updated_at: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction.account
   */
  export type Transaction$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    pageContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    pageContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    pageContent: number
    createdAt: number
    updatedAt: number
    embedding: number
    metadata: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
    embedding?: true
    metadata?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    pageContent: string
    createdAt: Date
    updatedAt: Date
    embedding: JsonValue
    metadata: JsonValue
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }

  export type DocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageContent" | "createdAt" | "updatedAt" | "embedding" | "metadata", ExtArgs["result"]["document"]>

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageContent: string
      createdAt: Date
      updatedAt: Date
      embedding: Prisma.JsonValue
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents and returns the data updated in the database.
     * @param {DocumentUpdateManyAndReturnArgs} args - Arguments to update many Documents.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Document model
   */
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly pageContent: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
    readonly updatedAt: FieldRef<"Document", 'DateTime'>
    readonly embedding: FieldRef<"Document", 'Json'>
    readonly metadata: FieldRef<"Document", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document updateManyAndReturn
   */
  export type DocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to update.
     */
    limit?: number
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
    /**
     * Limit how many Documents to delete.
     */
    limit?: number
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Document
     */
    omit?: DocumentOmit<ExtArgs> | null
  }


  /**
   * Model SampleAccount
   */

  export type AggregateSampleAccount = {
    _count: SampleAccountCountAggregateOutputType | null
    _avg: SampleAccountAvgAggregateOutputType | null
    _sum: SampleAccountSumAggregateOutputType | null
    _min: SampleAccountMinAggregateOutputType | null
    _max: SampleAccountMaxAggregateOutputType | null
  }

  export type SampleAccountAvgAggregateOutputType = {
    balance: number | null
    currencyNumericCode: number | null
    balanceDue: number | null
    currentPrincipal: number | null
    interestRate: number | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
  }

  export type SampleAccountSumAggregateOutputType = {
    balance: number | null
    currencyNumericCode: number | null
    balanceDue: number | null
    currentPrincipal: number | null
    interestRate: number | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
  }

  export type SampleAccountMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    balance: number | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string | null
    number: string | null
    openedDate: Date | null
    closedDate: Date | null
    routingNumber: string | null
    type: string | null
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SampleAccountMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    balance: number | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string | null
    number: string | null
    openedDate: Date | null
    closedDate: Date | null
    routingNumber: string | null
    type: string | null
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SampleAccountCountAggregateOutputType = {
    id: number
    customerId: number
    balance: number
    currencyCode: number
    currencyName: number
    currencySymbol: number
    currencyNumericCode: number
    displayName: number
    name: number
    number: number
    openedDate: number
    closedDate: number
    routingNumber: number
    type: number
    subType: number
    status: number
    balanceDue: number
    currentPrincipal: number
    dueDate: number
    interestRate: number
    lastPaymentDate: number
    nextPaymentDate: number
    originalPrincipal: number
    paymentAmount: number
    paymentDate: number
    term: number
    cardNumber: number
    creditLimit: number
    minimumPaymentAmount: number
    statementBalance: number
    availableBalance: number
    dividendRate: number
    interestYTD: number
    cashBalance: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SampleAccountAvgAggregateInputType = {
    balance?: true
    currencyNumericCode?: true
    balanceDue?: true
    currentPrincipal?: true
    interestRate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
  }

  export type SampleAccountSumAggregateInputType = {
    balance?: true
    currencyNumericCode?: true
    balanceDue?: true
    currentPrincipal?: true
    interestRate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
  }

  export type SampleAccountMinAggregateInputType = {
    id?: true
    customerId?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SampleAccountMaxAggregateInputType = {
    id?: true
    customerId?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SampleAccountCountAggregateInputType = {
    id?: true
    customerId?: true
    balance?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    displayName?: true
    name?: true
    number?: true
    openedDate?: true
    closedDate?: true
    routingNumber?: true
    type?: true
    subType?: true
    status?: true
    balanceDue?: true
    currentPrincipal?: true
    dueDate?: true
    interestRate?: true
    lastPaymentDate?: true
    nextPaymentDate?: true
    originalPrincipal?: true
    paymentAmount?: true
    paymentDate?: true
    term?: true
    cardNumber?: true
    creditLimit?: true
    minimumPaymentAmount?: true
    statementBalance?: true
    availableBalance?: true
    dividendRate?: true
    interestYTD?: true
    cashBalance?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SampleAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleAccount to aggregate.
     */
    where?: SampleAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleAccounts to fetch.
     */
    orderBy?: SampleAccountOrderByWithRelationInput | SampleAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SampleAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SampleAccounts
    **/
    _count?: true | SampleAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SampleAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SampleAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SampleAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SampleAccountMaxAggregateInputType
  }

  export type GetSampleAccountAggregateType<T extends SampleAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateSampleAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSampleAccount[P]>
      : GetScalarType<T[P], AggregateSampleAccount[P]>
  }




  export type SampleAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SampleAccountWhereInput
    orderBy?: SampleAccountOrderByWithAggregationInput | SampleAccountOrderByWithAggregationInput[]
    by: SampleAccountScalarFieldEnum[] | SampleAccountScalarFieldEnum
    having?: SampleAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SampleAccountCountAggregateInputType | true
    _avg?: SampleAccountAvgAggregateInputType
    _sum?: SampleAccountSumAggregateInputType
    _min?: SampleAccountMinAggregateInputType
    _max?: SampleAccountMaxAggregateInputType
  }

  export type SampleAccountGroupByOutputType = {
    id: string
    customerId: string
    balance: number
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    displayName: string | null
    name: string
    number: string
    openedDate: Date
    closedDate: Date | null
    routingNumber: string
    type: string
    subType: string | null
    status: string | null
    balanceDue: number | null
    currentPrincipal: number | null
    dueDate: Date | null
    interestRate: number | null
    lastPaymentDate: Date | null
    nextPaymentDate: Date | null
    originalPrincipal: number | null
    paymentAmount: number | null
    paymentDate: number | null
    term: number | null
    cardNumber: string | null
    creditLimit: number | null
    minimumPaymentAmount: number | null
    statementBalance: number | null
    availableBalance: number | null
    dividendRate: number | null
    interestYTD: number | null
    cashBalance: number | null
    createdAt: Date
    updatedAt: Date
    _count: SampleAccountCountAggregateOutputType | null
    _avg: SampleAccountAvgAggregateOutputType | null
    _sum: SampleAccountSumAggregateOutputType | null
    _min: SampleAccountMinAggregateOutputType | null
    _max: SampleAccountMaxAggregateOutputType | null
  }

  type GetSampleAccountGroupByPayload<T extends SampleAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SampleAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SampleAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SampleAccountGroupByOutputType[P]>
            : GetScalarType<T[P], SampleAccountGroupByOutputType[P]>
        }
      >
    >


  export type SampleAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    transactions?: boolean | SampleAccount$transactionsArgs<ExtArgs>
    _count?: boolean | SampleAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["sampleAccount"]>

  export type SampleAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sampleAccount"]>

  export type SampleAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["sampleAccount"]>

  export type SampleAccountSelectScalar = {
    id?: boolean
    customerId?: boolean
    balance?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    displayName?: boolean
    name?: boolean
    number?: boolean
    openedDate?: boolean
    closedDate?: boolean
    routingNumber?: boolean
    type?: boolean
    subType?: boolean
    status?: boolean
    balanceDue?: boolean
    currentPrincipal?: boolean
    dueDate?: boolean
    interestRate?: boolean
    lastPaymentDate?: boolean
    nextPaymentDate?: boolean
    originalPrincipal?: boolean
    paymentAmount?: boolean
    paymentDate?: boolean
    term?: boolean
    cardNumber?: boolean
    creditLimit?: boolean
    minimumPaymentAmount?: boolean
    statementBalance?: boolean
    availableBalance?: boolean
    dividendRate?: boolean
    interestYTD?: boolean
    cashBalance?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SampleAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "balance" | "currencyCode" | "currencyName" | "currencySymbol" | "currencyNumericCode" | "displayName" | "name" | "number" | "openedDate" | "closedDate" | "routingNumber" | "type" | "subType" | "status" | "balanceDue" | "currentPrincipal" | "dueDate" | "interestRate" | "lastPaymentDate" | "nextPaymentDate" | "originalPrincipal" | "paymentAmount" | "paymentDate" | "term" | "cardNumber" | "creditLimit" | "minimumPaymentAmount" | "statementBalance" | "availableBalance" | "dividendRate" | "interestYTD" | "cashBalance" | "createdAt" | "updatedAt", ExtArgs["result"]["sampleAccount"]>
  export type SampleAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | SampleAccount$transactionsArgs<ExtArgs>
    _count?: boolean | SampleAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SampleAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SampleAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SampleAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SampleAccount"
    objects: {
      transactions: Prisma.$SampleTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      balance: number
      currencyCode: string | null
      currencyName: string | null
      currencySymbol: string | null
      currencyNumericCode: number | null
      displayName: string | null
      name: string
      number: string
      openedDate: Date
      closedDate: Date | null
      routingNumber: string
      type: string
      subType: string | null
      status: string | null
      balanceDue: number | null
      currentPrincipal: number | null
      dueDate: Date | null
      interestRate: number | null
      lastPaymentDate: Date | null
      nextPaymentDate: Date | null
      originalPrincipal: number | null
      paymentAmount: number | null
      paymentDate: number | null
      term: number | null
      cardNumber: string | null
      creditLimit: number | null
      minimumPaymentAmount: number | null
      statementBalance: number | null
      availableBalance: number | null
      dividendRate: number | null
      interestYTD: number | null
      cashBalance: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["sampleAccount"]>
    composites: {}
  }

  type SampleAccountGetPayload<S extends boolean | null | undefined | SampleAccountDefaultArgs> = $Result.GetResult<Prisma.$SampleAccountPayload, S>

  type SampleAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SampleAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SampleAccountCountAggregateInputType | true
    }

  export interface SampleAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SampleAccount'], meta: { name: 'SampleAccount' } }
    /**
     * Find zero or one SampleAccount that matches the filter.
     * @param {SampleAccountFindUniqueArgs} args - Arguments to find a SampleAccount
     * @example
     * // Get one SampleAccount
     * const sampleAccount = await prisma.sampleAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SampleAccountFindUniqueArgs>(args: SelectSubset<T, SampleAccountFindUniqueArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SampleAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SampleAccountFindUniqueOrThrowArgs} args - Arguments to find a SampleAccount
     * @example
     * // Get one SampleAccount
     * const sampleAccount = await prisma.sampleAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SampleAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, SampleAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountFindFirstArgs} args - Arguments to find a SampleAccount
     * @example
     * // Get one SampleAccount
     * const sampleAccount = await prisma.sampleAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SampleAccountFindFirstArgs>(args?: SelectSubset<T, SampleAccountFindFirstArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountFindFirstOrThrowArgs} args - Arguments to find a SampleAccount
     * @example
     * // Get one SampleAccount
     * const sampleAccount = await prisma.sampleAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SampleAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, SampleAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SampleAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SampleAccounts
     * const sampleAccounts = await prisma.sampleAccount.findMany()
     * 
     * // Get first 10 SampleAccounts
     * const sampleAccounts = await prisma.sampleAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sampleAccountWithIdOnly = await prisma.sampleAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SampleAccountFindManyArgs>(args?: SelectSubset<T, SampleAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SampleAccount.
     * @param {SampleAccountCreateArgs} args - Arguments to create a SampleAccount.
     * @example
     * // Create one SampleAccount
     * const SampleAccount = await prisma.sampleAccount.create({
     *   data: {
     *     // ... data to create a SampleAccount
     *   }
     * })
     * 
     */
    create<T extends SampleAccountCreateArgs>(args: SelectSubset<T, SampleAccountCreateArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SampleAccounts.
     * @param {SampleAccountCreateManyArgs} args - Arguments to create many SampleAccounts.
     * @example
     * // Create many SampleAccounts
     * const sampleAccount = await prisma.sampleAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SampleAccountCreateManyArgs>(args?: SelectSubset<T, SampleAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SampleAccounts and returns the data saved in the database.
     * @param {SampleAccountCreateManyAndReturnArgs} args - Arguments to create many SampleAccounts.
     * @example
     * // Create many SampleAccounts
     * const sampleAccount = await prisma.sampleAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SampleAccounts and only return the `id`
     * const sampleAccountWithIdOnly = await prisma.sampleAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SampleAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, SampleAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SampleAccount.
     * @param {SampleAccountDeleteArgs} args - Arguments to delete one SampleAccount.
     * @example
     * // Delete one SampleAccount
     * const SampleAccount = await prisma.sampleAccount.delete({
     *   where: {
     *     // ... filter to delete one SampleAccount
     *   }
     * })
     * 
     */
    delete<T extends SampleAccountDeleteArgs>(args: SelectSubset<T, SampleAccountDeleteArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SampleAccount.
     * @param {SampleAccountUpdateArgs} args - Arguments to update one SampleAccount.
     * @example
     * // Update one SampleAccount
     * const sampleAccount = await prisma.sampleAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SampleAccountUpdateArgs>(args: SelectSubset<T, SampleAccountUpdateArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SampleAccounts.
     * @param {SampleAccountDeleteManyArgs} args - Arguments to filter SampleAccounts to delete.
     * @example
     * // Delete a few SampleAccounts
     * const { count } = await prisma.sampleAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SampleAccountDeleteManyArgs>(args?: SelectSubset<T, SampleAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SampleAccounts
     * const sampleAccount = await prisma.sampleAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SampleAccountUpdateManyArgs>(args: SelectSubset<T, SampleAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleAccounts and returns the data updated in the database.
     * @param {SampleAccountUpdateManyAndReturnArgs} args - Arguments to update many SampleAccounts.
     * @example
     * // Update many SampleAccounts
     * const sampleAccount = await prisma.sampleAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SampleAccounts and only return the `id`
     * const sampleAccountWithIdOnly = await prisma.sampleAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SampleAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, SampleAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SampleAccount.
     * @param {SampleAccountUpsertArgs} args - Arguments to update or create a SampleAccount.
     * @example
     * // Update or create a SampleAccount
     * const sampleAccount = await prisma.sampleAccount.upsert({
     *   create: {
     *     // ... data to create a SampleAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SampleAccount we want to update
     *   }
     * })
     */
    upsert<T extends SampleAccountUpsertArgs>(args: SelectSubset<T, SampleAccountUpsertArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SampleAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountCountArgs} args - Arguments to filter SampleAccounts to count.
     * @example
     * // Count the number of SampleAccounts
     * const count = await prisma.sampleAccount.count({
     *   where: {
     *     // ... the filter for the SampleAccounts we want to count
     *   }
     * })
    **/
    count<T extends SampleAccountCountArgs>(
      args?: Subset<T, SampleAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SampleAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SampleAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SampleAccountAggregateArgs>(args: Subset<T, SampleAccountAggregateArgs>): Prisma.PrismaPromise<GetSampleAccountAggregateType<T>>

    /**
     * Group by SampleAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SampleAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SampleAccountGroupByArgs['orderBy'] }
        : { orderBy?: SampleAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SampleAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSampleAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SampleAccount model
   */
  readonly fields: SampleAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SampleAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SampleAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    transactions<T extends SampleAccount$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, SampleAccount$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SampleAccount model
   */
  interface SampleAccountFieldRefs {
    readonly id: FieldRef<"SampleAccount", 'String'>
    readonly customerId: FieldRef<"SampleAccount", 'String'>
    readonly balance: FieldRef<"SampleAccount", 'Float'>
    readonly currencyCode: FieldRef<"SampleAccount", 'String'>
    readonly currencyName: FieldRef<"SampleAccount", 'String'>
    readonly currencySymbol: FieldRef<"SampleAccount", 'String'>
    readonly currencyNumericCode: FieldRef<"SampleAccount", 'Float'>
    readonly displayName: FieldRef<"SampleAccount", 'String'>
    readonly name: FieldRef<"SampleAccount", 'String'>
    readonly number: FieldRef<"SampleAccount", 'String'>
    readonly openedDate: FieldRef<"SampleAccount", 'DateTime'>
    readonly closedDate: FieldRef<"SampleAccount", 'DateTime'>
    readonly routingNumber: FieldRef<"SampleAccount", 'String'>
    readonly type: FieldRef<"SampleAccount", 'String'>
    readonly subType: FieldRef<"SampleAccount", 'String'>
    readonly status: FieldRef<"SampleAccount", 'String'>
    readonly balanceDue: FieldRef<"SampleAccount", 'Float'>
    readonly currentPrincipal: FieldRef<"SampleAccount", 'Float'>
    readonly dueDate: FieldRef<"SampleAccount", 'DateTime'>
    readonly interestRate: FieldRef<"SampleAccount", 'Float'>
    readonly lastPaymentDate: FieldRef<"SampleAccount", 'DateTime'>
    readonly nextPaymentDate: FieldRef<"SampleAccount", 'DateTime'>
    readonly originalPrincipal: FieldRef<"SampleAccount", 'Float'>
    readonly paymentAmount: FieldRef<"SampleAccount", 'Float'>
    readonly paymentDate: FieldRef<"SampleAccount", 'Int'>
    readonly term: FieldRef<"SampleAccount", 'Int'>
    readonly cardNumber: FieldRef<"SampleAccount", 'String'>
    readonly creditLimit: FieldRef<"SampleAccount", 'Float'>
    readonly minimumPaymentAmount: FieldRef<"SampleAccount", 'Float'>
    readonly statementBalance: FieldRef<"SampleAccount", 'Float'>
    readonly availableBalance: FieldRef<"SampleAccount", 'Float'>
    readonly dividendRate: FieldRef<"SampleAccount", 'Float'>
    readonly interestYTD: FieldRef<"SampleAccount", 'Float'>
    readonly cashBalance: FieldRef<"SampleAccount", 'Float'>
    readonly createdAt: FieldRef<"SampleAccount", 'DateTime'>
    readonly updatedAt: FieldRef<"SampleAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SampleAccount findUnique
   */
  export type SampleAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter, which SampleAccount to fetch.
     */
    where: SampleAccountWhereUniqueInput
  }

  /**
   * SampleAccount findUniqueOrThrow
   */
  export type SampleAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter, which SampleAccount to fetch.
     */
    where: SampleAccountWhereUniqueInput
  }

  /**
   * SampleAccount findFirst
   */
  export type SampleAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter, which SampleAccount to fetch.
     */
    where?: SampleAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleAccounts to fetch.
     */
    orderBy?: SampleAccountOrderByWithRelationInput | SampleAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleAccounts.
     */
    cursor?: SampleAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleAccounts.
     */
    distinct?: SampleAccountScalarFieldEnum | SampleAccountScalarFieldEnum[]
  }

  /**
   * SampleAccount findFirstOrThrow
   */
  export type SampleAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter, which SampleAccount to fetch.
     */
    where?: SampleAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleAccounts to fetch.
     */
    orderBy?: SampleAccountOrderByWithRelationInput | SampleAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleAccounts.
     */
    cursor?: SampleAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleAccounts.
     */
    distinct?: SampleAccountScalarFieldEnum | SampleAccountScalarFieldEnum[]
  }

  /**
   * SampleAccount findMany
   */
  export type SampleAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter, which SampleAccounts to fetch.
     */
    where?: SampleAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleAccounts to fetch.
     */
    orderBy?: SampleAccountOrderByWithRelationInput | SampleAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SampleAccounts.
     */
    cursor?: SampleAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleAccounts.
     */
    skip?: number
    distinct?: SampleAccountScalarFieldEnum | SampleAccountScalarFieldEnum[]
  }

  /**
   * SampleAccount create
   */
  export type SampleAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a SampleAccount.
     */
    data: XOR<SampleAccountCreateInput, SampleAccountUncheckedCreateInput>
  }

  /**
   * SampleAccount createMany
   */
  export type SampleAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SampleAccounts.
     */
    data: SampleAccountCreateManyInput | SampleAccountCreateManyInput[]
  }

  /**
   * SampleAccount createManyAndReturn
   */
  export type SampleAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * The data used to create many SampleAccounts.
     */
    data: SampleAccountCreateManyInput | SampleAccountCreateManyInput[]
  }

  /**
   * SampleAccount update
   */
  export type SampleAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a SampleAccount.
     */
    data: XOR<SampleAccountUpdateInput, SampleAccountUncheckedUpdateInput>
    /**
     * Choose, which SampleAccount to update.
     */
    where: SampleAccountWhereUniqueInput
  }

  /**
   * SampleAccount updateMany
   */
  export type SampleAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SampleAccounts.
     */
    data: XOR<SampleAccountUpdateManyMutationInput, SampleAccountUncheckedUpdateManyInput>
    /**
     * Filter which SampleAccounts to update
     */
    where?: SampleAccountWhereInput
    /**
     * Limit how many SampleAccounts to update.
     */
    limit?: number
  }

  /**
   * SampleAccount updateManyAndReturn
   */
  export type SampleAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * The data used to update SampleAccounts.
     */
    data: XOR<SampleAccountUpdateManyMutationInput, SampleAccountUncheckedUpdateManyInput>
    /**
     * Filter which SampleAccounts to update
     */
    where?: SampleAccountWhereInput
    /**
     * Limit how many SampleAccounts to update.
     */
    limit?: number
  }

  /**
   * SampleAccount upsert
   */
  export type SampleAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the SampleAccount to update in case it exists.
     */
    where: SampleAccountWhereUniqueInput
    /**
     * In case the SampleAccount found by the `where` argument doesn't exist, create a new SampleAccount with this data.
     */
    create: XOR<SampleAccountCreateInput, SampleAccountUncheckedCreateInput>
    /**
     * In case the SampleAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SampleAccountUpdateInput, SampleAccountUncheckedUpdateInput>
  }

  /**
   * SampleAccount delete
   */
  export type SampleAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    /**
     * Filter which SampleAccount to delete.
     */
    where: SampleAccountWhereUniqueInput
  }

  /**
   * SampleAccount deleteMany
   */
  export type SampleAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleAccounts to delete
     */
    where?: SampleAccountWhereInput
    /**
     * Limit how many SampleAccounts to delete.
     */
    limit?: number
  }

  /**
   * SampleAccount.transactions
   */
  export type SampleAccount$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    where?: SampleTransactionWhereInput
    orderBy?: SampleTransactionOrderByWithRelationInput | SampleTransactionOrderByWithRelationInput[]
    cursor?: SampleTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SampleTransactionScalarFieldEnum | SampleTransactionScalarFieldEnum[]
  }

  /**
   * SampleAccount without action
   */
  export type SampleAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
  }


  /**
   * Model SampleTransaction
   */

  export type AggregateSampleTransaction = {
    _count: SampleTransactionCountAggregateOutputType | null
    _avg: SampleTransactionAvgAggregateOutputType | null
    _sum: SampleTransactionSumAggregateOutputType | null
    _min: SampleTransactionMinAggregateOutputType | null
    _max: SampleTransactionMaxAggregateOutputType | null
  }

  export type SampleTransactionAvgAggregateOutputType = {
    amount: number | null
    currencyNumericCode: number | null
  }

  export type SampleTransactionSumAggregateOutputType = {
    amount: number | null
    currencyNumericCode: number | null
  }

  export type SampleTransactionMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    customerId: string | null
    payee: string | null
    rawPayee: string | null
    description: string | null
    memo: string | null
    amount: number | null
    date: Date | null
    type: $Enums.TransactionType | null
    categoryId: string | null
    categoryName: string | null
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SampleTransactionMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    customerId: string | null
    payee: string | null
    rawPayee: string | null
    description: string | null
    memo: string | null
    amount: number | null
    date: Date | null
    type: $Enums.TransactionType | null
    categoryId: string | null
    categoryName: string | null
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SampleTransactionCountAggregateOutputType = {
    id: number
    accountId: number
    customerId: number
    payee: number
    rawPayee: number
    description: number
    memo: number
    amount: number
    date: number
    type: number
    categoryId: number
    categoryName: number
    budgetCategoryId: number
    budgetCategory: number
    budgetSubcategory: number
    tags: number
    currencyCode: number
    currencyName: number
    currencySymbol: number
    currencyNumericCode: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SampleTransactionAvgAggregateInputType = {
    amount?: true
    currencyNumericCode?: true
  }

  export type SampleTransactionSumAggregateInputType = {
    amount?: true
    currencyNumericCode?: true
  }

  export type SampleTransactionMinAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
  }

  export type SampleTransactionMaxAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
  }

  export type SampleTransactionCountAggregateInputType = {
    id?: true
    accountId?: true
    customerId?: true
    payee?: true
    rawPayee?: true
    description?: true
    memo?: true
    amount?: true
    date?: true
    type?: true
    categoryId?: true
    categoryName?: true
    budgetCategoryId?: true
    budgetCategory?: true
    budgetSubcategory?: true
    tags?: true
    currencyCode?: true
    currencyName?: true
    currencySymbol?: true
    currencyNumericCode?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SampleTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleTransaction to aggregate.
     */
    where?: SampleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleTransactions to fetch.
     */
    orderBy?: SampleTransactionOrderByWithRelationInput | SampleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SampleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SampleTransactions
    **/
    _count?: true | SampleTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SampleTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SampleTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SampleTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SampleTransactionMaxAggregateInputType
  }

  export type GetSampleTransactionAggregateType<T extends SampleTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateSampleTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSampleTransaction[P]>
      : GetScalarType<T[P], AggregateSampleTransaction[P]>
  }




  export type SampleTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SampleTransactionWhereInput
    orderBy?: SampleTransactionOrderByWithAggregationInput | SampleTransactionOrderByWithAggregationInput[]
    by: SampleTransactionScalarFieldEnum[] | SampleTransactionScalarFieldEnum
    having?: SampleTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SampleTransactionCountAggregateInputType | true
    _avg?: SampleTransactionAvgAggregateInputType
    _sum?: SampleTransactionSumAggregateInputType
    _min?: SampleTransactionMinAggregateInputType
    _max?: SampleTransactionMaxAggregateInputType
  }

  export type SampleTransactionGroupByOutputType = {
    id: string
    accountId: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo: string | null
    amount: number
    date: Date
    type: $Enums.TransactionType
    categoryId: string | null
    categoryName: string
    budgetCategoryId: string | null
    budgetCategory: string | null
    budgetSubcategory: string | null
    tags: JsonValue | null
    currencyCode: string | null
    currencyName: string | null
    currencySymbol: string | null
    currencyNumericCode: number | null
    created_at: Date
    updated_at: Date
    _count: SampleTransactionCountAggregateOutputType | null
    _avg: SampleTransactionAvgAggregateOutputType | null
    _sum: SampleTransactionSumAggregateOutputType | null
    _min: SampleTransactionMinAggregateOutputType | null
    _max: SampleTransactionMaxAggregateOutputType | null
  }

  type GetSampleTransactionGroupByPayload<T extends SampleTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SampleTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SampleTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SampleTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], SampleTransactionGroupByOutputType[P]>
        }
      >
    >


  export type SampleTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["sampleTransaction"]>

  export type SampleTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["sampleTransaction"]>

  export type SampleTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }, ExtArgs["result"]["sampleTransaction"]>

  export type SampleTransactionSelectScalar = {
    id?: boolean
    accountId?: boolean
    customerId?: boolean
    payee?: boolean
    rawPayee?: boolean
    description?: boolean
    memo?: boolean
    amount?: boolean
    date?: boolean
    type?: boolean
    categoryId?: boolean
    categoryName?: boolean
    budgetCategoryId?: boolean
    budgetCategory?: boolean
    budgetSubcategory?: boolean
    tags?: boolean
    currencyCode?: boolean
    currencyName?: boolean
    currencySymbol?: boolean
    currencyNumericCode?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SampleTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "customerId" | "payee" | "rawPayee" | "description" | "memo" | "amount" | "date" | "type" | "categoryId" | "categoryName" | "budgetCategoryId" | "budgetCategory" | "budgetSubcategory" | "tags" | "currencyCode" | "currencyName" | "currencySymbol" | "currencyNumericCode" | "created_at" | "updated_at", ExtArgs["result"]["sampleTransaction"]>
  export type SampleTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }
  export type SampleTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }
  export type SampleTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    account?: boolean | SampleTransaction$accountArgs<ExtArgs>
  }

  export type $SampleTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SampleTransaction"
    objects: {
      account: Prisma.$SampleAccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      customerId: string
      payee: string
      rawPayee: string
      description: string
      memo: string | null
      amount: number
      date: Date
      type: $Enums.TransactionType
      categoryId: string | null
      categoryName: string
      budgetCategoryId: string | null
      budgetCategory: string | null
      budgetSubcategory: string | null
      tags: Prisma.JsonValue | null
      currencyCode: string | null
      currencyName: string | null
      currencySymbol: string | null
      currencyNumericCode: number | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["sampleTransaction"]>
    composites: {}
  }

  type SampleTransactionGetPayload<S extends boolean | null | undefined | SampleTransactionDefaultArgs> = $Result.GetResult<Prisma.$SampleTransactionPayload, S>

  type SampleTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SampleTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SampleTransactionCountAggregateInputType | true
    }

  export interface SampleTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SampleTransaction'], meta: { name: 'SampleTransaction' } }
    /**
     * Find zero or one SampleTransaction that matches the filter.
     * @param {SampleTransactionFindUniqueArgs} args - Arguments to find a SampleTransaction
     * @example
     * // Get one SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SampleTransactionFindUniqueArgs>(args: SelectSubset<T, SampleTransactionFindUniqueArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SampleTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SampleTransactionFindUniqueOrThrowArgs} args - Arguments to find a SampleTransaction
     * @example
     * // Get one SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SampleTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, SampleTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionFindFirstArgs} args - Arguments to find a SampleTransaction
     * @example
     * // Get one SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SampleTransactionFindFirstArgs>(args?: SelectSubset<T, SampleTransactionFindFirstArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionFindFirstOrThrowArgs} args - Arguments to find a SampleTransaction
     * @example
     * // Get one SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SampleTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, SampleTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SampleTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SampleTransactions
     * const sampleTransactions = await prisma.sampleTransaction.findMany()
     * 
     * // Get first 10 SampleTransactions
     * const sampleTransactions = await prisma.sampleTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sampleTransactionWithIdOnly = await prisma.sampleTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SampleTransactionFindManyArgs>(args?: SelectSubset<T, SampleTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SampleTransaction.
     * @param {SampleTransactionCreateArgs} args - Arguments to create a SampleTransaction.
     * @example
     * // Create one SampleTransaction
     * const SampleTransaction = await prisma.sampleTransaction.create({
     *   data: {
     *     // ... data to create a SampleTransaction
     *   }
     * })
     * 
     */
    create<T extends SampleTransactionCreateArgs>(args: SelectSubset<T, SampleTransactionCreateArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SampleTransactions.
     * @param {SampleTransactionCreateManyArgs} args - Arguments to create many SampleTransactions.
     * @example
     * // Create many SampleTransactions
     * const sampleTransaction = await prisma.sampleTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SampleTransactionCreateManyArgs>(args?: SelectSubset<T, SampleTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SampleTransactions and returns the data saved in the database.
     * @param {SampleTransactionCreateManyAndReturnArgs} args - Arguments to create many SampleTransactions.
     * @example
     * // Create many SampleTransactions
     * const sampleTransaction = await prisma.sampleTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SampleTransactions and only return the `id`
     * const sampleTransactionWithIdOnly = await prisma.sampleTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SampleTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, SampleTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SampleTransaction.
     * @param {SampleTransactionDeleteArgs} args - Arguments to delete one SampleTransaction.
     * @example
     * // Delete one SampleTransaction
     * const SampleTransaction = await prisma.sampleTransaction.delete({
     *   where: {
     *     // ... filter to delete one SampleTransaction
     *   }
     * })
     * 
     */
    delete<T extends SampleTransactionDeleteArgs>(args: SelectSubset<T, SampleTransactionDeleteArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SampleTransaction.
     * @param {SampleTransactionUpdateArgs} args - Arguments to update one SampleTransaction.
     * @example
     * // Update one SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SampleTransactionUpdateArgs>(args: SelectSubset<T, SampleTransactionUpdateArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SampleTransactions.
     * @param {SampleTransactionDeleteManyArgs} args - Arguments to filter SampleTransactions to delete.
     * @example
     * // Delete a few SampleTransactions
     * const { count } = await prisma.sampleTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SampleTransactionDeleteManyArgs>(args?: SelectSubset<T, SampleTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SampleTransactions
     * const sampleTransaction = await prisma.sampleTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SampleTransactionUpdateManyArgs>(args: SelectSubset<T, SampleTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleTransactions and returns the data updated in the database.
     * @param {SampleTransactionUpdateManyAndReturnArgs} args - Arguments to update many SampleTransactions.
     * @example
     * // Update many SampleTransactions
     * const sampleTransaction = await prisma.sampleTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SampleTransactions and only return the `id`
     * const sampleTransactionWithIdOnly = await prisma.sampleTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SampleTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, SampleTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SampleTransaction.
     * @param {SampleTransactionUpsertArgs} args - Arguments to update or create a SampleTransaction.
     * @example
     * // Update or create a SampleTransaction
     * const sampleTransaction = await prisma.sampleTransaction.upsert({
     *   create: {
     *     // ... data to create a SampleTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SampleTransaction we want to update
     *   }
     * })
     */
    upsert<T extends SampleTransactionUpsertArgs>(args: SelectSubset<T, SampleTransactionUpsertArgs<ExtArgs>>): Prisma__SampleTransactionClient<$Result.GetResult<Prisma.$SampleTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SampleTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionCountArgs} args - Arguments to filter SampleTransactions to count.
     * @example
     * // Count the number of SampleTransactions
     * const count = await prisma.sampleTransaction.count({
     *   where: {
     *     // ... the filter for the SampleTransactions we want to count
     *   }
     * })
    **/
    count<T extends SampleTransactionCountArgs>(
      args?: Subset<T, SampleTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SampleTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SampleTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SampleTransactionAggregateArgs>(args: Subset<T, SampleTransactionAggregateArgs>): Prisma.PrismaPromise<GetSampleTransactionAggregateType<T>>

    /**
     * Group by SampleTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SampleTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SampleTransactionGroupByArgs['orderBy'] }
        : { orderBy?: SampleTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SampleTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSampleTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SampleTransaction model
   */
  readonly fields: SampleTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SampleTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SampleTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    account<T extends SampleTransaction$accountArgs<ExtArgs> = {}>(args?: Subset<T, SampleTransaction$accountArgs<ExtArgs>>): Prisma__SampleAccountClient<$Result.GetResult<Prisma.$SampleAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SampleTransaction model
   */
  interface SampleTransactionFieldRefs {
    readonly id: FieldRef<"SampleTransaction", 'String'>
    readonly accountId: FieldRef<"SampleTransaction", 'String'>
    readonly customerId: FieldRef<"SampleTransaction", 'String'>
    readonly payee: FieldRef<"SampleTransaction", 'String'>
    readonly rawPayee: FieldRef<"SampleTransaction", 'String'>
    readonly description: FieldRef<"SampleTransaction", 'String'>
    readonly memo: FieldRef<"SampleTransaction", 'String'>
    readonly amount: FieldRef<"SampleTransaction", 'Float'>
    readonly date: FieldRef<"SampleTransaction", 'DateTime'>
    readonly type: FieldRef<"SampleTransaction", 'TransactionType'>
    readonly categoryId: FieldRef<"SampleTransaction", 'String'>
    readonly categoryName: FieldRef<"SampleTransaction", 'String'>
    readonly budgetCategoryId: FieldRef<"SampleTransaction", 'String'>
    readonly budgetCategory: FieldRef<"SampleTransaction", 'String'>
    readonly budgetSubcategory: FieldRef<"SampleTransaction", 'String'>
    readonly tags: FieldRef<"SampleTransaction", 'Json'>
    readonly currencyCode: FieldRef<"SampleTransaction", 'String'>
    readonly currencyName: FieldRef<"SampleTransaction", 'String'>
    readonly currencySymbol: FieldRef<"SampleTransaction", 'String'>
    readonly currencyNumericCode: FieldRef<"SampleTransaction", 'Float'>
    readonly created_at: FieldRef<"SampleTransaction", 'DateTime'>
    readonly updated_at: FieldRef<"SampleTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SampleTransaction findUnique
   */
  export type SampleTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SampleTransaction to fetch.
     */
    where: SampleTransactionWhereUniqueInput
  }

  /**
   * SampleTransaction findUniqueOrThrow
   */
  export type SampleTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SampleTransaction to fetch.
     */
    where: SampleTransactionWhereUniqueInput
  }

  /**
   * SampleTransaction findFirst
   */
  export type SampleTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SampleTransaction to fetch.
     */
    where?: SampleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleTransactions to fetch.
     */
    orderBy?: SampleTransactionOrderByWithRelationInput | SampleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleTransactions.
     */
    cursor?: SampleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleTransactions.
     */
    distinct?: SampleTransactionScalarFieldEnum | SampleTransactionScalarFieldEnum[]
  }

  /**
   * SampleTransaction findFirstOrThrow
   */
  export type SampleTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SampleTransaction to fetch.
     */
    where?: SampleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleTransactions to fetch.
     */
    orderBy?: SampleTransactionOrderByWithRelationInput | SampleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleTransactions.
     */
    cursor?: SampleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleTransactions.
     */
    distinct?: SampleTransactionScalarFieldEnum | SampleTransactionScalarFieldEnum[]
  }

  /**
   * SampleTransaction findMany
   */
  export type SampleTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter, which SampleTransactions to fetch.
     */
    where?: SampleTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleTransactions to fetch.
     */
    orderBy?: SampleTransactionOrderByWithRelationInput | SampleTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SampleTransactions.
     */
    cursor?: SampleTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleTransactions.
     */
    skip?: number
    distinct?: SampleTransactionScalarFieldEnum | SampleTransactionScalarFieldEnum[]
  }

  /**
   * SampleTransaction create
   */
  export type SampleTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a SampleTransaction.
     */
    data: XOR<SampleTransactionCreateInput, SampleTransactionUncheckedCreateInput>
  }

  /**
   * SampleTransaction createMany
   */
  export type SampleTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SampleTransactions.
     */
    data: SampleTransactionCreateManyInput | SampleTransactionCreateManyInput[]
  }

  /**
   * SampleTransaction createManyAndReturn
   */
  export type SampleTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many SampleTransactions.
     */
    data: SampleTransactionCreateManyInput | SampleTransactionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SampleTransaction update
   */
  export type SampleTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a SampleTransaction.
     */
    data: XOR<SampleTransactionUpdateInput, SampleTransactionUncheckedUpdateInput>
    /**
     * Choose, which SampleTransaction to update.
     */
    where: SampleTransactionWhereUniqueInput
  }

  /**
   * SampleTransaction updateMany
   */
  export type SampleTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SampleTransactions.
     */
    data: XOR<SampleTransactionUpdateManyMutationInput, SampleTransactionUncheckedUpdateManyInput>
    /**
     * Filter which SampleTransactions to update
     */
    where?: SampleTransactionWhereInput
    /**
     * Limit how many SampleTransactions to update.
     */
    limit?: number
  }

  /**
   * SampleTransaction updateManyAndReturn
   */
  export type SampleTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * The data used to update SampleTransactions.
     */
    data: XOR<SampleTransactionUpdateManyMutationInput, SampleTransactionUncheckedUpdateManyInput>
    /**
     * Filter which SampleTransactions to update
     */
    where?: SampleTransactionWhereInput
    /**
     * Limit how many SampleTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SampleTransaction upsert
   */
  export type SampleTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the SampleTransaction to update in case it exists.
     */
    where: SampleTransactionWhereUniqueInput
    /**
     * In case the SampleTransaction found by the `where` argument doesn't exist, create a new SampleTransaction with this data.
     */
    create: XOR<SampleTransactionCreateInput, SampleTransactionUncheckedCreateInput>
    /**
     * In case the SampleTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SampleTransactionUpdateInput, SampleTransactionUncheckedUpdateInput>
  }

  /**
   * SampleTransaction delete
   */
  export type SampleTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
    /**
     * Filter which SampleTransaction to delete.
     */
    where: SampleTransactionWhereUniqueInput
  }

  /**
   * SampleTransaction deleteMany
   */
  export type SampleTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleTransactions to delete
     */
    where?: SampleTransactionWhereInput
    /**
     * Limit how many SampleTransactions to delete.
     */
    limit?: number
  }

  /**
   * SampleTransaction.account
   */
  export type SampleTransaction$accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleAccount
     */
    select?: SampleAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleAccount
     */
    omit?: SampleAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleAccountInclude<ExtArgs> | null
    where?: SampleAccountWhereInput
  }

  /**
   * SampleTransaction without action
   */
  export type SampleTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleTransaction
     */
    select?: SampleTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleTransaction
     */
    omit?: SampleTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SampleTransactionInclude<ExtArgs> | null
  }


  /**
   * Model SampleDocument
   */

  export type AggregateSampleDocument = {
    _count: SampleDocumentCountAggregateOutputType | null
    _min: SampleDocumentMinAggregateOutputType | null
    _max: SampleDocumentMaxAggregateOutputType | null
  }

  export type SampleDocumentMinAggregateOutputType = {
    id: string | null
    pageContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SampleDocumentMaxAggregateOutputType = {
    id: string | null
    pageContent: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SampleDocumentCountAggregateOutputType = {
    id: number
    pageContent: number
    createdAt: number
    updatedAt: number
    embedding: number
    metadata: number
    _all: number
  }


  export type SampleDocumentMinAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SampleDocumentMaxAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SampleDocumentCountAggregateInputType = {
    id?: true
    pageContent?: true
    createdAt?: true
    updatedAt?: true
    embedding?: true
    metadata?: true
    _all?: true
  }

  export type SampleDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleDocument to aggregate.
     */
    where?: SampleDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleDocuments to fetch.
     */
    orderBy?: SampleDocumentOrderByWithRelationInput | SampleDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SampleDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SampleDocuments
    **/
    _count?: true | SampleDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SampleDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SampleDocumentMaxAggregateInputType
  }

  export type GetSampleDocumentAggregateType<T extends SampleDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateSampleDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSampleDocument[P]>
      : GetScalarType<T[P], AggregateSampleDocument[P]>
  }




  export type SampleDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SampleDocumentWhereInput
    orderBy?: SampleDocumentOrderByWithAggregationInput | SampleDocumentOrderByWithAggregationInput[]
    by: SampleDocumentScalarFieldEnum[] | SampleDocumentScalarFieldEnum
    having?: SampleDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SampleDocumentCountAggregateInputType | true
    _min?: SampleDocumentMinAggregateInputType
    _max?: SampleDocumentMaxAggregateInputType
  }

  export type SampleDocumentGroupByOutputType = {
    id: string
    pageContent: string
    createdAt: Date
    updatedAt: Date
    embedding: JsonValue
    metadata: JsonValue
    _count: SampleDocumentCountAggregateOutputType | null
    _min: SampleDocumentMinAggregateOutputType | null
    _max: SampleDocumentMaxAggregateOutputType | null
  }

  type GetSampleDocumentGroupByPayload<T extends SampleDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SampleDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SampleDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SampleDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], SampleDocumentGroupByOutputType[P]>
        }
      >
    >


  export type SampleDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["sampleDocument"]>

  export type SampleDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["sampleDocument"]>

  export type SampleDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }, ExtArgs["result"]["sampleDocument"]>

  export type SampleDocumentSelectScalar = {
    id?: boolean
    pageContent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    embedding?: boolean
    metadata?: boolean
  }

  export type SampleDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pageContent" | "createdAt" | "updatedAt" | "embedding" | "metadata", ExtArgs["result"]["sampleDocument"]>

  export type $SampleDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SampleDocument"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      pageContent: string
      createdAt: Date
      updatedAt: Date
      embedding: Prisma.JsonValue
      metadata: Prisma.JsonValue
    }, ExtArgs["result"]["sampleDocument"]>
    composites: {}
  }

  type SampleDocumentGetPayload<S extends boolean | null | undefined | SampleDocumentDefaultArgs> = $Result.GetResult<Prisma.$SampleDocumentPayload, S>

  type SampleDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SampleDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SampleDocumentCountAggregateInputType | true
    }

  export interface SampleDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SampleDocument'], meta: { name: 'SampleDocument' } }
    /**
     * Find zero or one SampleDocument that matches the filter.
     * @param {SampleDocumentFindUniqueArgs} args - Arguments to find a SampleDocument
     * @example
     * // Get one SampleDocument
     * const sampleDocument = await prisma.sampleDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SampleDocumentFindUniqueArgs>(args: SelectSubset<T, SampleDocumentFindUniqueArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SampleDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SampleDocumentFindUniqueOrThrowArgs} args - Arguments to find a SampleDocument
     * @example
     * // Get one SampleDocument
     * const sampleDocument = await prisma.sampleDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SampleDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, SampleDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentFindFirstArgs} args - Arguments to find a SampleDocument
     * @example
     * // Get one SampleDocument
     * const sampleDocument = await prisma.sampleDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SampleDocumentFindFirstArgs>(args?: SelectSubset<T, SampleDocumentFindFirstArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SampleDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentFindFirstOrThrowArgs} args - Arguments to find a SampleDocument
     * @example
     * // Get one SampleDocument
     * const sampleDocument = await prisma.sampleDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SampleDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, SampleDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SampleDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SampleDocuments
     * const sampleDocuments = await prisma.sampleDocument.findMany()
     * 
     * // Get first 10 SampleDocuments
     * const sampleDocuments = await prisma.sampleDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sampleDocumentWithIdOnly = await prisma.sampleDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SampleDocumentFindManyArgs>(args?: SelectSubset<T, SampleDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SampleDocument.
     * @param {SampleDocumentCreateArgs} args - Arguments to create a SampleDocument.
     * @example
     * // Create one SampleDocument
     * const SampleDocument = await prisma.sampleDocument.create({
     *   data: {
     *     // ... data to create a SampleDocument
     *   }
     * })
     * 
     */
    create<T extends SampleDocumentCreateArgs>(args: SelectSubset<T, SampleDocumentCreateArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SampleDocuments.
     * @param {SampleDocumentCreateManyArgs} args - Arguments to create many SampleDocuments.
     * @example
     * // Create many SampleDocuments
     * const sampleDocument = await prisma.sampleDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SampleDocumentCreateManyArgs>(args?: SelectSubset<T, SampleDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SampleDocuments and returns the data saved in the database.
     * @param {SampleDocumentCreateManyAndReturnArgs} args - Arguments to create many SampleDocuments.
     * @example
     * // Create many SampleDocuments
     * const sampleDocument = await prisma.sampleDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SampleDocuments and only return the `id`
     * const sampleDocumentWithIdOnly = await prisma.sampleDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SampleDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, SampleDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SampleDocument.
     * @param {SampleDocumentDeleteArgs} args - Arguments to delete one SampleDocument.
     * @example
     * // Delete one SampleDocument
     * const SampleDocument = await prisma.sampleDocument.delete({
     *   where: {
     *     // ... filter to delete one SampleDocument
     *   }
     * })
     * 
     */
    delete<T extends SampleDocumentDeleteArgs>(args: SelectSubset<T, SampleDocumentDeleteArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SampleDocument.
     * @param {SampleDocumentUpdateArgs} args - Arguments to update one SampleDocument.
     * @example
     * // Update one SampleDocument
     * const sampleDocument = await prisma.sampleDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SampleDocumentUpdateArgs>(args: SelectSubset<T, SampleDocumentUpdateArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SampleDocuments.
     * @param {SampleDocumentDeleteManyArgs} args - Arguments to filter SampleDocuments to delete.
     * @example
     * // Delete a few SampleDocuments
     * const { count } = await prisma.sampleDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SampleDocumentDeleteManyArgs>(args?: SelectSubset<T, SampleDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SampleDocuments
     * const sampleDocument = await prisma.sampleDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SampleDocumentUpdateManyArgs>(args: SelectSubset<T, SampleDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SampleDocuments and returns the data updated in the database.
     * @param {SampleDocumentUpdateManyAndReturnArgs} args - Arguments to update many SampleDocuments.
     * @example
     * // Update many SampleDocuments
     * const sampleDocument = await prisma.sampleDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SampleDocuments and only return the `id`
     * const sampleDocumentWithIdOnly = await prisma.sampleDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SampleDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, SampleDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SampleDocument.
     * @param {SampleDocumentUpsertArgs} args - Arguments to update or create a SampleDocument.
     * @example
     * // Update or create a SampleDocument
     * const sampleDocument = await prisma.sampleDocument.upsert({
     *   create: {
     *     // ... data to create a SampleDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SampleDocument we want to update
     *   }
     * })
     */
    upsert<T extends SampleDocumentUpsertArgs>(args: SelectSubset<T, SampleDocumentUpsertArgs<ExtArgs>>): Prisma__SampleDocumentClient<$Result.GetResult<Prisma.$SampleDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SampleDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentCountArgs} args - Arguments to filter SampleDocuments to count.
     * @example
     * // Count the number of SampleDocuments
     * const count = await prisma.sampleDocument.count({
     *   where: {
     *     // ... the filter for the SampleDocuments we want to count
     *   }
     * })
    **/
    count<T extends SampleDocumentCountArgs>(
      args?: Subset<T, SampleDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SampleDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SampleDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SampleDocumentAggregateArgs>(args: Subset<T, SampleDocumentAggregateArgs>): Prisma.PrismaPromise<GetSampleDocumentAggregateType<T>>

    /**
     * Group by SampleDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SampleDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SampleDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SampleDocumentGroupByArgs['orderBy'] }
        : { orderBy?: SampleDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SampleDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSampleDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SampleDocument model
   */
  readonly fields: SampleDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SampleDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SampleDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SampleDocument model
   */
  interface SampleDocumentFieldRefs {
    readonly id: FieldRef<"SampleDocument", 'String'>
    readonly pageContent: FieldRef<"SampleDocument", 'String'>
    readonly createdAt: FieldRef<"SampleDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"SampleDocument", 'DateTime'>
    readonly embedding: FieldRef<"SampleDocument", 'Json'>
    readonly metadata: FieldRef<"SampleDocument", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * SampleDocument findUnique
   */
  export type SampleDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter, which SampleDocument to fetch.
     */
    where: SampleDocumentWhereUniqueInput
  }

  /**
   * SampleDocument findUniqueOrThrow
   */
  export type SampleDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter, which SampleDocument to fetch.
     */
    where: SampleDocumentWhereUniqueInput
  }

  /**
   * SampleDocument findFirst
   */
  export type SampleDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter, which SampleDocument to fetch.
     */
    where?: SampleDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleDocuments to fetch.
     */
    orderBy?: SampleDocumentOrderByWithRelationInput | SampleDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleDocuments.
     */
    cursor?: SampleDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleDocuments.
     */
    distinct?: SampleDocumentScalarFieldEnum | SampleDocumentScalarFieldEnum[]
  }

  /**
   * SampleDocument findFirstOrThrow
   */
  export type SampleDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter, which SampleDocument to fetch.
     */
    where?: SampleDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleDocuments to fetch.
     */
    orderBy?: SampleDocumentOrderByWithRelationInput | SampleDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SampleDocuments.
     */
    cursor?: SampleDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SampleDocuments.
     */
    distinct?: SampleDocumentScalarFieldEnum | SampleDocumentScalarFieldEnum[]
  }

  /**
   * SampleDocument findMany
   */
  export type SampleDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter, which SampleDocuments to fetch.
     */
    where?: SampleDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SampleDocuments to fetch.
     */
    orderBy?: SampleDocumentOrderByWithRelationInput | SampleDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SampleDocuments.
     */
    cursor?: SampleDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SampleDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SampleDocuments.
     */
    skip?: number
    distinct?: SampleDocumentScalarFieldEnum | SampleDocumentScalarFieldEnum[]
  }

  /**
   * SampleDocument create
   */
  export type SampleDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * The data needed to create a SampleDocument.
     */
    data: XOR<SampleDocumentCreateInput, SampleDocumentUncheckedCreateInput>
  }

  /**
   * SampleDocument createMany
   */
  export type SampleDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SampleDocuments.
     */
    data: SampleDocumentCreateManyInput | SampleDocumentCreateManyInput[]
  }

  /**
   * SampleDocument createManyAndReturn
   */
  export type SampleDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many SampleDocuments.
     */
    data: SampleDocumentCreateManyInput | SampleDocumentCreateManyInput[]
  }

  /**
   * SampleDocument update
   */
  export type SampleDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * The data needed to update a SampleDocument.
     */
    data: XOR<SampleDocumentUpdateInput, SampleDocumentUncheckedUpdateInput>
    /**
     * Choose, which SampleDocument to update.
     */
    where: SampleDocumentWhereUniqueInput
  }

  /**
   * SampleDocument updateMany
   */
  export type SampleDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SampleDocuments.
     */
    data: XOR<SampleDocumentUpdateManyMutationInput, SampleDocumentUncheckedUpdateManyInput>
    /**
     * Filter which SampleDocuments to update
     */
    where?: SampleDocumentWhereInput
    /**
     * Limit how many SampleDocuments to update.
     */
    limit?: number
  }

  /**
   * SampleDocument updateManyAndReturn
   */
  export type SampleDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * The data used to update SampleDocuments.
     */
    data: XOR<SampleDocumentUpdateManyMutationInput, SampleDocumentUncheckedUpdateManyInput>
    /**
     * Filter which SampleDocuments to update
     */
    where?: SampleDocumentWhereInput
    /**
     * Limit how many SampleDocuments to update.
     */
    limit?: number
  }

  /**
   * SampleDocument upsert
   */
  export type SampleDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * The filter to search for the SampleDocument to update in case it exists.
     */
    where: SampleDocumentWhereUniqueInput
    /**
     * In case the SampleDocument found by the `where` argument doesn't exist, create a new SampleDocument with this data.
     */
    create: XOR<SampleDocumentCreateInput, SampleDocumentUncheckedCreateInput>
    /**
     * In case the SampleDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SampleDocumentUpdateInput, SampleDocumentUncheckedUpdateInput>
  }

  /**
   * SampleDocument delete
   */
  export type SampleDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
    /**
     * Filter which SampleDocument to delete.
     */
    where: SampleDocumentWhereUniqueInput
  }

  /**
   * SampleDocument deleteMany
   */
  export type SampleDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SampleDocuments to delete
     */
    where?: SampleDocumentWhereInput
    /**
     * Limit how many SampleDocuments to delete.
     */
    limit?: number
  }

  /**
   * SampleDocument without action
   */
  export type SampleDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SampleDocument
     */
    select?: SampleDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SampleDocument
     */
    omit?: SampleDocumentOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const StreamScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    userId: 'userId',
    role: 'role',
    parts: 'parts',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    attachments: 'attachments',
    vote: 'vote'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    isExternal: 'isExternal',
    externalConnectionId: 'externalConnectionId',
    externalConnectionName: 'externalConnectionName',
    balance: 'balance',
    currencyCode: 'currencyCode',
    currencyName: 'currencyName',
    currencySymbol: 'currencySymbol',
    currencyNumericCode: 'currencyNumericCode',
    displayName: 'displayName',
    name: 'name',
    number: 'number',
    openedDate: 'openedDate',
    closedDate: 'closedDate',
    routingNumber: 'routingNumber',
    type: 'type',
    subType: 'subType',
    status: 'status',
    balanceDue: 'balanceDue',
    currentPrincipal: 'currentPrincipal',
    dueDate: 'dueDate',
    interestRate: 'interestRate',
    lastPaymentDate: 'lastPaymentDate',
    nextPaymentDate: 'nextPaymentDate',
    originalPrincipal: 'originalPrincipal',
    paymentAmount: 'paymentAmount',
    paymentDate: 'paymentDate',
    term: 'term',
    cardNumber: 'cardNumber',
    creditLimit: 'creditLimit',
    minimumPaymentAmount: 'minimumPaymentAmount',
    statementBalance: 'statementBalance',
    availableBalance: 'availableBalance',
    dividendRate: 'dividendRate',
    interestYTD: 'interestYTD',
    cashBalance: 'cashBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    customerId: 'customerId',
    isExternal: 'isExternal',
    externalConnectionId: 'externalConnectionId',
    externalConnectionName: 'externalConnectionName',
    payee: 'payee',
    rawPayee: 'rawPayee',
    description: 'description',
    memo: 'memo',
    amount: 'amount',
    date: 'date',
    type: 'type',
    categoryId: 'categoryId',
    categoryName: 'categoryName',
    budgetCategoryId: 'budgetCategoryId',
    budgetCategory: 'budgetCategory',
    budgetSubcategory: 'budgetSubcategory',
    tags: 'tags',
    currencyCode: 'currencyCode',
    currencyName: 'currencyName',
    currencySymbol: 'currencySymbol',
    currencyNumericCode: 'currencyNumericCode',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    pageContent: 'pageContent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    embedding: 'embedding',
    metadata: 'metadata'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const SampleAccountScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    balance: 'balance',
    currencyCode: 'currencyCode',
    currencyName: 'currencyName',
    currencySymbol: 'currencySymbol',
    currencyNumericCode: 'currencyNumericCode',
    displayName: 'displayName',
    name: 'name',
    number: 'number',
    openedDate: 'openedDate',
    closedDate: 'closedDate',
    routingNumber: 'routingNumber',
    type: 'type',
    subType: 'subType',
    status: 'status',
    balanceDue: 'balanceDue',
    currentPrincipal: 'currentPrincipal',
    dueDate: 'dueDate',
    interestRate: 'interestRate',
    lastPaymentDate: 'lastPaymentDate',
    nextPaymentDate: 'nextPaymentDate',
    originalPrincipal: 'originalPrincipal',
    paymentAmount: 'paymentAmount',
    paymentDate: 'paymentDate',
    term: 'term',
    cardNumber: 'cardNumber',
    creditLimit: 'creditLimit',
    minimumPaymentAmount: 'minimumPaymentAmount',
    statementBalance: 'statementBalance',
    availableBalance: 'availableBalance',
    dividendRate: 'dividendRate',
    interestYTD: 'interestYTD',
    cashBalance: 'cashBalance',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SampleAccountScalarFieldEnum = (typeof SampleAccountScalarFieldEnum)[keyof typeof SampleAccountScalarFieldEnum]


  export const SampleTransactionScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    customerId: 'customerId',
    payee: 'payee',
    rawPayee: 'rawPayee',
    description: 'description',
    memo: 'memo',
    amount: 'amount',
    date: 'date',
    type: 'type',
    categoryId: 'categoryId',
    categoryName: 'categoryName',
    budgetCategoryId: 'budgetCategoryId',
    budgetCategory: 'budgetCategory',
    budgetSubcategory: 'budgetSubcategory',
    tags: 'tags',
    currencyCode: 'currencyCode',
    currencyName: 'currencyName',
    currencySymbol: 'currencySymbol',
    currencyNumericCode: 'currencyNumericCode',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SampleTransactionScalarFieldEnum = (typeof SampleTransactionScalarFieldEnum)[keyof typeof SampleTransactionScalarFieldEnum]


  export const SampleDocumentScalarFieldEnum: {
    id: 'id',
    pageContent: 'pageContent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    embedding: 'embedding',
    metadata: 'metadata'
  };

  export type SampleDocumentScalarFieldEnum = (typeof SampleDocumentScalarFieldEnum)[keyof typeof SampleDocumentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'VoteType'
   */
  export type EnumVoteTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'VoteType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'TransactionType'
   */
  export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>
    
  /**
   * Deep Input Types
   */


  export type ChatWhereInput = {
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    id?: StringFilter<"Chat"> | string
    userId?: StringFilter<"Chat"> | string
    title?: StringNullableFilter<"Chat"> | string | null
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    updatedAt?: DateTimeFilter<"Chat"> | Date | string
    messages?: MessageListRelationFilter
    streams?: StreamListRelationFilter
  }

  export type ChatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    streams?: StreamOrderByRelationAggregateInput
  }

  export type ChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    userId?: StringFilter<"Chat"> | string
    title?: StringNullableFilter<"Chat"> | string | null
    createdAt?: DateTimeFilter<"Chat"> | Date | string
    updatedAt?: DateTimeFilter<"Chat"> | Date | string
    messages?: MessageListRelationFilter
    streams?: StreamListRelationFilter
  }, "id">

  export type ChatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ChatCountOrderByAggregateInput
    _max?: ChatMaxOrderByAggregateInput
    _min?: ChatMinOrderByAggregateInput
  }

  export type ChatScalarWhereWithAggregatesInput = {
    AND?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    OR?: ChatScalarWhereWithAggregatesInput[]
    NOT?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chat"> | string
    userId?: StringWithAggregatesFilter<"Chat"> | string
    title?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
  }

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    chatId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    chatId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    chatId?: StringWithAggregatesFilter<"Stream"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    chatId?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attachments?: SortOrderInput | SortOrder
    vote?: SortOrderInput | SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    chatId?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attachments?: SortOrderInput | SortOrder
    vote?: SortOrderInput | SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    chatId?: StringWithAggregatesFilter<"Message"> | string
    userId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    parts?: JsonWithAggregatesFilter<"Message">
    metadata?: JsonNullableWithAggregatesFilter<"Message">
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    attachments?: JsonNullableWithAggregatesFilter<"Message">
    vote?: EnumVoteTypeNullableWithAggregatesFilter<"Message"> | $Enums.VoteType | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    customerId?: StringFilter<"Account"> | string
    isExternal?: BoolNullableFilter<"Account"> | boolean | null
    externalConnectionId?: StringNullableFilter<"Account"> | string | null
    externalConnectionName?: StringNullableFilter<"Account"> | string | null
    balance?: FloatFilter<"Account"> | number
    currencyCode?: StringNullableFilter<"Account"> | string | null
    currencyName?: StringNullableFilter<"Account"> | string | null
    currencySymbol?: StringNullableFilter<"Account"> | string | null
    currencyNumericCode?: FloatNullableFilter<"Account"> | number | null
    displayName?: StringNullableFilter<"Account"> | string | null
    name?: StringFilter<"Account"> | string
    number?: StringFilter<"Account"> | string
    openedDate?: DateTimeFilter<"Account"> | Date | string
    closedDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    routingNumber?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    subType?: StringNullableFilter<"Account"> | string | null
    status?: StringNullableFilter<"Account"> | string | null
    balanceDue?: FloatNullableFilter<"Account"> | number | null
    currentPrincipal?: FloatNullableFilter<"Account"> | number | null
    dueDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    interestRate?: FloatNullableFilter<"Account"> | number | null
    lastPaymentDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextPaymentDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    originalPrincipal?: FloatNullableFilter<"Account"> | number | null
    paymentAmount?: FloatNullableFilter<"Account"> | number | null
    paymentDate?: IntNullableFilter<"Account"> | number | null
    term?: IntNullableFilter<"Account"> | number | null
    cardNumber?: StringNullableFilter<"Account"> | string | null
    creditLimit?: FloatNullableFilter<"Account"> | number | null
    minimumPaymentAmount?: FloatNullableFilter<"Account"> | number | null
    statementBalance?: FloatNullableFilter<"Account"> | number | null
    availableBalance?: FloatNullableFilter<"Account"> | number | null
    dividendRate?: FloatNullableFilter<"Account"> | number | null
    interestYTD?: FloatNullableFilter<"Account"> | number | null
    cashBalance?: FloatNullableFilter<"Account"> | number | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    transactions?: TransactionListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrderInput | SortOrder
    externalConnectionId?: SortOrderInput | SortOrder
    externalConnectionName?: SortOrderInput | SortOrder
    balance?: SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrderInput | SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    balanceDue?: SortOrderInput | SortOrder
    currentPrincipal?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    lastPaymentDate?: SortOrderInput | SortOrder
    nextPaymentDate?: SortOrderInput | SortOrder
    originalPrincipal?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    minimumPaymentAmount?: SortOrderInput | SortOrder
    statementBalance?: SortOrderInput | SortOrder
    availableBalance?: SortOrderInput | SortOrder
    dividendRate?: SortOrderInput | SortOrder
    interestYTD?: SortOrderInput | SortOrder
    cashBalance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    customerId?: StringFilter<"Account"> | string
    isExternal?: BoolNullableFilter<"Account"> | boolean | null
    externalConnectionId?: StringNullableFilter<"Account"> | string | null
    externalConnectionName?: StringNullableFilter<"Account"> | string | null
    balance?: FloatFilter<"Account"> | number
    currencyCode?: StringNullableFilter<"Account"> | string | null
    currencyName?: StringNullableFilter<"Account"> | string | null
    currencySymbol?: StringNullableFilter<"Account"> | string | null
    currencyNumericCode?: FloatNullableFilter<"Account"> | number | null
    displayName?: StringNullableFilter<"Account"> | string | null
    name?: StringFilter<"Account"> | string
    number?: StringFilter<"Account"> | string
    openedDate?: DateTimeFilter<"Account"> | Date | string
    closedDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    routingNumber?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    subType?: StringNullableFilter<"Account"> | string | null
    status?: StringNullableFilter<"Account"> | string | null
    balanceDue?: FloatNullableFilter<"Account"> | number | null
    currentPrincipal?: FloatNullableFilter<"Account"> | number | null
    dueDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    interestRate?: FloatNullableFilter<"Account"> | number | null
    lastPaymentDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    nextPaymentDate?: DateTimeNullableFilter<"Account"> | Date | string | null
    originalPrincipal?: FloatNullableFilter<"Account"> | number | null
    paymentAmount?: FloatNullableFilter<"Account"> | number | null
    paymentDate?: IntNullableFilter<"Account"> | number | null
    term?: IntNullableFilter<"Account"> | number | null
    cardNumber?: StringNullableFilter<"Account"> | string | null
    creditLimit?: FloatNullableFilter<"Account"> | number | null
    minimumPaymentAmount?: FloatNullableFilter<"Account"> | number | null
    statementBalance?: FloatNullableFilter<"Account"> | number | null
    availableBalance?: FloatNullableFilter<"Account"> | number | null
    dividendRate?: FloatNullableFilter<"Account"> | number | null
    interestYTD?: FloatNullableFilter<"Account"> | number | null
    cashBalance?: FloatNullableFilter<"Account"> | number | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    transactions?: TransactionListRelationFilter
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrderInput | SortOrder
    externalConnectionId?: SortOrderInput | SortOrder
    externalConnectionName?: SortOrderInput | SortOrder
    balance?: SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrderInput | SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    balanceDue?: SortOrderInput | SortOrder
    currentPrincipal?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    lastPaymentDate?: SortOrderInput | SortOrder
    nextPaymentDate?: SortOrderInput | SortOrder
    originalPrincipal?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    minimumPaymentAmount?: SortOrderInput | SortOrder
    statementBalance?: SortOrderInput | SortOrder
    availableBalance?: SortOrderInput | SortOrder
    dividendRate?: SortOrderInput | SortOrder
    interestYTD?: SortOrderInput | SortOrder
    cashBalance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    customerId?: StringWithAggregatesFilter<"Account"> | string
    isExternal?: BoolNullableWithAggregatesFilter<"Account"> | boolean | null
    externalConnectionId?: StringNullableWithAggregatesFilter<"Account"> | string | null
    externalConnectionName?: StringNullableWithAggregatesFilter<"Account"> | string | null
    balance?: FloatWithAggregatesFilter<"Account"> | number
    currencyCode?: StringNullableWithAggregatesFilter<"Account"> | string | null
    currencyName?: StringNullableWithAggregatesFilter<"Account"> | string | null
    currencySymbol?: StringNullableWithAggregatesFilter<"Account"> | string | null
    currencyNumericCode?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    displayName?: StringNullableWithAggregatesFilter<"Account"> | string | null
    name?: StringWithAggregatesFilter<"Account"> | string
    number?: StringWithAggregatesFilter<"Account"> | string
    openedDate?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    closedDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    routingNumber?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    subType?: StringNullableWithAggregatesFilter<"Account"> | string | null
    status?: StringNullableWithAggregatesFilter<"Account"> | string | null
    balanceDue?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    currentPrincipal?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    interestRate?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    lastPaymentDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    nextPaymentDate?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    originalPrincipal?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    paymentAmount?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    paymentDate?: IntNullableWithAggregatesFilter<"Account"> | number | null
    term?: IntNullableWithAggregatesFilter<"Account"> | number | null
    cardNumber?: StringNullableWithAggregatesFilter<"Account"> | string | null
    creditLimit?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    minimumPaymentAmount?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    statementBalance?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    availableBalance?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    dividendRate?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    interestYTD?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    cashBalance?: FloatNullableWithAggregatesFilter<"Account"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    accountId?: StringFilter<"Transaction"> | string
    customerId?: StringFilter<"Transaction"> | string
    isExternal?: BoolNullableFilter<"Transaction"> | boolean | null
    externalConnectionId?: StringNullableFilter<"Transaction"> | string | null
    externalConnectionName?: StringNullableFilter<"Transaction"> | string | null
    payee?: StringFilter<"Transaction"> | string
    rawPayee?: StringFilter<"Transaction"> | string
    description?: StringFilter<"Transaction"> | string
    memo?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    date?: DateTimeFilter<"Transaction"> | Date | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    categoryName?: StringFilter<"Transaction"> | string
    budgetCategoryId?: StringNullableFilter<"Transaction"> | string | null
    budgetCategory?: StringNullableFilter<"Transaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"Transaction"> | string | null
    tags?: JsonNullableFilter<"Transaction">
    currencyCode?: StringNullableFilter<"Transaction"> | string | null
    currencyName?: StringNullableFilter<"Transaction"> | string | null
    currencySymbol?: StringNullableFilter<"Transaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrderInput | SortOrder
    externalConnectionId?: SortOrderInput | SortOrder
    externalConnectionName?: SortOrderInput | SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    budgetSubcategory?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    account?: AccountOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    accountId?: StringFilter<"Transaction"> | string
    customerId?: StringFilter<"Transaction"> | string
    isExternal?: BoolNullableFilter<"Transaction"> | boolean | null
    externalConnectionId?: StringNullableFilter<"Transaction"> | string | null
    externalConnectionName?: StringNullableFilter<"Transaction"> | string | null
    payee?: StringFilter<"Transaction"> | string
    rawPayee?: StringFilter<"Transaction"> | string
    description?: StringFilter<"Transaction"> | string
    memo?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    date?: DateTimeFilter<"Transaction"> | Date | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    categoryName?: StringFilter<"Transaction"> | string
    budgetCategoryId?: StringNullableFilter<"Transaction"> | string | null
    budgetCategory?: StringNullableFilter<"Transaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"Transaction"> | string | null
    tags?: JsonNullableFilter<"Transaction">
    currencyCode?: StringNullableFilter<"Transaction"> | string | null
    currencyName?: StringNullableFilter<"Transaction"> | string | null
    currencySymbol?: StringNullableFilter<"Transaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
    account?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrderInput | SortOrder
    externalConnectionId?: SortOrderInput | SortOrder
    externalConnectionName?: SortOrderInput | SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    budgetSubcategory?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    accountId?: StringWithAggregatesFilter<"Transaction"> | string
    customerId?: StringWithAggregatesFilter<"Transaction"> | string
    isExternal?: BoolNullableWithAggregatesFilter<"Transaction"> | boolean | null
    externalConnectionId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    externalConnectionName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    payee?: StringWithAggregatesFilter<"Transaction"> | string
    rawPayee?: StringWithAggregatesFilter<"Transaction"> | string
    description?: StringWithAggregatesFilter<"Transaction"> | string
    memo?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    amount?: FloatWithAggregatesFilter<"Transaction"> | number
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    type?: EnumTransactionTypeWithAggregatesFilter<"Transaction"> | $Enums.TransactionType
    categoryId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    categoryName?: StringWithAggregatesFilter<"Transaction"> | string
    budgetCategoryId?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    budgetCategory?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    budgetSubcategory?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    tags?: JsonNullableWithAggregatesFilter<"Transaction">
    currencyCode?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    currencyName?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    currencySymbol?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    currencyNumericCode?: FloatNullableWithAggregatesFilter<"Transaction"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    pageContent?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    embedding?: JsonFilter<"Document">
    metadata?: JsonFilter<"Document">
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    pageContent?: StringFilter<"Document"> | string
    createdAt?: DateTimeFilter<"Document"> | Date | string
    updatedAt?: DateTimeFilter<"Document"> | Date | string
    embedding?: JsonFilter<"Document">
    metadata?: JsonFilter<"Document">
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    pageContent?: StringWithAggregatesFilter<"Document"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
    embedding?: JsonWithAggregatesFilter<"Document">
    metadata?: JsonWithAggregatesFilter<"Document">
  }

  export type SampleAccountWhereInput = {
    AND?: SampleAccountWhereInput | SampleAccountWhereInput[]
    OR?: SampleAccountWhereInput[]
    NOT?: SampleAccountWhereInput | SampleAccountWhereInput[]
    id?: StringFilter<"SampleAccount"> | string
    customerId?: StringFilter<"SampleAccount"> | string
    balance?: FloatFilter<"SampleAccount"> | number
    currencyCode?: StringNullableFilter<"SampleAccount"> | string | null
    currencyName?: StringNullableFilter<"SampleAccount"> | string | null
    currencySymbol?: StringNullableFilter<"SampleAccount"> | string | null
    currencyNumericCode?: FloatNullableFilter<"SampleAccount"> | number | null
    displayName?: StringNullableFilter<"SampleAccount"> | string | null
    name?: StringFilter<"SampleAccount"> | string
    number?: StringFilter<"SampleAccount"> | string
    openedDate?: DateTimeFilter<"SampleAccount"> | Date | string
    closedDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    routingNumber?: StringFilter<"SampleAccount"> | string
    type?: StringFilter<"SampleAccount"> | string
    subType?: StringNullableFilter<"SampleAccount"> | string | null
    status?: StringNullableFilter<"SampleAccount"> | string | null
    balanceDue?: FloatNullableFilter<"SampleAccount"> | number | null
    currentPrincipal?: FloatNullableFilter<"SampleAccount"> | number | null
    dueDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    interestRate?: FloatNullableFilter<"SampleAccount"> | number | null
    lastPaymentDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    nextPaymentDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    originalPrincipal?: FloatNullableFilter<"SampleAccount"> | number | null
    paymentAmount?: FloatNullableFilter<"SampleAccount"> | number | null
    paymentDate?: IntNullableFilter<"SampleAccount"> | number | null
    term?: IntNullableFilter<"SampleAccount"> | number | null
    cardNumber?: StringNullableFilter<"SampleAccount"> | string | null
    creditLimit?: FloatNullableFilter<"SampleAccount"> | number | null
    minimumPaymentAmount?: FloatNullableFilter<"SampleAccount"> | number | null
    statementBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    availableBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    dividendRate?: FloatNullableFilter<"SampleAccount"> | number | null
    interestYTD?: FloatNullableFilter<"SampleAccount"> | number | null
    cashBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    createdAt?: DateTimeFilter<"SampleAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SampleAccount"> | Date | string
    transactions?: SampleTransactionListRelationFilter
  }

  export type SampleAccountOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrderInput | SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    balanceDue?: SortOrderInput | SortOrder
    currentPrincipal?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    lastPaymentDate?: SortOrderInput | SortOrder
    nextPaymentDate?: SortOrderInput | SortOrder
    originalPrincipal?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    minimumPaymentAmount?: SortOrderInput | SortOrder
    statementBalance?: SortOrderInput | SortOrder
    availableBalance?: SortOrderInput | SortOrder
    dividendRate?: SortOrderInput | SortOrder
    interestYTD?: SortOrderInput | SortOrder
    cashBalance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    transactions?: SampleTransactionOrderByRelationAggregateInput
  }

  export type SampleAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SampleAccountWhereInput | SampleAccountWhereInput[]
    OR?: SampleAccountWhereInput[]
    NOT?: SampleAccountWhereInput | SampleAccountWhereInput[]
    customerId?: StringFilter<"SampleAccount"> | string
    balance?: FloatFilter<"SampleAccount"> | number
    currencyCode?: StringNullableFilter<"SampleAccount"> | string | null
    currencyName?: StringNullableFilter<"SampleAccount"> | string | null
    currencySymbol?: StringNullableFilter<"SampleAccount"> | string | null
    currencyNumericCode?: FloatNullableFilter<"SampleAccount"> | number | null
    displayName?: StringNullableFilter<"SampleAccount"> | string | null
    name?: StringFilter<"SampleAccount"> | string
    number?: StringFilter<"SampleAccount"> | string
    openedDate?: DateTimeFilter<"SampleAccount"> | Date | string
    closedDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    routingNumber?: StringFilter<"SampleAccount"> | string
    type?: StringFilter<"SampleAccount"> | string
    subType?: StringNullableFilter<"SampleAccount"> | string | null
    status?: StringNullableFilter<"SampleAccount"> | string | null
    balanceDue?: FloatNullableFilter<"SampleAccount"> | number | null
    currentPrincipal?: FloatNullableFilter<"SampleAccount"> | number | null
    dueDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    interestRate?: FloatNullableFilter<"SampleAccount"> | number | null
    lastPaymentDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    nextPaymentDate?: DateTimeNullableFilter<"SampleAccount"> | Date | string | null
    originalPrincipal?: FloatNullableFilter<"SampleAccount"> | number | null
    paymentAmount?: FloatNullableFilter<"SampleAccount"> | number | null
    paymentDate?: IntNullableFilter<"SampleAccount"> | number | null
    term?: IntNullableFilter<"SampleAccount"> | number | null
    cardNumber?: StringNullableFilter<"SampleAccount"> | string | null
    creditLimit?: FloatNullableFilter<"SampleAccount"> | number | null
    minimumPaymentAmount?: FloatNullableFilter<"SampleAccount"> | number | null
    statementBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    availableBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    dividendRate?: FloatNullableFilter<"SampleAccount"> | number | null
    interestYTD?: FloatNullableFilter<"SampleAccount"> | number | null
    cashBalance?: FloatNullableFilter<"SampleAccount"> | number | null
    createdAt?: DateTimeFilter<"SampleAccount"> | Date | string
    updatedAt?: DateTimeFilter<"SampleAccount"> | Date | string
    transactions?: SampleTransactionListRelationFilter
  }, "id">

  export type SampleAccountOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    displayName?: SortOrderInput | SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrderInput | SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    balanceDue?: SortOrderInput | SortOrder
    currentPrincipal?: SortOrderInput | SortOrder
    dueDate?: SortOrderInput | SortOrder
    interestRate?: SortOrderInput | SortOrder
    lastPaymentDate?: SortOrderInput | SortOrder
    nextPaymentDate?: SortOrderInput | SortOrder
    originalPrincipal?: SortOrderInput | SortOrder
    paymentAmount?: SortOrderInput | SortOrder
    paymentDate?: SortOrderInput | SortOrder
    term?: SortOrderInput | SortOrder
    cardNumber?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    minimumPaymentAmount?: SortOrderInput | SortOrder
    statementBalance?: SortOrderInput | SortOrder
    availableBalance?: SortOrderInput | SortOrder
    dividendRate?: SortOrderInput | SortOrder
    interestYTD?: SortOrderInput | SortOrder
    cashBalance?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SampleAccountCountOrderByAggregateInput
    _avg?: SampleAccountAvgOrderByAggregateInput
    _max?: SampleAccountMaxOrderByAggregateInput
    _min?: SampleAccountMinOrderByAggregateInput
    _sum?: SampleAccountSumOrderByAggregateInput
  }

  export type SampleAccountScalarWhereWithAggregatesInput = {
    AND?: SampleAccountScalarWhereWithAggregatesInput | SampleAccountScalarWhereWithAggregatesInput[]
    OR?: SampleAccountScalarWhereWithAggregatesInput[]
    NOT?: SampleAccountScalarWhereWithAggregatesInput | SampleAccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SampleAccount"> | string
    customerId?: StringWithAggregatesFilter<"SampleAccount"> | string
    balance?: FloatWithAggregatesFilter<"SampleAccount"> | number
    currencyCode?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    currencyName?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    currencySymbol?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    currencyNumericCode?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    displayName?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    name?: StringWithAggregatesFilter<"SampleAccount"> | string
    number?: StringWithAggregatesFilter<"SampleAccount"> | string
    openedDate?: DateTimeWithAggregatesFilter<"SampleAccount"> | Date | string
    closedDate?: DateTimeNullableWithAggregatesFilter<"SampleAccount"> | Date | string | null
    routingNumber?: StringWithAggregatesFilter<"SampleAccount"> | string
    type?: StringWithAggregatesFilter<"SampleAccount"> | string
    subType?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    status?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    balanceDue?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    currentPrincipal?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    dueDate?: DateTimeNullableWithAggregatesFilter<"SampleAccount"> | Date | string | null
    interestRate?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    lastPaymentDate?: DateTimeNullableWithAggregatesFilter<"SampleAccount"> | Date | string | null
    nextPaymentDate?: DateTimeNullableWithAggregatesFilter<"SampleAccount"> | Date | string | null
    originalPrincipal?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    paymentAmount?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    paymentDate?: IntNullableWithAggregatesFilter<"SampleAccount"> | number | null
    term?: IntNullableWithAggregatesFilter<"SampleAccount"> | number | null
    cardNumber?: StringNullableWithAggregatesFilter<"SampleAccount"> | string | null
    creditLimit?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    minimumPaymentAmount?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    statementBalance?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    availableBalance?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    dividendRate?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    interestYTD?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    cashBalance?: FloatNullableWithAggregatesFilter<"SampleAccount"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SampleAccount"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SampleAccount"> | Date | string
  }

  export type SampleTransactionWhereInput = {
    AND?: SampleTransactionWhereInput | SampleTransactionWhereInput[]
    OR?: SampleTransactionWhereInput[]
    NOT?: SampleTransactionWhereInput | SampleTransactionWhereInput[]
    id?: StringFilter<"SampleTransaction"> | string
    accountId?: StringFilter<"SampleTransaction"> | string
    customerId?: StringFilter<"SampleTransaction"> | string
    payee?: StringFilter<"SampleTransaction"> | string
    rawPayee?: StringFilter<"SampleTransaction"> | string
    description?: StringFilter<"SampleTransaction"> | string
    memo?: StringNullableFilter<"SampleTransaction"> | string | null
    amount?: FloatFilter<"SampleTransaction"> | number
    date?: DateTimeFilter<"SampleTransaction"> | Date | string
    type?: EnumTransactionTypeFilter<"SampleTransaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    categoryName?: StringFilter<"SampleTransaction"> | string
    budgetCategoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetCategory?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"SampleTransaction"> | string | null
    tags?: JsonNullableFilter<"SampleTransaction">
    currencyCode?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyName?: StringNullableFilter<"SampleTransaction"> | string | null
    currencySymbol?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"SampleTransaction"> | number | null
    created_at?: DateTimeFilter<"SampleTransaction"> | Date | string
    updated_at?: DateTimeFilter<"SampleTransaction"> | Date | string
    account?: XOR<SampleAccountNullableScalarRelationFilter, SampleAccountWhereInput> | null
  }

  export type SampleTransactionOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    budgetSubcategory?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    account?: SampleAccountOrderByWithRelationInput
  }

  export type SampleTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SampleTransactionWhereInput | SampleTransactionWhereInput[]
    OR?: SampleTransactionWhereInput[]
    NOT?: SampleTransactionWhereInput | SampleTransactionWhereInput[]
    accountId?: StringFilter<"SampleTransaction"> | string
    customerId?: StringFilter<"SampleTransaction"> | string
    payee?: StringFilter<"SampleTransaction"> | string
    rawPayee?: StringFilter<"SampleTransaction"> | string
    description?: StringFilter<"SampleTransaction"> | string
    memo?: StringNullableFilter<"SampleTransaction"> | string | null
    amount?: FloatFilter<"SampleTransaction"> | number
    date?: DateTimeFilter<"SampleTransaction"> | Date | string
    type?: EnumTransactionTypeFilter<"SampleTransaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    categoryName?: StringFilter<"SampleTransaction"> | string
    budgetCategoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetCategory?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"SampleTransaction"> | string | null
    tags?: JsonNullableFilter<"SampleTransaction">
    currencyCode?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyName?: StringNullableFilter<"SampleTransaction"> | string | null
    currencySymbol?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"SampleTransaction"> | number | null
    created_at?: DateTimeFilter<"SampleTransaction"> | Date | string
    updated_at?: DateTimeFilter<"SampleTransaction"> | Date | string
    account?: XOR<SampleAccountNullableScalarRelationFilter, SampleAccountWhereInput> | null
  }, "id">

  export type SampleTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrderInput | SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrderInput | SortOrder
    budgetCategory?: SortOrderInput | SortOrder
    budgetSubcategory?: SortOrderInput | SortOrder
    tags?: SortOrderInput | SortOrder
    currencyCode?: SortOrderInput | SortOrder
    currencyName?: SortOrderInput | SortOrder
    currencySymbol?: SortOrderInput | SortOrder
    currencyNumericCode?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SampleTransactionCountOrderByAggregateInput
    _avg?: SampleTransactionAvgOrderByAggregateInput
    _max?: SampleTransactionMaxOrderByAggregateInput
    _min?: SampleTransactionMinOrderByAggregateInput
    _sum?: SampleTransactionSumOrderByAggregateInput
  }

  export type SampleTransactionScalarWhereWithAggregatesInput = {
    AND?: SampleTransactionScalarWhereWithAggregatesInput | SampleTransactionScalarWhereWithAggregatesInput[]
    OR?: SampleTransactionScalarWhereWithAggregatesInput[]
    NOT?: SampleTransactionScalarWhereWithAggregatesInput | SampleTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SampleTransaction"> | string
    accountId?: StringWithAggregatesFilter<"SampleTransaction"> | string
    customerId?: StringWithAggregatesFilter<"SampleTransaction"> | string
    payee?: StringWithAggregatesFilter<"SampleTransaction"> | string
    rawPayee?: StringWithAggregatesFilter<"SampleTransaction"> | string
    description?: StringWithAggregatesFilter<"SampleTransaction"> | string
    memo?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    amount?: FloatWithAggregatesFilter<"SampleTransaction"> | number
    date?: DateTimeWithAggregatesFilter<"SampleTransaction"> | Date | string
    type?: EnumTransactionTypeWithAggregatesFilter<"SampleTransaction"> | $Enums.TransactionType
    categoryId?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    categoryName?: StringWithAggregatesFilter<"SampleTransaction"> | string
    budgetCategoryId?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    budgetCategory?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    budgetSubcategory?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    tags?: JsonNullableWithAggregatesFilter<"SampleTransaction">
    currencyCode?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    currencyName?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    currencySymbol?: StringNullableWithAggregatesFilter<"SampleTransaction"> | string | null
    currencyNumericCode?: FloatNullableWithAggregatesFilter<"SampleTransaction"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"SampleTransaction"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SampleTransaction"> | Date | string
  }

  export type SampleDocumentWhereInput = {
    AND?: SampleDocumentWhereInput | SampleDocumentWhereInput[]
    OR?: SampleDocumentWhereInput[]
    NOT?: SampleDocumentWhereInput | SampleDocumentWhereInput[]
    id?: StringFilter<"SampleDocument"> | string
    pageContent?: StringFilter<"SampleDocument"> | string
    createdAt?: DateTimeFilter<"SampleDocument"> | Date | string
    updatedAt?: DateTimeFilter<"SampleDocument"> | Date | string
    embedding?: JsonFilter<"SampleDocument">
    metadata?: JsonFilter<"SampleDocument">
  }

  export type SampleDocumentOrderByWithRelationInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
  }

  export type SampleDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SampleDocumentWhereInput | SampleDocumentWhereInput[]
    OR?: SampleDocumentWhereInput[]
    NOT?: SampleDocumentWhereInput | SampleDocumentWhereInput[]
    pageContent?: StringFilter<"SampleDocument"> | string
    createdAt?: DateTimeFilter<"SampleDocument"> | Date | string
    updatedAt?: DateTimeFilter<"SampleDocument"> | Date | string
    embedding?: JsonFilter<"SampleDocument">
    metadata?: JsonFilter<"SampleDocument">
  }, "id">

  export type SampleDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
    _count?: SampleDocumentCountOrderByAggregateInput
    _max?: SampleDocumentMaxOrderByAggregateInput
    _min?: SampleDocumentMinOrderByAggregateInput
  }

  export type SampleDocumentScalarWhereWithAggregatesInput = {
    AND?: SampleDocumentScalarWhereWithAggregatesInput | SampleDocumentScalarWhereWithAggregatesInput[]
    OR?: SampleDocumentScalarWhereWithAggregatesInput[]
    NOT?: SampleDocumentScalarWhereWithAggregatesInput | SampleDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SampleDocument"> | string
    pageContent?: StringWithAggregatesFilter<"SampleDocument"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SampleDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SampleDocument"> | Date | string
    embedding?: JsonWithAggregatesFilter<"SampleDocument">
    metadata?: JsonWithAggregatesFilter<"SampleDocument">
  }

  export type ChatCreateInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutChatInput
    streams?: StreamCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutChatNestedInput
    streams?: StreamUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateManyInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    chat: ChatCreateNestedOneWithoutStreamsInput
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    chatId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutStreamsNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateManyInput = {
    id?: string
    chatId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
    chat: ChatCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    chatId: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
    chat?: ChatUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageCreateManyInput = {
    id?: string
    chatId: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type AccountCreateInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    account?: AccountCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    accountId: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: AccountUpdateOneWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    accountId: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentCreateInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentCreateManyInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SampleAccountCreateInput = {
    id?: string
    customerId: string
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: SampleTransactionCreateNestedManyWithoutAccountInput
  }

  export type SampleAccountUncheckedCreateInput = {
    id?: string
    customerId: string
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    transactions?: SampleTransactionUncheckedCreateNestedManyWithoutAccountInput
  }

  export type SampleAccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: SampleTransactionUpdateManyWithoutAccountNestedInput
  }

  export type SampleAccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: SampleTransactionUncheckedUpdateManyWithoutAccountNestedInput
  }

  export type SampleAccountCreateManyInput = {
    id?: string
    customerId: string
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SampleAccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleAccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionCreateInput = {
    id?: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    account?: SampleAccountCreateNestedOneWithoutTransactionsInput
  }

  export type SampleTransactionUncheckedCreateInput = {
    id?: string
    accountId: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SampleTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    account?: SampleAccountUpdateOneWithoutTransactionsNestedInput
  }

  export type SampleTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionCreateManyInput = {
    id?: string
    accountId: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SampleTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleDocumentCreateInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentUncheckedCreateInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentCreateManyInput = {
    id?: string
    pageContent: string
    createdAt?: Date | string
    updatedAt?: Date | string
    embedding: JsonNullValueInput | InputJsonValue
    metadata: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type SampleDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    pageContent?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    embedding?: JsonNullValueInput | InputJsonValue
    metadata?: JsonNullValueInput | InputJsonValue
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type StreamListRelationFilter = {
    every?: StreamWhereInput
    some?: StreamWhereInput
    none?: StreamWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StreamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ChatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ChatScalarRelationFilter = {
    is?: ChatWhereInput
    isNot?: ChatWhereInput
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumVoteTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteType | EnumVoteTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.VoteType[] | null
    notIn?: $Enums.VoteType[] | null
    not?: NestedEnumVoteTypeNullableFilter<$PrismaModel> | $Enums.VoteType | null
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attachments?: SortOrder
    vote?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vote?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vote?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumVoteTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteType | EnumVoteTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.VoteType[] | null
    notIn?: $Enums.VoteType[] | null
    not?: NestedEnumVoteTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.VoteType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVoteTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumVoteTypeNullableFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    balance?: SortOrder
    currencyNumericCode?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    interestRate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    balance?: SortOrder
    currencyNumericCode?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    interestRate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    tags?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    currencyNumericCode?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    isExternal?: SortOrder
    externalConnectionId?: SortOrder
    externalConnectionName?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    currencyNumericCode?: SortOrder
  }

  export type EnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SampleTransactionListRelationFilter = {
    every?: SampleTransactionWhereInput
    some?: SampleTransactionWhereInput
    none?: SampleTransactionWhereInput
  }

  export type SampleTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SampleAccountCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SampleAccountAvgOrderByAggregateInput = {
    balance?: SortOrder
    currencyNumericCode?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    interestRate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
  }

  export type SampleAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SampleAccountMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    balance?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    displayName?: SortOrder
    name?: SortOrder
    number?: SortOrder
    openedDate?: SortOrder
    closedDate?: SortOrder
    routingNumber?: SortOrder
    type?: SortOrder
    subType?: SortOrder
    status?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    dueDate?: SortOrder
    interestRate?: SortOrder
    lastPaymentDate?: SortOrder
    nextPaymentDate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    cardNumber?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SampleAccountSumOrderByAggregateInput = {
    balance?: SortOrder
    currencyNumericCode?: SortOrder
    balanceDue?: SortOrder
    currentPrincipal?: SortOrder
    interestRate?: SortOrder
    originalPrincipal?: SortOrder
    paymentAmount?: SortOrder
    paymentDate?: SortOrder
    term?: SortOrder
    creditLimit?: SortOrder
    minimumPaymentAmount?: SortOrder
    statementBalance?: SortOrder
    availableBalance?: SortOrder
    dividendRate?: SortOrder
    interestYTD?: SortOrder
    cashBalance?: SortOrder
  }

  export type SampleAccountNullableScalarRelationFilter = {
    is?: SampleAccountWhereInput | null
    isNot?: SampleAccountWhereInput | null
  }

  export type SampleTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    tags?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SampleTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
    currencyNumericCode?: SortOrder
  }

  export type SampleTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SampleTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    customerId?: SortOrder
    payee?: SortOrder
    rawPayee?: SortOrder
    description?: SortOrder
    memo?: SortOrder
    amount?: SortOrder
    date?: SortOrder
    type?: SortOrder
    categoryId?: SortOrder
    categoryName?: SortOrder
    budgetCategoryId?: SortOrder
    budgetCategory?: SortOrder
    budgetSubcategory?: SortOrder
    currencyCode?: SortOrder
    currencyName?: SortOrder
    currencySymbol?: SortOrder
    currencyNumericCode?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SampleTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
    currencyNumericCode?: SortOrder
  }

  export type SampleDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    embedding?: SortOrder
    metadata?: SortOrder
  }

  export type SampleDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SampleDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    pageContent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StreamCreateNestedManyWithoutChatInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput> | StreamCreateWithoutChatInput[] | StreamUncheckedCreateWithoutChatInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput | StreamCreateOrConnectWithoutChatInput[]
    createMany?: StreamCreateManyChatInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StreamUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput> | StreamCreateWithoutChatInput[] | StreamUncheckedCreateWithoutChatInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput | StreamCreateOrConnectWithoutChatInput[]
    createMany?: StreamCreateManyChatInputEnvelope
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MessageUpdateManyWithoutChatNestedInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChatInput | MessageUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChatInput | MessageUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChatInput | MessageUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type StreamUpdateManyWithoutChatNestedInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput> | StreamCreateWithoutChatInput[] | StreamUncheckedCreateWithoutChatInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput | StreamCreateOrConnectWithoutChatInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutChatInput | StreamUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: StreamCreateManyChatInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutChatInput | StreamUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutChatInput | StreamUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChatInput | MessageUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChatInput | MessageUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChatInput | MessageUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type StreamUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput> | StreamCreateWithoutChatInput[] | StreamUncheckedCreateWithoutChatInput[]
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput | StreamCreateOrConnectWithoutChatInput[]
    upsert?: StreamUpsertWithWhereUniqueWithoutChatInput | StreamUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: StreamCreateManyChatInputEnvelope
    set?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    disconnect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    delete?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    connect?: StreamWhereUniqueInput | StreamWhereUniqueInput[]
    update?: StreamUpdateWithWhereUniqueWithoutChatInput | StreamUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: StreamUpdateManyWithWhereWithoutChatInput | StreamUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: StreamScalarWhereInput | StreamScalarWhereInput[]
  }

  export type ChatCreateNestedOneWithoutStreamsInput = {
    create?: XOR<ChatCreateWithoutStreamsInput, ChatUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutStreamsInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutStreamsNestedInput = {
    create?: XOR<ChatCreateWithoutStreamsInput, ChatUncheckedCreateWithoutStreamsInput>
    connectOrCreate?: ChatCreateOrConnectWithoutStreamsInput
    upsert?: ChatUpsertWithoutStreamsInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutStreamsInput, ChatUpdateWithoutStreamsInput>, ChatUncheckedUpdateWithoutStreamsInput>
  }

  export type ChatCreateNestedOneWithoutMessagesInput = {
    create?: XOR<ChatCreateWithoutMessagesInput, ChatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatCreateOrConnectWithoutMessagesInput
    connect?: ChatWhereUniqueInput
  }

  export type NullableEnumVoteTypeFieldUpdateOperationsInput = {
    set?: $Enums.VoteType | null
  }

  export type ChatUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<ChatCreateWithoutMessagesInput, ChatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: ChatCreateOrConnectWithoutMessagesInput
    upsert?: ChatUpsertWithoutMessagesInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutMessagesInput, ChatUpdateWithoutMessagesInput>, ChatUncheckedUpdateWithoutMessagesInput>
  }

  export type TransactionCreateNestedManyWithoutAccountInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TransactionUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAccountInput | TransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAccountInput | TransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAccountInput | TransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput> | TransactionCreateWithoutAccountInput[] | TransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutAccountInput | TransactionCreateOrConnectWithoutAccountInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutAccountInput | TransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: TransactionCreateManyAccountInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutAccountInput | TransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutAccountInput | TransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsInput
    connect?: AccountWhereUniqueInput
  }

  export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType
  }

  export type AccountUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutTransactionsInput
    upsert?: AccountUpsertWithoutTransactionsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutTransactionsInput, AccountUpdateWithoutTransactionsInput>, AccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type SampleTransactionCreateNestedManyWithoutAccountInput = {
    create?: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput> | SampleTransactionCreateWithoutAccountInput[] | SampleTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SampleTransactionCreateOrConnectWithoutAccountInput | SampleTransactionCreateOrConnectWithoutAccountInput[]
    createMany?: SampleTransactionCreateManyAccountInputEnvelope
    connect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
  }

  export type SampleTransactionUncheckedCreateNestedManyWithoutAccountInput = {
    create?: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput> | SampleTransactionCreateWithoutAccountInput[] | SampleTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SampleTransactionCreateOrConnectWithoutAccountInput | SampleTransactionCreateOrConnectWithoutAccountInput[]
    createMany?: SampleTransactionCreateManyAccountInputEnvelope
    connect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
  }

  export type SampleTransactionUpdateManyWithoutAccountNestedInput = {
    create?: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput> | SampleTransactionCreateWithoutAccountInput[] | SampleTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SampleTransactionCreateOrConnectWithoutAccountInput | SampleTransactionCreateOrConnectWithoutAccountInput[]
    upsert?: SampleTransactionUpsertWithWhereUniqueWithoutAccountInput | SampleTransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: SampleTransactionCreateManyAccountInputEnvelope
    set?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    disconnect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    delete?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    connect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    update?: SampleTransactionUpdateWithWhereUniqueWithoutAccountInput | SampleTransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: SampleTransactionUpdateManyWithWhereWithoutAccountInput | SampleTransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: SampleTransactionScalarWhereInput | SampleTransactionScalarWhereInput[]
  }

  export type SampleTransactionUncheckedUpdateManyWithoutAccountNestedInput = {
    create?: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput> | SampleTransactionCreateWithoutAccountInput[] | SampleTransactionUncheckedCreateWithoutAccountInput[]
    connectOrCreate?: SampleTransactionCreateOrConnectWithoutAccountInput | SampleTransactionCreateOrConnectWithoutAccountInput[]
    upsert?: SampleTransactionUpsertWithWhereUniqueWithoutAccountInput | SampleTransactionUpsertWithWhereUniqueWithoutAccountInput[]
    createMany?: SampleTransactionCreateManyAccountInputEnvelope
    set?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    disconnect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    delete?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    connect?: SampleTransactionWhereUniqueInput | SampleTransactionWhereUniqueInput[]
    update?: SampleTransactionUpdateWithWhereUniqueWithoutAccountInput | SampleTransactionUpdateWithWhereUniqueWithoutAccountInput[]
    updateMany?: SampleTransactionUpdateManyWithWhereWithoutAccountInput | SampleTransactionUpdateManyWithWhereWithoutAccountInput[]
    deleteMany?: SampleTransactionScalarWhereInput | SampleTransactionScalarWhereInput[]
  }

  export type SampleAccountCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<SampleAccountCreateWithoutTransactionsInput, SampleAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SampleAccountCreateOrConnectWithoutTransactionsInput
    connect?: SampleAccountWhereUniqueInput
  }

  export type SampleAccountUpdateOneWithoutTransactionsNestedInput = {
    create?: XOR<SampleAccountCreateWithoutTransactionsInput, SampleAccountUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: SampleAccountCreateOrConnectWithoutTransactionsInput
    upsert?: SampleAccountUpsertWithoutTransactionsInput
    disconnect?: SampleAccountWhereInput | boolean
    delete?: SampleAccountWhereInput | boolean
    connect?: SampleAccountWhereUniqueInput
    update?: XOR<XOR<SampleAccountUpdateToOneWithWhereWithoutTransactionsInput, SampleAccountUpdateWithoutTransactionsInput>, SampleAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumVoteTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteType | EnumVoteTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.VoteType[] | null
    notIn?: $Enums.VoteType[] | null
    not?: NestedEnumVoteTypeNullableFilter<$PrismaModel> | $Enums.VoteType | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumVoteTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoteType | EnumVoteTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.VoteType[] | null
    notIn?: $Enums.VoteType[] | null
    not?: NestedEnumVoteTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.VoteType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumVoteTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumVoteTypeNullableFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumTransactionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeFilter<$PrismaModel> | $Enums.TransactionType
  }

  export type NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TransactionType | EnumTransactionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TransactionType[]
    notIn?: $Enums.TransactionType[]
    not?: NestedEnumTransactionTypeWithAggregatesFilter<$PrismaModel> | $Enums.TransactionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTransactionTypeFilter<$PrismaModel>
    _max?: NestedEnumTransactionTypeFilter<$PrismaModel>
  }

  export type MessageCreateWithoutChatInput = {
    id?: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUncheckedCreateWithoutChatInput = {
    id?: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageCreateOrConnectWithoutChatInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput>
  }

  export type MessageCreateManyChatInputEnvelope = {
    data: MessageCreateManyChatInput | MessageCreateManyChatInput[]
  }

  export type StreamCreateWithoutChatInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamUncheckedCreateWithoutChatInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StreamCreateOrConnectWithoutChatInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
  }

  export type StreamCreateManyChatInputEnvelope = {
    data: StreamCreateManyChatInput | StreamCreateManyChatInput[]
  }

  export type MessageUpsertWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutChatInput, MessageUncheckedUpdateWithoutChatInput>
    create: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutChatInput, MessageUncheckedUpdateWithoutChatInput>
  }

  export type MessageUpdateManyWithWhereWithoutChatInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutChatInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    chatId?: StringFilter<"Message"> | string
    userId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
  }

  export type StreamUpsertWithWhereUniqueWithoutChatInput = {
    where: StreamWhereUniqueInput
    update: XOR<StreamUpdateWithoutChatInput, StreamUncheckedUpdateWithoutChatInput>
    create: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
  }

  export type StreamUpdateWithWhereUniqueWithoutChatInput = {
    where: StreamWhereUniqueInput
    data: XOR<StreamUpdateWithoutChatInput, StreamUncheckedUpdateWithoutChatInput>
  }

  export type StreamUpdateManyWithWhereWithoutChatInput = {
    where: StreamScalarWhereInput
    data: XOR<StreamUpdateManyMutationInput, StreamUncheckedUpdateManyWithoutChatInput>
  }

  export type StreamScalarWhereInput = {
    AND?: StreamScalarWhereInput | StreamScalarWhereInput[]
    OR?: StreamScalarWhereInput[]
    NOT?: StreamScalarWhereInput | StreamScalarWhereInput[]
    id?: StringFilter<"Stream"> | string
    chatId?: StringFilter<"Stream"> | string
    createdAt?: DateTimeFilter<"Stream"> | Date | string
    updatedAt?: DateTimeFilter<"Stream"> | Date | string
  }

  export type ChatCreateWithoutStreamsInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutStreamsInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutStreamsInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutStreamsInput, ChatUncheckedCreateWithoutStreamsInput>
  }

  export type ChatUpsertWithoutStreamsInput = {
    update: XOR<ChatUpdateWithoutStreamsInput, ChatUncheckedUpdateWithoutStreamsInput>
    create: XOR<ChatCreateWithoutStreamsInput, ChatUncheckedCreateWithoutStreamsInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutStreamsInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutStreamsInput, ChatUncheckedUpdateWithoutStreamsInput>
  }

  export type ChatUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutStreamsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type ChatCreateWithoutMessagesInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId: string
    title?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    streams?: StreamUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutMessagesInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutMessagesInput, ChatUncheckedCreateWithoutMessagesInput>
  }

  export type ChatUpsertWithoutMessagesInput = {
    update: XOR<ChatUpdateWithoutMessagesInput, ChatUncheckedUpdateWithoutMessagesInput>
    create: XOR<ChatCreateWithoutMessagesInput, ChatUncheckedCreateWithoutMessagesInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutMessagesInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutMessagesInput, ChatUncheckedUpdateWithoutMessagesInput>
  }

  export type ChatUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streams?: StreamUncheckedUpdateManyWithoutChatNestedInput
  }

  export type TransactionCreateWithoutAccountInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionUncheckedCreateWithoutAccountInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionCreateOrConnectWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput>
  }

  export type TransactionCreateManyAccountInputEnvelope = {
    data: TransactionCreateManyAccountInput | TransactionCreateManyAccountInput[]
  }

  export type TransactionUpsertWithWhereUniqueWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutAccountInput, TransactionUncheckedUpdateWithoutAccountInput>
    create: XOR<TransactionCreateWithoutAccountInput, TransactionUncheckedCreateWithoutAccountInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutAccountInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutAccountInput, TransactionUncheckedUpdateWithoutAccountInput>
  }

  export type TransactionUpdateManyWithWhereWithoutAccountInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutAccountInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    accountId?: StringFilter<"Transaction"> | string
    customerId?: StringFilter<"Transaction"> | string
    isExternal?: BoolNullableFilter<"Transaction"> | boolean | null
    externalConnectionId?: StringNullableFilter<"Transaction"> | string | null
    externalConnectionName?: StringNullableFilter<"Transaction"> | string | null
    payee?: StringFilter<"Transaction"> | string
    rawPayee?: StringFilter<"Transaction"> | string
    description?: StringFilter<"Transaction"> | string
    memo?: StringNullableFilter<"Transaction"> | string | null
    amount?: FloatFilter<"Transaction"> | number
    date?: DateTimeFilter<"Transaction"> | Date | string
    type?: EnumTransactionTypeFilter<"Transaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"Transaction"> | string | null
    categoryName?: StringFilter<"Transaction"> | string
    budgetCategoryId?: StringNullableFilter<"Transaction"> | string | null
    budgetCategory?: StringNullableFilter<"Transaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"Transaction"> | string | null
    tags?: JsonNullableFilter<"Transaction">
    currencyCode?: StringNullableFilter<"Transaction"> | string | null
    currencyName?: StringNullableFilter<"Transaction"> | string | null
    currencySymbol?: StringNullableFilter<"Transaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"Transaction"> | number | null
    created_at?: DateTimeFilter<"Transaction"> | Date | string
    updated_at?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type AccountCreateWithoutTransactionsInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutTransactionsInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutTransactionsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
  }

  export type AccountUpsertWithoutTransactionsInput = {
    update: XOR<AccountUpdateWithoutTransactionsInput, AccountUncheckedUpdateWithoutTransactionsInput>
    create: XOR<AccountCreateWithoutTransactionsInput, AccountUncheckedCreateWithoutTransactionsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutTransactionsInput, AccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type AccountUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionCreateWithoutAccountInput = {
    id?: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SampleTransactionUncheckedCreateWithoutAccountInput = {
    id?: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SampleTransactionCreateOrConnectWithoutAccountInput = {
    where: SampleTransactionWhereUniqueInput
    create: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput>
  }

  export type SampleTransactionCreateManyAccountInputEnvelope = {
    data: SampleTransactionCreateManyAccountInput | SampleTransactionCreateManyAccountInput[]
  }

  export type SampleTransactionUpsertWithWhereUniqueWithoutAccountInput = {
    where: SampleTransactionWhereUniqueInput
    update: XOR<SampleTransactionUpdateWithoutAccountInput, SampleTransactionUncheckedUpdateWithoutAccountInput>
    create: XOR<SampleTransactionCreateWithoutAccountInput, SampleTransactionUncheckedCreateWithoutAccountInput>
  }

  export type SampleTransactionUpdateWithWhereUniqueWithoutAccountInput = {
    where: SampleTransactionWhereUniqueInput
    data: XOR<SampleTransactionUpdateWithoutAccountInput, SampleTransactionUncheckedUpdateWithoutAccountInput>
  }

  export type SampleTransactionUpdateManyWithWhereWithoutAccountInput = {
    where: SampleTransactionScalarWhereInput
    data: XOR<SampleTransactionUpdateManyMutationInput, SampleTransactionUncheckedUpdateManyWithoutAccountInput>
  }

  export type SampleTransactionScalarWhereInput = {
    AND?: SampleTransactionScalarWhereInput | SampleTransactionScalarWhereInput[]
    OR?: SampleTransactionScalarWhereInput[]
    NOT?: SampleTransactionScalarWhereInput | SampleTransactionScalarWhereInput[]
    id?: StringFilter<"SampleTransaction"> | string
    accountId?: StringFilter<"SampleTransaction"> | string
    customerId?: StringFilter<"SampleTransaction"> | string
    payee?: StringFilter<"SampleTransaction"> | string
    rawPayee?: StringFilter<"SampleTransaction"> | string
    description?: StringFilter<"SampleTransaction"> | string
    memo?: StringNullableFilter<"SampleTransaction"> | string | null
    amount?: FloatFilter<"SampleTransaction"> | number
    date?: DateTimeFilter<"SampleTransaction"> | Date | string
    type?: EnumTransactionTypeFilter<"SampleTransaction"> | $Enums.TransactionType
    categoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    categoryName?: StringFilter<"SampleTransaction"> | string
    budgetCategoryId?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetCategory?: StringNullableFilter<"SampleTransaction"> | string | null
    budgetSubcategory?: StringNullableFilter<"SampleTransaction"> | string | null
    tags?: JsonNullableFilter<"SampleTransaction">
    currencyCode?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyName?: StringNullableFilter<"SampleTransaction"> | string | null
    currencySymbol?: StringNullableFilter<"SampleTransaction"> | string | null
    currencyNumericCode?: FloatNullableFilter<"SampleTransaction"> | number | null
    created_at?: DateTimeFilter<"SampleTransaction"> | Date | string
    updated_at?: DateTimeFilter<"SampleTransaction"> | Date | string
  }

  export type SampleAccountCreateWithoutTransactionsInput = {
    id?: string
    customerId: string
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SampleAccountUncheckedCreateWithoutTransactionsInput = {
    id?: string
    customerId: string
    balance: number
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    displayName?: string | null
    name: string
    number: string
    openedDate: Date | string
    closedDate?: Date | string | null
    routingNumber: string
    type: string
    subType?: string | null
    status?: string | null
    balanceDue?: number | null
    currentPrincipal?: number | null
    dueDate?: Date | string | null
    interestRate?: number | null
    lastPaymentDate?: Date | string | null
    nextPaymentDate?: Date | string | null
    originalPrincipal?: number | null
    paymentAmount?: number | null
    paymentDate?: number | null
    term?: number | null
    cardNumber?: string | null
    creditLimit?: number | null
    minimumPaymentAmount?: number | null
    statementBalance?: number | null
    availableBalance?: number | null
    dividendRate?: number | null
    interestYTD?: number | null
    cashBalance?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SampleAccountCreateOrConnectWithoutTransactionsInput = {
    where: SampleAccountWhereUniqueInput
    create: XOR<SampleAccountCreateWithoutTransactionsInput, SampleAccountUncheckedCreateWithoutTransactionsInput>
  }

  export type SampleAccountUpsertWithoutTransactionsInput = {
    update: XOR<SampleAccountUpdateWithoutTransactionsInput, SampleAccountUncheckedUpdateWithoutTransactionsInput>
    create: XOR<SampleAccountCreateWithoutTransactionsInput, SampleAccountUncheckedCreateWithoutTransactionsInput>
    where?: SampleAccountWhereInput
  }

  export type SampleAccountUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: SampleAccountWhereInput
    data: XOR<SampleAccountUpdateWithoutTransactionsInput, SampleAccountUncheckedUpdateWithoutTransactionsInput>
  }

  export type SampleAccountUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleAccountUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    balance?: FloatFieldUpdateOperationsInput | number
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    displayName?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    number?: StringFieldUpdateOperationsInput | string
    openedDate?: DateTimeFieldUpdateOperationsInput | Date | string
    closedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    routingNumber?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subType?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    balanceDue?: NullableFloatFieldUpdateOperationsInput | number | null
    currentPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    dueDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    interestRate?: NullableFloatFieldUpdateOperationsInput | number | null
    lastPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextPaymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    originalPrincipal?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    paymentDate?: NullableIntFieldUpdateOperationsInput | number | null
    term?: NullableIntFieldUpdateOperationsInput | number | null
    cardNumber?: NullableStringFieldUpdateOperationsInput | string | null
    creditLimit?: NullableFloatFieldUpdateOperationsInput | number | null
    minimumPaymentAmount?: NullableFloatFieldUpdateOperationsInput | number | null
    statementBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    availableBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    dividendRate?: NullableFloatFieldUpdateOperationsInput | number | null
    interestYTD?: NullableFloatFieldUpdateOperationsInput | number | null
    cashBalance?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyChatInput = {
    id?: string
    userId: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type StreamCreateManyChatInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type StreamUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyAccountInput = {
    id?: string
    customerId: string
    isExternal?: boolean | null
    externalConnectionId?: string | null
    externalConnectionName?: string | null
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type TransactionUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    isExternal?: NullableBoolFieldUpdateOperationsInput | boolean | null
    externalConnectionId?: NullableStringFieldUpdateOperationsInput | string | null
    externalConnectionName?: NullableStringFieldUpdateOperationsInput | string | null
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionCreateManyAccountInput = {
    id?: string
    customerId: string
    payee: string
    rawPayee: string
    description: string
    memo?: string | null
    amount: number
    date: Date | string
    type: $Enums.TransactionType
    categoryId?: string | null
    categoryName: string
    budgetCategoryId?: string | null
    budgetCategory?: string | null
    budgetSubcategory?: string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: string | null
    currencyName?: string | null
    currencySymbol?: string | null
    currencyNumericCode?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SampleTransactionUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionUncheckedUpdateWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SampleTransactionUncheckedUpdateManyWithoutAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    payee?: StringFieldUpdateOperationsInput | string
    rawPayee?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    memo?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: FloatFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryName?: StringFieldUpdateOperationsInput | string
    budgetCategoryId?: NullableStringFieldUpdateOperationsInput | string | null
    budgetCategory?: NullableStringFieldUpdateOperationsInput | string | null
    budgetSubcategory?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: NullableJsonNullValueInput | InputJsonValue
    currencyCode?: NullableStringFieldUpdateOperationsInput | string | null
    currencyName?: NullableStringFieldUpdateOperationsInput | string | null
    currencySymbol?: NullableStringFieldUpdateOperationsInput | string | null
    currencyNumericCode?: NullableFloatFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}