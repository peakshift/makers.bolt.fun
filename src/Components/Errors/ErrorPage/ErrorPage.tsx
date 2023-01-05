import React from "react";
import { Helmet } from "react-helmet";
import ErrorCard from "../ErrorCard/ErrorCard";

export default function ErrorPage() {
  return (
    <div className="">
      <Helmet>
        <title>{`Something went wrong...`}</title>
      </Helmet>
      <div className="page-container">
        <ErrorCard />
      </div>
    </div>
  );
}
