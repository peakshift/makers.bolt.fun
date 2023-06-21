import { marked } from "marked";
import React from "react";
import Card from "src/Components/Card/Card";
import { purifyHtml } from "src/utils/validation";

const TERMS_CONDITIONS = `
# **BOLT.FUN Terms & Conditions**

1. **Acceptance of Terms**: By using the services provided by BOLT.FUN, operated by Peak Shift LTD., you agree to abide by these Terms & Conditions. If you do not agree to all of these terms, please do not use the service.

2. **Registration**: You may access our platform using an anonymous key based authentication (LNURL). No personal details are required for Profiles and it is possible to use our platform anonymously.

3. **Content Ownership**: Participants posting "Stories" on our public forum retain their rights to the content they create. By posting "Stories", you grant BOLT.FUN a non-exclusive, worldwide, royalty-free license (with the right to sublicense) to use, copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute your content in any and all media or distribution methods.

4. **Content Responsibility**: You are responsible for the content you post and for any consequences thereof. BOLT.FUN does not take responsibility for the content posted by its users.

5. **Tournaments**: We have two types of tournaments - open and exclusive. For tournament registration, users are required to add their email address to their profile. These email addresses may be shared with other organizations and companies for the exclusive tournaments we help organize.

6. **Comment Deletion**: Comments on stories cannot be deleted as they are posted to an external decentralized system called Nostr.

7. **Data Analytics**: We use the plausible.io hosted service for analytics, which may set cookies on your computer. By using our service, you consent to the use of these cookies.

8. **Governing Law**: These Terms & Conditions are governed by the laws of Bulgaria and the European Union.
`;

export default function PrivacyPolicyPage() {
  return (
    <div className={`page-container `}>
      <Card id="content" onlyMd className="relative max-w-max mx-auto">
        <div
          className={`mt-42  prose`}
          dangerouslySetInnerHTML={{
            __html: purifyHtml(marked.parse(TERMS_CONDITIONS)),
          }}
        ></div>
      </Card>
    </div>
  );
}
