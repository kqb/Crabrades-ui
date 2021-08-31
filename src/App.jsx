import { LinkOutlined } from "@ant-design/icons";
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatEther, parseEther } from "@ethersproject/units";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Alert, Button, Card, List } from "antd";
import "antd/dist/antd.css";
import { useUserAddress } from "eth-hooks";
import { utils } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Web3Modal from "web3modal";
import "./App.css";

import assets from "./assets.js";
import { Address, Contract, Navbar } from "./components";
import { Home, MyCrabs, Gallery } from "./views";
import { INFURA_ID, NETWORKS } from "./constants";
import { Transactor } from "./helpers";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useGasPrice,
} from "./hooks";

const nftImg = ({ image }) => (
  <div>
    <LazyLoadImage
      style={image.style}
      alt={image.alt}
      height={image.height}
      src={image.src} // use normal <img> attributes as props
      width={image.width}
    />
    <span>{image.caption}</span>
  </div>
);
const { BufferList } = require("bl");
// https://www.npmjs.com/package/ipfs-http-client
const ipfsAPI = require("ipfs-http-client");

const ipfs = ipfsAPI({ host: "ipfs.infura.io", port: "5001", protocol: "https" });
const ipfsGateway = "https://cloudflare-ipfs.com/ipfs/";
console.log("📦 Assets: ", assets);

/*
    Welcome to 🏗 scaffold-eth !

    Code:
    https://github.com/austintgriffith/scaffold-eth

    Support:
    https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA
    or DM @austingriffith on twitter or telegram

    You should get your own Infura.io ID and put it in `constants.js`
    (this is your connection to the main Ethereum network for ENS etc.)


    🌏 EXTERNAL CONTRACTS:
    You can also bring in contract artifacts in `constants.js`
    (and then use the `useExternalContractLoader()` hook!)
*/

/// 📡 What chain are your contracts deployed to?
const targetNetwork = NETWORKS.mainnet; // <------- select your target frontend network (localhost, rinkeby, xdai, mainnet)
// 😬 Sorry for all the console logging
const DEBUG = false;

// helper function to "Get" from IPFS
// you usually go content.toString() after this...
const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    console.log(content);
    return content;
  }
};

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const injectedProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const injectedProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
const mainnetInfura = new StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

// const getRandProviderUrl = () => targetNetwork.rpcUrl[Math.floor(Math.random() * targetNetwork.rpcUrl.length)];
// 🏠 Your local provider is usually pointed at your local blockchain
// let injectedProviderUrl = getRandProviderUrl();
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
// const injectedProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : injectedProviderUrl;
// if (DEBUG) console.log("🏠 Connecting to provider:", injectedProviderUrlFromEnv);
// const injectedProvider = new StaticJsonRpcProvider(injectedProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "homestead", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID,
      },
    },
  },
});

const logoutOfWeb3Modal = async () => {
  await web3Modal.clearCachedProvider();
  setTimeout(() => {
    window.location.reload();
  }, 1);
};

