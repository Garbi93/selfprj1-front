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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserView() {
  const [user, setUser] = useState(null);

  const { id } = useParams();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(id);
    axios.get("/api/user/id/" + id).then((response) => setUser(response.data));
  }, []);

  if (user === null) {
    return <Spinner />;
  }

  function handleDeleteUser() {
    console.log("탈퇴");
    axios
      .delete("/api/user/remove/" + id)
      .then(() => {
        toast({
          title: id + "번 고객님의 탈퇴가 완료 되었습니다.",
          description: "지금까지 사용 해주셔서 감사합니다.",
          colorScheme: "gray",
          isClosable: true,
        });
        navigate(-1);
      })
      .catch(() => {
        toast({
          description: "탈퇴에 실패 하였습니다.",
          status: "error",
        });
      })
      .finally(() => {
        console.log("탈퇴 로직 끝");
        onClose();
      });
  }

  return (
    <Box>
      <h1>{user.id}번 회원 정보</h1>
      <FormControl>
        <FormLabel>회원 ID</FormLabel>
        <Input value={user.userId} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input value={user.nickName} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input value={user.password} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input value={user.email} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>전화번호</FormLabel>
        <Input value={user.phone} readOnly />
      </FormControl>
      <Button colorScheme={"yellow"}>수정</Button>
      <Button colorScheme={"red"} onClick={onOpen}>
        탈퇴
      </Button>

      {/* 탈퇴 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>탈퇴 확인</ModalHeader>
          <ModalCloseButton />
          <ModalBody>탈퇴 하시겠습니까?</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>닫기</Button>
            <Button onClick={handleDeleteUser} colorScheme={"red"}>
              삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
