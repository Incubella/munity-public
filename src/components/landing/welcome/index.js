/* eslint-disable import/no-anonymous-default-export */
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import ReactCurvedText from "react-curved-text";
import GridBox from "../gridbox";
import GridBoxButton from "../gridbox/button";
import styles from "./welcome.module.scss";
import { ArrowOutwardOutlined } from "@mui/icons-material";

export default function Welcome() {
  const router = useRouter();

  const goToApp = () => router.push("/home");

  return (
    <GridBox>
      <Box className={`flex fc ${styles["container"]}`}>
        <Box className="flex fj-en pos-rel">
          <ReactCurvedText
            width={200}
            height={200}
            cx={100}
            cy={100}
            rx={90}
            ry={90}
            startOffset={0}
            text="M U N I T Y  N F T  M A R K E T P L A C E  •  M U N I T Y  N F T  M A R K E T P L A C E •"
            textProps={{
              style: { fontStretch: "expanded", fontSize: "15px" },
            }}
          />
          <Box className={`flex ai-ce fj-ce ${styles["circle"]}`}>
            <ArrowOutwardOutlined fontSize="large" color="secondary" />
          </Box>
        </Box>
        <GridBoxButton onClick={goToApp} className={styles["btnLaunch"]}>
          <Typography className={styles["launchText"]}>Launch App</Typography>
        </GridBoxButton>
        <Box className={styles["bio"]}>
          <Typography>NFT MARKETPLACE</Typography>
          <Typography>
            THE WEB 3.0
            <br />
            COMMUNITY
            <br />
            PLATFORM
          </Typography>
        </Box>
      </Box>
    </GridBox>
  );
}
