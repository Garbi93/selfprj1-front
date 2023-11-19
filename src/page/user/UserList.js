import { Box, Spinner, Table, Tbody, Td, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserList() {
  const [userList, setUserList] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/user/list").then((response) => setUserList(response.data));
  }, []);

  if (userList === null) {
    return <Spinner />;
  }

  function handleTableRowClick(id) {
    // /user?id={id} 이렇게 보이도록 URLSearchParams을 사용하여 인코딩 하기
    const params = new URLSearchParams();
    params.set("id", id);
    navigate("/user?" + params.toString());
  }

  return (
    <Box>
      <Table>
        <Thead>
          <Tr>
            <Td>회원 번호</Td>
            <Td>회원 아이디</Td>
            <Td>닉네임</Td>
            <Td>비밀번호</Td>
            <Td>이메일</Td>
            <Td>전화번호</Td>
            <Td>가입일</Td>
          </Tr>
        </Thead>
        <Tbody>
          {userList.map((user) => (
            <Tr key={user.id} onClick={() => handleTableRowClick(user.id)}>
              <Td>{user.id}</Td>
              <Td>{user.userId}</Td>
              <Td>{user.nickName}</Td>
              <Td>{user.password}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.inserted}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
