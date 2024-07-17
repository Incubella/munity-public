import { useState, useEffect } from "react";

const InstagramPosts = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const accessToken = "";
  useEffect(() => {
    const fetchData = async () => {
      // const response = await fetch(`/api/instagram?username=${username}`);
      const response = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink&access_token=${accessToken}`
      );
      const data = await response.json();
      console.log("dataaaaaaaaaa:", data);
      // if (data.graphql) {
      //   // Adjust according to the actual response structure
      //   setPosts(data.graphql.user.edge_owner_to_timeline_media.edges);
      // }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <h2>Instagram Posts for {username}</h2>
      {/* <div>
        {posts.map((post, index) => (
          <div key={index}>
            <img src={post.node.display_url} alt="Post" />
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default InstagramPosts;
