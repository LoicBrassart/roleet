/**
 * Utility type representing an object with string keys and unknown values.
 * Used as a base constraint for object types.
 *
 * @example
 * ```ts
 * const obj: UnknownRecord = { name: "John", age: 25 };
 * ```
 */
export type UnknownRecord = Record<string, unknown>;
/**
 * Utility that "flattens" an intersection type for better IDE readability.
 * Removes type intersections (&) and replaces them with a unified object.
 *
 * The intersection with `{}` forces TypeScript to immediately evaluate the mapped type,
 * which improves display in tooltips and error messages.
 *
 * @template T - The object type to "flatten"
 *
 * @example
 * ```ts
 * type User = { name: string } & { age: number };
 * type PrettifiedUser = Prettify<User>; // { name: string; age: number }
 *
 * // Instead of seeing "{ name: string } & { age: number }" in the IDE,
 * // we see "{ name: string; age: number }"
 * ```
 */
export type Prettify<T extends UnknownRecord> = {
    [K in keyof T]: T[K];
} & {};
/**
 * Utility that detects if a type is exactly `any`.
 *
 * Principle: The `any` type has the unique property of being assignable to any intersection,
 * even impossible ones like `0 extends (1 & any)` which evaluates to `true` only if `any` is present.
 *
 * @template T - The type to test
 *
 * @example
 * ```ts
 * type Test1 = IsAny<any>;       // true
 * type Test2 = IsAny<unknown>;   // false
 * type Test3 = IsAny<string>;    // false
 * type Test4 = IsAny<object>;    // false
 *
 * // Usage in a conditional type
 * type SafeType<T> = IsAny<T> extends true ? never : T;
 * ```
 */
export type IsAny<T> = 0 extends 1 & T ? true : false;
/**
 * Utility that checks if an object type has an `id` property.
 * Useful for distinguishing entities with identifiers from simple objects.
 *
 * @template T - The object type to test (must extend UnknownRecord)
 *
 * @example
 * ```ts
 * type User = { id: string; name: string };
 * type Config = { theme: string };
 *
 * type Test1 = HasID<User>;    // true
 * type Test2 = HasID<Config>;  // false
 *
 * // Conditional usage
 * type EntityOrValue<T> = HasID<T> extends true ? "entity" : "value";
 * ```
 */
export type HasID<T extends UnknownRecord> = T extends {
    id: unknown;
} ? true : false;
/**
 * Extracts only primitive properties from an object (non-objects).
 * Filters out properties that are nested objects, keeping only primitive types.
 *
 * Useful for separating simple data from relations in GraphQL entities.
 *
 * @template T - The source object type
 *
 * @example
 * ```ts
 * type User = {
 *   id: string;
 *   name: string;
 *   profile: { bio: string };
 *   posts: Post[];
 * };
 *
 * type UserPrimitives = RemoveRels<User>;
 * // { id: string; name: string }
 * // (profile and posts are excluded because they are objects)
 * ```
 */
export type RemoveRels<T extends UnknownRecord> = {
    [K in keyof T as T[K] extends UnknownRecord ? never : K]: T[K];
};
/**
 * Union type representing all primitive JavaScript types.
 * Includes string, number, boolean, null, and undefined.
 *
 * @example
 * ```ts
 * type Test1 = Primitive; // string | number | boolean | null | undefined
 *
 * function isPrimitive<T>(value: T): value is T extends Primitive ? T : never {
 *   return typeof value !== 'object' || value === null;
 * }
 * ```
 */
export type Primitive = string | number | boolean | null | undefined;
/**
 * Validates that a type is either:
 * - The `any` type (always allowed)
 * - A primitive type (string, number, boolean, null, undefined)
 * - An object with an `id` property
 *
 * Returns an error message string if the type doesn't meet these criteria.
 * Used for compile-time validation in other utility types.
 *
 * @template T - The type to validate
 *
 * @example
 * ```ts
 * type Test1 = PrimitiveOrAnyOrRecordWithId<string>;              // string
 * type Test2 = PrimitiveOrAnyOrRecordWithId<{ id: string }>;      // { id: string }
 * type Test3 = PrimitiveOrAnyOrRecordWithId<{ name: string }>;    // "❌ Record has no id property"
 * type Test4 = PrimitiveOrAnyOrRecordWithId<any>;                 // any
 * ```
 */
