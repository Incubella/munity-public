/* eslint-disable import/no-anonymous-default-export */
import { Box, Divider, Typography } from "@mui/material";
import styles from "./about.module.scss";

const rows = [
  {
    number: "2.0",
    title: "Antonym",
    desc: "Antonym is a phygital lifestyle brand, bridging the gap between digital collectibles and physical designer goods.",
  },
  {
    number: "2.1",
    title: "Phygital",
    desc: "Rather than accept the separation of the physical and the digital world, we believe the future is phygital - working in harmony to create unique product experiences that connect cultures and communities.",
  },
  {
    number: "2.2",
    title: "Antonym: genesis collection",
    desc: "Antonym: genesis is our flagship collection of 8,888 nfts and is the center of the antonym ecosystem. Each collector of an antonym: genesis nfts will experience phygital, with the opportunity to redeem limited-edition, designer art toys, ranging in size based on the number of nfts collected. As we build antonym into a global brand, all growth initiatives, including future drops and experiences, will drive value for the antonym: genesis collection",
  },
  {
    number: "2.3",
    title: "Future",
    desc: "By leveraging limited-supply drops of new products, select brand collaborations, planned retail locations in tier 1 cities, and phygital experiences, antonym is building at the intersection of art, fashion, and culture.",
  },
];

export default function About() {
  return (
    <Box className={styles["container"]}>
      <Divider sx={{ mb: "2rem" }} />
      <Box className="flex fj-sb">
        <Typography className={styles["title"]}>About Us</Typography>
        <Typography className={styles["number"]}>02.</Typography>
      </Box>
      {rows.map(({ number, title, desc }) => (
        <Box className={`flex flex-1 fj-sb ${styles["row"]}`} key={number}>
          <Typography className={styles["rowNumber"]}>{number}</Typography>
          <Box className={`flex ${styles["title"]}`}>
            <Divider orientation="vertical" sx={{ mr: "2rem" }} />
            <Typography>{title}</Typography>
          </Box>
          <Typography className={styles["desc"]}>{desc}</Typography>
        </Box>
      ))}
    </Box>
  );
}
