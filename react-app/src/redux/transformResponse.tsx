import { FetchBaseQueryMeta } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

export function transformSingleResponseToRightType<Type extends Object>(type: { new(): Type }, baseQueryReturnValue: Type, _meta: FetchBaseQueryMeta | undefined, _arg: any): Type {
    const toReturn = Object.assign(new type(), JSON.parse(JSON.stringify(baseQueryReturnValue)));
    return toReturn
}
export function transformMultipleResponseToRightType<Type extends Object>(type: { new(): Type }, baseQueryReturnValue: Type[], meta: FetchBaseQueryMeta | undefined, arg: any): Type[] {
    return baseQueryReturnValue.map(x => transformSingleResponseToRightType(type, x, meta, arg))
}