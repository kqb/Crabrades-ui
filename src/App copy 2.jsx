import { LinkOutlined } from "@ant-design/icons";
import { StaticJsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { formatEther, parseEther } from "@ethersproject/units";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Alert, Button, Card, Col, Input, List, Menu, Row } from "antd";
import "antd/dist/antd.css";
import { useUserAddress } from "eth-hooks";
import { utils } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import StackGrid from "react-stack-grid";
import Web3Modal from "web3modal";
import "./App.css";
import assets from "./assets.js";
import { Account, Address, AddressInput, Contract, Faucet, GasGauge, Header, Ramp, ThemeSwitch } from "./components";
import { DAI_ABI, DAI_ADDRESS, INFURA_ID, NETWORK, NETWORKS } from "./constants";
import { Transactor } from "./helpers";
import axios from "axios";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  useBalance,
  useContractLoader,
  useContractReader,
  useEventListener,
  useExchangePrice,
  useExternalContractLoader,
  useGasPrice,
  useOnBlock,
  useUserProvider,
} from "./hooks";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

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
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
//
// attempt to connect to our own scaffold eth rpc and if that fails fall back to infura...
// Using StaticJsonRpcProvider as the chainId won't change see https://github.com/ethers-io/ethers.js/issues/901
const scaffoldEthProvider = new StaticJsonRpcProvider("https://rpc.scaffoldeth.io:48544");
const mainnetInfura = new StaticJsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_I

const getRandProviderUrl = () => (targetNetwork.rpcUrl)[Math.floor(Math.random()*targetNetwork.rpcUrl.length)];
// 🏠 Your local provider is usually pointed at your local blockchain
let localProviderUrl = getRandProviderUrl();
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new StaticJsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