export type PrimitiveOrAnyOrRecordWithId<T> = IsAny<T> extends true ? T : T extends Primitive ? T : T extends UnknownRecord ? HasID<T> extends true ? T : "❌ Record has no id property" : "❌ Not a primitive or record with id";
/**
 * Transforms an object by replacing nested object properties with their IDs.
 * Converts object relations to ID references, a common pattern in APIs.
 *
 * **Type Safety**: All object properties must either be primitives or objects with an `id` field.
 * The constraint ensures compile-time validation of the input type structure.
 *
 * Logic:
 * - If the property is `any` → keep the original key and value
 * - If the property is a primitive → keep as-is
 * - If the property is an object with `id` → rename key to `${key}Id` and extract the ID value
 * - If the property is an object without `id` → compile-time error
 *
 * @template T - The source object type (must satisfy validation constraints)
 *
 * @example
 * ```ts
 * // ✅ Valid usage:
 * type GoodMessage = {
 *   id: string;
 *   content: string;
 *   author: { id: string; name: string };
 *   campaign: { id: string; title: string };
 *   createdAt: string;
 * };
 *
 * type MessageIDs = FlattenIds<GoodMessage>;
 * // Result: {
 * //   id: string;
 * //   content: string;
 * //   authorId: string;      // author.id
 * //   campaignId: string;    // campaign.id
 * //   createdAt: string;
 * // }
 *
 * // ❌ Invalid usage (will cause TypeScript error):
 * type BadMessage = {
 *   content: string;
 *   metadata: { version: number }; // object without 'id' property
 * };
 *
 * type BadMessageIDs = FlattenIds<BadMessage>; // Error!
 * // The constraint will fail because metadata doesn't have an 'id' property
 *
 * // Useful for WebSocket payloads, normalized stores, or API transformations
 * ```
 */
export type FlattenIds<T extends {
    [K in keyof T]: PrimitiveOrAnyOrRecordWithId<T[K]>;
}> = {
    [K in keyof T as IsAny<T[K]> extends true ? K : T[K] extends UnknownRecord ? K extends string ? `${K}Id` : K : K]: T[K] extends UnknownRecord ? T[K]["id"] : T[K];
};
/**
 * Creates a "create input" type by omitting auto-generated fields from an entity type.
 * Removes the `id` field and all timestamp fields ending with "At" (createdAt, updatedAt, etc.).
 *
 * This is commonly used for API input types where certain fields are auto-generated
 * by the backend and shouldn't be provided by the client.
 *
 * **Pattern matching**: Uses template literal type `${string}At` to match any field
 * ending with "At", which is a common naming convention for timestamp fields.
 *
 * @template T - The source entity type to transform
 *
 * @example
 * ```ts
 * // ✅ Common usage with entity types:
 * type User = {
 *   id: string;
 *   name: string;
 *   email: string;
 *   createdAt: Date;
 *   updatedAt: Date;
 *   lastLoginAt: Date;
 * };
 *
 * type CreateUserInput = CreateInput<User>;
 * // Result: {
 * //   name: string;
 * //   email: string;
 * // }
 * // (id, createdAt, updatedAt, lastLoginAt are omitted)
 *
 * // ✅ Works with any timestamp naming:
 * type Post = {
 *   id: number;
 *   title: string;
 *   publishedAt: Date;
 *   archivedAt: Date | null;
 * };
 *
 * type CreatePostInput = CreateInput<Post>;
 * // Result: {
 * //   title: string;
 * // }
 * // (id, publishedAt, archivedAt are omitted)
 *
 * // ✅ Safe with fields that don't match the pattern:
 * type Product = {
 *   id: string;
 *   name: string;
 *   category: string; // "At" in middle, not end - kept
 *   location: string; // doesn't end with "At" - kept
 *   createdAt: Date;  // ends with "At" - omitted
 * };
 *
 * type CreateProductInput = CreateInput<Product>;
 * // Result: {
 * //   name: string;
 * //   category: string;
 * //   location: string;
 * // }
 *
 * // Useful for GraphQL mutations, REST POST endpoints, form types
 * ```
 */
export type CreateInput<T extends UnknownRecord> = Omit<T, "id" | `${string}At`>;
