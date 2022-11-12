
import { CONSTS } from "src/utils";

export async function fetchLnurlAuth(options?: { action?: "link" }) {

    const url = CONSTS.apiEndpoint + '/get-login-url'
        + ((options?.action && options.action === 'link') ? `?action=link` : "")

    const res = await fetch(url, {
        credentials: 'include',
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