import React from "react";
import { Box, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export function BoardWrite() {
  return (
    <Box>
      <h1>게시물 작성</h1>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea />
        </FormControl>
        <FormControl>
          <FormLabel>글 작성자</FormLabel>
          <Input />
        </FormControl>
      </Box>
    </Box>
  );
}
