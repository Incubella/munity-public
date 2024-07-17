import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AccordionContainer = ({
  title,
  children,
  childrenStyles,
  accordionStyles,
  parentStyles,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleAccordionChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <Box className={"mt-8 " + parentStyles}>
      <Accordion
        expanded={expanded}
        onChange={handleAccordionChange}
        className={"border-none !p-0 !border-0 !shadow-none " + accordionStyles}
        sx={{
          ".MuiCollapse-root": {
            border: "1px solid",
            borderTop: "none",
            borderColor: "primary.border",
            backgroundColor: "primary.reversed",
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "primary.reversed" }} />}
          aria-controls="panel-content"
          id="panel-header"
          sx={{
            backgroundColor: "text.primary",
            color: "primary.reversed",
            padding: "16px 24px",
            minHeight: "unset !important",
            ".MuiAccordionSummary-content": {
              margin: "0 !important",
            },
          }}
        >
          <Typography
            sx={{ color: "primary.reversed" }}
            fontSize={"24px"}
            lineHeight={"120%"}
            letterSpacing={"-0.48px"}
            className="!m-0 !p-0"
          >
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: { mob: "16px", tab: "24px" } }}
          className={childrenStyles}
        >
          {/* Placeholder colors */}
          {children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AccordionContainer;
