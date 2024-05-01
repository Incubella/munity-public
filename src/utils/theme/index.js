import { createTheme } from "@mui/material/styles";
import styled from "styled-components";

export const TokenIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const lightColors = {
  primary: "#10111B",
  reversed: "#FFF",
  errorColor: "#CC335C",
  errorBack: "#CC335C40",
  bgColor: "#fff",
  primaryBtn: "#1877A9",
  secondaryBtn: "#34A4E0",
  secondary: "rgba(16, 17, 27, 0.60)",
  secondaryReversed: "rgba(255, 255, 255, 0.60)",
  secondary07: "rgba(16, 17, 27, 0.70)",
  tertiary: "rgba(16, 17, 27, 0.40)",
  borderColor: "rgba(16, 17, 27, 0.20)",
  borderColorReversed: "rgba(255, 255, 255, 0.20)",
  iconBtn: "rgba(16, 17, 27, 0.10)",
  paperBg: "#FFF",
  black: "#10111B",
  noContentBg: "rgba(255, 255, 255, 0.90)",
  inputBG: "rgba(16, 17, 27, 0.05)",
  white: "#fff",
  veryGray: "#F4F4F2",
};

const darkColors = {
  primary: "#FFF",
  reversed: "#10111B",
  errorColor: "#CC335C",
  errorBack: "#CC335C40",
  bgColor: "#14151D",
  primaryBtn: "#1877A9",
  secondaryBtn: "#34A4E0",
  secondary07: "rgba(255, 255, 255, 0.70)",
  secondary: "rgba(255, 255, 255, 0.60)",
  secondaryReversed: "rgba(16, 17, 27, 0.60)",
  tertiary: "rgba(255, 255, 255, 0.40)",
  borderColor: "rgba(255, 255, 255, 0.20)",
  borderColorReversed: "rgba(16, 17, 27, 0.20)",
  iconBtn: "rgba(255, 255, 255, 0.10)",
  paperBg: "#14151D",
  black: "#10111B",
  noContentBg: "rgba(20, 21, 29, 0.90)",
  inputBG: "rgba(255, 255, 255, 0.05)",
  white: "#fff",
};

