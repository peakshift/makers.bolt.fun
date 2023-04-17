import express, { Request, Response, NextFunction } from "express";
import { SignJWT } from "jose";
import serverless from "serverless-http";
import { createExpressApp } from "../../modules";
import { JWT_SECRET } from "../../utils/consts";
import extractUserFromCookie from "../../utils/extractUserFromCookie";
import { getUserById } from "../../auth/utils/helperFuncs";
import LnurlAuthService from "../../auth/services/lnurlAuth.service";
import { prisma } from "../../prisma";

const getLoginUrl = async (req: Request, res: Response, next: NextFunction) => {
  //   const { action } = req.query;

  try {
    // let user_token: string | null = null;

    // if (action === "link") {
    //   const userPayload = await extractUserFromCookie(
    //     req.headers.cookie ?? (req.headers.Cookie as string)
    //   );
    //   const user = await getUserById(userPayload?.id);

    //   if (!user) {
    //     return res
    //       .status(400)
    //       .json({
    //         status: "ERROR",
    //         reason: "Only authenticated user can request a linking URL",
    //       });
    //   }

    //   user_token = await new SignJWT({ user_id: user.id })
    //     .setProtectedHeader({ alg: "HS256" })
    //     .setIssuedAt()
    //     .setExpirationTime("5min")
    //     .sign(Buffer.from(JWT_SECRET, "utf-8"));
    // }

    // const data = await LnurlAuthService.generateAuthUrl({ user_token });

    // const session_token = await new SignJWT({ hash: data.secretHash })
    //   .setProtectedHeader({ alg: "HS256" })
    //   .setIssuedAt()
    //   .setExpirationTime("5min")
    //   .sign(Buffer.from(JWT_SECRET, "utf-8"));

    const user = await prisma.user.findFirst();

    return res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

let app;

if (process.env.LOCAL) {
  app = createExpressApp();
  app.get("/get-login-url", getLoginUrl);
} else {
  const router = express.Router();
  router.get("/get-login-url", getLoginUrl);
  app = createExpressApp(router);
}

const _handler = serverless(app);

export const handler = async (event: any, context: any) => {
  return await _handler(event, context);
};
