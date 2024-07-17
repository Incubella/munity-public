import * as React from "react";

import "../app/globals.css";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { store } from "../utils/store";
import { Web3ContextProvider } from "../utils";
import App from "@/components/layout/App";
import RainbowKitWagmiContextProvider from "@/context/RinbowkitWagmiContext";
// import { useRouter } from "next/router";
import CookieBanner from "@/components/policy/CookieBanner";
const MyApp = ({ Component, pageProps }) => {
  // const router = useRouter();
  // const [bannedIPs, setBannedIPs] = useState([]);
  // const [userIP, setUserIP] = useState("");

  // useEffect(() => {
  //   const fetchBannedIPs = async () => {
  //     try {
  //       const response = await fetch("/api/banned-ips");
  //       const data = await response.json();
  //       setBannedIPs(data.bannedIPs);
  //     } catch (error) {
  //       console.error("Error fetching banned IPs:", error);
  //     }
  //   };

  //   fetchBannedIPs();
  // }, []);

  // useEffect(() => {
  //   const getUserIP = async () => {
  //     try {
  //       const response = await fetch("https://api64.ipify.org?format=json");
  //       const data = await response.json();
  //       setUserIP(data.ip);
  //     } catch (error) {
  //       console.error("Error fetching user IP:", error);
  //     }
  //   };

  //   getUserIP();
  // }, []);

  // useEffect(() => {
  //   if (bannedIPs.includes(userIP)) {
  //     router.push("/banned"); // Redirect to a banned page
  //   }
  // }, [bannedIPs, userIP, router]);
  return (
    <Provider store={store}>
      <RainbowKitWagmiContextProvider>
        <Web3ContextProvider>
          <App>
            <Component {...pageProps} />
            <CookieBanner />
          </App>
        </Web3ContextProvider>
      </RainbowKitWagmiContextProvider>
    </Provider>
  );
};

export default MyApp;
