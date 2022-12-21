import { BaseQueryResult, BaseQueryMeta, BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export function transformSingleResponseToRightType<Type>(type: { new(): Type }, baseQueryReturnValue: Type, meta: FetchBaseQueryMeta | undefined, arg: any): Type {
    return Object.assign(new type(), JSON.parse(JSON.stringify(baseQueryReturnValue)));
}
export function transformMultipleResponseToRightType<Type>(type: { new(): Type }, baseQueryReturnValue: Type[], meta: FetchBaseQueryMeta | undefined, arg: any): Type[] {
    return baseQueryReturnValue.map(x => transformSingleResponseToRightType(type, x, meta, arg))
}
