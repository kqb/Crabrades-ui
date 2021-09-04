import React from "react";
import { Alert, Button, Card, Col, Input, List, Menu, Row } from "antd";
import { Address, AddressInput } from "../components";
import ClipLoader from "react-spinners/ClipLoader";
export default ({
  crabrades,
  blockExplorer,
  injectedProvider,
  setTransferToAddresses,
  tx,
  writeContracts,
  address,
  transferToAddresses,
}) => {
  return (
    <div style={{ width: 640, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      {crabrades && (
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
                      <span style={{ fontSize: 16, marginRight: 8 }}></span> {item.name}
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
                    ensProvider={injectedProvider}
                    blockExplorer={blockExplorer}
                    fontSize={16}
                  />
                  <AddressInput
                    ensProvider={injectedProvider}
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
      )}
      <ClipLoader size={100} color={"red"} loading={!!!crabrades} speedMultiplier={1.5} />
    </div>
  );
};
