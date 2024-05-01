/* eslint-disable import/no-anonymous-default-export */
import { Box } from "@mui/material";

export default function SettingsBox({ children, addClassNames }) {
  return (
    <Box
      className={
        "grid mob:grid-cols-1 tab:grid-cols-2 mob:gap-4 tab:gap-6 lap:gap-4 desk:gap-8  " +
        addClassNames
      }
    >
      {children}
    </Box>
  );
}