const globalTheme = {
  breakpoints: {
    values: {
      mob: 0,
      "mob-xs": 340,
      "mob-smm": 360,
      mobSm: 400,
      tab: 640,
      lap: 1024,
      desk: 1320,
    },
  },
  palette: {
    action: {
      disabledBackground: "#696C8029",
      disabled: "#696C80",
    },
    text: {
      disabled: "#696C80",
    },
  },
  spacing: 4,
  typography: {
    fontFamily: "A2Z-Styra-A",
    h1: {
      "@media (min-width:0px)": {
        fontSize: "24px",
      },
      "@media (min-width:600px)": {
        fontSize: "32px",
      },
      "@media (min-width:1024px)": {
        fontSize: "48px",
      },
      "@media (min-width:1320px)": {
        fontSize: "64px",
      },
      fontWeight: "400 !important",
      letterSpacing: "-1.28px",
      lineHeight: "normal",
    },
    h3: {
      fontSize: "48px",
      "@media (max-width:1024px)": {
        fontSize: "32px",
      },
      "@media (max-width:600px)": {
        fontSize: "24px",
      },
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: "25%",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          "&.Mui-selected": {
            // padding: "3px",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          "::after": { border: "none !important" },
          "::before": { border: "none !important" },
          padding: "0.25rem 0.5rem",
          border: "1px solid white",
          borderRadius: "1rem",
        },
        icon: { fill: "white" },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: "0 !important",
          width: "100%",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "rgba(16, 17, 27, 0.20)",
          borderColor: "rgba(232, 233, 244, 0.10)",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "0 !important",
          paddingLeft: "0 !important",
          ".MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        },
        input: {
          border: "none",
          background: "transparent",
          fontSize: "16.5px",
          fontWeight: "300",
          padding: "0px 7px !important",
          paddingLeft: "16px !important",
          ":disabled": {
            WebkitTextFillColor: "gray",
          },
          height: "44px",
          "&::placeholder": {
            opacity: 1,
          },
        },
        textareaAutosize: {
          background: "red",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          padding: "0.5rem 1rem",
          fontSize: "16.5px",
          fontWeight: "300",
          textTransform: "unset",
          "&.Mui-disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.25)",
          },
          "&:hover": {
            boxShadow: "none", // Remove the shadow on hover
          },
        },
        outlined: {
          borderRadius: "0px",
          padding: "0.5rem 1rem",
          fontSize: "16.5px",
          borderWidth: "1px",
          "&.slim": {
            padding: "0.25rem 2rem",
          },
        },
        contained: {
          borderRadius: "0px",
          padding: "1rem 1.5rem",
          fontSize: "16.5px",
          boxShadow: "0px 1px 15px #7E9AA926",

          "&.MuiButtonBase-root.offer": {
            padding: "0.5rem 2rem",
            background: lightColors.primaryBtn,
          },
          "&..MuiButtonBase-root.slim": {
            padding: "0.25rem 2rem",
          },
          "&:hover": {
            backgroundColor: "#1877A9",
          },
        },
        containedError: {
          backgroundColor: "rgba(179, 38, 30, 0.10)", // Change this to your desired error button background color
          "&:hover": {
            backgroundColor: "rgba(179, 38, 30, 0.20)", // Change this to your desired error button background color on hover
          },
        },
      },
      defaultProps: {
        autoCapitalize: "none",
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          boxShadow: "2px 30px 34px #7E9AA926",
          padding: "1.5em",
          "&.MuiAppBar-root": {
            padding: "0",
            boxShadow: "none",
          },
          "&.MuiMenu-paper": {
            marginTop: "1em",
            borderRadius: "10px",
            padding: "0.5em",
            boxShadow: "2px 12px 33px #7E9AA926",
          },
          "&.MuiAccordion-root, &.MuiAccordion-root:last-of-type": {
            padding: "1.75em 0 1em 0",
            borderRadius: "0",
          },
        },
      },
      defaultProps: {
        elevation: 0,
        // useFlexGap: true,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: "56px",
          height: "32px",
          padding: "4px",
          alignItems: "center",
          borderRadius: 0,
          backgroundColor: "rgba(16, 17, 27, 0.10)", // Change the non-active color
        },
        thumb: {
          opacity: "1 !important",
          borderRadius: 0,
          // Customize the thumb (the moving part of the switch)
          backgroundColor: "rgba(16, 17, 27, 0.40)", // Change the active color
          width: "24px",
          height: "24px",
          "&:hover": {
            backgroundColor: "#1565C0", // Change the hover color
          },
        },
        track: {
          borderRadius: 0,
          width: "56px",
          height: "32px",
          // Customize the track (the background of the switch)
          opacity: "1 !important",
          backgroundColor: "unset !important", // Change the non-active color
        },
        switchBase: {
          // Customize the base of the switch (including the sharp borders)
          borderRadius: 0,
          padding: "4px",
          "&:hover": { backgroundColor: "rgba(16, 17, 27, 0.08) !important" },
          "&.Mui-checked": {
            transform: "translateX(24px)",
          },
          "&.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: "#10111B", // Change the active color when checked
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          padding: "12px",
          borderRadius: "0",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },
};

// light threme
const lightBase = {
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primary,
      contrastText: lightColors.reversed,
      reversed: lightColors.reversed,
      border: lightColors.borderColor,
      borderReversed: lightColors.borderColorReversed,
      black: lightColors.black,
      white: lightColors.white,
      card: lightColors.veryGray,
    },
    secondary: {
      main: lightColors.reversed,
      contrastText: lightColors.primary,
    },
    background: {
      default: lightColors.bgColor,
      paper: lightColors.paperBg,
      iconBtn: lightColors.iconBtn,
      primaryBtn: lightColors.iconBtn,
      secondaryBtn: lightColors.secondaryBtn,
      noContentBg: lightColors.noContentBg,
      inputBG: lightColors.inputBG,
    },
    text: {
      primary: lightColors.primary,
      secondary: lightColors.secondary,
      secondaryReversed: lightColors.secondaryReversed,
      secondary07: lightColors.secondary07,
      tertiary: lightColors.tertiary,
    },
    error: {
      main: lightColors.errorColor,
      light: lightColors.errorBack,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.paperButton": {
            color: "#FFF",
            backgroundColor: "#10111B",
          },
          "&.menuButton": {
            border: "1px solid #10111B",
          },
          "&.border": {
            border: "1px solid #10111B",
            color: "#10111B",
          },
        },
        outlined: {
          "&, &:hover": {
            border: "2px solid #10111B",
          },
        },
        contained: {
          "&.closeButton": {
            color: lightColors.primary,
            background: lightColors.iconBtn,
          },
          "&.MuiButtonBase-root.black": {
            background: lightColors.primary,
          },
          "&.lowContrast": {
            backgroundColor: lightColors.reversed,
            color: lightColors.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: lightColors.primary,
          "&.softGradient": {
            background:
              "linear-gradient(45deg, rgba(229,229,235,1) 15%, rgba(229,229,235,0.42) 90%)",
          },
          "&.MuiAccordion-root": {
            borderBottom: "2px solid #00000040",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: lightColors.inputBG,
          "& svg": {
            fill: lightColors.primary,
          },
        },
        input: {
          "&::placeholder": {
            color: lightColors.secondary,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(16, 17, 27, 0.10)", // Change the non-active color
        },
        thumb: {
          backgroundColor: "rgba(16, 17, 27, 0.40)", // Change the active color
        },

        switchBase: {
          // Customize the base of the switch (including the sharp borders)
          "&:hover": { backgroundColor: "rgba(16, 17, 27, 0.08) !important" },
          "&.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: "#10111B", // Change the active color when checked
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "rgba(16, 17, 27, 0.20)",
        },
      },
    },
  },
};

