import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../config/env";
import keycloak from "../feature/authentication/Keycloak";

const baseurl =  getEnvironment().REACT_APP_API_BASEURL ?? "http://localhost:8080/v1/"

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            //const token = keycloak.token
            const token = "eyJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2ODM3MTAxNzUsImV4cCI6MTY4MzcyMDk3NSwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.aTCQj0LnS7EhpkLpCESWPwfoF2aAhVazBc3fNBHgIOzIjMSQbpItj6yPER0hDWtER-P_SsDSoXNf6JD5EBJ-7IpAeNWuj-WoWLPOqXx2oxc7NV4GzNdO2-HltTHPH34Jbq-5Pr8j7HIDuWEE3du_bh3xJxIAlM3NCeni7T1cVczUXk6V18z34oFzz5TAbGtamjGA0a4U1HKO8gi8NBVhFGPtygVak9Kg-yq9V6JqdABx4i74NbcivFyX_Si3rQ6MlV4spLsiVLWmBLaLRuS0N0-8qYgX51Zv5lRwHIyWMbjpVswOZtLM9E3DP7-FJbt4p2wiQ2QNVaS_r0rypHF0nw" // <-- fake token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



