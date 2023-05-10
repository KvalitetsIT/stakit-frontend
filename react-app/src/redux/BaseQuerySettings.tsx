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
            //const token = "eyJhbGciOiJSUzI1NiJ9.eyJuYmYiOjE2ODM3MjQ3NTAsImV4cCI6MTY4MzczNTU1MCwiYXVkIjoiYXVkaWVuY2UiLCJpc3MiOiJpc3N1ZXIiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20ifQ.nTio4DcbSiUIrzzRw84vwXpnvD7O6y8_M0yQawpmh4lOpDKQTI8V5FyQBzrToqZDA2AHjCMH8RAw3tggAu6MpoqLokYZ8BgUiD77kHkc2llG73c9V6AOb6Dz8tClMB8_SwzMRH6buQ_mDwfnHsc1sKtmX2S2c0zZeXRniwEzADRbERVZ4K1b2riwQy8L_DTCwsfnBbGOwffrE1zick1y4z8rIRrPPRcL_MupnRiP439AVXVJVBDIpu2kPVvYrMK1T1RiuLRdB-OPucO7vZdcwB_S_5AXVZMOrhyvX02q1tCoLHjaKpRXwM8DJ_FrDCl-B9g9U61v30pdsokLaU6sEw"// <-- fake token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            headers.set("Content-Type", "application/json")
            return headers;
        }
    })
}



