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
      // 백엔드로 부터 받은 error 코드 (badRequest, internalServerError)등을 받을 때 error 로 인자를 받는다.
      .catch((error) => {
        // 받은 error 의 응답의 상태값을 뽑아 코드가 400과 같으면 원하는 toast를 띄우게 한다.
        if (error.response.status === 400) {
          toast({
            title: "작성한 게시물에 빈 값이 있습니다.",
            description: "내용을 추가 해주세요.",
            status: "error",
          });
        } else {
          toast({
            description: "게시물 저장 중 문제가 발생하였습니다.",
            status: "error",
          });
        }
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
