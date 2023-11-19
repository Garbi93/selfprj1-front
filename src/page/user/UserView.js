import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export function UserView() {
  const [params] = useSearchParams();

  return (
    <Box>
      <FormControl>
        <FormLabel>{params.get("id")}번 회원 정보 보기</FormLabel>
      </FormControl>
    </Box>
  );
}
