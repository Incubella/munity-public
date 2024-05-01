import { useEffect, useState } from "react";
import {
  Box,
  InputAdornment,
  Typography,
  Button,
  Tooltip,
  TextField,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Card from "../../../Card";
import Channel from "../Channels/Channel";
import ToggleInput from "../ToggleInput";
import CustomInput from "../../CustomInput";
import IconBtn from "../../IconBtn";
import ReusableModal from "@/components/modal/ReusableModal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import BlueBtn from "@/components/Buttons/BlueBtn";
import { ethers } from "ethers";
import { shortenWalletAddress } from "@/utils/pinata/tools";
import { useWeb3Context } from "@/utils";
import { useDebounce } from "@/utils/hooks/useDebouncedState";
import { Title } from "@mui/icons-material";

export default function WhiteListSingle({
  communityDataContract,
  refetchData,
  addSX,
  setLoading,
}) {
  const {
    address,
    addMoreCommunityWhiteListings,
    removeCommunityWhiteListings,
    isUserWhiteListed,
  } = useWeb3Context();
  const { communityId, price, supply, discount, creator, communityData } =
    communityDataContract;

  const [addressList, setAddressList] = useState([]);

  const [filteredAddressList, setFilteredAddressList] = useState(addressList);
  const [checkAddressMsg, setCheckAddressMsg] = useState("");
  const [checkAddress, setCheckAddress] = useState("");
  const checkAddressDeb = useDebounce(checkAddress);
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wantToAdd, setWantToAdd] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [checkLoading, setcCheckLoading] = useState(false);

  const handleAddEmail = () => {
    if (newWalletAddress == "") {
      alert("Please enter a ethereum address");
      return false;
    } else if (!addressList.includes(newWalletAddress)) {
      const isValidAddress = ethers.isAddress(newWalletAddress);
      console.log("isValidAddress", isValidAddress, newWalletAddress);
      if (!isValidAddress) {
        alert("Please enter a valid ethereum address");
        return false;
      }
      const updatedEmails = [newWalletAddress, ...addressList];
      setAddressList(updatedEmails);
      setFilteredAddressList(updatedEmails);
      setNewWalletAddress("");
    } else {
      alert("Address already added in the list.");

      console.warn("Address already added in the list.");
    }
  };

  const handleEmailChange = (event) => {
    setNewWalletAddress(event.target.value);
  };

  const handleDeleteEmail = (emailToDelete) => {
    const updatedEmails = addressList.filter(
      (email) => email !== emailToDelete
    );
    setAddressList(updatedEmails);
    setFilteredAddressList(updatedEmails);
  };

  const handleCheckAddressChange = (event) => {
    setCheckAddress(event.target.value);
  };

  useEffect(() => {
    if (checkAddressDeb !== "") {
      (async () => {
        // console.log("checkAddressDeb",checkAddressDeb);
        const isValidAddress = ethers.isAddress(checkAddressDeb);
        if (isValidAddress) {
          setcCheckLoading(true);
          if (checkAddressDeb.toLowerCase() === creator.toLowerCase()) {
            setCheckAddressMsg("whitelist");
            setcCheckLoading(false);
            return;
          }
          const isWhiteListedAddress = await isUserWhiteListed(
            communityId,
            checkAddressDeb
          );
          // console.log("resssssssssss",isWhiteListedAddress,checkAddressDeb);

          if (isWhiteListedAddress) {
            setCheckAddressMsg("whitelist");
          } else {
            setCheckAddressMsg("nonwhitelist");
          }
          setcCheckLoading(false);
        } else {
          setCheckAddressMsg("invalid");
        }
      })();
    } else {
      setCheckAddressMsg("");
    }
  }, [checkAddressDeb]);

  const CHIP_COLOR = {
    whitelist: "success",
    nonwhitelist: "error",
    invalid: "warning",
  };
  const CHIP_LABEL = {
    whitelist: "Address is whitelisted",
    nonwhitelist: "Address is not whitelisted",
    invalid: "Invalid address given",
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const addListToWhitelistHandle = async () => {
    console.log("addListToWhitelistHandle", filteredAddressList);
    if (filteredAddressList.length == 0) {
      alert("List is empty");
      return false;
    }
    setLoading(true);
    setActionLoading(true);
    const isExecuted = await addMoreCommunityWhiteListings(
      communityId,
      filteredAddressList
    );
    if (isExecuted) {
      setIsModalOpen(false);
      setFilteredAddressList([]);
      setAddressList([]);
      // await refetchData();
    }
    setLoading(false);
    setActionLoading(false);
  };

  const removeListToWhitelistHandle = async () => {
    console.log("removeListToWhitelistHandle", filteredAddressList);
    if (filteredAddressList.length == 0) {
      alert("List is empty");
      return false;
    }

    setLoading(true);
    setActionLoading(true);

    const isExecuted = await removeCommunityWhiteListings(
      communityId,
      filteredAddressList
    );
    if (isExecuted) {
      setIsModalOpen(false);
      setFilteredAddressList([]);
      setAddressList([]);
      // await refetchData();
    }
    setLoading(false);
    setActionLoading(false);
  };

  return (
    <Card title={"Whitelist"} addSX={addSX}>
      {/* <ToggleInput label={"Do you want this feature on?"} /> */}
      <Box className="mt-8">
        <CustomInput
          label="Check Address Whitelisted?"
          type="text"
          inputName={"check_address_whitelist"}
          placeholder={"Enter wallet address here.."}
          value={checkAddress}
          handleChange={handleCheckAddressChange}
          inputBoxClasses="border-lime-600"
        />
        {checkLoading
          ? "checking please wait..."
          : checkAddressMsg !== "" && (
              <Chip
                label={CHIP_LABEL[checkAddressMsg]}
                color={CHIP_COLOR[checkAddressMsg]}
              />
            )}
        <Box className="flex items-center flex-wrap gap-4 mt-6">
          <Box>
            <BlueBtn
              // type="submit"
              handleClick={() => {
                setWantToAdd(true);
                toggleModal();
              }}
              color="#10111B"
              bgColor="#34A4E0"
              classNames="!ml-auto mob:!mt-auto"
            >
              Add Addresses
            </BlueBtn>
          </Box>
          <Box>
            <BlueBtn
              // type="submit"
              handleClick={() => {
                setWantToAdd(false);
                toggleModal();
              }}
              color="#10111B"
              bgColor="#34A4E0"
              classNames="!ml-auto mob:!mt-auto"
            >
              Remove Addresses
            </BlueBtn>
          </Box>
        </Box>
      </Box>

      {/* <Box className="my-6 flex gap-6 items-end">
        <CustomInput
          type="text"
          inputName={"email"}
          handleChange={handleEmailChange}
          label="WHITELIST ADDRESSES (SEPERATE WITH COMMAS)"
          value={newWalletAddress}
          placeholder="Enter wallet address here.."
          inputBoxSX={{ marginBottom: "0" }}
        />
        <IconBtn
          onClick={handleAddEmail}
          Classes={"!ml-auto"}
          icon={<AddIcon fontSize="small" />}
          ToolTipTitle={"Add Address"}
        />
      </Box> */}

      <ReusableModal
        isOpen={isModalOpen}
        handleClose={toggleModal}
        title={
          wantToAdd
            ? `Add [${filteredAddressList.length}] Addresses As Whitelist `
            : `Remove [${filteredAddressList.length}] Addresses From Whitelist `
        }
        customSX={{ paddingRight: "8px !important" }}
      >
        {/* ================================ SEARCH INPUT ====================================== */}
        {/* <Box className="mt-4" sx={{ maxWidth: "459px !important" }}>
          <CustomInput
            type="text"
            inputName={"search"}
            placeholder="Search Addresses..."
            value={searchTerm}
            handleChange={handleSearchChange}
            inputProps={{
              startAdornment: (
                <InputAdornment position="start" className="!ml-4">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box> */}

        {/* ================================ ADD ADDRESS INPUT ====================================== */}

        <Box className="my-4 flex gap-6 items-end">
          <CustomInput
            type="text"
            inputName={"email"}
            handleChange={handleEmailChange}
            label="ADDRESS LIST"
            value={newWalletAddress}
            placeholder="Enter wallet address here.."
            inputBoxSX={{ marginBottom: "0" }}
          />
          <IconBtn
            onClick={handleAddEmail}
            Classes={"!ml-auto"}
            icon={<AddIcon fontSize="small" />}
            ToolTipTitle={"Add Address"}
          />
        </Box>

        <Box
          className="flex flex-col gap-6 tab:max-h-[364px] overflow-y-scroll pr-4"
          sx={{
            maxHeight: "400px",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "background.primaryBtn",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "primary.main",
              cursor: "pointer",
              transition: "all 0.3s",
              borderRadius: "10px",
              // height: "98px",
              "&:hover": {
                backgroundColor: "text.secondary07",
              },
            },
          }}
        >
          {filteredAddressList.map((email, index) => (
            <Channel
              key={index}
              label={
                email === address
                  ? `${shortenWalletAddress(email)} (YOU)`
                  : shortenWalletAddress(email)
              }
              hasTag={false}
              handleDeleteChannel={() => handleDeleteEmail(email)}
            />
          ))}
        </Box>

        <BlueBtn
          // type="submit"
          handleClick={
            wantToAdd
              ? () => addListToWhitelistHandle()
              : () => removeListToWhitelistHandle()
          }
          color="#10111B"
          bgColor="#34A4E0"
          classNames="!ml-auto mob:!mt-auto tab:!mt-8"
          disabled={actionLoading}
        >
          {wantToAdd
            ? actionLoading
              ? "Adding Addresses..."
              : "Add Addresses"
            : actionLoading
            ? "Removing Addresses..."
            : "Remove Addresses"}
        </BlueBtn>
      </ReusableModal>
    </Card>
  );
}
