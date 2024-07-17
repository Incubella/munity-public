/* eslint-disable import/no-anonymous-default-export */
import { Tabs, Tab } from "@mui/material";

export default function ContentTabs({
  value,
  handleChange,
  navTabs,
  a11yProps,
  type,
  classNames,
  addSX,
}) {
  return (
    <Tabs
      // centered
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      className={classNames}
      aria-label="scrollable auto tabs"
      sx={{ borderColor: "primary.border", ...addSX }}
    >
      {navTabs.map(({ label, is_active, index }) => (
        <Tab
          key={label}
          label={label}
          className={`${
            type !== "settings" && !is_active && "hidden"
          } !text-lg !font-light !capitalize mob:!px-6 mob:!py-4 lap:!p-6`}
          sx={{ minWidth: "fit-content", flex: 1, color: "text.secondary" }}
          {...a11yProps(index)}
        />
      ))}
    </Tabs>
  );
}
