import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

export default ({ mintPrice }) => {
  return (
    <div>
      <h3>Mint Price: {mintPrice ? mintPrice : ""}</h3>
      <ClipLoader size={50} color={"red"} loading={!!!mintPrice} speedMultiplier={1.5} />
    </div>
  );
};
