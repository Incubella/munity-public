import { Box } from "@mui/material";
import FormHeading from "../../settings/Community/NFTCreation/FormHeading";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import SingleCommunity from "../../Card/SingleCommunity";
import uniqid from "uniqid";
export default function Users({ usersData }) {
  return (
    <Box className="mob:px-4 tab:px-8 lap:px-[52px]">
      <FormHeading
        text={"POPULAR USERS"}
        number={"03."}
        classNames="border-t mob:pt-4 tab:pt-6"
        titleSX={{
          fontSize: { mob: "20px", tab: "24px" },
          letterSpacing: "-0.48px",
          color: "text.primary",
        }}
      />
      <LoadmoreShowLess
        classNames={`grid mob:gap-6 lap:gap-8 mob:mt-6 tab:mt-8`}
        // singleClassNames={"max-w-[276px]"}
        data={usersData}
        initialItems={12}
        step={12}
        singleClassNames={"mob-sm1:max-w-[276px] "}
        renderItem={(item) => (
          <SingleCommunity
            title={item.username || `user_${uniqid()}`}
            communityIMG={item.user_avatar || "/images/profile.png"}
            verified={item.is_verified}
            itemType={"profile"}
            itemId={item._id}
            imgBoxStyles="mob:h-auto mob-ssm:!h-[343px] mob-sm3:!h-[276px] "
            imgStyles="mob-xs:h-full"
            addSX={{
              "& p": {
                marginBottom: "0 !important",
                marginTop: "16px !important",
              },
            }}
          />
        )}
        addSX={{
          gridTemplateColumns: {
            "mob-xs": "repeat(auto-fit, minmax(236px, max-content))",
            mob: "1fr",
          },
        }}
      />
    </Box>
  );
}
