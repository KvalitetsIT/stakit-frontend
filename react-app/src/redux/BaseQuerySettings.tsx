import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../config/env";
import keycloak from "../feature/authentication/Keycloak";

//const baseurl = getEnvironment().REACT_APP_API_BASEURL;
const baseurl =  getEnvironment().REACT_APP_API_BASEURL ?? "http://localhost:8080/v1/"

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            //const token = keycloak.token
            const token = "eyJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2ODI1OTUwMTgsImV4cCI6MTY4MjYwNTgxOCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.wMHT4CCZCa49nOdXT6XKKHut8uUk8SxnpLPyHdBaOP8kTDbtVjMWCJwKtgZSRmp64CCtusyhJ4YE76wYYtkwDCV1sL3ocps8j8KAJTgJZqTp-uj8Hzqvw-iqi3Tlfql71gM2u8bBP9LSYEqLLzzOUCUev2oLaxtzze5OAhc2f8SFBlKzM0RFViLrinkl7-JZ-Ngl-qtdd3TQKkHsDNGSUjkVCqEJFl7j5w3tCUchUKY76O-kwcqXAbQhdFxxRRwHqkHeEYPbDddIYM0hP85-TT6uawJGkeWJi3iAkxPzsrugQFSFdPeCZvj55v4lLISnqorFux1JqR26KKWjAIbb_A" // <-- fake token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



