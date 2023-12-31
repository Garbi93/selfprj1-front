import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import axios from "axios";

export function BoardEdit() {
  const [board, updateBoard] = useImmer(null);

  // /edit/:id
  const { id } = useParams();

  const navigate = useNavigate();

  const toast = useToast();

  // chakra UI에서 modal 사용
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    axios
      .get("/api/board/id/" + id)
      .then((response) => updateBoard(response.data));
  }, []);

  if (board === null) {
    return <Spinner />;
  }

  // 글 수정 한것을 완료 했으면 저장 하는것
  function handleSubmit() {
    axios
      .put("/api/board/edit", board)
      .then(() => {
        navigate(-1);
        toast({
          description: board.id + "번 글이 수정 되었습니다.",
          status: "success",
        });
      })
      .catch((error) => {
        if (error.response.data === 400) {
          toast({
            description: "내용이 비어있습니다.",
            status: "error",
          });
        } else {
          toast({
            description: "수정 중 문제가 발생하였습니다.",
            status: "error",
          });
        }
      })
      .finally(() => onClose());
  }

  return (
    <Box>
      <h1>{id}번 게시물 수정</h1>
      <FormControl>
        <FormLabel>글 번호</FormLabel>
        <Input value={board.id} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>제목</FormLabel>
        <Input
          value={board.title}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.title = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>본문</FormLabel>
        <Textarea
          value={board.content}
          onChange={(e) =>
            updateBoard((draft) => {
              draft.content = e.target.value;
            })
          }
        />
      </FormControl>
      <FormControl>
        <FormLabel>작성자</FormLabel>
        <Input value={board.writer} readOnly />
      </FormControl>
      <Button onClick={onOpen} colorScheme="blue">
        저장
      </Button>
      <Button
        onClick={() => {
          navigate(-1);
          toast({
            description: "글 수정을 취소 하셧습니다.",
            colorScheme: "yellow",
          });
        }}
      >
        취소
      </Button>

      {/* 수정 후 저장 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>수정 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>수정 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleSubmit} colorScheme={"green"}>
              저장
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
