/* eslint-disable import/no-anonymous-default-export */
// import { useState } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import CustomCard from "../../CustomCard";

export default function Accesskeys(props) {
  const { accessKeys, areNFTs } = props;

  return (
    <Box>
      <LoadmoreShowLess
        classNames={`grid mob:grid-cols-1 mob-sm:grid-cols-2 tab:grid-cols-3 desk:grid-cols-4 mob:gap-y-6 tab:gap-y-8 gap-x-6 ${
          !areNFTs ? "blur-[10px] pb-4" : ""
        }`}
        nav={"accessKeys"}
        areNFTs={areNFTs}
        data={accessKeys}
        initialItems={12}
        step={12}
        renderItem={(item) => (
          <CustomCard
            accessKeySingle={item}
            title={item.label}
            price={item.price}
            lastSale={item.lastSale}
            cardImg={item.image}
            buttonText="Buy Now"
            titleFontSize="18px"
            buttonVariant="text"
          />
        )}
      />
    </Box>
  );
}
