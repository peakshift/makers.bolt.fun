import { marked } from "marked";
import React from "react";
import Card from "src/Components/Card/Card";
import { purifyHtml } from "src/utils/validation";

const PRIVACY_POLICY = `
# **BOLT.FUN Privacy Policy**

1. **Personal Information**: We collect minimal personal information, specifically email addresses, from users who participate in our tournaments. These details are collected for the purpose of registration and communication related to the tournaments.

2. **Information Sharing**: For exclusive tournaments, we may share your email address and information about your participation with third-party organizations and companies that we help organize these tournaments for.

3. **Cookies**: Our analytics provider, plausible.io, may set cookies on your device. This is done to help us understand user behavior and improve our services.

4. **Security**: We use a key-based authentication system (LNURL) to ensure your security while using our platform. However, we cannot guarantee absolute security as no method of electronic storage or transmission is 100% secure.

5. **Data Retention**: We only retain personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.

6. **Rights**: As a data subject in the European Union, you have the right to access, rectify, or erase any personal data we have collected. Please contact us at [hackathons@peakshift.com](mailto:hackathons@peakshift.com) to exercise these rights.

This policy is subject to change and we recommend checking this page periodically for updates.
`;

export default function TermsAndConditionsPage() {
  return (
    <div className={`page-container `}>
      <Card id="content" onlyMd className="relative max-w-max mx-auto">
        <div
          className={`mt-42  prose`}
          dangerouslySetInnerHTML={{
            __html: purifyHtml(marked.parse(PRIVACY_POLICY)),
          }}
        ></div>
      </Card>
    </div>
  );
}
