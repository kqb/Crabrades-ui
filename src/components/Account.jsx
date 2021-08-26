import { Button } from "antd";
import React from "react";
// import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    address={address}
    localProvider={localProvider}
    userProvider={userProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

export default function Account({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
  networkDisplay,
  setConnected,
  connected,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      setConnected(true);
      modalButtons.push(
        <button className="btn btn-sm" onClick={logoutOfWeb3Modal}>
          Logout
        </button>,
      );
    } else {
      setConnected(false);
      modalButtons.push(
        <button className="btn btn-sm" onClick={loadWeb3Modal}>
          Web3 Connect
        </button>,
      );
    }
  }

  // const { currentTheme } = useThemeSwitcher();

  const display = minimized ? (
    ""
  ) : (
    <>
      {networkDisplay}

      {address ? <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} /> : <button class="btn btn-sm btn-circle loading"> </button>}
      {price && <Balance address={address} provider={localProvider} price={price} />}
    </>
  );

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {display}
      {modalButtons}
    </div>
  );
}
