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
            const token = keycloak.token
            //const token = "eyJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2ODMxMTYzMzQsImV4cCI6MTY4MzEyNzEzNCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.DqOBXxMLOZpyZLbYOMe5UTRbae8tDEW0brIUc7FmRYo6eam8QxIUQXplq2G3DKbWBdX5HiyUwG-NKPDzwnb1P4qOIMUSVAKJkcy7Ik-2RROVWrL5-267qwL6BBViE7ENCmIyQaabkWYFkoU5q7jVHRADvrqjYgEv9I7dhIfWTgecstlJmFyUjDiVW9vcqrl4v-mFPZhmASOslIJAR9Zn6Ei9sfTuiy53ndWsW2rWYWjK9xBdmyvmW9osza4WlHRy5WQcW64nmxWEGHx73Xo3JJPhhQrP45XdA_TMW75UwoqWf8iohof2l5b1pebYeyYcQA-1SnY1aDtqqd-8-q75JQ" // <-- fake token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



