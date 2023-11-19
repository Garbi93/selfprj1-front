import React, { useEffect, useState } from "react";
import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardList() {
  const [boardList, setBoardList] = useState(null);

  // 라우터 기능인 navigate 사용
  const navigate = useNavigate();

  // 버튼이나 무슨 행위를 변경할때 요청 하는것이 아닌
  // 페이지가 조회 될때나 어떻한 상태가 변경 되었을 때에 변경을 원하면
  // useEffect 를 사용 한다.
  useEffect(() => {
    // 게시글을 작성한 것들을 조회 하고 싶어 get 메소드를 요청
    axios
      .get("/api/board/list") // back의 해당 경로로 요청
      // 잘 받았으면 받아온 data 를 setBoardList 로 boardList 에 받아온 값들을 저장
      .then((response) => setBoardList(response.data)); //
  }, []);

  return (
    <Box>
      <h1>게시물 목록</h1>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>board Number</Th>
              <Th>title</Th>
              <Th>nickName</Th>
              <Th>inserted</Th>
            </Tr>
          </Thead>
          <Tbody>
            {boardList === null ? (
              <Spinner />
            ) : (
              boardList.map((board) => (
                <Tr
                  _hover={{
                    cursor: "pointer",
                    color: "orange",
                  }}
                  key={board.id}
                  onClick={() => navigate("/board/" + board.id)}
                >
                  <Td>{board.id}</Td>
                  <Td>{board.title}</Td>
                  <Td>{board.writer}</Td>
                  <Td>{board.inserted}</Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
