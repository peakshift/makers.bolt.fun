import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  title?: string | null;
  description?: string | null;
  image?: string | null;
  lightning_address?: string | null;
}

export default function OgTags(props: Props) {
  return (
    <Helmet>
      {props.title && <title>{props.title}</title>}
      {props.title && <meta property="og:title" content={props.title!} />}
      {props.description && (
        <meta name="description" content={props.description!} />
      )}
      {props.description && (
        <meta property="og:description" content={props.description!} />
      )}
      {props.image && <meta property="og:image" content={props.image} />}
      {props.lightning_address && (
        <meta name="lightning" content={`lnurlp:${props.lightning_address}`} />
      )}
    </Helmet>
  );
}
