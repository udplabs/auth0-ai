
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
 * Model AttachmentDocument
 * 
 */
export type AttachmentDocument = $Result.DefaultSelection<Prisma.$AttachmentDocumentPayload>
/**
 * Model Stream
 * 
 */
export type Stream = $Result.DefaultSelection<Prisma.$StreamPayload>
/**
 * Model Suggestion
 * 
 */
export type Suggestion = $Result.DefaultSelection<Prisma.$SuggestionPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ChatVisibility: {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC'
};

export type ChatVisibility = (typeof ChatVisibility)[keyof typeof ChatVisibility]


export const DocumentKind: {
  TEXT: 'TEXT',
  CODE: 'CODE',
  IMAGE: 'IMAGE',
  SHEET: 'SHEET'
};

export type DocumentKind = (typeof DocumentKind)[keyof typeof DocumentKind]


export const VoteType: {
  UP: 'UP',
  DOWN: 'DOWN'
};

export type VoteType = (typeof VoteType)[keyof typeof VoteType]

}

export type ChatVisibility = $Enums.ChatVisibility

export const ChatVisibility: typeof $Enums.ChatVisibility

export type DocumentKind = $Enums.DocumentKind

export const DocumentKind: typeof $Enums.DocumentKind

export type VoteType = $Enums.VoteType

