import { Box } from "@mui/material";
import FormHeading from "../../settings/Community/NFTCreation/FormHeading";
import Category from "./Category";

export default function Categories({ navigate, categoryData }) {
  // function handleClickCommunity() {
  //   navigate.push(communityData.Url);
  // }
  return (
    <Box
      className="mob:py-6 tab:py-[48px] lap:py-[70px] mob:px-4 tab:px-8 lap:px-[52px]"
      sx={{ backgroundColor: "#10111B" }}
    >
      <FormHeading
        text={"CATEGORIES"}
        number={"01."}
        classNames="border-t mob:pt-4 tab:pt-6"
        titleSX={{
          fontSize: { mob: "20px", tab: "24px" },
          letterSpacing: "-0.48px",
          color: "#E8E9F4",
        }}
        boxSX={{ borderColor: "rgba(232, 233, 244, 0.20)" }}
        numberSX={{
          color: "rgba(255, 255, 255, 0.60)",
        }}
      />
      <Box
        className="grid mob:gap-4 tab:gap-6 lap:gap-8 mob:mt-6 tab:mt-8"
        sx={{
          gridTemplateColumns: {
            lap: "repeat(auto-fit, minmax(343px, 1fr))",
            "mob-xs": "repeat(auto-fit, minmax(263px, 1fr))",
            mob: "1fr",
          },
        }}
      >
        {categoryData.map(({ name, categoryIMG, communityQuantity, link }) => (
          <div key={name}>
            <Category
              name={name}
              categoryIMG={categoryIMG}
              communityQuantity={communityQuantity}
              link={link}
            />
          </div>
        ))}
      </Box>
    </Box>
  );
}
