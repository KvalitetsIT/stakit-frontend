import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../env";
import keycloak from "../feature/Keycloak/Keycloak";


const baseurl = getEnvironment().REACT_APP_API_BASEURL;


export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            const token = keycloak.token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        }
    })
}