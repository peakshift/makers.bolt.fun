import { CONSTS } from "src/utils";

export async function fetchLnurlAuth(options?: { action?: "link" }) {
  const url =
    CONSTS.apiEndpoint +
    "/get-login-url" +
    (options?.action && options.action === "link" ? `?action=link` : "");

  const res = await fetch(url, {
    credentials: "include",
  });
  const data = await res.json();
  return data;
}

export async function fetchIsLoggedIn(session_token: string) {
  const res = await fetch(CONSTS.apiEndpoint + "/is-logged-in", {
    credentials: "include",
    headers: {
      session_token,
    },
  });
  const data = await res.json();
  return data.logged_in;
}

export async function requestOTP(
  args: { email: string } | { nostrPubkey: string; relay?: string }
) {
  const res = await fetch(CONSTS.apiEndpoint + "/request-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  return data;
}

export async function loginWithEmailOTP(email: string, otp: string) {
  const res = await fetch(CONSTS.apiEndpoint + "/login-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw data;
  }

  return data;
}

export async function loginWithNostrOTP(pubkey: string, otp: string) {
  const res = await fetch(CONSTS.apiEndpoint + "/login-otp", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nostr_pubkey: pubkey, otp }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw data;
  }

  return data;
}

export async function linkEmailToAccount(email: string, otp: string) {
  const res = await fetch(CONSTS.apiEndpoint + "/link-email", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (res.status !== 200) {
    throw data;
  }

  return data;
}