function App(props) {
  // scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  const [connected, setConnected] = useState(false);

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  // const injectedProvider = useinjectedProvider(injectedProvider);
  const address = useUserAddress(injectedProvider);
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = false;

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "normal");

  // You can warn the user if you would like them to be on a specific network
  const localChainId = 1;
  // const selectedChainId = injectedProvider && injectedProvider._network && injectedProvider._network.chainId;
  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(injectedProvider, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  const faucetTx = Transactor(injectedProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(injectedProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(injectedProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(injectedProvider);

  // If you want to make 🔐 write transactions to your contracts, use the injectedProvider:
  const writeContracts = useContractLoader(injectedProvider);


  // keep track of a variable from the contract in the local React state:
  const balance = useContractReader(readContracts, "Crabrades", "balanceOf", [address]);
  console.log("🤗 balance:", balance);

  // 📟 Listen for broadcast events
  const transferEvents = useEventListener(readContracts, "Crabrades", "Transfer", injectedProvider, 1);
  console.log("📟 Transfer events:", transferEvents);

  //
  // 🧠 This effect will update crabrades by polling when your balance changes
  //
  const maxSupply = 9999;
  const maxReserved = 35;

  const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [crabrades, setCrabrades] = useState();
  const [mintPrice, setMintPrice] = useState(false);
  const [supply, setSupply] = useState(false);
  // const [maxSupply, setMaxSupply] = useState(false);
  // const [reserved, setResrved] = useState(false);
  const [mintAmount, setMintAmount] = useState(5);

  useEffect(() => {
    if (
      injectedProvider &&
      injectedProvider.networks &&
      ((injectedProvider.networks.name === targetNetwork.name) || (injectedProvider.networks.name === "homestead" )) &&
      readContracts.Crabrades &&
      !mintPrice
    )
      (async () => {
        const mp = await readContracts.Crabrades.getPrice();
        // const reserved = await readContracts.Crabrades.getRemainingReserved();
        const supply = await readContracts.Crabrades.totalSupply();

        // setResrved(reserved);
        setSupply(supply);
        setMintPrice(formatEther(mp));
      })();
  }, [mintPrice, readContracts]);

  useEffect(() => {
    const updateCrabrades = async () => {
      const collectibleUpdate = [];
      for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
        try {
          console.log("GEtting token index", tokenIndex);
          const tokenId = await readContracts.Crabrades.tokenOfOwnerByIndex(address, tokenIndex);
          console.log("tokenId", tokenId);
          const tokenURI = await readContracts.Crabrades.tokenURI(tokenId);
          console.log("tokenURI", tokenURI);

          let data = {};
          try {
            const result = await axios.get(tokenURI);
            data = result.data;
            data.image = data.image.replace("ipfs://", ipfsGateway);
          } catch (e) {
            console.log(e);
          }

          collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...data });
        } catch (e) {
          console.log(e);
        }
      }
      setCrabrades(collectibleUpdate);
    };
    updateCrabrades();
  }, [address, yourBalance]);

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      injectedProvider &&
      address &&
      yourLocalBalance &&
      yourMainnetBalance &&
      readContracts &&
      writeContracts
      // &&
      // mainnetDAIContract
    ) {
      console.log("_____________________________________ Creb _____________________________________");
      console.log("🌎 injectedProvider", injectedProvider);
      console.log("👩‍💼 selected address:", address);
      console.log("📝 readContracts", readContracts);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    injectedProvider,
    address,
    yourLocalBalance,
    yourMainnetBalance,
    readContracts,
    writeContracts,
    // mainnetDAIContract,
  ]);

  const [networkDisplay, setNetworkDisplay] = useState("");

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);
  useEffect(() => {
    loadWeb3Modal();
  }, []);
  useEffect(() => {
    if (injectedProvider && injectedProvider.network && (injectedProvider.network.name !== targetNetwork.name && injectedProvider.network.name !== "homestead")) {
      setNetworkDisplay(
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{injectedProvider.network.name}</b> selected and you need to be on{" "}
                <b>{targetNetwork.name && targetNetwork.name}</b>.
              </div>
            }
            type="error"
            closable={false}
          />
        </div>,
      );
      loadWeb3Modal();
    }
  }, [injectedProvider, injectedProvider && injectedProvider.network]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  let faucetHint = "";
  const faucetAvailable = injectedProvider && injectedProvider.connection && targetNetwork.name === "localhost";

  const [faucetClicked, setFaucetClicked] = useState(false);
  if (
    !faucetClicked &&
    injectedProvider &&
    injectedProvider._network &&
    injectedProvider._network.chainId === 31337 &&
    // yourLocalBalance &&
    formatEther(yourLocalBalance) <= 0
  ) {
    faucetHint = (
      <div style={{ padding: 16 }}>
        <Button
          type="primary"
          onClick={() => {
            faucetTx({
              to: address,
              value: parseEther("0.01"),
            });
            setFaucetClicked(true);
          }}
        >
          💰 Grab funds from the faucet ⛽️
        </Button>
      </div>
    );
  }


  const [transferToAddresses, setTransferToAddresses] = useState({});
  const [loadedAssets, setLoadedAssets] = useState();

  useEffect(() => {
    const updateCrabrades = async () => {
      const assetUpdate = [];
      for (const a in transferEvents) {
        try {
          let transfer = transferEvents[a];
          let owner;
          const tokenURI = await readContracts.Crabrades.tokenURI(transfer[2]);
          owner = await readContracts.Crabrades.ownerOf(transfer[2].toNumber());
          let data = {};
          try {
            const result = await axios.get(tokenURI);
            data = result.data;
            data.image = data.image.replace("ipfs://", ipfsGateway);
          } catch (e) {
            console.log(e);
          }
          assetUpdate.push({ id: transfer[2].toNumber(), owner, tokenURI, metadata: data });
        } catch (e) {
          console.log(e);
        }
      }
      setLoadedAssets(assetUpdate);
      const supply = await readContracts.Crabrades.totalSupply();
      // setResrved(reserved);
      setSupply(parseInt(supply._hex));
    };
    if (readContracts && readContracts.Crabrades) updateCrabrades();
  }, [transferEvents]);

  const galleryList = [];

  for (const a in loadedAssets) {
    console.log("loadedAssets", a, loadedAssets[a]);
    const cardActions = [];
    cardActions.push(
      <div>
        owned by:{" "}
        <Address
          address={loadedAssets[a].owner}
          ensProvider={injectedProvider}
          blockExplorer={blockExplorer}
          minimized
        />
      </div>,
    );
    galleryList.push(
      <Card
        style={{ width: 200 }}
        key={loadedAssets[a].metadata.name}
        actions={cardActions}
        title={
          <div>
            {loadedAssets[a].metadata.name}{" "}
            <a
              style={{ cursor: "pointer", opacity: 0.33 }}
              href={`https://opensea.io/assets/0x280ecba1194ae1500ddad4a5f4a7e8270066146a/${loadedAssets[a].id}`}
              target="_blank"
              rel="noreferrer"
            >
              <LinkOutlined />
            </a>
          </div>
        }
      >
        <img style={{ maxWidth: 130 }} src={loadedAssets[a].metadata.image} alt="" />
        <div style={{ opacity: 0.77 }}>{JSON.toString(loadedAssets[a].metadata.attributes)}</div>
      </Card>,
    );
  }

  return (
    <div
      style={{
        backgroundImage: "url(img/crabradesbackground.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% auto",
        minHeight: "100vh",
      }}
      className="App"
    >
      <BrowserRouter>
        <Navbar
          {...{
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
          }}
        />
        <Switch>
          <Route exact path="/">
            <Home {...{ supply, mintAmount, setMintAmount,gasPrice,tx,writeContracts,parseEther }} />
          </Route>
          <Route exact path="/gallery">
            <Gallery {...{ galleryList }} />
          </Route>

          {injectedProvider && (
            <Route path="/yourcollectibles">
              {crabrades && (
                <MyCrabs
                  {...{
                    crabrades,
                    blockExplorer,
                    injectedProvider,
                    setTransferToAddresses,
                    tx,
                    writeContracts,
                    address,
                    transferToAddresses,
                  }}
                />
              )}
            </Route>
          )}

          {DEBUG && injectedProvider && (
            <Route path="/transfers">
              <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
                <List
                  bordered
                  dataSource={transferEvents}
                  renderItem={item => {
                    return (
                      <List.Item key={item[0] + "_" + item[1] + "_" + item.blockNumber + "_" + item[2].toNumber()}>
                        <span style={{ fontSize: 16, marginRight: 8 }}>#{item[2].toNumber()}</span>
                        <Address address={item[0]} ensProvider={injectedProvider} fontSize={16} /> =&gt;
                        <Address address={item[1]} ensProvider={injectedProvider} fontSize={16} />
                      </List.Item>
                    );
                  }}
                />
              </div>
            </Route>
          )}

          {DEBUG && injectedProvider && (
            <Route path="/debugcontracts">
              <Contract
                name="Crabrades"
                signer={injectedProvider.getSigner()}
                provider={injectedProvider}
                address={address}
                blockExplorer={blockExplorer}
              />
            </Route>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

/* eslint-disable */
window.ethereum &&
  window.ethereum.on("chainChanged", chainId => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });

window.ethereum &&
  window.ethereum.on("accountsChanged", accounts => {
    web3Modal.cachedProvider &&
      setTimeout(() => {
        window.location.reload();
      }, 1);
  });
/* eslint-enable */

export default App;
