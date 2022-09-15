
import { CONSTS } from "src/utils";

export async function fetchLnurlAuth() {
    const res = await fetch(CONSTS.apiEndpoint + '/get-login-url', {
        credentials: 'include'
    })
    const data = await res.json()
    return data;
}

export async function fetchIsLoggedIn(session_token: string) {
    const res = await fetch(CONSTS.apiEndpoint + '/is-logged-in', {
        credentials: 'include',
        headers: {
            session_token
        }
    });
    const data = await res.json();
    return data.logged_in;
}