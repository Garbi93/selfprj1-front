import { useSearchParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";

export function UserView() {
  // /user?id=userid
  const [params] = useSearchParams();

  return <Box> {params.get("id")}</Box>;
}
