import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Button } from "@mui/material";

export default function UserDetail() {
  const router = useRouter();
  const { userId } = router.query; // This assumes you're using dynamic routing like `/admin/user/[userId]`
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUserDetails(data);
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <Box>
      {userDetails ? (
        <>
          <Typography variant="h6">{userDetails.name}</Typography>
          <Typography variant="body1">{userDetails.email}</Typography>
          <Button onClick={() => router.back()}>Back</Button>
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
}
