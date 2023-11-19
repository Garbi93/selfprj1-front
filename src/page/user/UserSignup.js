import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function UserSignup() {
  const [userId, setUserId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userIdAvail, setUserIdAvail] = useState(false);
  const [emailAvail, setEmailAvail] = useState(false);
  const [nickNameAvail, setNickNameAvail] = useState(false);
  const [phoneAvail, setPhoneAvail] = useState(false);

  const toast = useToast();

  const navigate = useNavigate();

  let signupAvailable = true;

  if (password !== passwordCheck) {
    signupAvailable = false;
  }
  if (password.length === 0) {
    signupAvailable = false;
  }

  if (userIdAvail === false) {
    signupAvailable = false;
  }

  if (emailAvail === false) {
    signupAvailable = false;
  }

  if (nickNameAvail === false) {
    signupAvailable = false;
  }

  if (phoneAvail === false) {
    signupAvailable = false;
  }

  // 가입 버튼 클릭시 저장 하도록
  function handleSubmit() {
    axios
      .post("/api/user/add", {
        userId,
        nickName,
        password,
        email,
        phone,
      })
      .then(() => {
        toast({
          description: "가입이 완료되셨습니다.",
          status: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast({
            description: "모든 정보를 입력해주셔야 합니다.",
            colorScheme: "orange",
          });
        }
      })
      .catch(() => console.log("done"));
  }

  // 서버에 가입하려고 입력한 userId가 존재하는지 체크하도록 요청 하는 기능
  function handleUserIdCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("userId", userId);

    axios
      .get("/api/user/check?" + searchParam.toString())
      // 해당 아이디가 있으면 사용 하지 못하게
      .then(() => {
        toast({
          description: "이미 사용중인 id 입니다.",
          status: "error",
        });
        setUserIdAvail(false);
      })
      // 해당 아이디가 없으면 사용 가능
      .catch((error) => {
        if (error.response.status === 404) {
          toast({
            description: "사용가능한 id 입니다.",
            status: "success",
          });
          setUserIdAvail(true);
        }
      })
      .finally(() => {
        console.log("done");
      });
  }

  function handleNickNameCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("nickName", nickName);

    axios
      .get("/api/user/check?" + searchParam.toString())
      .then(() => {
        toast({
          description: "중복된 닉네임 입니다.",
          status: "error",
        });
        setNickNameAvail(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast({
            description: "사용가능한 닉네입 입니다.",
            status: "success",
          });
          setNickNameAvail(true);
        }
      })
      .finally(() => console.log("done"));
  }

  function handleEmailCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("email", email);

    axios
      .get("/api/user/check?" + searchParam.toString())
      .then(() => {
        toast({
          description: "중복된 이메일 입니다.",
          status: "error",
        });
        setEmailAvail(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast({
            description: "사용가능한 이메일 입니다.",
            status: "success",
          });
          setEmailAvail(true);
        }
      })
      .finally(() => console.log("done"));
  }

  function handlePhoneCheck() {
    const searchParam = new URLSearchParams();
    searchParam.set("phone", phone);

    axios
      .get("/api/user/check?" + searchParam.toString())
      .then(() => {
        toast({
          description: "중복된 전화번호 입니다.",
          status: "error",
        });
        setPhoneAvail(false);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast({
            description: "사용가능한 전화번호 입니다.",
            status: "success",
          });
          setPhoneAvail(true);
        }
      })
      .finally(() => console.log("done"));
  }

  return (
    <Box>
      <h1>회원가입</h1>
      <FormControl>
        <FormLabel>아이디</FormLabel>
        <Flex>
          <Input
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setUserIdAvail(false);
            }}
          />
          <Button onClick={handleUserIdCheck}>중복확인</Button>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>닉네임</FormLabel>
        <Flex>
          <Input
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
              setNickNameAvail(false);
            }}
          />
          <Button onClick={handleNickNameCheck}>중복확인</Button>
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
      <FormControl isInvalid={password !== passwordCheck}>
        <FormLabel>비밀번호 확인</FormLabel>
        <Input
          value={passwordCheck}
          type="password"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <FormErrorMessage>암호가 다릅니다.</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Flex>
          <Input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailAvail(false);
            }}
          />
          <Button onClick={handleEmailCheck}>중복확인</Button>
        </Flex>
      </FormControl>
      <FormControl>
        <FormLabel>전화번호</FormLabel>
        <Flex>
          <Input
            value={phone}
            type="phone"
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneAvail(false);
            }}
          />
          <Button onClick={handlePhoneCheck}>중복확인</Button>
        </Flex>
      </FormControl>
      <Button onClick={() => navigate(-1)}>🥲취소</Button>
      <Button
        onClick={handleSubmit}
        isDisabled={!signupAvailable}
        colorScheme={"blue"}
      >
        가입
      </Button>
    </Box>
  );
}
