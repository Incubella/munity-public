/* eslint-disable import/no-anonymous-default-export */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/legacy/image";
// Import custom tab content components
import PageTitle from "../PageTitle";
import Container from "../Container";
import CustomTable from "./CustomTable";
import CustomInput from "../CustomInput";
import Cookies from "js-cookie";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {/* Render the imported component as tab content */}
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
let iconClassNames = "!w-[20px] !h-[20px] !m-0";

const SettingsNavTabs = [
  {
    label: "Users",
    icon: <PersonIcon className={iconClassNames} />,
  },
  {
    label: "Communities",
    icon: <LocalLibraryOutlinedIcon className={iconClassNames} />,
  },
  // {
  //   label: "NOT STRUCTURED YET",
  //   icon: <DatasetSharpIcon className={iconClassNames} />,
  // },
];

const mainAdminTabs = [
  ...SettingsNavTabs,
  {
    label: "Manage Admins",
    icon: <AdminPanelSettingsIcon className={iconClassNames} />,
  },
];

// Columns for the Community table
const communityColumns = [
  { label: "COMMUNITY", dataKey: "name" },
  { label: "SUBS", dataKey: "subscribers" },
  { label: "SUB PRICE", dataKey: "minting_price" },
  { label: "CREATED IN", dataKey: "createdAt" },
];

const adminColumns = [
  { label: "USERNAME", dataKey: "username" },
  { label: "EMAIL", dataKey: "email" },
  { label: "ROLE", dataKey: "role" },
];

// Columns for the User table
const userColumns = [
  { label: "NAME", dataKey: "username" },
  { label: "ADDRESS", dataKey: "formatedAddress" },
  { label: "JOINED IN", dataKey: "join_date" },
  { label: "SUBS", dataKey: "subscriptions" },
  { label: "COMMUNITIES", dataKey: "communities" },
];

