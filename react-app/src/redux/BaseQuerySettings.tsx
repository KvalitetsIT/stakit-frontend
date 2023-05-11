import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import getEnvironment from "../config/env";
import keycloak from "../feature/authentication/Keycloak";

const baseurl = getEnvironment().REACT_APP_API_BASEURL ?? "http://localhost:8080/v1/"

export default function fetchDefaultBaseQuery() {
    return fetchBaseQuery({
        mode: "cors",
        baseUrl: baseurl,
        prepareHeaders: (headers, api) => {
            const token = keycloak.token
            //const token = "eyJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2ODM3ODg5NTksImV4cCI6MTY4Mzc5OTc1OSwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.Xqal4xa7YKe6GfoSH9BIajZsQcYInlHjS37JlrHcdXKTaKzo8IxJP9VrIVAEJNmL6vsHGIJahLwYWwpcDbU1dumuy1PsCYbno4TgU_Br3t00yv4rjNPsIG73XQG1X1iKMSVKq2QPbiPH_3KRX1Ox0RGcBlmHTwQf9TWLDFHHHMI3iF5Lnm0rDgdtFV_mnjH25cJUZegJ8AX_X-nZYgKUhp94JvrceiARn5jJEqkinl8lni-toJ9F7yVWKD6VWHr54qdMaM-MpAKM_hsa5zUhWu3OShBemtvT5v_HZhvUDokvZgOlUeObytLtIO-7--bRdMF_k-xObcXYJoQa8jEW_A" //<-- fake token

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



