import React, { Component } from "react";
import { ReactNavbar } from "./Navbar/index";
import { Gallery, MyCrabs } from "../views";
import { Account } from "./";

export default ({
  address,
  price,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  injectedProvider,
  blockExplorer,
  networkDisplay,
  connected,
  setConnected,
}) => {
  const social = [
    {
      name: "Twitter",
      url: "https://twitter.com/Crabrades",
      icon: ["fab", "twitter"],
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/crabrades/",
      icon: ["fab", "instagram"],
    },
    {
      name: "Discord",
      url: "https://discord.gg/BxKYxNT8JS",
      icon: ["fab", "discord"],
    },
  ];
  const account = (
    <Account
      // style={{ marginRight: "0.5rem" }}
      address={address}
      localProvider={injectedProvider}
      userProvider={injectedProvider}
      mainnetProvider={injectedProvider}
      price={price}
      web3Modal={web3Modal}
      loadWeb3Modal={loadWeb3Modal}
      logoutOfWeb3Modal={logoutOfWeb3Modal}
      blockExplorer={blockExplorer}
      networkDisplay={networkDisplay}
      {...{ connected, setConnected }}
    />
  );
  // const color = "rgb(25, 25, 25)";
  const logo = "img/crabgif.gif";
  return (
    <>
      {connected && (
        <ReactNavbar
          menu={[
            { name: "Home", to: "/" },
            { name: "My Crabrades", to: "/yourcollectibles" },
            { name: "Clawlery", to: "/gallery" },
            // { name: "Crabmap", a: "/#crabmap" },
            // { name: "F.C.Q.", a: "/#fcq" },
          ]}
          {...{ social, account, logo }}
        />
      )}
      {!connected && (
        <ReactNavbar
          menu={[
            { name: "Home", to: "/" },
            // { name: "Crabmap", a: "/#crabmap" },
            // { name: "F.C.Q.", a: "/#fcq" },
          ]}
          {...{ social, account, logo }}
        />
      )}
    </>
  );
};
