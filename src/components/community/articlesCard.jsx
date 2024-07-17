/* eslint-disable import/no-anonymous-default-export */
import { Typography, Box, Button } from "@mui/material";
function createMarkup(htmlContent) {
  return { __html: htmlContent };
}
export default ({ cardImg, userImg, title, text, username, date, url }) => {
  return (
    <Box
      sx={{ borderColor: "primary.border" }}
      className="border-b mob:border-solid mob:pb-4 lap:pb-0 lap:border-none"
    >
      <Box className="flex mob:flex-wrap mob-sm:flex-nowrap mob:gap-4 tab:gap-6 items-start">
        {cardImg && (
          <img
            src={cardImg}
            alt={title}
            className="w-full h-[110px] max-w-[110px] object-cover"
          />
        )}
        <Box
          className="w-full flex  items-start justify-between gap-6 lap:pb-[20px] border-b mob:border-none lap:border-solid"
          sx={{ borderColor: "primary.border" }}
        >
          <div className="w-full max-w-[325px]">
            <Typography
              fontSize={"24px"}
              fontWeight={`400 !important`}
              className="mob:!mb-3 tab:!mb-[20px] "
              lineHeight={"120%"}
              color={"text.primary"}
              sx={{ letterSpacing: "-0.48px;" }}
            >
              {title}
            </Typography>
            <Box className="flex items-center gap-[8px] flex-wrap">
              <img
                src={userImg}
                alt={username}
                className="mob:w-6 mob:h-6 tab:w-8 tab:h-8 object-cover tab:mr-[4px]"
              />
              <Typography
                fontSize={{
                  mob: "14px",
                  tab: "16.5px",
                }}
                fontWeight="300"
                color={"text.primary"}
              >
                {username}
              </Typography>
              <Typography
                fontSize={"24px"}
                color={"primary.border"}
                lineHeight={"normal"}
                // maxWidth={"4px"}
              >
                •
              </Typography>
              <Typography
                fontSize={{
                  mob: "14px",
                  tab: "16.5px",
                }}
                fontWeight="300"
                color={"text.secondary"}
              >
                {date}
              </Typography>
            </Box>
          </div>
          <div className="mob:!hidden lap:!block max-w-[614px] self-center">
            <Typography
              fontSize="14px"
              color="text.secondary"
              lineHeight={"normal"}
            >
              <span dangerouslySetInnerHTML={createMarkup(text)} />
            </Typography>
            <Button
              className="!mt-3 !p-0"
              variant={"text"}
              href={url}
              sx={{
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: "142.857%",
                textDecoration: "underline !important",
                color: "#1877A9",
              }}
            >
              Read more
            </Button>
          </div>
        </Box>
      </Box>
      <div className="w-full lap:!hidden mt-4">
        <Typography
          fontSize="14px"
          color="text.secondary"
          lineHeight={"normal"}
        >
          <span dangerouslySetInnerHTML={createMarkup(text)} />
        </Typography>
        <Button
          className="!mt-3 !p-0"
          variant={"text"}
          href={url}
          sx={{
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: "142.857%",
            textDecoration: "underline !important",
            color: "#1877A9",
          }}
        >
          Read more
        </Button>
      </div>
    </Box>
  );
};