/*
  Web3 modal helps us "connect" external wallets:
*/
const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
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
  const mainnetProvider = scaffoldEthProvider && scaffoldEthProvider._network ? scaffoldEthProvider : mainnetInfura;

  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 This hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(targetNetwork, mainnetProvider);

  /* 🔥 This hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice(targetNetwork, "normal");
  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // You can warn the user if you would like them to be on a specific network
  const localChainId = localProvider && localProvider._network && localProvider._network.chainId;
  const selectedChainId = userProvider && userProvider._network && userProvider._network.chainId;

  // For more hooks, check out 🔗eth-hooks at: https://www.npmjs.com/package/eth-hooks

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, gasPrice);

  // Faucet Tx can be used to send funds from the faucet
  // const faucetTx = Transactor(localProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  // const yourLocalBalance = useBalance(localProvider, address);

  // Just plug in different 🛰 providers to get your balance on different chains:
  // const yourMainnetBalance = useBalance(mainnetProvider, address);

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);

  // EXTERNAL CONTRACT EXAMPLE:
  //
  // If you want to bring in the mainnet DAI contract it would look like:
  // const mainnetDAIContract = useExternalContractLoader(mainnetProvider, DAI_ADDRESS, DAI_ABI);

  // If you want to call a function on a new block
  // useOnBlock(mainnetProvider, () => {
  //   console.log(`⛓ A new mainnet block is here: ${mainnetProvider._lastBlockNumber}`);
  // });

  // Then read your DAI balance like:
  // const myMainnetDAIBalance = useContractReader({ DAI: mainnetDAIContract }, "DAI", "balanceOf", [
  //   "0x34aA3F359A9D614239015126635CE7732c18fDF3",
  // ]);

  // keep track of a variable from the contract in the local React state:
  // const balance = useContractReader(readContracts, "Crabrades", "balanceOf", [address]);
  // console.log("🤗 balance:", balance);

  // 📟 Listen for broadcast events
  // const transferEvents = useEventListener(readContracts, "Crabrades", "Transfer", localProvider, 1);
  // console.log("📟 Transfer events:", transferEvents);

  //
  // 🧠 This effect will update crabrades by polling when your balance changes
  //
  const maxSupply = 9999;
  const maxReserved = 35;

  // const yourBalance = balance && balance.toNumber && balance.toNumber();
  const [crabrades, setCrabrades] = useState();
  const [mintPrice, setMintPrice] = useState(false);
  // const [supply, setSupply] = useState(false);
  // const [maxSupply, setMaxSupply] = useState(false);
  // const [reserved, setResrved] = useState(false);

  useEffect(() => {
    if (readContracts && readContracts.Crabrades && !mintPrice)
      (async () => {
        const mp = await readContracts.Crabrades.getPrice();
        // const reserved = await readContracts.Crabrades.getRemainingReserved();
        // const supply = await readContracts.Crabrades.totalSupply();

        // setResrved(reserved);
        // setSupply(supply);
        setMintPrice(formatEther(mp));
      })();
  }, [mintPrice, readContracts]);

  // useEffect(() => {
  //   const updateCrabrades = async () => {
  //     const collectibleUpdate = [];
  //     for (let tokenIndex = 0; tokenIndex < balance; tokenIndex++) {
  //       try {
  //         console.log("GEtting token index", tokenIndex);
  //         const tokenId = await readContracts.Crabrades.tokenOfOwnerByIndex(address, tokenIndex);
  //         console.log("tokenId", tokenId);
  //         const tokenURI = await readContracts.Crabrades.tokenURI(tokenId);
  //         console.log("tokenURI", tokenURI);

  //         const ipfsHash = tokenURI.replace("https://ipfs.io/ipfs/", "");
  //         console.log("ipfsHash", ipfsHash);

  //         const jsonManifestBuffer = await getFromIPFS(ipfsHash);

  //         try {
  //           const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
  //           console.log("jsonManifest", jsonManifest);
  //           collectibleUpdate.push({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setCrabrades(collectibleUpdate);
  //   };
  //   updateCrabrades();
  // }, [address, yourBalance]);

  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */

  //
  // 🧫 DEBUG 👨🏻‍🔬
  //
  useEffect(() => {
    if (
      DEBUG &&
      mainnetProvider &&
      address &&
      selectedChainId &&
      // yourLocalBalance &&
      // yourMainnetBalance &&
      readContracts &&
      writeContracts
      // &&
      // mainnetDAIContract
    ) {
      console.log("_____________________________________ 🏗 scaffold-eth _____________________________________");
      console.log("🌎 mainnetProvider", mainnetProvider);
      console.log("🏠 localChainId", localChainId);
      console.log("👩‍💼 selected address:", address);
      console.log("🕵🏻‍♂️ selectedChainId:", selectedChainId);
      // console.log("💵 yourLocalBalance", yourLocalBalance ? formatEther(yourLocalBalance) : "...");
      // console.log("💵 yourMainnetBalance", yourMainnetBalance ? formatEther(yourMainnetBalance) : "...");
      console.log("📝 readContracts", readContracts);
      // console.log("🌍 DAI contract on mainnet:", mainnetDAIContract);
      console.log("🔐 writeContracts", writeContracts);
    }
  }, [
    mainnetProvider,
    address,
    selectedChainId,
    // yourLocalBalance,
    // yourMainnetBalance,
    readContracts,
    writeContracts,
    // mainnetDAIContract,
  ]);

  let networkDisplay = "";
  if (localChainId && selectedChainId && localChainId !== selectedChainId) {
    const networkSelected = NETWORK(selectedChainId);
    const networkLocal = NETWORK(localChainId);
    if (selectedChainId === 1337 && localChainId === 31337) {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network ID"
            description={
              <div>
                You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with
                HardHat.
                <div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    } else {
      networkDisplay = (
        <div style={{ zIndex: 2, position: "absolute", right: 0, top: 60, padding: 16 }}>
          <Alert
            message="⚠️ Wrong Network"
            description={
              <div>
                You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                <b>{networkLocal && networkLocal.name}</b>.
              </div>
            }
            type="error"
            closable={false}
          />
        </div>
      );
    }
  } else {
    networkDisplay = (
      <div style={{ zIndex: -1, position: "absolute", right: 154, top: 28, padding: 16, color: targetNetwork.color }}>
        {targetNetwork.name}
      </div>
    );
  }

  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  // let faucetHint = "";
  // const faucetAvailable = localProvider && localProvider.connection && targetNetwork.name === "localhost";

  // const [faucetClicked, setFaucetClicked] = useState(false);
  // if (
  //   !faucetClicked &&
  //   localProvider &&
  //   localProvider._network &&
  //   localProvider._network.chainId === 31337 &&
  //   // yourLocalBalance &&
  //   formatEther(yourLocalBalance) <= 0
  // ) {
  //   faucetHint = (
  //     <div style={{ padding: 16 }}>
  //       <Button
  //         type="primary"
  //         onClick={() => {
  //           faucetTx({
  //             to: address,
  //             value: parseEther("0.01"),
  //           });
  //           setFaucetClicked(true);
  //         }}
  //       >
  //         💰 Grab funds from the faucet ⛽️
  //       </Button>
  //     </div>
  //   );
  // }

  const [sending, setSending] = useState();
  const [ipfsHash, setIpfsHash] = useState();
  const [ipfsDownHash, setIpfsDownHash] = useState();

  const [downloading, setDownloading] = useState();
  const [ipfsContent, setIpfsContent] = useState();

  const [transferToAddresses, setTransferToAddresses] = useState({});

  const [loadedAssets, setLoadedAssets] = useState();
  // const [mintPrice, setMintPrice] = useState();

  // const [nfts, setNfts] = useState([]);
  // useEffect(() => {
  //   const updateCrabrades = async () => {
  //     const assetUpdate = [];
  //     for (const a in transferEvents) {
  //       try {
  //         let transfer = transferEvents[a];
  //         let owner;
  //         const tokenURI = await readContracts.Crabrades.tokenURI(transfer[2]);
  //         owner = await readContracts.Crabrades.ownerOf(transfer[2].toNumber());
  //         let data = {};
  //         try {
  //           const result = await axios.get(tokenURI);
  //           data = result.data;
  //           data.image = data.image.replace("ipfs://", ipfsGateway);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //         assetUpdate.push({ id: transfer[2].toNumber(), owner, tokenURI, metadata: data });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     setLoadedAssets(assetUpdate);
  //   };
  //   if (readContracts && readContracts.Crabrades) updateCrabrades();
  // }, [readContracts, transferEvents]);

  const galleryList = [];
  for (const a in loadedAssets) {
    console.log("loadedAssets", a, loadedAssets[a]);

    const cardActions = [];
    // if (loadedAssets[a].forSale) {
    //   cardActions.push(
    //     <div>
    //       <Button
    //         onClick={() => {
    //           console.log("gasPrice,", gasPrice);
    //           tx(writeContracts.Crabrades.mintItem(loadedAssets[a].id, { gasPrice }));
    //         }}
    //       >
    //         Mint
    //       </Button>
    //     </div>,
    //   );
    // } else {
    cardActions.push(
      <div>
        owned by:{" "}
        <Address
          address={loadedAssets[a].owner}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
          minimized
        />
      </div>,
    );
    // }

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
              href={loadedAssets[a].external_url}
              target="_blank"
              rel="noreferrer"
            >
              <LinkOutlined />
            </a>
          </div>
        }
      >
        {/* <nftImg 
            style={{ maxWidth: 130 }} src={loadedAssets[a].metadata.image} alt=""
        /> */}
        <img style={{ maxWidth: 130 }} src={loadedAssets[a].metadata.image} alt="" />
        <div style={{ opacity: 0.77 }}>{JSON.toString(loadedAssets[a].metadata.attributes)}</div>
      </Card>,
    );
  }

  return (
    <div className="App">
      {/* ✏️ Edit the header and change the title to your project name */}
      <Header />
      {networkDisplay}

      <BrowserRouter>
        <Menu style={{ textAlign: "center" }} selectedKeys={[route]} mode="horizontal">
          <Menu.Item key="/">
            <Link
              onClick={() => {
                setRoute("/");
              }}
              to="/"
            >
              Gallery
            </Link>
          </Menu.Item>
          <Menu.Item key="/yourcollectibles">
            <Link
              onClick={() => {
                setRoute("/yourcollectibles");
              }}
              to="/yourcollectibles"
            >
              Crabrades
            </Link>
          </Menu.Item>
          {DEBUG && (
            <Menu.Item key="/transfers">
              <Link
                onClick={() => {
                  setRoute("/transfers");
                }}
                to="/transfers"
              >
                Transfers
              </Link>
            </Menu.Item>
          )}
          {DEBUG && (
            <Menu.Item key="/ipfsup">
              <Link
                onClick={() => {
                  setRoute("/ipfsup");
                }}
                to="/ipfsup"
              >
                IPFS Upload
              </Link>
            </Menu.Item>
          )}
          {DEBUG && (
            <Menu.Item key="/ipfsdown">
              <Link
                onClick={() => {
                  setRoute("/ipfsdown");
                }}
                to="/ipfsdown"
              >
                IPFS Download
              </Link>
            </Menu.Item>
          )}
          {DEBUG && (
            <Menu.Item key="/debugcontracts">
              <Link
                onClick={() => {
                  setRoute("/debugcontracts");
                }}
                to="/debugcontracts"
              >
                Debug Contracts
              </Link>
            </Menu.Item>
          )}
        </Menu>

        <Switch>
          <Route exact path="/">
            {/*
                🎛 this scaffolding is full of commonly used components
                this <Contract/> component will automatically parse your ABI
                and give you a form to interact with it locally
            */}
            <div>
              {/* <h3>: {mintPrice}</h3> */}
              <div>
                <h3>Mint Price: {mintPrice ? mintPrice : ""}</h3>
                <ClipLoader size={50} color={"red"} loading={!!!mintPrice} speedMultiplier={1.5} />
              </div>

              <Button
                onClick={() => {
                  console.log("gasPrice,", gasPrice);
                  tx(writeContracts.Crabrades.adopt(1, { value: parseEther(mintPrice) }));
                }}
              >
                Mint
              </Button>
            </div>

            <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
              <StackGrid columnWidth={200} gutterWidth={16} gutterHeight={16}>
                {/* {galleryList} */}
              </StackGrid>
            </div>
          </Route>

          {DEBUG && (
            <Route path="/yourcollectibles">
              <div style={{ width: 640, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
                <List
                  bordered
                  dataSource={crabrades}
                  renderItem={item => {
                    const id = item.id.toNumber();
                    return (
                      <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                        <Card
                          title={
                            <div>
                              <span style={{ fontSize: 16, marginRight: 8 }}>#{id}</span> {item.name}
                            </div>
                          }
                        >
                          <div>
                            <img src={item.image} style={{ maxWidth: 150 }} alt="" />
                          </div>
                          <div>{item.description}</div>
                        </Card>

                        <div>
                          owner:{" "}
                          <Address
                            address={item.owner}
                            ensProvider={mainnetProvider}
                            blockExplorer={blockExplorer}
                            fontSize={16}
                          />
                          <AddressInput
                            ensProvider={mainnetProvider}
                            placeholder="transfer to address"
                            value={transferToAddresses[id]}
                            onChange={newValue => {
                              const update = {};
                              update[id] = newValue;
                              setTransferToAddresses({ ...transferToAddresses, ...update });
                            }}
                          />
                          <Button
                            onClick={() => {
                              console.log("writeContracts", writeContracts);
                              tx(writeContracts.Crabrades.transferFrom(address, transferToAddresses[id], id));
                            }}
                          >
                            Transfer
                          </Button>
                        </div>
                      </List.Item>
                    );
                  }}
                />
              </div>
            </Route>
          )}

          {DEBUG && (
            <Route path="/transfers">
              <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
                <List
                  bordered
                  dataSource={transferEvents}
                  renderItem={item => {
                    return (
                      <List.Item key={item[0] + "_" + item[1] + "_" + item.blockNumber + "_" + item[2].toNumber()}>
                        <span style={{ fontSize: 16, marginRight: 8 }}>#{item[2].toNumber()}</span>
                        <Address address={item[0]} ensProvider={mainnetProvider} fontSize={16} /> =&gt;
                        <Address address={item[1]} ensProvider={mainnetProvider} fontSize={16} />
                      </List.Item>
                    );
                  }}
                />
              </div>
            </Route>
          )}

          {DEBUG && (
            <Route path="/ipfsup">
              <div style={{ paddingTop: 32, width: 740, margin: "auto", textAlign: "left" }}>
                <ReactJson
                  style={{ padding: 8 }}
                  src={yourJSON}
                  theme="pop"
                  enableClipboard={false}
                  onEdit={(edit, a) => {
                    setYourJSON(edit.updated_src);
                  }}
                  onAdd={(add, a) => {
                    setYourJSON(add.updated_src);
                  }}
                  onDelete={(del, a) => {
                    setYourJSON(del.updated_src);
                  }}
                />
              </div>

              <Button
                style={{ margin: 8 }}
                loading={sending}
                size="large"
                shape="round"
                type="primary"
                onClick={async () => {
                  console.log("UPLOADING...", yourJSON);
                  setSending(true);
                  setIpfsHash();
                  const result = await ipfs.add(JSON.stringify(yourJSON)); // addToIPFS(JSON.stringify(yourJSON))
                  if (result && result.path) {
                    setIpfsHash(result.path);
                  }
                  setSending(false);
                  console.log("RESULT:", result);
                }}
              >
                Upload to IPFS
              </Button>

              <div style={{ padding: 16, paddingBottom: 150 }}>{ipfsHash}</div>
            </Route>
          )}

          {DEBUG && (
            <Route path="/ipfsdown">
              <div style={{ paddingTop: 32, width: 740, margin: "auto" }}>
                <Input
                  value={ipfsDownHash}
                  placeHolder="IPFS hash (like QmadqNw8zkdrrwdtPFK1pLi8PPxmkQ4pDJXY8ozHtz6tZq)"
                  onChange={e => {
                    setIpfsDownHash(e.target.value);
                  }}
                />
              </div>
              <Button
                style={{ margin: 8 }}
                loading={sending}
                size="large"
                shape="round"
                type="primary"
                onClick={async () => {
                  console.log("DOWNLOADING...", ipfsDownHash);
                  setDownloading(true);
                  setIpfsContent();
                  const result = await getFromIPFS(ipfsDownHash); // addToIPFS(JSON.stringify(yourJSON))
                  if (result && result.toString) {
                    setIpfsContent(result.toString());
                  }
                  setDownloading(false);
                }}
              >
                Download from IPFS
              </Button>

              <pre style={{ padding: 16, width: 500, margin: "auto", paddingBottom: 150 }}>{ipfsContent}</pre>
            </Route>
          )}
          {DEBUG && (
            <Route path="/debugcontracts">
              <Contract
                name="Crabrades"
                signer={userProvider.getSigner()}
                provider={localProvider}
                address={address}
                blockExplorer={blockExplorer}
              />
            </Route>
          )}
        </Switch>
      </BrowserRouter>

      <ThemeSwitch />

      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
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
        {/* {faucetHint} */}
      </div>

      {/* 🗺 Extra UI like gas price, eth price, faucet, and support: */}
      {/* <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
        <Row align="middle" gutter={[4, 4]}>
          <Col span={8}>
            <Ramp price={price} address={address} networks={NETWORKS} />
          </Col>

          <Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
            <GasGauge gasPrice={gasPrice} />
          </Col>
          <Col span={8} style={{ textAlign: "center", opacity: 1 }}>
            <Button
              onClick={() => {
                window.open("https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA");
              }}
              size="large"
              shape="round"
            >
              <span style={{ marginRight: 8 }} role="img" aria-label="support">
                💬
              </span>
              Support
            </Button>
          </Col>
        </Row>

        <Row align="middle" gutter={[4, 4]}>
          <Col span={24}>
            {faucetAvailable ? (
              <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </div> */}
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
