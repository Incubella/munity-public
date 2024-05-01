import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/legacy/image";
import {
  Box,
  Button,
  Divider,
  TextField,
  Tooltip,
  Typography,
  Stack,
} from "@mui/material";
import { Instagram, MailOutlined, Twitter, YouTube } from "@mui/icons-material";
import styles from "./footer.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";

const socials = [
  {
    label: "twitter",
    icon: <Twitter color="secondary" />,
    link: "https://twitter.com/",
  },
  {
    label: "instagram",
    icon: <Instagram color="secondary" />,
    link: "https://instagram.com/",
  },
  {
    label: "discord",
    icon: (
      <Image
        src={"/images/discord.png"}
        alt="discord"
        color="secondary"
        width={24}
        height={24}
      />
    ),
    link: "https://discord.com/invite/",
  },
  {
    label: "youtube",
    icon: <YouTube color="secondary" />,
    link: "https://youtube.com/",
  },
  {
    label: "mail",
    icon: <MailOutlined color="secondary" />,
    link: "mailto:bilal@incubella.co",
  },
];

const links = [
  { label: "Main", link: "/main", soon: false },
  { label: "Art", link: "/arts", soon: true },
  { label: "Gaming", link: "/gaming", soon: true },
  { label: "Memberships", link: "/pricing", soon: true },
  { label: "Photography", link: "/gallery", soon: true },
  { label: "Single", link: "/single", soon: false },
  { label: "Community", link: "/community", soon: false },
  { label: "Profile", link: "/profile", soon: false },
  { label: "Settings", link: "/settings", soon: false },
  { label: "Watchlist", link: "/watchlist", soon: true },
];

export default function Footer() {
  const router = useRouter();

  const goToLanding = () => router.push("/");
  const matches = useMediaQuery("(min-width:1024px)");

  return (
    <Box className={"footer " + styles["container"]}>
      <Stack
        className={`${styles["top"]} tab:gap-y-8 mob:gap-y-[24px] tab:gap-x-6`}
        divider={
          <Divider
            orientation={matches ? "vertical" : "horizontal"}
            flexItem
            light
            sx={{
              background: "none",
              borderColor: "rgba(232, 233, 244, 0.10)",
            }}
            className="!m-0"
          />
        }
        direction={{ mob: "column", lap: "row" }}
        justifyContent="space-between"
        alignItems={"start"}
        flexWrap="wrap"
        spacing={2}
      >
        <Box className="lap:max-w-[347px] mob:px-4 tab:px-0">
          <Box className={styles["logo-container"]} onClick={goToLanding}>
            <Image
              className={styles["logo"]}
              src={"/logoWhite.png"}
              alt="logo"
              color="secondary"
              width={190.056}
              height={42}
            />
          </Box>
          <Typography className="tab:!mt-6 tab:!mb-8 mob:!my-4 !leading-[19.8px] text-blackGray06">
            Ut sodales, ex sit amet consectetur accumsan, nibh ex sollicitudin
            metus, volutpat lacinia arcu nibh vel ante. Proin dapibus dui eget
            justo tincidunt eleifend.
          </Typography>
          <Divider />
          <Typography
            color="secondary"
            fontSize={{ mob: "18px", tab: "24px" }}
            className="mob:!mt-4 tab:!mt-8 !mb-4"
          >
            JOIN THE COMMUNITY
          </Typography>
          <Box className="flex ai-ce gap-[12px] flex-wrap">
            {socials.map(({ label, icon, link }) => (
              <Link
                key={label}
                href={link}
                className={`flex ai-ce fj-ce ${styles["social"]}`}
                target="_blank"
                rel="noreferrer"
              >
                {icon}
              </Link>
            ))}
          </Box>
        </Box>

        <Box className={styles["links"] + " mob:px-4 tab:px-0"}>
          <Typography
            className="text-grayWhite"
            fontSize={{ mob: "18px", tab: "24px" }}
          >
            Links
          </Typography>
          <Box className="flex gap-10 flex-wrap gap-y-0">
            <Box>
              {links.slice(0, 5).map(({ label, link, soon }) =>
                soon ? (
                  <Tooltip key={label} title="Coming soon">
                    <Typography
                      key={label}
                      color="secondary"
                      className={styles["disabled"]}
                    >
                      {label}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    key={label}
                    color="secondary"
                    onClick={() => router.push(link)}
                  >
                    {label}
                  </Typography>
                )
              )}
            </Box>
            <Box>
              {links.slice(5).map(({ label, link, soon }) =>
                soon ? (
                  <Tooltip key={label} title="Coming soon">
                    <Typography
                      color="secondary"
                      className={styles["disabled"]}
                    >
                      {label}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    key={label}
                    color="secondary"
                    onClick={() => router.push(link)}
                  >
                    {label}
                  </Typography>
                )
              )}
            </Box>
          </Box>
        </Box>

        <Box className="max-w-[423px] !m-0 mob:px-4 tab:px-0">
          <Typography
            className="text-grayWhite"
            fontSize={{ mob: "18px", tab: "24px" }}
          >
            SUBSCRIBE TO NEWSLETTER
          </Typography>
          <Typography className={styles["description"] + " text-blackGray06"}>
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating Munity.
          </Typography>
          <TextField
            className={`w100 ${styles["emailInput"]}`}
            variant="outlined"
            placeholder="Enter your email address..."
            // sx={{ color: "#fff !important" }}
            sx={{
              color: "primary.white", // set the text color from your dark theme
              "& .MuiOutlinedInput-root": {
                borderColor: "primary.white", // set the border color from your dark theme
              },
              "&:hover .MuiOutlinedInput-root": {
                borderColor: "primary.white", // set the hover border color from your dark theme
              },
              // other styles for the specific TextField
            }}
          />
          <Button
            variant="text"
            className={`w100 !text-mainCol !bg-greenlight hover:!bg-greenlightHover !font-light capitalize ${styles["subscribe"]}`}
          >
            Subscribe
          </Button>
        </Box>
      </Stack>
      <Divider className="mob:!mt-6 tab:!mt-[56px]" />
      <Box
        className={`flex fj-sb flex-wrap gap-6 mob:px-4 tab:px-0 ${styles["bottom"]}`}
      >
        <Box className="flex">
          <Typography color="secondary">Privacy Policy</Typography>
          <Typography color="secondary">Terms of Service</Typography>
        </Box>
        <Typography className="!text-blackGray06">
          © 2023 - Present, Munity LLC
        </Typography>
      </Box>
    </Box>
  );
}
