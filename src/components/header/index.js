import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  Popover,
  Typography,
  Link,
  Drawer,
  List,
  ListItem,
  Tooltip,
} from "@mui/material";
import {
  ContentCopyOutlined,
  LaunchOutlined,
  LogoutOutlined,
  PaletteOutlined,
} from "@mui/icons-material";
import AccountBalanceWalletSharpIcon from "@mui/icons-material/AccountBalanceWalletSharp";
import LightModeSharpIcon from "@mui/icons-material/LightModeSharp";
import AccountBoxSharpIcon from "@mui/icons-material/AccountBoxSharp";
import DarkModeSharpIcon from "@mui/icons-material/DarkModeSharp";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import { CustomToggleButton } from "../toggle";
import { ChainIds, addressEllipsis, availableChains, useWeb3Context } from "@/utils";
import { setMode, setTheme, setUserAddress } from "../../utils/store/reducers";
import styles from "./header.module.scss";
import ClearIcon from "../settings/ClearIcon";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';
import { useDisconnect, useSwitchChain } from 'wagmi'
import { IS_TEST_MODE } from "@/context/RinbowkitWagmiContext";

export default function Header() {

  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal(); 


  const { disconnect:disconnectHandle } = useDisconnect()
  const { chains, switchChainAsync:switchChainHandle } = useSwitchChain()
  
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = router.pathname;
  const { theme, mode } = useSelector((state) => state.app);
  const [hasCommunity, setHasCommunity] = useState(false);
  const [userDatabaseAvatar, setUserDatabaseAvatar] = useState(
    "/images/profile.png"
  );
  const { address, chainId, connected } = useWeb3Context();
  const [selectedChain, setSelectedChain] = useState(`${chainId}`);
  const [openMenu, setOpenMenu] = useState(null);
  const svgFillColor = theme === "light" ? "#10111B" : "white";
  const txtColor = connected ? "primary.main" : "white";
  useEffect(() =>{
    if(chainId!==""){

      setSelectedChain(`${chainId}`)
    }else{
      setSelectedChain(`${IS_TEST_MODE? ChainIds.Ethereum : ChainIds.Polygon}`) //defai

    }
    
    }, [chainId, connected]);
  useEffect(() => {
    const getCurrentUserByAddress = async () => {
      try {
        const API_URL = `/api/users?address=${address}`; // Adjust based on your API endpoint
        const response = await fetch(API_URL);
        if (!response.ok) {
          const userID = await createUser(address);
          if (userID) {
            return userID;
          } else {
            return response.ok;
          }
        }
        const data = await response.json();
        console.log("user was found", data.data);
        // setUserData(data.data);
        data.data.user_avatar && setUserDatabaseAvatar(data.data.user_avatar);
        return data.data._id; // Assuming the response includes user data under a 'user' key
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const getCommunityByUserAddress = async () => {
      let userId;
      if (address) {
        userId = await getCurrentUserByAddress();
      }
      try {
        const response = await fetch(`/api/communities?userId=${userId}`);
        if (!response.ok) {
          throw new Error("user does not have any community");
        }
        const data = await response.json();
        if (data.success && data.data) {
          console.log("Community was found");
          setHasCommunity(true); // Set to true if community is found
        } else {
          setHasCommunity(false); // Set to false if no community is found
          console.error("Error fetching community:", data.error);
        }
      } catch (error) {
        console.error(error);
        setHasCommunity(false); // Set to false in case of error
      }
    };
    if (address) {
      getCommunityByUserAddress();
    }
  }, [address]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileMenuItems = [
    { name: "Explore", url: "/main" },
    !hasCommunity && {
      name: "Create Community",
      url: "/settings",
    },
    // Add Settings navigation here if the user is connected and has a community
    ...(connected
      ? [
          { name: "Profile", url: "/settings" },
          // { name: "Community", url: "/settings" },
        ]
      : []),
    // Add more items as needed
  ];
  const createUser = async (userAddress) => {
    // setLoading(true);
    try {
      const apiUrl = "/api/users";
      const user = {
        address: userAddress,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      // Parse the JSON response
      const data = await response.json();

      if (response.ok) {
        console.log("User created successfully");
        dispatch(setUserAddress(data.data._id));
        return data.data._id;
        // setUserData(data);
      } else {
        console.log("response:", response);
        throw new Error(data.message || "Failed to create user");
      }
    } catch (error) {
      // Catch any network errors and log them
      console.error("Error creating user:", error.message);
      return null; // or handle as needed
    }
  };

  const handleConnect = async (e) => {
    if (connected) {
      setOpenMenu(e.currentTarget);
    } else {
      openConnectModal()
      // const userAddress = await connect(+selectedChain);
      // console.log("user address after connect:", userAddress.address);
      
    }
  };

  useEffect(() => {
    if(address !== "" && connected) {
      const getCurrentUserByAddress = async () => {
        try {
          const API_URL = `/api/users?address=${address}`; // Adjust based on your API endpoint
          const response = await fetch(API_URL);
          if (!response.ok) console.log("User not found");
          if (response.ok) console.log("User was found");
          return response.ok;
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      if (address) {
        const userAlreadyExists = getCurrentUserByAddress();
        if (!userAlreadyExists) {
          createUser(address);
        }
      }
    }
    
  }, [address]);
  

  const handleSelect = async (newChain) => {
    if (!connected) {
      setSelectedChain(newChain);
      return;
    }
    setSelectedChain(newChain);
    try {
      
      await switchChainHandle({ chainId: +newChain })
    } catch (error) {
      
      setSelectedChain(String(chainId));
    }
    // connect(+newChain);
  };

  const maticIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      viewBox="0 0 128 128"
      width="20"
      height="20"
      id="polygon"
    >
      <path
        fill={svgFillColor}
        d="m85.52 45.58-43 24.85a5.24 5.24 0 0 1-5.2 0L23.55 62.5A5.2 5.2 0 0 1 21 58V42.14a5.2 5.2 0 0 1 2.6-4.5l13.73-7.93a5.24 5.24 0 0 1 5.2 0l13.73 7.93a5.2 5.2 0 0 1 2.6 4.5v7.61a1.3 1.3 0 0 0 1.94 1.13l7.15-4.13a2.59 2.59 0 0 0 1.29-2.25v-8.36a5.21 5.21 0 0 0-2.59-4.5L42.48 17.72a5.19 5.19 0 0 0-5.2 0L13.16 31.64a5.2 5.2 0 0 0-2.6 4.5V64a5.2 5.2 0 0 0 2.6 4.5l24.12 13.92a5.19 5.19 0 0 0 5.2 0l43-24.85a5.24 5.24 0 0 1 5.2 0l13.73 7.93a5.2 5.2 0 0 1 2.6 4.5v15.86a5.2 5.2 0 0 1-2.6 4.5l-13.69 7.93a5.24 5.24 0 0 1-5.2 0l-13.73-7.93a5.2 5.2 0 0 1-2.6-4.5v-7.62a1.29 1.29 0 0 0-1.94-1.12l-7.15 4.12a2.6 2.6 0 0 0-1.29 2.25v8.37a5.21 5.21 0 0 0 2.59 4.5l24.12 13.92a5.19 5.19 0 0 0 5.2 0l24.12-13.92a5.2 5.2 0 0 0 2.6-4.5V64a5.2 5.2 0 0 0-2.6-4.5L90.72 45.58a5.19 5.19 0 0 0-5.2 0Z"
      ></path>
    </svg>
  );
  const ethIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5.7501 7.58343L9.72507 5.81676C9.90007 5.74176 10.1001 5.74176 10.2668 5.81676L14.2418 7.58343C14.5918 7.74176 14.9167 7.31676 14.6751 7.01676L10.5084 1.9251C10.2251 1.5751 9.75841 1.5751 9.47508 1.9251L5.30841 7.01676C5.07508 7.31676 5.4001 7.74176 5.7501 7.58343Z"
        fill={svgFillColor}
      />
      <path
        d="M5.74981 12.4166L9.73312 14.1833C9.90812 14.2583 10.1081 14.2583 10.2748 14.1833L14.2581 12.4166C14.6081 12.2583 14.9331 12.6833 14.6915 12.9833L10.5248 18.0749C10.2415 18.4249 9.7748 18.4249 9.49147 18.0749L5.3248 12.9833C5.0748 12.6833 5.39148 12.2583 5.74981 12.4166Z"
        fill={svgFillColor}
      />
      <path
        d="M9.81648 7.90825L6.3748 9.62492C6.06647 9.77492 6.06647 10.2166 6.3748 10.3666L9.81648 12.0833C9.93314 12.1416 10.0748 12.1416 10.1914 12.0833L13.6331 10.3666C13.9414 10.2166 13.9414 9.77492 13.6331 9.62492L10.1914 7.90825C10.0664 7.84992 9.93314 7.84992 9.81648 7.90825Z"
        fill={svgFillColor}
      />
    </svg>
  );

  const navs = [
    {
      name: "Explore",
      url: "/main",
    },
    !hasCommunity
      ? {
          name: "Create Community",
          url: "/settings",
        }
      : {
          name: "Community",
          url: "/settings",
        },
  ];

  const copyAddress = () => navigator.clipboard.writeText(address);

  const toggleTheme = () => {
    dispatch(setTheme(theme === "light" ? "dark" : "light"));
    // alert(theme === "light" ? "dark" : "light");
  };
  // TODO: uncomment when we support dark theme in design

  const toggleMode = () =>
    dispatch(setMode(mode === "user" ? "creator" : "user"));

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  const logoContainerCenterStyles = {
    position: "absolute",
    left: "calc(50% - 100px)",
  };
  let logoContainerStyles = !connected ? logoContainerCenterStyles : "";
  const goToLanding = () => router.push("/");
  const isSettingsPage = router.pathname.includes("/settings");

  return (
    <Box
      className={`flex ai-ce fj-sb ${styles["container"]} mob:px-4 deskPd:px-[52px] mob:py-4 lap:py-6`}
    >
      <IconButton
        className="!rounded-none tab:w-14 tab:h-14 mob-ssm:w-12 mob-ssm:h-12 mob:w-[40px] mob:h-[40px] !p-0 lap:!hidden iconbtn"
        sx={{
          "&.MuiButtonBase-root.iconbtn": {
            backgroundColor: "background.iconBtn",
          },
        }}
        onClick={handleMobileMenuToggle}
      >
        <MenuSharpIcon
          className="mob:!w-[18px] mob:!h-[18px] tab:!w-6 tab:!w-6"
          sx={{ color: "primary.main" }}
        />
      </IconButton>
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100%",
            backgroundColor: "background.default",
            flexDirection: "column",
            borderRadius: 0, // Remove border radius
          },
        }}
      >
        <Box className="flex items-center gap-4 justify-between w-full">
          <Box
            onClick={goToLanding}
            className="mob-ssm:h-[48px] mob-ssm:w-[217px] mob:h-[40px] mob:w-[177px]"
          >
            <Image
              // className={styles["logo"]}
              src={theme === "light" ? "/logoDark.png" : "/logoWhite.png"}
              width={217.206}
              height={48}
              alt="logo"
              className="mob-ssm:h-[48px] mob-ssm:w-[217px] mob:h-[40px] mob:w-[177px]"
              layout="responsive"
            />
          </Box>
          <ClearIcon
            onDelete={handleMobileMenuToggle}
            iconSX={{
              color: "text.primary",
              zIndex: "1",
              width: { mob: "48px", tab: "56px" },
              height: { mob: "48px", tab: "56px" },
            }}
            ClearIconSX={{
              width: { mob: "18px", tab: "24px" },
              height: { mob: "18px", tab: "24px" },
            }}
            ToolTipTitle={"Close Modal"}
          />
        </Box>
        <List className="mt-8">
          {mobileMenuItems.map((item, index) => (
            <ListItem
              key={index}
              className="cursor-pointer mob:pl-0"
              onClick={() => {
                setMobileMenuOpen(false); // Close the menu
                router.push({
                  pathname: item.url,
                  query:
                    item.name === "Create Community" ||
                    item.name === "Community"
                      ? { tab: "community" }
                      : item.name === "Profile"
                      ? { tab: "profile" }
                      : {},
                });
              }}
            >
              <Typography textAlign="center">{item.name}</Typography>
            </ListItem>
          ))}
          {isSettingsPage && (
            <ListItem onClick={() => router.push("/settings")}>
              {/* <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" /> */}
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box className="items-center gap-6 lap:flex mob:hidden">
        {navs.map(({ name, url, index }) => (
          <Link
            key={name}
            onClick={() => {
              router.push({
                pathname: url,
                query:
                  name === "Create Community" || name === "Community"
                    ? { tab: "community" }
                    : name === "Profile"
                    ? { tab: "profile" }
                    : {},
              });
            }}
            underline="none"
            sx={{
              cursor: "pointer",
              color: "text.primary",
              "&:hover p": {
                color: "text.secondary",
              },
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                fontSize: "18px",
                lineHeight: "normal",
                fontWeight: "400 !important",
                textTransform: "capitalize",
              }}
              className="transition-all"
            >
              {name}
            </Typography>
          </Link>
        ))}
      </Box>

      <Box
        className={" mob:hidden lap:block"}
        sx={{ ...logoContainerStyles }}
        onClick={goToLanding}
      >
        <Image
          className={styles["logo"]}
          src={theme === "light" ? "/logoDark.png" : "/logoWhite.png"}
          width={217.206}
          height={48}
          alt="logo"
        />
      </Box>
      <Box className={`flex mob:gap-[8px] tab:gap-4 desk:gap-8`}>
        <CustomToggleButton
          value={theme}
          items={[
            { value: "light", comp: <LightModeSharpIcon /> },
            { value: "dark", comp: <DarkModeSharpIcon /> },
          ]}
          onChange={toggleTheme}
          classNames={"flex tab:p-2 mob:px-1.5 mob:py-0"}
        />
        {connected && pathname !== "/" && (
          <CustomToggleButton
            // sx={{ ml: "1rem" }}
            value={selectedChain}
            size="large"
            items={Object.entries(availableChains).map(
              ([chain, { icon, symbol }]) => ({
                value: chain,
                comp: (
                  <Box
                    key={symbol}
                    className={`flex ai-ce gap-[4px] ${styles["chain-item"]}`}
                  >
                    {symbol === "ETH" ? ethIcon : maticIcon}
                    <Typography
                      className="mob:hidden tab:block"
                      sx={{
                        lineHeight: "120%",
                        color: "primary.main",
                        marginTop: "3px",
                      }}
                    >
                      {symbol}
                    </Typography>
                  </Box>
                ),
              })
            )}
            onChange={handleSelect}
          />
        )}
        {/* <ConnectButton/> */}
        <Tooltip title={`${connected ? "Profile" : ""}`}>
          <Box
            className={`min-w-fit text-white ${
              !connected
                ? "tab:px-6 mob:px-4 "
                : "mob:w-[40px] mob:h-[40px] mob-ssm:w-[48px] mob-ssm:h-[48px] tab:w-auto tab:h-auto"
            } flex fr ai-ce fj-ce ${styles["connect"]} ${
              !connected && styles["landing"]
            }`}
            onClick={handleConnect}
          >
            {connected ? (
              <Box
                // className="flex"
                sx={{
                  cursor: "pointer",
                  padding: { mob: "4px", "mob-smm": "8px" },
                  border: "1px solid",
                  borderColor: "primary.border",
                  "& > span": {
                    width: { mob: "30px !important", tab: "40px !important" },
                    height: { mob: "30px !important", tab: "40px !important" },
                  },
                }}
              >
                <Image
                  className={styles["profile"] + " object-cover"}
                  src={userDatabaseAvatar}
                  width={40}
                  height={40}
                  alt="profile"
                  layout="responsive"
                />
              </Box>
            ) : (
              <AccountBalanceWalletSharpIcon />
            )}
            <Typography
              className="mob:hidden tab:block"
              sx={{ color: txtColor }}
              fontWeight={300}
            >
              {connected ? addressEllipsis(address) : "Connect Wallet"}
              {/* 0xCff5...8D6e */}
            </Typography>
          </Box>
        </Tooltip>
        {connected && (
          <Popover
            open={Boolean(openMenu)}
            anchorEl={openMenu}
            onClose={() => setOpenMenu(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            className={styles["menu"] + " ksssss"}
            disableScrollLock={true}
            sx={{
              "& .MuiPaper-elevation.MuiPaper-rounded": { borderRadius: "4px" },
            }}
          >
            <div className="flex flex-1 ai-ce mt-5">
              <h3 className="my-5 flex-1">{addressEllipsis(address)}</h3>
              <IconButton
                size="small"
                aria-label="copy address"
                className={styles["addressSvg"]}
                onClick={copyAddress}
              >
                <ContentCopyOutlined fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="copy address"
                className={styles["addressSvg"]}
                href={`https://etherscan.io/address/${address}`}
                target="_blank"
              >
                <LaunchOutlined fontSize="small" />
              </IconButton>
            </div>
            {/* <Typography
            textAlign="left"
            className={`flex ai-ce flex-1 w100 ${styles["creator"]}`}
          >
            <div className="flex flex-1 ai-ce">
              <PaletteOutlined />
              &nbsp;&nbsp; Artist mode
            </div>
            <CustomToggleButton
              value={mode}
              size="small"
              items={[
                { value: "user", title: "OFF" },
                { value: "creator", title: "ON" },
              ]}
              onChange={toggleMode}
            />
          </Typography> */}
            <Typography
              textAlign="left"
              sx={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #CCCCCC",
              }}
            >
              <Button
                sx={{
                  minWidth: "110px",
                  padding: "0.5em 1em",
                  width: "100%",
                  justifyContent: "left",
                }}
                onClick={() => {
                  setOpenMenu(false);
                  router.push({
                    pathname: "/settings",
                    query: { tab: "profile" },
                  });
                }}
              >
                <AccountBoxSharpIcon />
                &nbsp;&nbsp; Profile
              </Button>
            </Typography>
            <Typography
              textAlign="left"
              sx={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #CCCCCC",
              }}
            >
              <Button
                sx={{
                  minWidth: "110px",
                  padding: "0.5em 1em",
                  width: "100%",
                  justifyContent: "left",
                }}
                onClick={() => {
                  disconnectHandle();
                  setOpenMenu(false);
                  router.push("/main");
                }}
              >
                <LogoutOutlined />
                &nbsp;&nbsp; Disconnect
              </Button>
            </Typography>
          </Popover>
        )}
      </Box>
    </Box>
  );
}