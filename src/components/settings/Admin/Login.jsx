import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/legacy/image";
import CustomInput from "../CustomInput";
import BlueBtn from "@/components/Buttons/BlueBtn";
import Cookies from "js-cookie";

async function authenticate(username, password) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      return data; // This should include some form of success indicator or token
    } else {
      throw new Error("Failed to login");
    }
  } catch (error) {
    console.error("Login error:", error);
    return false; // Handle the error as appropriate for your use case
  }
}

export default function LoginToAdmin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const isAuthenticated = await authenticate(username, password);
    if (isAuthenticated) {
      Cookies.set("token", isAuthenticated.token, { expires: 1 }); // Set token in cookies for 24 hours
      Cookies.set("role", isAuthenticated.role, { expires: 1 }); // Set role in cookies for 24 hours
      onLogin(true, isAuthenticated);
    } else {
      alert("Login failed!");
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "#f8f8f8", height: "100vh" }}
      className="flex flex-col items-center"
    >
      <Box className="mt-6">
        <Image src={"/logoDark.png"} width={144.8} height={32} alt="logo" />
      </Box>
      <Box
        sx={{
          padding: "24px",
          paddingBottom: "32px",
          backgroundColor: "white",
          marginTop: "80px",
        }}
        className="flex flex-col max-w-[475px] gap-6 w-full"
      >
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: "400 !important",
            fontSize: "24px",
            lineHeight: "120%",
            textTransform: "uppercase",
            alignSelf: "center",
            marginBottom: "8px",
          }}
        >
          ADMIN PANEL LOGIN
        </Typography>
        <Box>
          <CustomInput
            type="text"
            placeholder="USERNAME"
            inputName={"username"}
            value={username}
            inputBoxSX={{ marginBottom: "0px" }}
            handleChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box>
          <CustomInput
            type="password"
            placeholder="PASSWORD"
            inputName={"password"}
            inputBoxSX={{ marginBottom: "0px" }}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <BlueBtn
          handleClick={handleLogin}
          classNames="!uppercase self-center mt-[8px]"
          color="#10111B"
          bgColor="#34A4E0"
        >
          Log in
        </BlueBtn>
      </Box>
    </Box>
  );
}
