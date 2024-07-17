import Head from "next/head";
import { Box, Typography } from "@mui/material";
/* eslint-disable import/no-anonymous-default-export */
import Welcome from "../components/landing/welcome";
import Partners from "../components/landing/partners";
import About from "../components/landing/about";
import Community from "../components/landing/community";
import Membership from "../components/landing/membership";
import Supports from "../components/landing/supports";
export default function Home() {
  return (
    <Box>
      <>
        <Welcome />
        <Partners />
        <About />
        <Community />
        <Membership />
        <Supports />
      </>
    </Box>
  );
}

// export async function getServerSideProps() {
//   const { events_categories } = await import("/data/data.json");
//   return {
//     props: {
//       data: events_categories,
//     },
//   };
// }
