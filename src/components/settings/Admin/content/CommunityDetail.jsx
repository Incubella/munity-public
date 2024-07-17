import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";

export default function CommunityDetail() {
  const router = useRouter();
  const { communityId } = router.query;
  const [communityDetails, setCommunityDetails] = useState(null);

  useEffect(() => {
    const fetchCommunityDetails = async () => {
      const response = await fetch(`/api/communities/${communityId}`);
      const data = await response.json();
      setCommunityDetails(data);
    };

    if (communityId) {
      fetchCommunityDetails();
    }
  }, [communityId]);

  return (
    <Box>
      {communityDetails ? (
        <>
          <Typography variant="h6">{communityDetails.name}</Typography>
          {/* Display other details as needed */}
          <Button onClick={() => router.back()}>Back</Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
