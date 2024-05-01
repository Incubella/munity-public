/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoadmoreShowLess from "../../LoadmoreShowLess";
import ArticlesCard from "../articlesCard";

export default function Articles(props) {
  const { ArticlesContent, areNFTs, setLoading } = props;
  const [articlesContent, setArticlesContent] = useState([]);

  useEffect(() => {
    setLoading(true);

    const fetchArticles = async () => {
      const mediumUrl = `https://medium.com/feed/${ArticlesContent?.url}`; // Replace with actual Medium feed URL
      const rssToJsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        mediumUrl
      )}`;
      try {
        const response = await fetch(rssToJsonUrl);
        const data = await response.json();
        console.log("medium articlessssssss:", data);
        setArticlesContent(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);
  return (
    <Box className={`${!areNFTs ? "blur-[10px] pb-4 min-h-[972px]" : ""}`}>
      {articlesContent?.items && (
        <LoadmoreShowLess
          classNames={`grid grid-cols-1 mob:gap-4 tab:gap-6 `}
          nav={"articles"}
          areNFTs={areNFTs}
          data={articlesContent?.items}
          initialItems={5}
          step={5}
          renderItem={(item) => (
            <ArticlesCard
              title={item.title}
              cardImg={item.image}
              userImg={articlesContent.feed.image}
              username={item.author}
              text={item.content}
              date={item.pubDate}
              url={item.link}
            />
          )}
        />
      )}
    </Box>
  );
}
