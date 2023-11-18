import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import React from "react";
import { NavBar } from "../component/NavBar";

export function HomeLayout() {
  return (
    <Box>
      <NavBar />
      {/* Outlet 태그는 하위에 오는 컴포넌트들을 불러온다는 태그다. */}
      <Outlet />
    </Box>
  );
}
