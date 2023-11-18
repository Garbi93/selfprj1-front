import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");

  const toast = useToast();

  function handleBoardSave() {
    axios
      .post("/api/board/add", { content, title })
      .then(() => {
        toast({
          description: "게시물이 잘 작성 되었습니다.",
          status: "success",
        });
      })
      .catch(() => {
        toast({
          description: "게시물 저장 중 문제가 발생하였습니다.",
          status: "error",
        });
      })
      .finally(() => console.log("done"));
  }

  return (
    <Box>
      <h1>게시물 작성</h1>
      <Box>
        <FormControl>
          <FormLabel>글 작성자</FormLabel>
          <Input value={writer} readOnly />
        </FormControl>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>본문</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormControl>
        <Button onClick={handleBoardSave} colorScheme={"blue"}>
          저장
        </Button>
      </Box>
    </Box>
  );
}