export const VoteType: typeof $Enums.VoteType

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
   * `prisma.attachmentDocument`: Exposes CRUD operations for the **AttachmentDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AttachmentDocuments
    * const attachmentDocuments = await prisma.attachmentDocument.findMany()
    * ```
    */
  get attachmentDocument(): Prisma.AttachmentDocumentDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.suggestion`: Exposes CRUD operations for the **Suggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suggestions
    * const suggestions = await prisma.suggestion.findMany()
    * ```
    */
  get suggestion(): Prisma.SuggestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;
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
    AttachmentDocument: 'AttachmentDocument',
    Stream: 'Stream',
    Suggestion: 'Suggestion',
    Message: 'Message'
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
      modelProps: "chat" | "attachmentDocument" | "stream" | "suggestion" | "message"
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
      AttachmentDocument: {
        payload: Prisma.$AttachmentDocumentPayload<ExtArgs>
        fields: Prisma.AttachmentDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AttachmentDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AttachmentDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          findFirst: {
            args: Prisma.AttachmentDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AttachmentDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          findMany: {
            args: Prisma.AttachmentDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>[]
          }
          create: {
            args: Prisma.AttachmentDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          createMany: {
            args: Prisma.AttachmentDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AttachmentDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>[]
          }
          delete: {
            args: Prisma.AttachmentDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          update: {
            args: Prisma.AttachmentDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          deleteMany: {
            args: Prisma.AttachmentDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AttachmentDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AttachmentDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>[]
          }
          upsert: {
            args: Prisma.AttachmentDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AttachmentDocumentPayload>
          }
          aggregate: {
            args: Prisma.AttachmentDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAttachmentDocument>
          }
          groupBy: {
            args: Prisma.AttachmentDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AttachmentDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AttachmentDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<AttachmentDocumentCountAggregateOutputType> | number
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
      Suggestion: {
        payload: Prisma.$SuggestionPayload<ExtArgs>
        fields: Prisma.SuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findFirst: {
            args: Prisma.SuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findMany: {
            args: Prisma.SuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          create: {
            args: Prisma.SuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          createMany: {
            args: Prisma.SuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          delete: {
            args: Prisma.SuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          update: {
            args: Prisma.SuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          deleteMany: {
            args: Prisma.SuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SuggestionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          upsert: {
            args: Prisma.SuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          aggregate: {
            args: Prisma.SuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuggestion>
          }
          groupBy: {
            args: Prisma.SuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<SuggestionCountAggregateOutputType> | number
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
    attachmentDocument?: AttachmentDocumentOmit
    stream?: StreamOmit
    suggestion?: SuggestionOmit
    message?: MessageOmit
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
  }

  export type ChatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | ChatCountOutputTypeCountMessagesArgs
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
   * Count Type AttachmentDocumentCountOutputType
   */

  export type AttachmentDocumentCountOutputType = {
    suggestions: number
  }

  export type AttachmentDocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suggestions?: boolean | AttachmentDocumentCountOutputTypeCountSuggestionsArgs
  }

  // Custom InputTypes
  /**
   * AttachmentDocumentCountOutputType without action
   */
  export type AttachmentDocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocumentCountOutputType
     */
    select?: AttachmentDocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AttachmentDocumentCountOutputType without action
   */
  export type AttachmentDocumentCountOutputTypeCountSuggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Chat
   */

  export type AggregateChat = {
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
    _min: ChatMinAggregateOutputType | null
    _max: ChatMaxAggregateOutputType | null
  }

  export type ChatAvgAggregateOutputType = {
    message_count: number | null
  }

  export type ChatSumAggregateOutputType = {
    message_count: number | null
  }

  export type ChatMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    visibility: $Enums.ChatVisibility | null
    created_at: Date | null
    updated_at: Date | null
    message_count: number | null
  }

  export type ChatMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    visibility: $Enums.ChatVisibility | null
    created_at: Date | null
    updated_at: Date | null
    message_count: number | null
  }

  export type ChatCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    visibility: number
    created_at: number
    updated_at: number
    message_count: number
    _all: number
  }


  export type ChatAvgAggregateInputType = {
    message_count?: true
  }

  export type ChatSumAggregateInputType = {
    message_count?: true
  }

  export type ChatMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    visibility?: true
    created_at?: true
    updated_at?: true
    message_count?: true
  }

  export type ChatMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    visibility?: true
    created_at?: true
    updated_at?: true
    message_count?: true
  }

  export type ChatCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    visibility?: true
    created_at?: true
    updated_at?: true
    message_count?: true
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
     * Select which fields to average
    **/
    _avg?: ChatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChatSumAggregateInputType
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
    _avg?: ChatAvgAggregateInputType
    _sum?: ChatSumAggregateInputType
    _min?: ChatMinAggregateInputType
    _max?: ChatMaxAggregateInputType
  }

  export type ChatGroupByOutputType = {
    id: string
    user_id: string
    title: string | null
    visibility: $Enums.ChatVisibility
    created_at: Date
    updated_at: Date
    message_count: number
    _count: ChatCountAggregateOutputType | null
    _avg: ChatAvgAggregateOutputType | null
    _sum: ChatSumAggregateOutputType | null
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
    user_id?: boolean
    title?: boolean
    visibility?: boolean
    created_at?: boolean
    updated_at?: boolean
    message_count?: boolean
    messages?: boolean | Chat$messagesArgs<ExtArgs>
    stream?: boolean | Chat$streamArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    visibility?: boolean
    created_at?: boolean
    updated_at?: boolean
    message_count?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    visibility?: boolean
    created_at?: boolean
    updated_at?: boolean
    message_count?: boolean
  }, ExtArgs["result"]["chat"]>

  export type ChatSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    visibility?: boolean
    created_at?: boolean
    updated_at?: boolean
    message_count?: boolean
  }

  export type ChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "visibility" | "created_at" | "updated_at" | "message_count", ExtArgs["result"]["chat"]>
  export type ChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | Chat$messagesArgs<ExtArgs>
    stream?: boolean | Chat$streamArgs<ExtArgs>
    _count?: boolean | ChatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ChatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ChatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Chat"
    objects: {
      messages: Prisma.$MessagePayload<ExtArgs>[]
      stream: Prisma.$StreamPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string | null
      visibility: $Enums.ChatVisibility
      created_at: Date
      updated_at: Date
      message_count: number
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
    stream<T extends Chat$streamArgs<ExtArgs> = {}>(args?: Subset<T, Chat$streamArgs<ExtArgs>>): Prisma__StreamClient<$Result.GetResult<Prisma.$StreamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly user_id: FieldRef<"Chat", 'String'>
    readonly title: FieldRef<"Chat", 'String'>
    readonly visibility: FieldRef<"Chat", 'ChatVisibility'>
    readonly created_at: FieldRef<"Chat", 'DateTime'>
    readonly updated_at: FieldRef<"Chat", 'DateTime'>
    readonly message_count: FieldRef<"Chat", 'Int'>
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
   * Chat.stream
   */
  export type Chat$streamArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
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
   * Model AttachmentDocument
   */

  export type AggregateAttachmentDocument = {
    _count: AttachmentDocumentCountAggregateOutputType | null
    _min: AttachmentDocumentMinAggregateOutputType | null
    _max: AttachmentDocumentMaxAggregateOutputType | null
  }

  export type AttachmentDocumentMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    kind: $Enums.DocumentKind | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttachmentDocumentMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    title: string | null
    content: string | null
    kind: $Enums.DocumentKind | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type AttachmentDocumentCountAggregateOutputType = {
    id: number
    user_id: number
    title: number
    content: number
    kind: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type AttachmentDocumentMinAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    kind?: true
    created_at?: true
    updated_at?: true
  }

  export type AttachmentDocumentMaxAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    kind?: true
    created_at?: true
    updated_at?: true
  }

  export type AttachmentDocumentCountAggregateInputType = {
    id?: true
    user_id?: true
    title?: true
    content?: true
    kind?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type AttachmentDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttachmentDocument to aggregate.
     */
    where?: AttachmentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttachmentDocuments to fetch.
     */
    orderBy?: AttachmentDocumentOrderByWithRelationInput | AttachmentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AttachmentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttachmentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttachmentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AttachmentDocuments
    **/
    _count?: true | AttachmentDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AttachmentDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AttachmentDocumentMaxAggregateInputType
  }

  export type GetAttachmentDocumentAggregateType<T extends AttachmentDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateAttachmentDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAttachmentDocument[P]>
      : GetScalarType<T[P], AggregateAttachmentDocument[P]>
  }




  export type AttachmentDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AttachmentDocumentWhereInput
    orderBy?: AttachmentDocumentOrderByWithAggregationInput | AttachmentDocumentOrderByWithAggregationInput[]
    by: AttachmentDocumentScalarFieldEnum[] | AttachmentDocumentScalarFieldEnum
    having?: AttachmentDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AttachmentDocumentCountAggregateInputType | true
    _min?: AttachmentDocumentMinAggregateInputType
    _max?: AttachmentDocumentMaxAggregateInputType
  }

  export type AttachmentDocumentGroupByOutputType = {
    id: string
    user_id: string
    title: string
    content: string | null
    kind: $Enums.DocumentKind
    created_at: Date
    updated_at: Date
    _count: AttachmentDocumentCountAggregateOutputType | null
    _min: AttachmentDocumentMinAggregateOutputType | null
    _max: AttachmentDocumentMaxAggregateOutputType | null
  }

  type GetAttachmentDocumentGroupByPayload<T extends AttachmentDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AttachmentDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AttachmentDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AttachmentDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], AttachmentDocumentGroupByOutputType[P]>
        }
      >
    >


  export type AttachmentDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    kind?: boolean
    created_at?: boolean
    updated_at?: boolean
    suggestions?: boolean | AttachmentDocument$suggestionsArgs<ExtArgs>
    _count?: boolean | AttachmentDocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["attachmentDocument"]>

  export type AttachmentDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    kind?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["attachmentDocument"]>

  export type AttachmentDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    kind?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["attachmentDocument"]>

  export type AttachmentDocumentSelectScalar = {
    id?: boolean
    user_id?: boolean
    title?: boolean
    content?: boolean
    kind?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type AttachmentDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "title" | "content" | "kind" | "created_at" | "updated_at", ExtArgs["result"]["attachmentDocument"]>
  export type AttachmentDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    suggestions?: boolean | AttachmentDocument$suggestionsArgs<ExtArgs>
    _count?: boolean | AttachmentDocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AttachmentDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type AttachmentDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $AttachmentDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AttachmentDocument"
    objects: {
      suggestions: Prisma.$SuggestionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      title: string
      content: string | null
      kind: $Enums.DocumentKind
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["attachmentDocument"]>
    composites: {}
  }

  type AttachmentDocumentGetPayload<S extends boolean | null | undefined | AttachmentDocumentDefaultArgs> = $Result.GetResult<Prisma.$AttachmentDocumentPayload, S>

  type AttachmentDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AttachmentDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AttachmentDocumentCountAggregateInputType | true
    }

  export interface AttachmentDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AttachmentDocument'], meta: { name: 'AttachmentDocument' } }
    /**
     * Find zero or one AttachmentDocument that matches the filter.
     * @param {AttachmentDocumentFindUniqueArgs} args - Arguments to find a AttachmentDocument
     * @example
     * // Get one AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AttachmentDocumentFindUniqueArgs>(args: SelectSubset<T, AttachmentDocumentFindUniqueArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AttachmentDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AttachmentDocumentFindUniqueOrThrowArgs} args - Arguments to find a AttachmentDocument
     * @example
     * // Get one AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AttachmentDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, AttachmentDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttachmentDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentFindFirstArgs} args - Arguments to find a AttachmentDocument
     * @example
     * // Get one AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AttachmentDocumentFindFirstArgs>(args?: SelectSubset<T, AttachmentDocumentFindFirstArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AttachmentDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentFindFirstOrThrowArgs} args - Arguments to find a AttachmentDocument
     * @example
     * // Get one AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AttachmentDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, AttachmentDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AttachmentDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AttachmentDocuments
     * const attachmentDocuments = await prisma.attachmentDocument.findMany()
     * 
     * // Get first 10 AttachmentDocuments
     * const attachmentDocuments = await prisma.attachmentDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const attachmentDocumentWithIdOnly = await prisma.attachmentDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AttachmentDocumentFindManyArgs>(args?: SelectSubset<T, AttachmentDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AttachmentDocument.
     * @param {AttachmentDocumentCreateArgs} args - Arguments to create a AttachmentDocument.
     * @example
     * // Create one AttachmentDocument
     * const AttachmentDocument = await prisma.attachmentDocument.create({
     *   data: {
     *     // ... data to create a AttachmentDocument
     *   }
     * })
     * 
     */
    create<T extends AttachmentDocumentCreateArgs>(args: SelectSubset<T, AttachmentDocumentCreateArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AttachmentDocuments.
     * @param {AttachmentDocumentCreateManyArgs} args - Arguments to create many AttachmentDocuments.
     * @example
     * // Create many AttachmentDocuments
     * const attachmentDocument = await prisma.attachmentDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AttachmentDocumentCreateManyArgs>(args?: SelectSubset<T, AttachmentDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AttachmentDocuments and returns the data saved in the database.
     * @param {AttachmentDocumentCreateManyAndReturnArgs} args - Arguments to create many AttachmentDocuments.
     * @example
     * // Create many AttachmentDocuments
     * const attachmentDocument = await prisma.attachmentDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AttachmentDocuments and only return the `id`
     * const attachmentDocumentWithIdOnly = await prisma.attachmentDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AttachmentDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, AttachmentDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AttachmentDocument.
     * @param {AttachmentDocumentDeleteArgs} args - Arguments to delete one AttachmentDocument.
     * @example
     * // Delete one AttachmentDocument
     * const AttachmentDocument = await prisma.attachmentDocument.delete({
     *   where: {
     *     // ... filter to delete one AttachmentDocument
     *   }
     * })
     * 
     */
    delete<T extends AttachmentDocumentDeleteArgs>(args: SelectSubset<T, AttachmentDocumentDeleteArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AttachmentDocument.
     * @param {AttachmentDocumentUpdateArgs} args - Arguments to update one AttachmentDocument.
     * @example
     * // Update one AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AttachmentDocumentUpdateArgs>(args: SelectSubset<T, AttachmentDocumentUpdateArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AttachmentDocuments.
     * @param {AttachmentDocumentDeleteManyArgs} args - Arguments to filter AttachmentDocuments to delete.
     * @example
     * // Delete a few AttachmentDocuments
     * const { count } = await prisma.attachmentDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AttachmentDocumentDeleteManyArgs>(args?: SelectSubset<T, AttachmentDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttachmentDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AttachmentDocuments
     * const attachmentDocument = await prisma.attachmentDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AttachmentDocumentUpdateManyArgs>(args: SelectSubset<T, AttachmentDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AttachmentDocuments and returns the data updated in the database.
     * @param {AttachmentDocumentUpdateManyAndReturnArgs} args - Arguments to update many AttachmentDocuments.
     * @example
     * // Update many AttachmentDocuments
     * const attachmentDocument = await prisma.attachmentDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AttachmentDocuments and only return the `id`
     * const attachmentDocumentWithIdOnly = await prisma.attachmentDocument.updateManyAndReturn({
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
    updateManyAndReturn<T extends AttachmentDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, AttachmentDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AttachmentDocument.
     * @param {AttachmentDocumentUpsertArgs} args - Arguments to update or create a AttachmentDocument.
     * @example
     * // Update or create a AttachmentDocument
     * const attachmentDocument = await prisma.attachmentDocument.upsert({
     *   create: {
     *     // ... data to create a AttachmentDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AttachmentDocument we want to update
     *   }
     * })
     */
    upsert<T extends AttachmentDocumentUpsertArgs>(args: SelectSubset<T, AttachmentDocumentUpsertArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AttachmentDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentCountArgs} args - Arguments to filter AttachmentDocuments to count.
     * @example
     * // Count the number of AttachmentDocuments
     * const count = await prisma.attachmentDocument.count({
     *   where: {
     *     // ... the filter for the AttachmentDocuments we want to count
     *   }
     * })
    **/
    count<T extends AttachmentDocumentCountArgs>(
      args?: Subset<T, AttachmentDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AttachmentDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AttachmentDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AttachmentDocumentAggregateArgs>(args: Subset<T, AttachmentDocumentAggregateArgs>): Prisma.PrismaPromise<GetAttachmentDocumentAggregateType<T>>

    /**
     * Group by AttachmentDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AttachmentDocumentGroupByArgs} args - Group by arguments.
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
      T extends AttachmentDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AttachmentDocumentGroupByArgs['orderBy'] }
        : { orderBy?: AttachmentDocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AttachmentDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAttachmentDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AttachmentDocument model
   */
  readonly fields: AttachmentDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AttachmentDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AttachmentDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    suggestions<T extends AttachmentDocument$suggestionsArgs<ExtArgs> = {}>(args?: Subset<T, AttachmentDocument$suggestionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the AttachmentDocument model
   */
  interface AttachmentDocumentFieldRefs {
    readonly id: FieldRef<"AttachmentDocument", 'String'>
    readonly user_id: FieldRef<"AttachmentDocument", 'String'>
    readonly title: FieldRef<"AttachmentDocument", 'String'>
    readonly content: FieldRef<"AttachmentDocument", 'String'>
    readonly kind: FieldRef<"AttachmentDocument", 'DocumentKind'>
    readonly created_at: FieldRef<"AttachmentDocument", 'DateTime'>
    readonly updated_at: FieldRef<"AttachmentDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AttachmentDocument findUnique
   */
  export type AttachmentDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which AttachmentDocument to fetch.
     */
    where: AttachmentDocumentWhereUniqueInput
  }

  /**
   * AttachmentDocument findUniqueOrThrow
   */
  export type AttachmentDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which AttachmentDocument to fetch.
     */
    where: AttachmentDocumentWhereUniqueInput
  }

  /**
   * AttachmentDocument findFirst
   */
  export type AttachmentDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which AttachmentDocument to fetch.
     */
    where?: AttachmentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttachmentDocuments to fetch.
     */
    orderBy?: AttachmentDocumentOrderByWithRelationInput | AttachmentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttachmentDocuments.
     */
    cursor?: AttachmentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttachmentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttachmentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttachmentDocuments.
     */
    distinct?: AttachmentDocumentScalarFieldEnum | AttachmentDocumentScalarFieldEnum[]
  }

  /**
   * AttachmentDocument findFirstOrThrow
   */
  export type AttachmentDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which AttachmentDocument to fetch.
     */
    where?: AttachmentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttachmentDocuments to fetch.
     */
    orderBy?: AttachmentDocumentOrderByWithRelationInput | AttachmentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AttachmentDocuments.
     */
    cursor?: AttachmentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttachmentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttachmentDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AttachmentDocuments.
     */
    distinct?: AttachmentDocumentScalarFieldEnum | AttachmentDocumentScalarFieldEnum[]
  }

  /**
   * AttachmentDocument findMany
   */
  export type AttachmentDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter, which AttachmentDocuments to fetch.
     */
    where?: AttachmentDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AttachmentDocuments to fetch.
     */
    orderBy?: AttachmentDocumentOrderByWithRelationInput | AttachmentDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AttachmentDocuments.
     */
    cursor?: AttachmentDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AttachmentDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AttachmentDocuments.
     */
    skip?: number
    distinct?: AttachmentDocumentScalarFieldEnum | AttachmentDocumentScalarFieldEnum[]
  }

  /**
   * AttachmentDocument create
   */
  export type AttachmentDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a AttachmentDocument.
     */
    data: XOR<AttachmentDocumentCreateInput, AttachmentDocumentUncheckedCreateInput>
  }

  /**
   * AttachmentDocument createMany
   */
  export type AttachmentDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AttachmentDocuments.
     */
    data: AttachmentDocumentCreateManyInput | AttachmentDocumentCreateManyInput[]
  }

  /**
   * AttachmentDocument createManyAndReturn
   */
  export type AttachmentDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many AttachmentDocuments.
     */
    data: AttachmentDocumentCreateManyInput | AttachmentDocumentCreateManyInput[]
  }

  /**
   * AttachmentDocument update
   */
  export type AttachmentDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a AttachmentDocument.
     */
    data: XOR<AttachmentDocumentUpdateInput, AttachmentDocumentUncheckedUpdateInput>
    /**
     * Choose, which AttachmentDocument to update.
     */
    where: AttachmentDocumentWhereUniqueInput
  }

  /**
   * AttachmentDocument updateMany
   */
  export type AttachmentDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AttachmentDocuments.
     */
    data: XOR<AttachmentDocumentUpdateManyMutationInput, AttachmentDocumentUncheckedUpdateManyInput>
    /**
     * Filter which AttachmentDocuments to update
     */
    where?: AttachmentDocumentWhereInput
    /**
     * Limit how many AttachmentDocuments to update.
     */
    limit?: number
  }

  /**
   * AttachmentDocument updateManyAndReturn
   */
  export type AttachmentDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * The data used to update AttachmentDocuments.
     */
    data: XOR<AttachmentDocumentUpdateManyMutationInput, AttachmentDocumentUncheckedUpdateManyInput>
    /**
     * Filter which AttachmentDocuments to update
     */
    where?: AttachmentDocumentWhereInput
    /**
     * Limit how many AttachmentDocuments to update.
     */
    limit?: number
  }

  /**
   * AttachmentDocument upsert
   */
  export type AttachmentDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the AttachmentDocument to update in case it exists.
     */
    where: AttachmentDocumentWhereUniqueInput
    /**
     * In case the AttachmentDocument found by the `where` argument doesn't exist, create a new AttachmentDocument with this data.
     */
    create: XOR<AttachmentDocumentCreateInput, AttachmentDocumentUncheckedCreateInput>
    /**
     * In case the AttachmentDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AttachmentDocumentUpdateInput, AttachmentDocumentUncheckedUpdateInput>
  }

  /**
   * AttachmentDocument delete
   */
  export type AttachmentDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
    /**
     * Filter which AttachmentDocument to delete.
     */
    where: AttachmentDocumentWhereUniqueInput
  }

  /**
   * AttachmentDocument deleteMany
   */
  export type AttachmentDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AttachmentDocuments to delete
     */
    where?: AttachmentDocumentWhereInput
    /**
     * Limit how many AttachmentDocuments to delete.
     */
    limit?: number
  }

  /**
   * AttachmentDocument.suggestions
   */
  export type AttachmentDocument$suggestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    where?: SuggestionWhereInput
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    cursor?: SuggestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * AttachmentDocument without action
   */
  export type AttachmentDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AttachmentDocument
     */
    select?: AttachmentDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AttachmentDocument
     */
    omit?: AttachmentDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AttachmentDocumentInclude<ExtArgs> | null
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
    chat_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type StreamMaxAggregateOutputType = {
    id: string | null
    chat_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type StreamCountAggregateOutputType = {
    id: number
    chat_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type StreamMinAggregateInputType = {
    id?: true
    chat_id?: true
    created_at?: true
    updated_at?: true
  }

  export type StreamMaxAggregateInputType = {
    id?: true
    chat_id?: true
    created_at?: true
    updated_at?: true
  }

  export type StreamCountAggregateInputType = {
    id?: true
    chat_id?: true
    created_at?: true
    updated_at?: true
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
    chat_id: string
    created_at: Date
    updated_at: Date
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
    chat_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chat_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chat_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["stream"]>

  export type StreamSelectScalar = {
    id?: boolean
    chat_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type StreamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chat_id" | "created_at" | "updated_at", ExtArgs["result"]["stream"]>
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
      chat_id: string
      created_at: Date
      updated_at: Date
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
    readonly chat_id: FieldRef<"Stream", 'String'>
    readonly created_at: FieldRef<"Stream", 'DateTime'>
    readonly updated_at: FieldRef<"Stream", 'DateTime'>
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
   * Model Suggestion
   */

  export type AggregateSuggestion = {
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  export type SuggestionMinAggregateOutputType = {
    id: string | null
    document_id: string | null
    user_id: string | null
    original_text: string | null
    suggested_text: string | null
    description: string | null
    is_resolved: boolean | null
    document_created_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuggestionMaxAggregateOutputType = {
    id: string | null
    document_id: string | null
    user_id: string | null
    original_text: string | null
    suggested_text: string | null
    description: string | null
    is_resolved: boolean | null
    document_created_at: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type SuggestionCountAggregateOutputType = {
    id: number
    document_id: number
    user_id: number
    original_text: number
    suggested_text: number
    description: number
    is_resolved: number
    document_created_at: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type SuggestionMinAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    original_text?: true
    suggested_text?: true
    description?: true
    is_resolved?: true
    document_created_at?: true
    created_at?: true
    updated_at?: true
  }

  export type SuggestionMaxAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    original_text?: true
    suggested_text?: true
    description?: true
    is_resolved?: true
    document_created_at?: true
    created_at?: true
    updated_at?: true
  }

  export type SuggestionCountAggregateInputType = {
    id?: true
    document_id?: true
    user_id?: true
    original_text?: true
    suggested_text?: true
    description?: true
    is_resolved?: true
    document_created_at?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type SuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestion to aggregate.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suggestions
    **/
    _count?: true | SuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuggestionMaxAggregateInputType
  }

  export type GetSuggestionAggregateType<T extends SuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuggestion[P]>
      : GetScalarType<T[P], AggregateSuggestion[P]>
  }




  export type SuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestionWhereInput
    orderBy?: SuggestionOrderByWithAggregationInput | SuggestionOrderByWithAggregationInput[]
    by: SuggestionScalarFieldEnum[] | SuggestionScalarFieldEnum
    having?: SuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuggestionCountAggregateInputType | true
    _min?: SuggestionMinAggregateInputType
    _max?: SuggestionMaxAggregateInputType
  }

  export type SuggestionGroupByOutputType = {
    id: string
    document_id: string
    user_id: string
    original_text: string
    suggested_text: string
    description: string | null
    is_resolved: boolean
    document_created_at: Date
    created_at: Date
    updated_at: Date
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  type GetSuggestionGroupByPayload<T extends SuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
        }
      >
    >


  export type SuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    original_text?: boolean
    suggested_text?: boolean
    description?: boolean
    is_resolved?: boolean
    document_created_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    original_text?: boolean
    suggested_text?: boolean
    description?: boolean
    is_resolved?: boolean
    document_created_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    original_text?: boolean
    suggested_text?: boolean
    description?: boolean
    is_resolved?: boolean
    document_created_at?: boolean
    created_at?: boolean
    updated_at?: boolean
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectScalar = {
    id?: boolean
    document_id?: boolean
    user_id?: boolean
    original_text?: boolean
    suggested_text?: boolean
    description?: boolean
    is_resolved?: boolean
    document_created_at?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type SuggestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "document_id" | "user_id" | "original_text" | "suggested_text" | "description" | "is_resolved" | "document_created_at" | "created_at" | "updated_at", ExtArgs["result"]["suggestion"]>
  export type SuggestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }
  export type SuggestionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }
  export type SuggestionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | AttachmentDocumentDefaultArgs<ExtArgs>
  }

  export type $SuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Suggestion"
    objects: {
      document: Prisma.$AttachmentDocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      document_id: string
      user_id: string
      original_text: string
      suggested_text: string
      description: string | null
      is_resolved: boolean
      document_created_at: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["suggestion"]>
    composites: {}
  }

  type SuggestionGetPayload<S extends boolean | null | undefined | SuggestionDefaultArgs> = $Result.GetResult<Prisma.$SuggestionPayload, S>

  type SuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SuggestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SuggestionCountAggregateInputType | true
    }

  export interface SuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Suggestion'], meta: { name: 'Suggestion' } }
    /**
     * Find zero or one Suggestion that matches the filter.
     * @param {SuggestionFindUniqueArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuggestionFindUniqueArgs>(args: SelectSubset<T, SuggestionFindUniqueArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Suggestion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SuggestionFindUniqueOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, SuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuggestionFindFirstArgs>(args?: SelectSubset<T, SuggestionFindFirstArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Suggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, SuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Suggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suggestions
     * const suggestions = await prisma.suggestion.findMany()
     * 
     * // Get first 10 Suggestions
     * const suggestions = await prisma.suggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuggestionFindManyArgs>(args?: SelectSubset<T, SuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Suggestion.
     * @param {SuggestionCreateArgs} args - Arguments to create a Suggestion.
     * @example
     * // Create one Suggestion
     * const Suggestion = await prisma.suggestion.create({
     *   data: {
     *     // ... data to create a Suggestion
     *   }
     * })
     * 
     */
    create<T extends SuggestionCreateArgs>(args: SelectSubset<T, SuggestionCreateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Suggestions.
     * @param {SuggestionCreateManyArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuggestionCreateManyArgs>(args?: SelectSubset<T, SuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suggestions and returns the data saved in the database.
     * @param {SuggestionCreateManyAndReturnArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, SuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Suggestion.
     * @param {SuggestionDeleteArgs} args - Arguments to delete one Suggestion.
     * @example
     * // Delete one Suggestion
     * const Suggestion = await prisma.suggestion.delete({
     *   where: {
     *     // ... filter to delete one Suggestion
     *   }
     * })
     * 
     */
    delete<T extends SuggestionDeleteArgs>(args: SelectSubset<T, SuggestionDeleteArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Suggestion.
     * @param {SuggestionUpdateArgs} args - Arguments to update one Suggestion.
     * @example
     * // Update one Suggestion
     * const suggestion = await prisma.suggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuggestionUpdateArgs>(args: SelectSubset<T, SuggestionUpdateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Suggestions.
     * @param {SuggestionDeleteManyArgs} args - Arguments to filter Suggestions to delete.
     * @example
     * // Delete a few Suggestions
     * const { count } = await prisma.suggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuggestionDeleteManyArgs>(args?: SelectSubset<T, SuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuggestionUpdateManyArgs>(args: SelectSubset<T, SuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suggestions and returns the data updated in the database.
     * @param {SuggestionUpdateManyAndReturnArgs} args - Arguments to update many Suggestions.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.updateManyAndReturn({
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
    updateManyAndReturn<T extends SuggestionUpdateManyAndReturnArgs>(args: SelectSubset<T, SuggestionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Suggestion.
     * @param {SuggestionUpsertArgs} args - Arguments to update or create a Suggestion.
     * @example
     * // Update or create a Suggestion
     * const suggestion = await prisma.suggestion.upsert({
     *   create: {
     *     // ... data to create a Suggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suggestion we want to update
     *   }
     * })
     */
    upsert<T extends SuggestionUpsertArgs>(args: SelectSubset<T, SuggestionUpsertArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionCountArgs} args - Arguments to filter Suggestions to count.
     * @example
     * // Count the number of Suggestions
     * const count = await prisma.suggestion.count({
     *   where: {
     *     // ... the filter for the Suggestions we want to count
     *   }
     * })
    **/
    count<T extends SuggestionCountArgs>(
      args?: Subset<T, SuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SuggestionAggregateArgs>(args: Subset<T, SuggestionAggregateArgs>): Prisma.PrismaPromise<GetSuggestionAggregateType<T>>

    /**
     * Group by Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionGroupByArgs} args - Group by arguments.
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
      T extends SuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuggestionGroupByArgs['orderBy'] }
        : { orderBy?: SuggestionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Suggestion model
   */
  readonly fields: SuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Suggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends AttachmentDocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AttachmentDocumentDefaultArgs<ExtArgs>>): Prisma__AttachmentDocumentClient<$Result.GetResult<Prisma.$AttachmentDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Suggestion model
   */
  interface SuggestionFieldRefs {
    readonly id: FieldRef<"Suggestion", 'String'>
    readonly document_id: FieldRef<"Suggestion", 'String'>
    readonly user_id: FieldRef<"Suggestion", 'String'>
    readonly original_text: FieldRef<"Suggestion", 'String'>
    readonly suggested_text: FieldRef<"Suggestion", 'String'>
    readonly description: FieldRef<"Suggestion", 'String'>
    readonly is_resolved: FieldRef<"Suggestion", 'Boolean'>
    readonly document_created_at: FieldRef<"Suggestion", 'DateTime'>
    readonly created_at: FieldRef<"Suggestion", 'DateTime'>
    readonly updated_at: FieldRef<"Suggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Suggestion findUnique
   */
  export type SuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findUniqueOrThrow
   */
  export type SuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findFirst
   */
  export type SuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findFirstOrThrow
   */
  export type SuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findMany
   */
  export type SuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter, which Suggestions to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion create
   */
  export type SuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Suggestion.
     */
    data: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
  }

  /**
   * Suggestion createMany
   */
  export type SuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
  }

  /**
   * Suggestion createManyAndReturn
   */
  export type SuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Suggestion update
   */
  export type SuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Suggestion.
     */
    data: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
    /**
     * Choose, which Suggestion to update.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion updateMany
   */
  export type SuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suggestions.
     */
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyInput>
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number
  }

  /**
   * Suggestion updateManyAndReturn
   */
  export type SuggestionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * The data used to update Suggestions.
     */
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyInput>
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Suggestion upsert
   */
  export type SuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Suggestion to update in case it exists.
     */
    where: SuggestionWhereUniqueInput
    /**
     * In case the Suggestion found by the `where` argument doesn't exist, create a new Suggestion with this data.
     */
    create: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
    /**
     * In case the Suggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
  }

  /**
   * Suggestion delete
   */
  export type SuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
    /**
     * Filter which Suggestion to delete.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion deleteMany
   */
  export type SuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestions to delete
     */
    where?: SuggestionWhereInput
    /**
     * Limit how many Suggestions to delete.
     */
    limit?: number
  }

  /**
   * Suggestion without action
   */
  export type SuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Suggestion
     */
    omit?: SuggestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SuggestionInclude<ExtArgs> | null
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
    chat_id: string | null
    user_id: string | null
    role: string | null
    created_at: Date | null
    updated_at: Date | null
    vote: $Enums.VoteType | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    chat_id: string | null
    user_id: string | null
    role: string | null
    created_at: Date | null
    updated_at: Date | null
    vote: $Enums.VoteType | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    chat_id: number
    user_id: number
    role: number
    parts: number
    metadata: number
    created_at: number
    updated_at: number
    attachments: number
    vote: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    chat_id?: true
    user_id?: true
    role?: true
    created_at?: true
    updated_at?: true
    vote?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    chat_id?: true
    user_id?: true
    role?: true
    created_at?: true
    updated_at?: true
    vote?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    chat_id?: true
    user_id?: true
    role?: true
    parts?: true
    metadata?: true
    created_at?: true
    updated_at?: true
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
    chat_id: string
    user_id: string
    role: string
    parts: JsonValue
    metadata: JsonValue | null
    created_at: Date
    updated_at: Date
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
    chat_id?: boolean
    user_id?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chat_id?: boolean
    user_id?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chat_id?: boolean
    user_id?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    attachments?: boolean
    vote?: boolean
    chat?: boolean | ChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    chat_id?: boolean
    user_id?: boolean
    role?: boolean
    parts?: boolean
    metadata?: boolean
    created_at?: boolean
    updated_at?: boolean
    attachments?: boolean
    vote?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chat_id" | "user_id" | "role" | "parts" | "metadata" | "created_at" | "updated_at" | "attachments" | "vote", ExtArgs["result"]["message"]>
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
      chat_id: string
      user_id: string
      role: string
      parts: Prisma.JsonValue
      metadata: Prisma.JsonValue | null
      created_at: Date
      updated_at: Date
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
    readonly chat_id: FieldRef<"Message", 'String'>
    readonly user_id: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly parts: FieldRef<"Message", 'Json'>
    readonly metadata: FieldRef<"Message", 'Json'>
    readonly created_at: FieldRef<"Message", 'DateTime'>
    readonly updated_at: FieldRef<"Message", 'DateTime'>
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
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ChatScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    visibility: 'visibility',
    created_at: 'created_at',
    updated_at: 'updated_at',
    message_count: 'message_count'
  };

  export type ChatScalarFieldEnum = (typeof ChatScalarFieldEnum)[keyof typeof ChatScalarFieldEnum]


  export const AttachmentDocumentScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    title: 'title',
    content: 'content',
    kind: 'kind',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type AttachmentDocumentScalarFieldEnum = (typeof AttachmentDocumentScalarFieldEnum)[keyof typeof AttachmentDocumentScalarFieldEnum]


  export const StreamScalarFieldEnum: {
    id: 'id',
    chat_id: 'chat_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type StreamScalarFieldEnum = (typeof StreamScalarFieldEnum)[keyof typeof StreamScalarFieldEnum]


  export const SuggestionScalarFieldEnum: {
    id: 'id',
    document_id: 'document_id',
    user_id: 'user_id',
    original_text: 'original_text',
    suggested_text: 'suggested_text',
    description: 'description',
    is_resolved: 'is_resolved',
    document_created_at: 'document_created_at',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type SuggestionScalarFieldEnum = (typeof SuggestionScalarFieldEnum)[keyof typeof SuggestionScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    chat_id: 'chat_id',
    user_id: 'user_id',
    role: 'role',
    parts: 'parts',
    metadata: 'metadata',
    created_at: 'created_at',
    updated_at: 'updated_at',
    attachments: 'attachments',
    vote: 'vote'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


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
   * Reference to a field of type 'ChatVisibility'
   */
  export type EnumChatVisibilityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChatVisibility'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DocumentKind'
   */
  export type EnumDocumentKindFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DocumentKind'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ChatWhereInput = {
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    id?: StringFilter<"Chat"> | string
    user_id?: StringFilter<"Chat"> | string
    title?: StringNullableFilter<"Chat"> | string | null
    visibility?: EnumChatVisibilityFilter<"Chat"> | $Enums.ChatVisibility
    created_at?: DateTimeFilter<"Chat"> | Date | string
    updated_at?: DateTimeFilter<"Chat"> | Date | string
    message_count?: IntFilter<"Chat"> | number
    messages?: MessageListRelationFilter
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
  }

  export type ChatOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrderInput | SortOrder
    visibility?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    message_count?: SortOrder
    messages?: MessageOrderByRelationAggregateInput
    stream?: StreamOrderByWithRelationInput
  }

  export type ChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ChatWhereInput | ChatWhereInput[]
    OR?: ChatWhereInput[]
    NOT?: ChatWhereInput | ChatWhereInput[]
    user_id?: StringFilter<"Chat"> | string
    title?: StringNullableFilter<"Chat"> | string | null
    visibility?: EnumChatVisibilityFilter<"Chat"> | $Enums.ChatVisibility
    created_at?: DateTimeFilter<"Chat"> | Date | string
    updated_at?: DateTimeFilter<"Chat"> | Date | string
    message_count?: IntFilter<"Chat"> | number
    messages?: MessageListRelationFilter
    stream?: XOR<StreamNullableScalarRelationFilter, StreamWhereInput> | null
  }, "id">

  export type ChatOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrderInput | SortOrder
    visibility?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    message_count?: SortOrder
    _count?: ChatCountOrderByAggregateInput
    _avg?: ChatAvgOrderByAggregateInput
    _max?: ChatMaxOrderByAggregateInput
    _min?: ChatMinOrderByAggregateInput
    _sum?: ChatSumOrderByAggregateInput
  }

  export type ChatScalarWhereWithAggregatesInput = {
    AND?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    OR?: ChatScalarWhereWithAggregatesInput[]
    NOT?: ChatScalarWhereWithAggregatesInput | ChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Chat"> | string
    user_id?: StringWithAggregatesFilter<"Chat"> | string
    title?: StringNullableWithAggregatesFilter<"Chat"> | string | null
    visibility?: EnumChatVisibilityWithAggregatesFilter<"Chat"> | $Enums.ChatVisibility
    created_at?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Chat"> | Date | string
    message_count?: IntWithAggregatesFilter<"Chat"> | number
  }

  export type AttachmentDocumentWhereInput = {
    AND?: AttachmentDocumentWhereInput | AttachmentDocumentWhereInput[]
    OR?: AttachmentDocumentWhereInput[]
    NOT?: AttachmentDocumentWhereInput | AttachmentDocumentWhereInput[]
    id?: StringFilter<"AttachmentDocument"> | string
    user_id?: StringFilter<"AttachmentDocument"> | string
    title?: StringFilter<"AttachmentDocument"> | string
    content?: StringNullableFilter<"AttachmentDocument"> | string | null
    kind?: EnumDocumentKindFilter<"AttachmentDocument"> | $Enums.DocumentKind
    created_at?: DateTimeFilter<"AttachmentDocument"> | Date | string
    updated_at?: DateTimeFilter<"AttachmentDocument"> | Date | string
    suggestions?: SuggestionListRelationFilter
  }

  export type AttachmentDocumentOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    kind?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    suggestions?: SuggestionOrderByRelationAggregateInput
  }

  export type AttachmentDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AttachmentDocumentWhereInput | AttachmentDocumentWhereInput[]
    OR?: AttachmentDocumentWhereInput[]
    NOT?: AttachmentDocumentWhereInput | AttachmentDocumentWhereInput[]
    user_id?: StringFilter<"AttachmentDocument"> | string
    title?: StringFilter<"AttachmentDocument"> | string
    content?: StringNullableFilter<"AttachmentDocument"> | string | null
    kind?: EnumDocumentKindFilter<"AttachmentDocument"> | $Enums.DocumentKind
    created_at?: DateTimeFilter<"AttachmentDocument"> | Date | string
    updated_at?: DateTimeFilter<"AttachmentDocument"> | Date | string
    suggestions?: SuggestionListRelationFilter
  }, "id">

  export type AttachmentDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrderInput | SortOrder
    kind?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: AttachmentDocumentCountOrderByAggregateInput
    _max?: AttachmentDocumentMaxOrderByAggregateInput
    _min?: AttachmentDocumentMinOrderByAggregateInput
  }

  export type AttachmentDocumentScalarWhereWithAggregatesInput = {
    AND?: AttachmentDocumentScalarWhereWithAggregatesInput | AttachmentDocumentScalarWhereWithAggregatesInput[]
    OR?: AttachmentDocumentScalarWhereWithAggregatesInput[]
    NOT?: AttachmentDocumentScalarWhereWithAggregatesInput | AttachmentDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AttachmentDocument"> | string
    user_id?: StringWithAggregatesFilter<"AttachmentDocument"> | string
    title?: StringWithAggregatesFilter<"AttachmentDocument"> | string
    content?: StringNullableWithAggregatesFilter<"AttachmentDocument"> | string | null
    kind?: EnumDocumentKindWithAggregatesFilter<"AttachmentDocument"> | $Enums.DocumentKind
    created_at?: DateTimeWithAggregatesFilter<"AttachmentDocument"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"AttachmentDocument"> | Date | string
  }

  export type StreamWhereInput = {
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    id?: StringFilter<"Stream"> | string
    chat_id?: StringFilter<"Stream"> | string
    created_at?: DateTimeFilter<"Stream"> | Date | string
    updated_at?: DateTimeFilter<"Stream"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type StreamOrderByWithRelationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type StreamWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    chat_id?: string
    AND?: StreamWhereInput | StreamWhereInput[]
    OR?: StreamWhereInput[]
    NOT?: StreamWhereInput | StreamWhereInput[]
    created_at?: DateTimeFilter<"Stream"> | Date | string
    updated_at?: DateTimeFilter<"Stream"> | Date | string
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id" | "chat_id">

  export type StreamOrderByWithAggregationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: StreamCountOrderByAggregateInput
    _max?: StreamMaxOrderByAggregateInput
    _min?: StreamMinOrderByAggregateInput
  }

  export type StreamScalarWhereWithAggregatesInput = {
    AND?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    OR?: StreamScalarWhereWithAggregatesInput[]
    NOT?: StreamScalarWhereWithAggregatesInput | StreamScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Stream"> | string
    chat_id?: StringWithAggregatesFilter<"Stream"> | string
    created_at?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Stream"> | Date | string
  }

  export type SuggestionWhereInput = {
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    id?: StringFilter<"Suggestion"> | string
    document_id?: StringFilter<"Suggestion"> | string
    user_id?: StringFilter<"Suggestion"> | string
    original_text?: StringFilter<"Suggestion"> | string
    suggested_text?: StringFilter<"Suggestion"> | string
    description?: StringNullableFilter<"Suggestion"> | string | null
    is_resolved?: BoolFilter<"Suggestion"> | boolean
    document_created_at?: DateTimeFilter<"Suggestion"> | Date | string
    created_at?: DateTimeFilter<"Suggestion"> | Date | string
    updated_at?: DateTimeFilter<"Suggestion"> | Date | string
    document?: XOR<AttachmentDocumentScalarRelationFilter, AttachmentDocumentWhereInput>
  }

  export type SuggestionOrderByWithRelationInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    original_text?: SortOrder
    suggested_text?: SortOrder
    description?: SortOrderInput | SortOrder
    is_resolved?: SortOrder
    document_created_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    document?: AttachmentDocumentOrderByWithRelationInput
  }

  export type SuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    document_id?: StringFilter<"Suggestion"> | string
    user_id?: StringFilter<"Suggestion"> | string
    original_text?: StringFilter<"Suggestion"> | string
    suggested_text?: StringFilter<"Suggestion"> | string
    description?: StringNullableFilter<"Suggestion"> | string | null
    is_resolved?: BoolFilter<"Suggestion"> | boolean
    document_created_at?: DateTimeFilter<"Suggestion"> | Date | string
    created_at?: DateTimeFilter<"Suggestion"> | Date | string
    updated_at?: DateTimeFilter<"Suggestion"> | Date | string
    document?: XOR<AttachmentDocumentScalarRelationFilter, AttachmentDocumentWhereInput>
  }, "id">

  export type SuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    original_text?: SortOrder
    suggested_text?: SortOrder
    description?: SortOrderInput | SortOrder
    is_resolved?: SortOrder
    document_created_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: SuggestionCountOrderByAggregateInput
    _max?: SuggestionMaxOrderByAggregateInput
    _min?: SuggestionMinOrderByAggregateInput
  }

  export type SuggestionScalarWhereWithAggregatesInput = {
    AND?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    OR?: SuggestionScalarWhereWithAggregatesInput[]
    NOT?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Suggestion"> | string
    document_id?: StringWithAggregatesFilter<"Suggestion"> | string
    user_id?: StringWithAggregatesFilter<"Suggestion"> | string
    original_text?: StringWithAggregatesFilter<"Suggestion"> | string
    suggested_text?: StringWithAggregatesFilter<"Suggestion"> | string
    description?: StringNullableWithAggregatesFilter<"Suggestion"> | string | null
    is_resolved?: BoolWithAggregatesFilter<"Suggestion"> | boolean
    document_created_at?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    chat_id?: StringFilter<"Message"> | string
    user_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    created_at?: DateTimeFilter<"Message"> | Date | string
    updated_at?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attachments?: SortOrderInput | SortOrder
    vote?: SortOrderInput | SortOrder
    chat?: ChatOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    chat_id?: StringFilter<"Message"> | string
    user_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    created_at?: DateTimeFilter<"Message"> | Date | string
    updated_at?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
    chat?: XOR<ChatScalarRelationFilter, ChatWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    chat_id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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
    chat_id?: StringWithAggregatesFilter<"Message"> | string
    user_id?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    parts?: JsonWithAggregatesFilter<"Message">
    metadata?: JsonNullableWithAggregatesFilter<"Message">
    created_at?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    attachments?: JsonNullableWithAggregatesFilter<"Message">
    vote?: EnumVoteTypeNullableWithAggregatesFilter<"Message"> | $Enums.VoteType | null
  }

  export type ChatCreateInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    messages?: MessageCreateNestedManyWithoutChatInput
    stream?: StreamCreateNestedOneWithoutChatInput
  }

  export type ChatUncheckedCreateInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
    stream?: StreamUncheckedCreateNestedOneWithoutChatInput
  }

  export type ChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    messages?: MessageUpdateManyWithoutChatNestedInput
    stream?: StreamUpdateOneWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
    stream?: StreamUncheckedUpdateOneWithoutChatNestedInput
  }

  export type ChatCreateManyInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
  }

  export type ChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
  }

  export type ChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
  }

  export type AttachmentDocumentCreateInput = {
    id?: string
    user_id: string
    title: string
    content?: string | null
    kind: $Enums.DocumentKind
    created_at?: Date | string
    updated_at?: Date | string
    suggestions?: SuggestionCreateNestedManyWithoutDocumentInput
  }

  export type AttachmentDocumentUncheckedCreateInput = {
    id?: string
    user_id: string
    title: string
    content?: string | null
    kind: $Enums.DocumentKind
    created_at?: Date | string
    updated_at?: Date | string
    suggestions?: SuggestionUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type AttachmentDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: SuggestionUpdateManyWithoutDocumentNestedInput
  }

  export type AttachmentDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    suggestions?: SuggestionUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type AttachmentDocumentCreateManyInput = {
    id?: string
    user_id: string
    title: string
    content?: string | null
    kind: $Enums.DocumentKind
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttachmentDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    chat: ChatCreateNestedOneWithoutStreamInput
  }

  export type StreamUncheckedCreateInput = {
    id?: string
    chat_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type StreamUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: ChatUpdateOneRequiredWithoutStreamNestedInput
  }

  export type StreamUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamCreateManyInput = {
    id?: string
    chat_id: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type StreamUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateInput = {
    id?: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    document: AttachmentDocumentCreateNestedOneWithoutSuggestionsInput
  }

  export type SuggestionUncheckedCreateInput = {
    id?: string
    document_id: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    document?: AttachmentDocumentUpdateOneRequiredWithoutSuggestionsNestedInput
  }

  export type SuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateManyInput = {
    id?: string
    document_id: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    document_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
    chat: ChatCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    chat_id: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
    chat?: ChatUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageCreateManyInput = {
    id?: string
    chat_id: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chat_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
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

  export type EnumChatVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatVisibility | EnumChatVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ChatVisibility[]
    notIn?: $Enums.ChatVisibility[]
    not?: NestedEnumChatVisibilityFilter<$PrismaModel> | $Enums.ChatVisibility
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type StreamNullableScalarRelationFilter = {
    is?: StreamWhereInput | null
    isNot?: StreamWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChatCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    visibility?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    message_count?: SortOrder
  }

  export type ChatAvgOrderByAggregateInput = {
    message_count?: SortOrder
  }

  export type ChatMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    visibility?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    message_count?: SortOrder
  }

  export type ChatMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    visibility?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    message_count?: SortOrder
  }

  export type ChatSumOrderByAggregateInput = {
    message_count?: SortOrder
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

  export type EnumChatVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatVisibility | EnumChatVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ChatVisibility[]
    notIn?: $Enums.ChatVisibility[]
    not?: NestedEnumChatVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ChatVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatVisibilityFilter<$PrismaModel>
    _max?: NestedEnumChatVisibilityFilter<$PrismaModel>
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumDocumentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentKind | EnumDocumentKindFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentKind[]
    notIn?: $Enums.DocumentKind[]
    not?: NestedEnumDocumentKindFilter<$PrismaModel> | $Enums.DocumentKind
  }

  export type SuggestionListRelationFilter = {
    every?: SuggestionWhereInput
    some?: SuggestionWhereInput
    none?: SuggestionWhereInput
  }

  export type SuggestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AttachmentDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    kind?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttachmentDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    kind?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type AttachmentDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    kind?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type EnumDocumentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentKind | EnumDocumentKindFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentKind[]
    notIn?: $Enums.DocumentKind[]
    not?: NestedEnumDocumentKindWithAggregatesFilter<$PrismaModel> | $Enums.DocumentKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentKindFilter<$PrismaModel>
    _max?: NestedEnumDocumentKindFilter<$PrismaModel>
  }

  export type ChatScalarRelationFilter = {
    is?: ChatWhereInput
    isNot?: ChatWhereInput
  }

  export type StreamCountOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StreamMaxOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type StreamMinOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type AttachmentDocumentScalarRelationFilter = {
    is?: AttachmentDocumentWhereInput
    isNot?: AttachmentDocumentWhereInput
  }

  export type SuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    original_text?: SortOrder
    suggested_text?: SortOrder
    description?: SortOrder
    is_resolved?: SortOrder
    document_created_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    original_text?: SortOrder
    suggested_text?: SortOrder
    description?: SortOrder
    is_resolved?: SortOrder
    document_created_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type SuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    document_id?: SortOrder
    user_id?: SortOrder
    original_text?: SortOrder
    suggested_text?: SortOrder
    description?: SortOrder
    is_resolved?: SortOrder
    document_created_at?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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
    chat_id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    parts?: SortOrder
    metadata?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    attachments?: SortOrder
    vote?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    vote?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    chat_id?: SortOrder
    user_id?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
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

  export type MessageCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StreamCreateNestedOneWithoutChatInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput
    connect?: StreamWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type StreamUncheckedCreateNestedOneWithoutChatInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput
    connect?: StreamWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumChatVisibilityFieldUpdateOperationsInput = {
    set?: $Enums.ChatVisibility
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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

  export type StreamUpdateOneWithoutChatNestedInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput
    upsert?: StreamUpsertWithoutChatInput
    disconnect?: StreamWhereInput | boolean
    delete?: StreamWhereInput | boolean
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutChatInput, StreamUpdateWithoutChatInput>, StreamUncheckedUpdateWithoutChatInput>
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

  export type StreamUncheckedUpdateOneWithoutChatNestedInput = {
    create?: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
    connectOrCreate?: StreamCreateOrConnectWithoutChatInput
    upsert?: StreamUpsertWithoutChatInput
    disconnect?: StreamWhereInput | boolean
    delete?: StreamWhereInput | boolean
    connect?: StreamWhereUniqueInput
    update?: XOR<XOR<StreamUpdateToOneWithWhereWithoutChatInput, StreamUpdateWithoutChatInput>, StreamUncheckedUpdateWithoutChatInput>
  }

  export type SuggestionCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput> | SuggestionCreateWithoutDocumentInput[] | SuggestionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SuggestionCreateOrConnectWithoutDocumentInput | SuggestionCreateOrConnectWithoutDocumentInput[]
    createMany?: SuggestionCreateManyDocumentInputEnvelope
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
  }

  export type SuggestionUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput> | SuggestionCreateWithoutDocumentInput[] | SuggestionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SuggestionCreateOrConnectWithoutDocumentInput | SuggestionCreateOrConnectWithoutDocumentInput[]
    createMany?: SuggestionCreateManyDocumentInputEnvelope
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
  }

  export type EnumDocumentKindFieldUpdateOperationsInput = {
    set?: $Enums.DocumentKind
  }

  export type SuggestionUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput> | SuggestionCreateWithoutDocumentInput[] | SuggestionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SuggestionCreateOrConnectWithoutDocumentInput | SuggestionCreateOrConnectWithoutDocumentInput[]
    upsert?: SuggestionUpsertWithWhereUniqueWithoutDocumentInput | SuggestionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SuggestionCreateManyDocumentInputEnvelope
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    update?: SuggestionUpdateWithWhereUniqueWithoutDocumentInput | SuggestionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SuggestionUpdateManyWithWhereWithoutDocumentInput | SuggestionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[]
  }

  export type SuggestionUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput> | SuggestionCreateWithoutDocumentInput[] | SuggestionUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: SuggestionCreateOrConnectWithoutDocumentInput | SuggestionCreateOrConnectWithoutDocumentInput[]
    upsert?: SuggestionUpsertWithWhereUniqueWithoutDocumentInput | SuggestionUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: SuggestionCreateManyDocumentInputEnvelope
    set?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    disconnect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    delete?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    connect?: SuggestionWhereUniqueInput | SuggestionWhereUniqueInput[]
    update?: SuggestionUpdateWithWhereUniqueWithoutDocumentInput | SuggestionUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: SuggestionUpdateManyWithWhereWithoutDocumentInput | SuggestionUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[]
  }

  export type ChatCreateNestedOneWithoutStreamInput = {
    create?: XOR<ChatCreateWithoutStreamInput, ChatUncheckedCreateWithoutStreamInput>
    connectOrCreate?: ChatCreateOrConnectWithoutStreamInput
    connect?: ChatWhereUniqueInput
  }

  export type ChatUpdateOneRequiredWithoutStreamNestedInput = {
    create?: XOR<ChatCreateWithoutStreamInput, ChatUncheckedCreateWithoutStreamInput>
    connectOrCreate?: ChatCreateOrConnectWithoutStreamInput
    upsert?: ChatUpsertWithoutStreamInput
    connect?: ChatWhereUniqueInput
    update?: XOR<XOR<ChatUpdateToOneWithWhereWithoutStreamInput, ChatUpdateWithoutStreamInput>, ChatUncheckedUpdateWithoutStreamInput>
  }

  export type AttachmentDocumentCreateNestedOneWithoutSuggestionsInput = {
    create?: XOR<AttachmentDocumentCreateWithoutSuggestionsInput, AttachmentDocumentUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: AttachmentDocumentCreateOrConnectWithoutSuggestionsInput
    connect?: AttachmentDocumentWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type AttachmentDocumentUpdateOneRequiredWithoutSuggestionsNestedInput = {
    create?: XOR<AttachmentDocumentCreateWithoutSuggestionsInput, AttachmentDocumentUncheckedCreateWithoutSuggestionsInput>
    connectOrCreate?: AttachmentDocumentCreateOrConnectWithoutSuggestionsInput
    upsert?: AttachmentDocumentUpsertWithoutSuggestionsInput
    connect?: AttachmentDocumentWhereUniqueInput
    update?: XOR<XOR<AttachmentDocumentUpdateToOneWithWhereWithoutSuggestionsInput, AttachmentDocumentUpdateWithoutSuggestionsInput>, AttachmentDocumentUncheckedUpdateWithoutSuggestionsInput>
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

  export type NestedEnumChatVisibilityFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatVisibility | EnumChatVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ChatVisibility[]
    notIn?: $Enums.ChatVisibility[]
    not?: NestedEnumChatVisibilityFilter<$PrismaModel> | $Enums.ChatVisibility
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

  export type NestedEnumChatVisibilityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatVisibility | EnumChatVisibilityFieldRefInput<$PrismaModel>
    in?: $Enums.ChatVisibility[]
    notIn?: $Enums.ChatVisibility[]
    not?: NestedEnumChatVisibilityWithAggregatesFilter<$PrismaModel> | $Enums.ChatVisibility
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumChatVisibilityFilter<$PrismaModel>
    _max?: NestedEnumChatVisibilityFilter<$PrismaModel>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedEnumDocumentKindFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentKind | EnumDocumentKindFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentKind[]
    notIn?: $Enums.DocumentKind[]
    not?: NestedEnumDocumentKindFilter<$PrismaModel> | $Enums.DocumentKind
  }

  export type NestedEnumDocumentKindWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentKind | EnumDocumentKindFieldRefInput<$PrismaModel>
    in?: $Enums.DocumentKind[]
    notIn?: $Enums.DocumentKind[]
    not?: NestedEnumDocumentKindWithAggregatesFilter<$PrismaModel> | $Enums.DocumentKind
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDocumentKindFilter<$PrismaModel>
    _max?: NestedEnumDocumentKindFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type MessageCreateWithoutChatInput = {
    id?: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUncheckedCreateWithoutChatInput = {
    id?: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
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
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type StreamUncheckedCreateWithoutChatInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type StreamCreateOrConnectWithoutChatInput = {
    where: StreamWhereUniqueInput
    create: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
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
    chat_id?: StringFilter<"Message"> | string
    user_id?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    parts?: JsonFilter<"Message">
    metadata?: JsonNullableFilter<"Message">
    created_at?: DateTimeFilter<"Message"> | Date | string
    updated_at?: DateTimeFilter<"Message"> | Date | string
    attachments?: JsonNullableFilter<"Message">
    vote?: EnumVoteTypeNullableFilter<"Message"> | $Enums.VoteType | null
  }

  export type StreamUpsertWithoutChatInput = {
    update: XOR<StreamUpdateWithoutChatInput, StreamUncheckedUpdateWithoutChatInput>
    create: XOR<StreamCreateWithoutChatInput, StreamUncheckedCreateWithoutChatInput>
    where?: StreamWhereInput
  }

  export type StreamUpdateToOneWithWhereWithoutChatInput = {
    where?: StreamWhereInput
    data: XOR<StreamUpdateWithoutChatInput, StreamUncheckedUpdateWithoutChatInput>
  }

  export type StreamUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StreamUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateWithoutDocumentInput = {
    id?: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuggestionUncheckedCreateWithoutDocumentInput = {
    id?: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuggestionCreateOrConnectWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput
    create: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput>
  }

  export type SuggestionCreateManyDocumentInputEnvelope = {
    data: SuggestionCreateManyDocumentInput | SuggestionCreateManyDocumentInput[]
  }

  export type SuggestionUpsertWithWhereUniqueWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput
    update: XOR<SuggestionUpdateWithoutDocumentInput, SuggestionUncheckedUpdateWithoutDocumentInput>
    create: XOR<SuggestionCreateWithoutDocumentInput, SuggestionUncheckedCreateWithoutDocumentInput>
  }

  export type SuggestionUpdateWithWhereUniqueWithoutDocumentInput = {
    where: SuggestionWhereUniqueInput
    data: XOR<SuggestionUpdateWithoutDocumentInput, SuggestionUncheckedUpdateWithoutDocumentInput>
  }

  export type SuggestionUpdateManyWithWhereWithoutDocumentInput = {
    where: SuggestionScalarWhereInput
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyWithoutDocumentInput>
  }

  export type SuggestionScalarWhereInput = {
    AND?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[]
    OR?: SuggestionScalarWhereInput[]
    NOT?: SuggestionScalarWhereInput | SuggestionScalarWhereInput[]
    id?: StringFilter<"Suggestion"> | string
    document_id?: StringFilter<"Suggestion"> | string
    user_id?: StringFilter<"Suggestion"> | string
    original_text?: StringFilter<"Suggestion"> | string
    suggested_text?: StringFilter<"Suggestion"> | string
    description?: StringNullableFilter<"Suggestion"> | string | null
    is_resolved?: BoolFilter<"Suggestion"> | boolean
    document_created_at?: DateTimeFilter<"Suggestion"> | Date | string
    created_at?: DateTimeFilter<"Suggestion"> | Date | string
    updated_at?: DateTimeFilter<"Suggestion"> | Date | string
  }

  export type ChatCreateWithoutStreamInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutStreamInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type ChatCreateOrConnectWithoutStreamInput = {
    where: ChatWhereUniqueInput
    create: XOR<ChatCreateWithoutStreamInput, ChatUncheckedCreateWithoutStreamInput>
  }

  export type ChatUpsertWithoutStreamInput = {
    update: XOR<ChatUpdateWithoutStreamInput, ChatUncheckedUpdateWithoutStreamInput>
    create: XOR<ChatCreateWithoutStreamInput, ChatUncheckedCreateWithoutStreamInput>
    where?: ChatWhereInput
  }

  export type ChatUpdateToOneWithWhereWithoutStreamInput = {
    where?: ChatWhereInput
    data: XOR<ChatUpdateWithoutStreamInput, ChatUncheckedUpdateWithoutStreamInput>
  }

  export type ChatUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutStreamInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type AttachmentDocumentCreateWithoutSuggestionsInput = {
    id?: string
    user_id: string
    title: string
    content?: string | null
    kind: $Enums.DocumentKind
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttachmentDocumentUncheckedCreateWithoutSuggestionsInput = {
    id?: string
    user_id: string
    title: string
    content?: string | null
    kind: $Enums.DocumentKind
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type AttachmentDocumentCreateOrConnectWithoutSuggestionsInput = {
    where: AttachmentDocumentWhereUniqueInput
    create: XOR<AttachmentDocumentCreateWithoutSuggestionsInput, AttachmentDocumentUncheckedCreateWithoutSuggestionsInput>
  }

  export type AttachmentDocumentUpsertWithoutSuggestionsInput = {
    update: XOR<AttachmentDocumentUpdateWithoutSuggestionsInput, AttachmentDocumentUncheckedUpdateWithoutSuggestionsInput>
    create: XOR<AttachmentDocumentCreateWithoutSuggestionsInput, AttachmentDocumentUncheckedCreateWithoutSuggestionsInput>
    where?: AttachmentDocumentWhereInput
  }

  export type AttachmentDocumentUpdateToOneWithWhereWithoutSuggestionsInput = {
    where?: AttachmentDocumentWhereInput
    data: XOR<AttachmentDocumentUpdateWithoutSuggestionsInput, AttachmentDocumentUncheckedUpdateWithoutSuggestionsInput>
  }

  export type AttachmentDocumentUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AttachmentDocumentUncheckedUpdateWithoutSuggestionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    kind?: EnumDocumentKindFieldUpdateOperationsInput | $Enums.DocumentKind
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChatCreateWithoutMessagesInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    stream?: StreamCreateNestedOneWithoutChatInput
  }

  export type ChatUncheckedCreateWithoutMessagesInput = {
    id?: string
    user_id: string
    title?: string | null
    visibility?: $Enums.ChatVisibility
    created_at?: Date | string
    updated_at?: Date | string
    message_count?: number
    stream?: StreamUncheckedCreateNestedOneWithoutChatInput
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
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    stream?: StreamUpdateOneWithoutChatNestedInput
  }

  export type ChatUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    visibility?: EnumChatVisibilityFieldUpdateOperationsInput | $Enums.ChatVisibility
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    message_count?: IntFieldUpdateOperationsInput | number
    stream?: StreamUncheckedUpdateOneWithoutChatNestedInput
  }

  export type MessageCreateManyChatInput = {
    id?: string
    user_id: string
    role: string
    parts: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: $Enums.VoteType | null
  }

  export type MessageUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type MessageUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    parts?: JsonNullValueInput | InputJsonValue
    metadata?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    attachments?: NullableJsonNullValueInput | InputJsonValue
    vote?: NullableEnumVoteTypeFieldUpdateOperationsInput | $Enums.VoteType | null
  }

  export type SuggestionCreateManyDocumentInput = {
    id?: string
    user_id: string
    original_text: string
    suggested_text: string
    description?: string | null
    is_resolved?: boolean
    document_created_at?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type SuggestionUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    original_text?: StringFieldUpdateOperationsInput | string
    suggested_text?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    is_resolved?: BoolFieldUpdateOperationsInput | boolean
    document_created_at?: DateTimeFieldUpdateOperationsInput | Date | string
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