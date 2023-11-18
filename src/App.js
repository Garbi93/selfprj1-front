import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { BoardWrite } from "./page/BoardWrite";
import { BoardList } from "./page/BoardList";
import { HomeLayout } from "./layout/HomeLayout";
import { BoardView } from "./page/BoardView";

const routes = createBrowserRouter(
  createRoutesFromElements(
    // 전체 홈 레이 아웃 에서 위치를 이동해도 변경되지 않는 부분을 보여줄 것을 HomeLayout component 에 작성 해줄 예정
    <Route path="/" element={<HomeLayout />}>
      {/* path를 부모의 경로를 그대로 받으면 index를 써준다. */}
      {/* 홈페이지가 처음 보이면 보일때에 BoardList 를 보여줄 예정이라 사용함 */}
      {/* BoardList 와 BoardWrite 등 페이지가 전환되면 보여줄 component 들은 page 폴더 내부에 옮겨 저장 함 */}
      <Route index element={<BoardList />} />
      {/* write라는 경로로 이동하게 되면 게시물 작성 을 할 수 있게 BoardWrite component 를 작성 함 */}
      <Route path="write" element={<BoardWrite />} />
      {/* boardList 에서 행클릭시 해당 게시글로 이동 하고 해당 게시글을 보도록 새 component 작성 */}
      <Route path="board/:id" element={<BoardView />} />
    </Route>,
  ),
);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
