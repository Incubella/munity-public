import React, { useState, useEffect } from "react";
import {
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Button,
  Pagination,
  Typography,
  Tooltip,
} from "@mui/material";
import CustomInput from "../CustomInput";
import Cookies from "js-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addressEllipsis } from "@/utils";
// Function to format date
export function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date = new Date(dateString);
  return date.toLocaleString("en-US", options);
}
const CustomTable = ({
  columns,
  data,
  type,
  communityColumns,
  userColumns,
  getUserAllCommunitiesRegistered,
  chainId,
  setLoading,
}) => {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState("");
  const [tableData, setTableData] = useState(data);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRow, setSelectedRow] = useState(null); // State to handle selected row (user/community)
  const rowsPerPage = 10;

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    setPage(1); // Reset page to 1 whenever the search term changes
  }, [searchTerm]);

  const handleSelect = (id, ip, wallet) => {
    const selectedIndex = selected.findIndex((item) => item.id === id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = [...selected, { id, ip, wallet }];
    } else {
      newSelected = selected.filter((item) => item.id !== id);
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.some((item) => item.id === id);

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  const executeAction = async () => {
    if (!action || selected.length === 0) return;

    if (action === "makeFeatured" && selected.length > 1) {
      alert("To make a community featured, please select only one community.");
      return;
    }
    setLoading(true);
    try {
      let endpoint = "";
      let payload = {};

      switch (action) {
        case "delete":
          endpoint =
            type === "user" ? "/api/users/delete" : "/api/communities/delete";
          payload =
            type === "user"
              ? { userIds: selected.map((item) => item.id) }
              : { communityIds: selected.map((item) => item.id) };
          break;
        case "ban":
          endpoint = "/api/ban/ip";
          payload = { ipAddresses: selected.map((item) => item.ip) };
          break;
        case "wallet":
          endpoint = "/api/ban/wallet";
          payload = { walletIds: selected.map((item) => item.wallet) };
          break;
        case "makeFeatured":
          endpoint = "/api/communities/feature";
          payload = { communityId: selected[0].id };
          break;
        default:
          return;
      }

      const token = Cookies.get("token");
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to execute action");
      }

      alert(`${action} action executed successfully`);
      if (action === "delete")
        setTableData(
          tableData.filter(
            (item) => !selected.some((sel) => sel.id === item._id)
          )
        );
      setSelected([]);
    } catch (error) {
      console.error("Error executing action:", error);
      alert("Error executing action");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const fetchSubscribersDetails = async (addresses) => {
    try {
      const promises = addresses.map((address) => {
        console.log("address.owner_of:", address.owner_of);
        return fetch(`/api/users?address=${address.owner_of.toLowerCase()}`);
      });
      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map((res) => res.json()));
      return data.map((res) => res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      return [];
    }
  };

  const handleRowClick = async (row) => {
    setLoading(true);
    setSelectedRow(row);

    if (type === "community") {
      try {
        const addresses = row.subscribersData;
        const subscribers = await fetchSubscribersDetails(addresses);
        const formattedUsersData = await Promise.all(
          subscribers.map(async (user) => {
            let userCommunityFromWeb3 = await getUserAllCommunitiesRegistered(
              user.address,
              chainId
            );
            return {
              ...user,
              join_date: formatDate(user.join_date), // Assuming 'joinedIn' is the key holding the date string
              formatedAddress: addressEllipsis(user.address),
              subscriptions: 0,
              userCommunityFromWeb3: userCommunityFromWeb3,
              communities: userCommunityFromWeb3.length,
            };
          })
        );
        console.log("subscriptions inside community:", formattedUsersData);
        setSelectedRow({ ...row, subscribers: formattedUsersData });
      } catch (error) {
        console.error("Error fetching subscribers", error);
      } finally {
        setLoading(false);
      }
    } else if (type === "user") {
      // Fetch communities owned by the user
      try {
        // let userCommunityFromWeb3 = await getUserAllCommunitiesRegistered(
        //   row.address,
        //   chainId
        // );
        const response = await fetch(`/api/communities?userId=${row._id}`);
        if (response.ok) {
          let ownCommunity = await response.json();
          ownCommunity = ownCommunity.data;
          ownCommunity.createdAt = formatDate(ownCommunity.createdAt);
          // console.log(
          //   "ownCommunities",
          //   ownCommunity,
          //   "userCommunityFromWeb3:",
          //   row.userCommunityFromWeb3[0].joinedUsers.result.length,
          //   "row",
          //   row
          // );
          setSelectedRow({
            ...row,
            ownCommunity,
            subscribers: row.userCommunityFromWeb3[0].joinedUsers.result.length,
          });
        } else {
          throw new Error("Failed to fetch own communities");
        }
      } catch (error) {
        console.error("Error fetching own communities:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    setSelectedRow(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData =
    type === "community"
      ? tableData.filter((row) =>
          row.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : tableData.filter((row) =>
          row.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
  return (
    <TableContainer
      component={Paper}
      className="shadow-none p-0 rounded-none mb-8"
    >
      {selectedRow ? (
        <Box>
          <Box className="flex gap-4 mb-8 items-center">
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              {type === "user" ? selectedRow.username : selectedRow.name}
            </Typography>
          </Box>
          {type === "user" ? (
            <Box>
              <Typography
                fontSize={{ mob: "16px", tab: "18px" }}
                fontWeight={"400 !important"}
                letterSpacing={"-0.48px"}
                lineHeight={"120%"}
                className="uppercase mb-6"
                color={"text.primary"}
              >
                OWN COMMUNITIES
              </Typography>
              <Box className="flex width-full align-center justify-between mb-6">
                <FormControl fullWidth className="max-w-[186px] ">
                  <Select
                    value={action}
                    onChange={handleActionChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="!py-[9.5px]"
                  >
                    <MenuItem value="">Select action</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                    <MenuItem value="ban">Ban IP</MenuItem>
                    <MenuItem value="wallet">Ban Wallet</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={executeAction}
                  variant="contained"
                  sx={{
                    color: "primary.reversed",
                    lineHeight: "120% !important",
                  }}
                  className="black !py-[9.5px] !px-6"
                  disabled={selected.length == 0}
                >
                  Submit
                </Button>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {communityColumns.map((column) => (
                      <TableCell
                        key={column.dataKey}
                        className={
                          column.dataKey == "createdAt" ||
                          column.dataKey == "communities"
                            ? "text-right"
                            : ""
                        }
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRow?.ownCommunity ? (
                    <TableRow key={selectedRow.ownCommunity._id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(selectedRow.ownCommunity._id)}
                          onChange={() =>
                            handleSelect(selectedRow.ownCommunity._id)
                          }
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-0`,
                          }}
                        />
                      </TableCell>
                      {communityColumns.map((column) => (
                        <TableCell
                          key={`${selectedRow.ownCommunity._id}-${column.dataKey}`}
                          className={
                            column.dataKey == "createdAt" ||
                            column.dataKey == "communities"
                              ? "text-right"
                              : ""
                          }
                        >
                          {selectedRow.ownCommunity[column.dataKey] ||
                            selectedRow[column.dataKey]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Typography>
                          This user hasn't created any community yet.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <Typography
                fontSize={{ mob: "16px", tab: "18px" }}
                fontWeight={"400 !important"}
                letterSpacing={"-0.48px"}
                lineHeight={"120%"}
                className="uppercase mb-6 mt-[52px]"
                color={"text.primary"}
              >
                SUBSCRIPTIONS
              </Typography>
              {/* <Box className="flex width-full align-center justify-between mb-6">
                <FormControl fullWidth className="max-w-[186px] ">
                  <Select
                    value={action}
                    onChange={handleActionChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="!py-[9.5px]"
                  >
                    <MenuItem value="">Select action</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={executeAction}
                  variant="contained"
                  sx={{
                    color: "primary.reversed",
                    lineHeight: "120% !important",
                  }}
                  className="black !py-[9.5px] !px-6"
                >
                  Submit
                </Button>
              </Box> */}
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell></TableCell> */}
                    {communityColumns.map(
                      (column) =>
                        column.dataKey === "name" && (
                          <TableCell key={column.dataKey}>
                            {column.label}
                          </TableCell>
                        )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRow?.userSubscriptionsData != undefined &&
                  selectedRow?.userSubscriptionsData.length ? (
                    selectedRow.userSubscriptionsData.map(
                      (community, index) => (
                        <TableRow key={index} hover>
                          {/* <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(subscriber._id)}
                          onChange={() =>
                            handleSelect(
                              subscriber._id,
                              subscriber.ip_address,
                              subscriber.address
                            )
                          }
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell> */}
                          {communityColumns.map(
                            (column) =>
                              column.dataKey === "name" && (
                                <TableCell
                                  key={`${index}-${column.dataKey}`}
                                  className="flex items-center gap-3 "
                                >
                                  <img
                                    src={community.avatarImage}
                                    className="w-[32px] h-[32px] border border-solid border-[#10111B]"
                                  />
                                  {community.title}
                                </TableCell>
                              )
                          )}
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} align="center">
                        <Typography>
                          User haven't subscribed any community yet.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Box>
              <Typography
                fontSize={{ mob: "16px", tab: "18px" }}
                fontWeight={"400 !important"}
                letterSpacing={"-0.48px"}
                lineHeight={"120%"}
                className="uppercase mb-6"
                color={"text.primary"}
              >
                SUBSCRIBERS
              </Typography>
              <Box className="flex width-full align-center justify-between mb-6">
                <FormControl fullWidth className="max-w-[186px] ">
                  <Select
                    value={action}
                    onChange={handleActionChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="!py-[9.5px]"
                  >
                    <MenuItem value="">Select action</MenuItem>
                    <MenuItem value="delete">Delete</MenuItem>
                    <MenuItem value="ban">Ban IP</MenuItem>
                    <MenuItem value="wallet">Ban Wallet</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={executeAction}
                  variant="contained"
                  sx={{
                    color: "primary.reversed",
                    lineHeight: "120% !important",
                  }}
                  className="black !py-[9.5px] !px-6"
                  disabled={selected.length == 0}
                >
                  Submit
                </Button>
              </Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {userColumns.map((column) => (
                      <TableCell
                        key={column.dataKey}
                        className={
                          column.dataKey == "communities" ? "text-right" : ""
                        }
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedRow.subscribers.length ? (
                    selectedRow.subscribers.map((subscriber, index) => (
                      <TableRow key={index} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(subscriber._id)}
                            onChange={() =>
                              handleSelect(
                                subscriber._id,
                                subscriber.ip_address,
                                subscriber.address
                              )
                            }
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </TableCell>
                        {userColumns.map((column) => (
                          <Tooltip
                            title={
                              column.dataKey == "formatedAddress" &&
                              subscriber["address"]
                            }
                          >
                            <TableCell
                              key={`${index}-${column.dataKey}`}
                              className={
                                column.dataKey == "communities"
                                  ? "text-right"
                                  : ""
                              }
                            >
                              {subscriber[column.dataKey]}
                            </TableCell>
                          </Tooltip>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={userColumns.length + 1}
                        align="center"
                      >
                        <Typography>
                          This community has no subscribers yet.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <Box className="flex width-full align-center justify-between mb-6">
            <FormControl fullWidth className="max-w-[186px] ">
              <Select
                value={action}
                onChange={handleActionChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="!py-[9.5px]"
              >
                <MenuItem value="">Select action</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
                {type === "community" ? (
                  <MenuItem value="makeFeatured">Make Featured</MenuItem>
                ) : (
                  [
                    <MenuItem value="ban" key="ban">
                      Ban IP
                    </MenuItem>,
                    <MenuItem value="wallet" key="wallet">
                      Ban Wallet
                    </MenuItem>,
                  ]
                )}
              </Select>
            </FormControl>
            <Button
              onClick={executeAction}
              variant="contained"
              sx={{
                color: "primary.reversed",
                lineHeight: "120% !important",
              }}
              className="black !py-[9.5px] !px-6"
              disabled={selected.length == 0}
            >
              Submit
            </Button>
          </Box>
          {/* {type === "community" && ( */}

          <Box>
            <CustomInput
              type="text"
              placeholder="Search"
              value={searchTerm}
              handleChange={handleSearchChange}
            />
          </Box>
          {/*  )} */}
          <Table className="min-w-[830px]">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.dataKey}
                    className={
                      column.dataKey == "createdAt" ||
                      column.dataKey == "communities"
                        ? "text-right"
                        : ""
                    }
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow key={row._id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected(row._id)}
                          onChange={() =>
                            handleSelect(row._id, row.ip_address, row.address)
                          }
                          inputProps={{
                            "aria-labelledby": `enhanced-table-checkbox-${index}`,
                          }}
                        />
                      </TableCell>
                      {columns.map((column) => (
                        <Tooltip
                          key={`${index}-${column.dataKey}`}
                          title={
                            column.dataKey == "formatedAddress" &&
                            row["address"]
                          }
                        >
                          <TableCell
                            key={`${index}-${column.dataKey}`}
                            className={
                              column.dataKey == "createdAt" ||
                              column.dataKey == "communities"
                                ? "text-right"
                                : "cursor-pointer"
                            }
                            onClick={() => handleRowClick(row)}
                          >
                            {row[column.dataKey]}
                          </TableCell>
                        </Tooltip>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {filteredData.length > rowsPerPage && (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(filteredData.length / rowsPerPage)}
                page={page}
                onChange={handleChangePage}
                color="primary"
                sx={{
                  ".MuiButtonBase-root.MuiPaginationItem-root": {
                    borderRadius: 0,
                  },
                  ".MuiButtonBase-root.MuiPaginationItem-root:hover": {
                    backgroundColor: "#B7D992",
                    color: "#10111B",
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
    </TableContainer>
  );
};

export default CustomTable;
