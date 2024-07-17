import { Box, Typography } from "@mui/material";
import FormHeading from "../settings/Community/NFTCreation/FormHeading";
import LoadmoreShowLess from "../LoadmoreShowLess";
import SingleCommunity from "../Card/SingleCommunity";

export default function Popular({ sectionTitle, sectionNum, popularsData }) {
  console.log("popularsData:", popularsData);
  return (
    <Box
      className={`${
        sectionNum &&
        "mob:py-8 tab:py-[48px] lap:py-[70px] desk:py-[120px] mob:px-4 tab:px-8 lap:px-[52px]"
      }`}
    >
      <FormHeading
        text={sectionTitle}
        number={sectionNum}
        classNames="border-t mob:pt-4 tab:pt-6"
        titleSX={{
          fontSize: { mob: "20px", tab: "24px" },
          letterSpacing: "-0.48px",
          color: "text.primary",
        }}
      />
      {popularsData && popularsData.length >= 1 ? (
        <LoadmoreShowLess
          classNames={`grid mob:gap-6 tab:gap-8 mob:mt-6 tab:mt-8`}
          data={popularsData}
          initialItems={8}
          step={8}
          renderItem={(item) => (
            <SingleCommunity
              title={item.title}
              communityIMG={item?.community_avatar || "/"}
              users={item?.users}
              verified={true}
              slotsLeft={item?.slotsLeft}
              itemType={"community"}
              itemId={item._id}
              imgBoxStyles="mob-xs:h-[243px] mob-sm2:h-[300px] tab:h-[343px] cursor-pointer"
              imgStyles="mob-xs:h-full"
            />
          )}
          singleClassNames={
            "relative border-b border-solid mob:!pb-4 tab:!pb-6 mob-sm1:max-w-[530px]"
          }
          addSingleBoxSX={{
            borderColor: "primary.border",
            "&:hover div.absolute": { width: "100%" },
          }}
          addSX={{
            gridTemplateColumns: {
              lap: "repeat(auto-fit, minmax(343px, 1fr))",
              "mob-xs": "repeat(auto-fit, minmax(300px, 1fr))",
              mob: "1fr",
            },
          }}
        />
      ) : (
        <Typography
          className="text-center"
          sx={{
            fontSize: { mob: "32px", tab: "48px" },
            letterSpacing: "-0.48px",
            color: "text.primary",
            margin: "120px 0",
          }}
        >
          No Communities
        </Typography>
      )}
    </Box>
  );
}
