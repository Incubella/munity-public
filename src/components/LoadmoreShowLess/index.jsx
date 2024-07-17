/* eslint-disable import/no-anonymous-default-export */
import { useState } from "react";
import { Button, Box, TableBody, TableCell, TableRow } from "@mui/material";

export default ({
  areNFTs = true,
  nav,
  isTable,
  classNames,
  data,
  initialItems,
  step,
  renderItem,
  addSX,
  addSingleBoxSX,
  singleClassNames,
}) => {
  const [visibleItems, setVisibleItems] = useState(initialItems);

  const loadMoreItems = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + step);
  };

  const showLessItems = () => {
    // setVisibleItems((prevVisibleItems) => Math.max(prevVisibleItems - step, 0));
    setVisibleItems(initialItems); // Reset to initialItems
  };

  const slicedData = data.slice(0, visibleItems);

  return (
    <>
      {!isTable ? (
        <Box sx={{ width: "100%", ...addSX }} className={classNames}>
          {slicedData.map((item, index) => (
            <Box
              key={index}
              sx={{ ...addSingleBoxSX }}
              className={"!w-auto " + singleClassNames}
            >
              {renderItem(item)}
            </Box>
          ))}
          {!areNFTs ? (
            <Box
              className="absolute inset-0 w-full h-full z-30"
              sx={{ backgroundColor: "background.noContentBg" }}
            ></Box>
          ) : (
            ""
          )}
          {visibleItems < data.length && (
            <Box className="w-full flex justify-center col-span-full lap:mt-[20px] uppercase">
              <Button
                variant="contained"
                sx={{
                  color: "primary.reversed",
                  lineHeight: "120% !important",
                }}
                onClick={loadMoreItems}
                className="black"
              >
                Load More
              </Button>
            </Box>
          )}
          {visibleItems > initialItems && data.length > initialItems && (
            <Box className="w-full flex justify-center col-span-full lap:mt-[20px] uppercase">
              <Button
                variant="contained"
                sx={{
                  color: "primary.reversed",
                  lineHeight: "120% !important",
                }}
                onClick={showLessItems}
                className="black"
              >
                Show Less
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <>
          <TableBody className={classNames} sx={{ overflowX: "auto" }}>
            {slicedData.map((transaction, index) =>
              renderItem(transaction, index)
            )}
          </TableBody>

          {(visibleItems > initialItems && data.length > initialItems) ||
          visibleItems < data.length ? (
            <TableBody>
              <TableRow
                sx={{
                  "& td": {
                    borderBottom: "none",
                    paddingBottom: "8px",
                    paddingTop: "32px",
                    position: "sticky",
                    bottom: 0,
                    display: { mob: "flex", lap: "table-cell" },
                    width: "max-content",
                  },
                }}
              >
                <TableCell colSpan={6} className="lap:!text-center inset-x-0 ">
                  {visibleItems < data.length && (
                    <Button
                      variant="contained"
                      sx={{
                        color: "primary.reversed",
                        lineHeight: "120% !important",
                      }}
                      onClick={loadMoreItems}
                      className="!uppercase black"
                    >
                      Load More
                    </Button>
                  )}
                  {visibleItems > initialItems &&
                    data.length > initialItems && (
                      <Button
                        variant="contained"
                        sx={{
                          color: "primary.reversed",
                          lineHeight: "120% !important",
                        }}
                        onClick={showLessItems}
                        className="!uppercase black"
                      >
                        Show Less
                      </Button>
                    )}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};
