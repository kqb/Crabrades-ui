import React from 'react';
import StackGrid from "react-stack-grid";
export default ({galleryList}) => {
  return (
    <div style={{ maxWidth: 820, margin: "auto", marginTop: 32, paddingBottom: 256 }}>
      <StackGrid columnWidth={200} gutterWidth={16} gutterHeight={16}>
        {galleryList}
      </StackGrid>
    </div>
  );
};
