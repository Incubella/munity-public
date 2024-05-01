import { useState } from "react";
import {
  Box,
  InputAdornment,
  Typography,
  Button,
  Tooltip,
  TextField,
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

export default function WhiteList({ addSX }) {
  const userEmailAddress = "dha4...JD21"; // loggined user static email
  const [whitelistEmails, setWhitelistEmails] = useState([
    userEmailAddress,
    "dha4...JD94",
    "eha5...AP65",
    "pgs9...DD21",
    "kja7...GG88",
    "zjw8...KR77",
  ]);

  const [filteredEmails, setFilteredEmails] = useState(whitelistEmails);
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(0);
  const [newEmail, setNewEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEmail = () => {
    if (newEmail && !whitelistEmails.includes(newEmail)) {
      const updatedEmails = [
        userEmailAddress,
        ...whitelistEmails.filter((email) => email !== userEmailAddress),
        newEmail,
      ];
      setWhitelistEmails(updatedEmails);
      setFilteredEmails(updatedEmails);
      setNewEmail("");
    } else {
      console.warn("Email already exists in the whitelist.");
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      const searchResults = whitelistEmails.filter((email) =>
        email.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredEmails(searchResults);
    } else {
      setFilteredEmails(whitelistEmails);
    }
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleDeleteEmail = (emailToDelete) => {
    if (emailToDelete !== userEmailAddress) {
      const updatedEmails = whitelistEmails.filter(
        (email) => email !== emailToDelete
      );
      setWhitelistEmails(updatedEmails);
      setFilteredEmails(updatedEmails);
    }
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Card title={"Whitelist"} addSX={addSX}>
      <ToggleInput label={"Do you want this feature on?"} />
      <Box className="mt-8">
        <CustomInput
          label="Price"
          type="number"
          inputName={"price"}
          placeholder={"Enter price here.."}
          value={price}
          handleChange={handlePriceChange}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start" className="!ml-4">
                <Typography
                  sx={{
                    lineHeight: "120%",
                    fontWeight: "400 !important",
                    fontSize: "16.5px",
                    color: "text.primary",
                  }}
                >
                  ETH
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="my-6 flex gap-6 items-end">
        <CustomInput
          type="text"
          inputName={"email"}
          handleChange={handleEmailChange}
          label="WHITELIST ADDRESSES (SEPERATE WITH COMMAS)"
          value={newEmail}
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
      <Box className="flex flex-col gap-6 ">
        {/* <Channel
          label={userEmailAddress}
          isActive={false}
          hasTag={false}
          handleDeleteChannel={() => handleDeleteEmail(email)}
        /> */}
        {whitelistEmails.slice(0, 2).map((email, index) => (
          <Channel
            key={index}
            label={email === userEmailAddress ? `${email} (YOU)` : email}
            isActive={email === userEmailAddress ? false : true}
            hasTag={false}
            handleDeleteChannel={() => handleDeleteEmail(email)}
            tooltip={"Delete Address"}
          />
        ))}
        {whitelistEmails.length > 1 && (
          <Tooltip title={"Show Addresses"} arrow>
            <Button onClick={toggleModal}>
              <ExpandMoreIcon />
            </Button>
          </Tooltip>
        )}
      </Box>
      <ReusableModal
        isOpen={isModalOpen}
        handleClose={toggleModal}
        title={`Whitelist Addresses (${whitelistEmails.length})`}
        customSX={{ paddingRight: "8px !important" }}
      >
        <Box className="mt-4" sx={{ maxWidth: "459px !important" }}>
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
          {/* {searchTerm !== "" && (
            <Channel
              label={userEmailAddress}
              isActive={false}
              hasTag={false}
              handleDeleteChannel={() => handleDeleteEmail(email)}
            />
          )} */}
          {filteredEmails.map((email, index) => (
            <Channel
              key={index}
              label={email === userEmailAddress ? `${email} (YOU)` : email}
              isActive={email === userEmailAddress ? false : true}
              hasTag={false}
              handleDeleteChannel={() => handleDeleteEmail(email)}
            />
          ))}
        </Box>
      </ReusableModal>
    </Card>
  );
}
