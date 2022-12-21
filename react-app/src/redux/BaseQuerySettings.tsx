import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import keycloak from "../feature/Keycloak/Keycloak";

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",

        prepareHeaders: (headers, api) => {
            const token = keycloak.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    })
}