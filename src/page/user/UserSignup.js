import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function UserSignup() {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  // 가입 버튼 클릭시 저장 하도록
  function handleSubmit() {
    axios
      .post("/api/user/add", {
        id,
        nickName,
        password,
        email,
        phone,
      })
      .then(() => console.log("성공"))
      .catch(() => console.log("실패"))
      .catch(() => console.log("done"));
  }

  return (
    <Box>
      <h1>회원가입</h1>
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <Flex>
          <Input value={id} onChange={(e) => setId(e.target.value)} />
          <Button>중복확인</Button>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Flex>
          <Input
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <Button>중복확인</Button>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          value={passwordCheck}
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Flex>
          <Input
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button>중복확인</Button>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>전화번호</FormLabel>
        <Flex>
          <Input
            value={phone}
            type="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button>중복확인</Button>
        </Flex>
      </FormControl>
      <Button onClick={() => navigate(-1)}>🥲취소</Button>
      <Button onClick={handleSubmit} colorScheme={"blue"}>
        가입
      </Button>
    </Box>
  );
}
