import { FetchArgs } from "@reduxjs/toolkit/dist/query";
import { PaginationParams } from "../models/API/PaginationParams";

class propsStuff {
    body?: any
    pagination?: PaginationParams
}

export default function HandleQuery(args: FetchArgs & propsStuff): FetchArgs {
    args.body = JSON.stringify(args.body)
    // if (args.pagination)
    //     args.url = args.pagination.getQuery(args.url)

    return args;
}
