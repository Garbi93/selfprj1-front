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
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [writer, setWriter] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 차크라 ui 의 toast기능을 사용 하기 위해 생성
  const toast = useToast();

  // 리엑트 라우터의 기능으로 버튼을 눌러 해당 기능을 완료하면 페이지가 이동하게 하기 위해 사용
  const navigate = useNavigate();

  function handleBoardSave() {
    // 저장 시킬때 버튼을 잠시 비활성화 시키기 위해 isSaving 값을 true로 줌
    setIsSaving(true);

    axios
      .post("/api/board/add", { content, title })
      .then(() => {
        toast({
          description: "게시물이 잘 작성 되었습니다.",
          status: "success",
        });
        // 저장 완료후 홈페이지로 이동 시키기 위해 사용
        navigate("/");
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
      .finally(() => {
        // 저장이 완료 되었으면 다시 버튼을 활성화 시키기 위해 isSaving 을 false값으로 변경함
        setIsSaving(false);
      });
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
        <Button
          // 버튼을 누르면 저장이 될텐대 이때 연속으로 버튼을 클릭할시 두번 저장이 되는것을 방지하기 위해
          // isSaving의 상태가 true 이면 버튼을 비활성화 시키게 해준다.
          isDisabled={isSaving}
          onClick={handleBoardSave}
          colorScheme={"blue"}
        >
          저장
        </Button>
      </Box>
    </Box>
  );
}
