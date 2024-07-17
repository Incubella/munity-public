/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider, Typography } from "@mui/material";
import { community, star } from "../../../../public";
import styles from "./community.module.scss";
import Image from "next/image";

export default function Community() {
  return (
    <Box className={styles["container"]}>
      <Divider sx={{ mb: "2rem" }} />
      <Box className="flex fj-sb">
        <Typography className={styles["title"]}>
          Connect with your
          <br />
          Exclusive Community
        </Typography>
        <Typography className={styles["number"]}>03.</Typography>
      </Box>
      <Box className={`flex flex-1 ai-ce ${styles["section"]}`}>
        <Box className="flex-1 flex ai-ce fj-ce pos-rel">
          <Box className={styles["leftCircle"]}>&nbsp;</Box>
          <Box className={styles["rightCircle"]}>&nbsp;</Box>
          <Image
            src={"/images/community.png"}
            alt="community"
            className={styles["community"]}
            width={64}
            height={64}
          />
        </Box>
        <Box className="flex-1">
          <Box className={`flex ai-ce ${styles["row"]}`}>
            <Image
              src={"/images/star.png"}
              alt="star"
              className={styles["star"]}
              width={54}
              height={54}
            />
            <Typography>Start selling nft access cards in minutes</Typography>
          </Box>
          <Divider />
          <Box className={`flex ai-ce ${styles["row"]}`}>
            <Image
              src={"/images/star.png"}
              alt="star"
              className={styles["star"]}
              width={54}
              height={54}
            />
            <Typography>
              Token-gating for exclusive content, community access, and more.
            </Typography>
          </Box>
          <Divider />
          <Box className={`flex ai-ce ${styles["row"]}`}>
            <Image
              src={"/images/star.png"}
              alt="star"
              className={styles["star"]}
              width={54}
              height={54}
            />
            <Typography>
              Creator sourced, member-enabled, community governed
            </Typography>
          </Box>
          <Typography>
            Munity unites the inner circle between brands, creators, and their
            communities using blockchain technology.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
