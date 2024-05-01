import WhiteList from "../Whitelist/WhiteList";
import NFTCreationForm from "./NFTCreationForm";

const NFTCreationApp = ({ handleAddNFT, theme }) => {
  return (
    <div>
      <NFTCreationForm theme={theme} onSave={handleAddNFT} />
      <WhiteList />
    </div>
  );
};

export default NFTCreationApp;
