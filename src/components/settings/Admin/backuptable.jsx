import React, { useState } from "react";
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
} from "@mui/material";
import Cookies from "js-cookie";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const CustomTable = ({ columns, data, type }) => {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState("");
  const [tableData, setTableData] = useState(data);
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null); // State to handle selected row (user/community)
  const rowsPerPage = 10;

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
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = async (row) => {
    setSelectedRow(row);
    if (type === "community") {
      // Fetch subscribers for the community
      try {
        const response = await fetch(`/api/communities/${row._id}/subscribers`);
        if (response.ok) {
          const subscribers = await response.json();
          setSelectedRow({ ...row, subscribers });
        } else {
          throw new Error("Failed to fetch subscribers");
        }
      } catch (error) {
        console.error("Error fetching subscribers:", error);
      }
    } else if (type === "user") {
      // Fetch communities owned by the user
      try {
        const response = await fetch(`/api/communities?userId=${row._id}`);
        if (response.ok) {
          const ownCommunities = await response.json();
          setSelectedRow({ ...row, ownCommunities });
        } else {
          throw new Error("Failed to fetch own communities");
        }
      } catch (error) {
        console.error("Error fetching own communities:", error);
      }
    }
  };

  const handleBack = () => {
    setSelectedRow(null);
  };

  return (
    <TableContainer
      component={Paper}
      className="shadow-none p-0 rounded-none mb-8"
    >
      {selectedRow ? (
        <Box>
          <Box className="flex gap-4">
            <IconButton onClick={handleBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6">
              {type === "user" ? selectedRow.username : selectedRow.name}
            </Typography>
          </Box>
          {type === "user" ? (
            <Box>
              <Typography variant="h6">OWN COMMUNITIES</Typography>
              <FormControl fullWidth className="max-w-[186px] mb-2">
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {columns.map((column) => (
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
                  {selectedRow?.ownCommunities ? (
                    selectedRow?.ownCommunities.map((community, index) => (
                      <TableRow key={index} hover>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isSelected(community._id)}
                            onChange={() => handleSelect(community._id)}
                            inputProps={{
                              "aria-labelledby": `enhanced-table-checkbox-${index}`,
                            }}
                          />
                        </TableCell>
                        {columns.map((column) => (
                          <TableCell
                            key={`${index}-${column.dataKey}`}
                            className={
                              column.dataKey == "communities"
                                ? "text-right"
                                : ""
                            }
                          >
                            {community[column.dataKey]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow className="w-full">
                      <Typography>
                        This user haven't created any community yet.
                      </Typography>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6">SUBSCRIBERS</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {columns.map((column) => (
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
                  {selectedRow.subscribers.map((subscriber, index) => (
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
                      {columns.map((column) => (
                        <TableCell
                          key={`${index}-${column.dataKey}`}
                          className={
                            column.dataKey == "communities" ? "text-right" : ""
                          }
                        >
                          {subscriber[column.dataKey]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
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
            >
              Submit
            </Button>
          </Box>
          <Table className="min-w-[830px]">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {columns.map((column) => (
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
              {tableData
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <TableRow
                      key={index}
                      hover
                      onClick={() => handleRowClick(row)}
                    >
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
                        <TableCell
                          key={`${index}-${column.dataKey}`}
                          className={
                            column.dataKey == "communities" ? "text-right" : ""
                          }
                        >
                          {row[column.dataKey]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          {data.length > rowsPerPage && (
            <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
              <Pagination
                count={Math.ceil(data.length / rowsPerPage)}
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
