// @ts-nocheck

type UnArray<T> = T extends Array<infer U> ? U : T;

export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType]: ObjectType[Key] extends object ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}` : Key;
}[keyof ObjectType];

export type NestedPick<T, K extends keyof T | unknown, KN extends keyof T, KNK extends keyof UnArray<T[KN]>> = Pick<T, K> & {
	[Key in KN]: T[KN] extends Array<infer U> ? Pick<U, KNK>[] : Pick<T[KN], KNK>;
};