// dark threme
const darkBase = {
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.primary,
      contrastText: darkColors.primary,
      border: darkColors.borderColor,
      borderReversed: darkColors.borderColorReversed,
      reversed: darkColors.reversed,
      black: darkColors.black,
      white: darkColors.white,
      card: darkColors.inputBG,
    },
    secondary: {
      main: darkColors.primary,
      contrastText: darkColors.primary,
    },
    background: {
      default: darkColors.bgColor,
      paper: darkColors.paperBg,
      iconBtn: darkColors.iconBtn,
      primaryBtn: darkColors.iconBtn,
      secondaryBtn: darkColors.secondaryBtn,
      noContentBg: darkColors.noContentBg,
      inputBG: darkColors.inputBG,
    },
    text: {
      primary: darkColors.primary,
      secondary: darkColors.secondary,
      secondaryReversed: darkColors.secondaryReversed,
      secondary07: darkColors.secondary07,
      tertiary: darkColors.tertiary,
    },
    error: {
      main: darkColors.errorColor,
      light: darkColors.errorBack,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.paperButton": {
            color: "#FFF",
            backgroundColor: "#000",
          },
          "&.menuButton": {
            border: "1px solid #FFF",
          },
          "&.border": {
            border: "1px solid #FFF",
            color: "#FFF",
          },
          "&.Mui-disabled": {
            color: darkColors.secondary,
          },
        },
        outlined: {
          "&, &:hover": {
            border: "2px solid #FFF",
          },
        },
        contained: {
          "&.closeButton": {
            color: darkColors.primary,
            background: darkColors.iconBtn,
          },
          "&.lowContrast": {
            backgroundColor: darkColors.reversed,
            color: darkColors.primary,
          },
          "&.MuiButtonBase-root.black": {
            background: darkColors.primary,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          color: darkColors.primary,
          "&.softGradient": {
            background:
              "linear-gradient(45deg, rgba(8,9,10,1) 0%, rgba(8,9,10,0.62) 5%, rgba(14,15,16,1) 90%)",
          },
          "&.MuiAccordion-root": {
            borderBottom: "2px solid #FFFFFF40",
          },
          boxShadow: "none",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: darkColors.inputBG,
          "& svg": {
            fill: darkColors.primary,
          },
        },
        input: {
          "&::placeholder": {
            color: darkColors.secondary,
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.10)", // Change the non-active color
        },
        thumb: {
          backgroundColor: "rgba(255, 255, 255, 0.40)", // Change the active color
        },

        switchBase: {
          // Customize the base of the switch (including the sharp borders)
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08) !important",
          },
          "&.Mui-checked .MuiSwitch-thumb": {
            backgroundColor: "#fff", // Change the active color when checked
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderColor: "rgba(255,255,255, 0.20)",
        },
      },
    },
    // MuiLink: {
    //   styleOverrides: {
    //     root: {
    //       "text-decoration-color": "#fff",
    //     },
    //   },
    // },
  },
};

export const lightTheme = createTheme(globalTheme, lightBase);
export const darkTheme = createTheme(globalTheme, darkBase);
