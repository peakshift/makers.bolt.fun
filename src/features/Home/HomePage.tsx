import React from "react";
import OgTags from "src/Components/OgTags/OgTags";

export default function HomePage() {
  return (
    <>
      <OgTags
        title="Welcome to Bolt Fun"
        description="A FUN community for the makers and designers in the Bitcoin & Nostr space"
      />

      <div className={`page-container`}>
        <h1 className="text-h1 text-center">Welcome To Bolt🔩Fun Home</h1>
      </div>
    </>
  );
}
