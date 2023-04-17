import cookie from "cookie";
import { jwtVerify } from "jose";
import { JWT_SECRET } from "./consts";

interface UserPayload {
  pubKey: string;
  userId: string;
}

const extractUserFromCookie = async (
  cookieHeader?: string
): Promise<{ pubKey: string; id: string } | null> => {
  const cookies = cookie.parse(cookieHeader ?? "");
  const token = cookies.Authorization;

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        Buffer.from(JWT_SECRET, "utf-8"),
        {
          algorithms: ["HS256"],
        }
      );

      if (isValidPayload(payload)) {
        return { pubKey: payload.pubKey, id: payload.userId };
      }
    } catch (error) {
      return null;
    }
  }

  return null;
};

function isValidPayload(payload: unknown): payload is UserPayload {
  return (
    typeof payload === "object" &&
    payload !== null &&
    "pubKey" in payload &&
    "userId" in payload
  );
}

export default extractUserFromCookie;