export default function AdminNavigation({
  theme,
  userData,
  communityData,
  getUserAllCommunitiesRegistered,
  chainId,
  setLoading,
  setSnackbar,
}) {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [isMainAdmin, setIsMainAdmin] = useState(true);
  const [adminUsers, setAdminUsers] = useState([]);
  const [newAdminUser, setNewAdminUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    // Check if the current user is the main admin
    const role = Cookies.get("role");
    if (role === "main-admin") {
      setIsMainAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (isMainAdmin) {
      fetchAdminUsers();
    }
  }, [isMainAdmin]);

  const fetchAdminUsers = async () => {
    try {
      const response = await fetch("/api/adminUsers");
      const data = await response.json();
      setAdminUsers(data);
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
    }
  };

  const handleAddAdminUser = async () => {
    try {
      await fetch("/api/adminUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAdminUser),
      });
      setNewAdminUser({ username: "", email: "", password: "", role: "" });
      fetchAdminUsers();
    } catch (error) {
      console.error("Failed to add admin user:", error);
    }
  };

  const handleDeleteAdminUser = async (userId) => {
    try {
      await fetch(`/api/adminUsers?id=${userId}`, {
        method: "DELETE",
      });
      fetchAdminUsers();
      setOpenDialog(false);
    } catch (error) {
      console.error("Failed to delete admin user:", error);
    }
  };

  const handleOpenDialog = (userId) => {
    setUserToDelete(userId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUserToDelete(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const goToLanding = () => router.push("/");
  const handleLogout = () => {
    setLoading(true);
    fetch("/api/logout", {
      method: "POST",
    }).then(() => {
      Cookies.remove("role");
      // router.push("/admin");
      router.reload();
    });
  };
  return (
    <Box className="flex mob:gap-4 desk:gap-6 justify-between">
      <Box
        className="min-h-[1000px] max-w-[300px] pt-8 mob:hidden lap:flex lap:!flex-[1_0_300px] desk:!flex-[1_0_300px] px-6  flex-col"
        sx={{ backgroundColor: "#e7e7e8" }}
      >
        <Box
          onClick={goToLanding}
          className="mob-ssm:h-[32px] mob-ssm:w-[144.8px] mb-[52px]"
        >
          <Image
            // className={styles["logo"]}
            src={theme === "light" ? "/logoWhite.png" : "/logoDark.png"}
            width={144.8}
            height={32}
            alt="logo"
            className="mob-ssm:h-[32px] mob-ssm:w-[144.8px] "
            layout="responsive"
          />
        </Box>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          className="mb-6 !items-start sticky top-0"
          aria-label="vertical nav tabs"
          indicatorColor="#fff"
        >
          {(isMainAdmin ? mainAdminTabs : SettingsNavTabs).map(
            ({ label, icon, index }) => (
              <Tab
                key={label}
                label={label}
                icon={icon}
                className="!text-2xl min-h-0 !text-base !normal-case lap:!px-0 lap:!py-4 desk:!py-4 lap:gap-4 desk:gap-6 !flex-row !items-center !max-w-full w-full !justify-start"
                sx={{
                  minWidth: "fit-content",
                  flex: 1,
                  color: "#000000",
                  fontWeight: "300",
                  // padding: "24px 52px",
                  borderBottom: "1px solid #10111B1A",
                  "&.Mui-selected": {
                    // Your custom styles for the active tab
                    fontWeight: "400",
                    borderBottom: "1px solid #10111B",
                  },
                }}
                {...a11yProps(index)}
              />
            )
          )}
        </Tabs>
        <Box
          className="!text-2xl min-h-0 !text-base !normal-case lap:!px-0 lap:!py-4 desk:!py-4 flex lap:gap-4 desk:gap-6 !flex-row !items-center !max-w-full w-full !justify-start mt-auto cursor-pointer sticky bottom-0"
          sx={{
            minWidth: "fit-content",
            color: "#000000",
            fontWeight: "300",
          }}
          onClick={handleLogout}
        >
          <LogoutIcon
            width="18px"
            height="18px"
            className="w-[18px] h-[18px]"
          />
          Log out
        </Box>
      </Box>
      <Container>
        {/* Use the CustomTabPanel component with the imported components */}
        <CustomTabPanel
          value={value}
          index={0}
          className=" relative lap:mr-4 desk:mr-6"
        >
          <PageTitle title={"USERS"} />
          <CustomTable
            columns={userColumns}
            communityColumns={communityColumns}
            getUserAllCommunitiesRegistered={getUserAllCommunitiesRegistered}
            setLoading={setLoading}
            chainId={chainId}
            data={userData}
            type={"user"}
          />
        </CustomTabPanel>
        <CustomTabPanel
          value={value}
          index={1}
          className=" relative lap:mr-4 desk:mr-6"
        >
          <PageTitle title={"COMMUNITIES"} />
          <CustomTable
            columns={communityColumns}
            setLoading={setLoading}
            getUserAllCommunitiesRegistered={getUserAllCommunitiesRegistered}
            chainId={chainId}
            userColumns={userColumns}
            data={communityData}
            type={"community"}
          />
        </CustomTabPanel>
        {isMainAdmin && (
          <CustomTabPanel
            value={value}
            index={2}
            className="relative lap:mr-4 desk:mr-6"
          >
            <PageTitle title={"Manage Admins"} />
            <Box className="mb-[64px]">
              <Typography
                fontSize={{ mob: "16px", tab: "18px" }}
                fontWeight={"400 !important"}
                letterSpacing={"-0.48px"}
                lineHeight={"120%"}
                className="uppercase mb-6"
                color={"text.primary"}
              >
                Add Admin User
              </Typography>

              <CustomInput
                label="Username"
                type="text"
                placeholder="Admin Username"
                value={newAdminUser.username}
                // inputBoxSX={{ marginBottom: "0px" }}
                handleChange={(e) =>
                  setNewAdminUser({ ...newAdminUser, username: e.target.value })
                }
                fullWidth
              />
              <CustomInput
                label="Email"
                type="text"
                placeholder="Admin Email"
                value={newAdminUser.email}
                // inputBoxSX={{ marginBottom: "0px" }}
                handleChange={(e) =>
                  setNewAdminUser({ ...newAdminUser, email: e.target.value })
                }
                fullWidth
              />
              <Typography
                sx={{
                  fontSize: "14px",
                  lineHeight: "normal",
                  color: "text.primary",
                  fontWeight: "400 !important",
                }}
                className="uppercase mb-[8px]"
              >
                Role
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: "24px" }}>
                <Select
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  id="role"
                  value={newAdminUser.role}
                  onChange={(e) =>
                    setNewAdminUser({ ...newAdminUser, role: e.target.value })
                  }
                  className="!py-[9.5px]"
                >
                  <MenuItem value="">Admin Roles</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"main-admin"}>Main Admin</MenuItem>
                </Select>
              </FormControl>
              <CustomInput
                label="Password"
                type="text"
                placeholder="Admin Password"
                value={newAdminUser.password}
                // inputBoxSX={{ marginBottom: "0px" }}
                handleChange={(e) =>
                  setNewAdminUser({ ...newAdminUser, password: e.target.value })
                }
                fullWidth
              />

              <Button
                variant="contained"
                onClick={handleAddAdminUser}
                className="lightBlue"
                sx={{
                  padding: "9.5px 24px",
                  fontSize: "16px",
                  fontWeight: "400 !important",
                  "&.MuiButtonBase-root.lightBlue": {
                    backgroundColor: "#34A4E0",
                  },
                  "&.MuiButtonBase-root.lightBlue:hover": {
                    backgroundColor: "rgba(52, 164, 224, 0.9) ",
                  },
                  lineHeight: "120%",
                  color: "#10111B",
                  textTransform: "uppercase",
                }}
              >
                Add Admin
              </Button>
            </Box>
            <Box>
              <Typography
                fontSize={{ mob: "16px", tab: "18px" }}
                fontWeight={"400 !important"}
                letterSpacing={"-0.48px"}
                lineHeight={"120%"}
                className="uppercase mb-6"
                color={"text.primary"}
              >
                Admin Users
              </Typography>
              {/* {adminUsers.map((adminUser) => (
                <Box key={adminUser._id} className="flex items-center gap-6">
                  <Button
                    onClick={() => handleDeleteAdminUser(adminUser._id)}
                    variant="contained"
                    sx={{
                      color: "primary.reversed",
                      lineHeight: "120% !important",
                      textTransform: "uppercase",
                      color: "#000",
                      border: "1px solid #f3f3f3",
                      "&.MuiButtonBase-root.black:hover": {
                        backgroundColor: "rgba(255, 255,255, 0.8)",
                      },
                    }}
                    className="!py-[9.5px] !px-0"
                  >
                    <PersonRemoveOutlinedIcon
                      className={"!w-[24px] !h-[24px]"}
                    />
                  </Button>
                  <Typography>{adminUser.username}</Typography>
                </Box>
              ))} */}
              <TableContainer
                component={Paper}
                className="shadow-none p-0 rounded-none mb-8"
              >
                <Table className="min-w-[830px]">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      {adminColumns.map((column) => (
                        <TableCell key={column.dataKey}>
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminUsers.map((adminUser, index) => {
                      return (
                        <TableRow key={index} hover>
                          <TableCell padding="checkbox">
                            <Tooltip title="Delete Admin">
                              <Button
                                onClick={() => handleOpenDialog(adminUser._id)}
                                variant="contained"
                                sx={{
                                  color: "primary.reversed",
                                  lineHeight: "120% !important",
                                  textTransform: "uppercase",
                                  color: "#000",
                                  border: "1px solid #10111B33",
                                  "&.MuiButtonBase-root.black:hover": {
                                    backgroundColor: "rgba(255, 255,255, 0.8)",
                                  },
                                }}
                                className="!py-[9.5px] !px-0"
                              >
                                <PersonRemoveOutlinedIcon
                                  className={"!w-[24px] !h-[24px]"}
                                />
                              </Button>
                            </Tooltip>
                          </TableCell>
                          {adminColumns.map((column) => (
                            <TableCell key={`${index}-${column.dataKey}`}>
                              {adminUser[column.dataKey]}
                            </TableCell>
                          ))}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </CustomTabPanel>
        )}
      </Container>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="!rounded-none"
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded": {
            borderRadius: "0",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this admin user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you want to delete
            this admin user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            className="!py-[9.5px] !px-6"
            sx={{
              lineHeight: "120% !important",
              textTransform: "uppercase",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteAdminUser(userToDelete)}
            autoFocus
            variant="contained"
            sx={{
              color: "primary.reversed",
              lineHeight: "120% !important",
              textTransform: "uppercase",
              "&.MuiButtonBase-root.black:hover": {
                backgroundColor: "rgba(0, 0,0, 0.8)",
              },
            }}
            className="black !py-[9.5px] !px-6"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
