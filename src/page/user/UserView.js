import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function UserView() {
  const [user, setUser] = useState(null);

  // /user?id=userid
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get("/api/user?" + params.toString())
      .then((response) => setUser(response.data));
  }, []);

  if (user === null) {
    return <Spinner />;
  }

  return (
    <Box>
      <h1>{user.id}님 정보</h1>
      <FormControl>
        <FormLabel>회원아이디</FormLabel>
        <Input type="text" value={user.userId} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Input type="text" value={user.nickName} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input type="password" value={user.password} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="text" value={user.email} readOnly />
      </FormControl>
      <FormControl>
        <FormLabel>전화번호</FormLabel>
        <Input type="text" value={user.phone} readOnly />
      </FormControl>
      <Button colorScheme={"yellow"}>수정</Button>
      <Button colorScheme={"red"}>삭제</Button>
    </Box>
  );
}
