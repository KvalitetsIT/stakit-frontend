import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../config/env";
import keycloak from "../feature/authentication/Keycloak";

//const baseurl = getEnvironment().REACT_APP_API_BASEURL;
const baseurl =  getEnvironment().REACT_APP_API_BASEURL ?? "https://stakit.t0.hosting.kitkube.dk/api/v1/"

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            const token = keycloak.token
            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" // <-- fake token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



