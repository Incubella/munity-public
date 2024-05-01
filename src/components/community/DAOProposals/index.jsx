/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import CustomCard from "../../CustomCard";
import { fetchGraphQL } from "@/utils/storefronts/snapshot";

export default function DAOProposals(props) {
  const { DAOContent, areNFTs, setLoading } = props; // Assume spaceId is passed to the component
  const [proposals, setProposals] = useState([]);
  const spaceId = DAOContent.url;
  // const spaceId = "aave.eth";
  useEffect(() => {
    setLoading(true);
    const proposalsQuery = `
      query Proposals($spaceId: String!) {
        proposals(
          first: 10,
          where: {
            space_in: [$spaceId],
            state: "closed"
          },
          orderBy: "closed",
          orderDirection: desc
        ) {
          id
          title
          body
          choices
          start
          end
          snapshot
          state
          author
          created
          scores
          scores_total
          scores_updated
          plugins
          network
          space {
            id
            name
          }
        }
      }
    `;

    fetchGraphQL(proposalsQuery, { spaceId })
      .then((data) => {
        setLoading(false);
        console.log("snapshooooooooooooooooooot:", data);
        setProposals(data.proposals);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching proposals:", error);
      });
  }, [spaceId]);
  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4 min-h-[972px]" : ""}`}>
      {proposals && (
        <LoadmoreShowLess
          classNames={`grid mob:grid-cols-1 lap:grid-cols-2 gap-[22px] `}
          nav={"merch"}
          areNFTs={areNFTs}
          data={proposals}
          initialItems={4}
          step={4}
          renderItem={(item) => (
            <CustomCard
              isDAOCard={true}
              title={item.title}
              cardImg={item.image}
              titleFontSize="24px"
              username={item.author}
              text={item.body}
              state={item.state}
              yes={{
                amount: item.scores[0],
                percent: ((item.scores[0] / item.scores_total) * 100).toFixed(
                  2
                ),
              }}
              no={{
                amount: item.scores[1],
                percent: ((item.scores[1] / item.scores_total) * 100).toFixed(
                  2
                ),
              }}
              abstain={{
                amount: item.scores[2],
                percent: ((item.scores[2] / item.scores_total) * 100).toFixed(
                  2
                ),
              }}
              cardClassNames="lap:p-6 mob:p-4 border border-solid"
              cardSX={{ borderColor: "primary.border" }}
              titleSX={{ letterSpacing: "-0.48px;" }}
            />
          )}
        />
      )}
    </Box>
  );
}
