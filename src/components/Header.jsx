import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <PageHeader
      title="🦀 Crabrades"
      // subTitle="👩‍🔬 Buyer pays to mint NFT example"
      style={{ cursor: "pointer" }}
    />
  );
}
