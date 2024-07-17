import { Box, Typography } from "@mui/material";

const SingleAttribute = ({ benefit }) => {
  return (
    <Box className="flex items-center gap-6 mob:px-4 tab:px-6">
      <Box>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="29"
          viewBox="0 0 29 29"
          fill="none"
          className="mob-xs:w-[29px] mob:w-[24px] mob-xs:h-[29px] mob:h-[24px]"
        >
          <path
            d="M14.3258 0.308853C14.4023 0.173192 14.5977 0.173192 14.6742 0.308854L19.7017 9.22239C19.7196 9.25415 19.7458 9.28042 19.7776 9.29833L28.6911 14.3258C28.8268 14.4023 28.8268 14.5977 28.6911 14.6742L19.7776 19.7017C19.7458 19.7196 19.7196 19.7458 19.7017 19.7776L14.6742 28.6911C14.5977 28.8268 14.4023 28.8268 14.3258 28.6911L9.29833 19.7776C9.28042 19.7458 9.25415 19.7196 9.22239 19.7017L0.308853 14.6742C0.173192 14.5977 0.173192 14.4023 0.308854 14.3258L9.22239 9.29833C9.25415 9.28042 9.28042 9.25415 9.29833 9.22239L14.3258 0.308853Z"
            fill="#34A4E0"
          />
        </svg>
      </Box>
      <Typography
        sx={{ color: "text.primary" }}
        fontSize={{ mob: "18px", "mob-xs": "24px" }}
        fontWeight={"400 !important"}
        lineHeight={"normal"}
      >
        {benefit}
      </Typography>
    </Box>
  );
};

export default SingleAttribute;
