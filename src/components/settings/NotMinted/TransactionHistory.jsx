import { useState } from "react";
import {
  Box,
  // Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  // TableBody,
  Snackbar,
} from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import BtnChange from "../BtnChange";

import CallMissedOutgoingSharpIcon from "@mui/icons-material/CallMissedOutgoingSharp";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const TableCells = [
  {
    label: "Type",
  },
  {
    label: "Seller",
  },
  {
    label: "Buyer",
  },
  {
    label: "Price",
  },
  {
    label: "Time",
  },
  {
    label: "Details",
  },
];

const TransactionHistory = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  // Function to handle after copy event
  const handleCopy = () => {
    // You can display a message to the user or trigger a toast here
    console.log("copied");
    setSnackbarOpen(true); // Open the snackbar
  };
  const transactions = [
    {
      type: "Revoke",
      seller: "0x123...",
      buyer: "0x456...",
      price: "3 ETH",
      time: "2 months ago",
      details: "View",
    },
    {
      type: "Cancel",
      seller: "0x789...",
      buyer: "0xABC...",
      price: "2.5 ETH",
      time: "1 day ago",
      details: "View",
    },
    {
      type: "Sell",
      seller: "0x123...",
      buyer: "0x456...",
      price: "3 ETH",
      time: "2 hours ago",
      details: "View",
    },
    {
      type: "Buy",
      seller: "0x789...",
      buyer: "0xABC...",
      price: "2.5 ETH",
      time: "5 minutes ago",
      details: "View",
    },
    {
      type: "Revoke",
      seller: "0x789...",
      buyer: "0xABC...",
      price: "2.5 ETH",
      time: "3 day ago",
      details: "View",
    },
  ];

  return (
    <Box className="relative">
      <TableContainer
        sx={{
          maxWidth: "100%",
          position: "relative",
          overflow: "auto",
        }}
      >
        <Table sx={{ minWidth: "100%" }}>
          <TableHead>
            <TableRow
              sx={{
                "&:last-child th": {
                  borderBottom: "none", // Removes the border after thead
                },
              }}
            >
              {TableCells.map(({ label }) => (
                <TableCell
                  key={label}
                  className="px-6 !py-0 text-left lowercase tracking-wider"
                  sx={{
                    fontSize: "16.5px",
                    lineHeight: "120%",
                    color: "text.secondary",
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <LoadmoreShowLess
            data={transactions}
            initialItems={4}
            step={4}
            isTable={true}
            renderItem={(transaction, index) => (
              <TableRow
                key={index}
                sx={{
                  td: { borderColor: "background.iconBtn" }, // Replace #desiredColor with your chosen color
                }}
              >
                {/* Render your transaction data */}
                <TableCell sx={{ minWidth: "150px" }}>
                  {transaction.type}
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  {transaction.seller}
                  <CopyToClipboard
                    text={transaction.seller}
                    onCopy={handleCopy}
                  >
                    <ContentCopyIcon
                      fontSize={"16"}
                      sx={{
                        cursor: "pointer",
                        marginLeft: "5px",
                        color: "#34A4E0",
                      }}
                    />
                  </CopyToClipboard>
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  {transaction.buyer}
                  <CopyToClipboard text={transaction.buyer} onCopy={handleCopy}>
                    <ContentCopyIcon
                      fontSize={"16"}
                      sx={{
                        cursor: "pointer",
                        marginLeft: "5px",
                        color: "#34A4E0",
                      }}
                    />
                  </CopyToClipboard>
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  {transaction.price}
                </TableCell>
                <TableCell sx={{ minWidth: "150px" }}>
                  {transaction.time}
                </TableCell>
                <TableCell sx={{ minWidth: "130px" }}>
                  <BtnChange
                    containedCSS="!py-[8px] !px-4"
                    endIcon={<CallMissedOutgoingSharpIcon fontSize="small" />}
                  >
                    view
                  </BtnChange>
                </TableCell>
              </TableRow>
            )}
          />
        </Table>
      </TableContainer>
      <Snackbar
        open={snackbarOpen}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          ".MuiPaper-root": {
            flexGrow: "unset",
            borderRadius: "0",
            padding: "0 12px",
          },
        }}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default TransactionHistory;
