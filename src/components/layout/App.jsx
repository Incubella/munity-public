// App.js
import Head from "next/head";

import Header from "../header";
import Footer from "../footer";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "@/utils";

const App = ({ children }) => {
  const themeType = useSelector((state) => state.app.theme);
  const [theme, setTheme] = useState(darkTheme);

  useEffect(() => {
    setTheme(themeType === "dark" ? darkTheme : lightTheme);
    const themeClass = themeType === "dark" ? "darkTheme" : "lightTheme";
    // This ensures that the following code runs only in the browser
    if (typeof document !== "undefined") {
      document.body.classList.add(themeClass);
      document.body.classList.remove(
        themeType === "dark" ? "lightTheme" : "darkTheme"
      );
    }
  }, [themeType]);

  return (
    <>
      <Head>
        <title>Munity</title>
        <meta name="description" content="Built by Ascended" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "background.default" }}>
          <Header />
          {children}
          <Footer />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
