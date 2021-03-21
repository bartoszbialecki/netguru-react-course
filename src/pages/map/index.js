import React from "react";
import Page from "../../components/Page";
import MapMediator from "./mediator";

export default function MapPage() {
  return (
    <>
      <MapMediator />
      <Page />;
    </>
  );
}
