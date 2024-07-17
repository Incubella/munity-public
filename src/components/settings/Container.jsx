/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";

export default function PageTitle({ children }) {
  return (
    <Box className="w-full max-w-[1046px] mob:mb-[52px] lap:mb-0 mob:mt-3 lap:mt-[46px] mob:mx-4 lap:mx-auto overflow-hidden">
      {children}
    </Box>
  );
}
