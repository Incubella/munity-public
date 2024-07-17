// App.js
import Head from "next/head";
import Header from "../header";
import Footer from "../footer";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { darkTheme, lightTheme } from "@/utils";

const App = ({ children }) => {
  const themeType = useSelector((state) => state.app.theme);
  const [theme, setTheme] = useState(darkTheme);
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    setTheme(themeType === "dark" ? darkTheme : lightTheme);
    const themeClass = themeType === "dark" ? "darkTheme" : "lightTheme";
    if (typeof document !== "undefined") {
      document.body.classList.add(themeClass);
      document.body.classList.remove(
        themeType === "dark" ? "lightTheme" : "darkTheme"
      );
    }
  }, [themeType]);

  // Check if the current route is part of the admin panel
  const isAdminPage = router.pathname.includes("/admin");

  return (
    <>
      <Head>
        <title>Munity</title>
        <meta name="description" content="Built by Ascended" />
        <link rel="icon" href="/logo.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "background.default" }}>
          {!isAdminPage && <Header />}
          {children}
          {!isAdminPage && <Footer />}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default App;
