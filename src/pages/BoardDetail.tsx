import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import TopNav from "../components/nav/TopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";

import LeftIcon from "../assets/images/left_arrow.png";

export const boardListMock = [
  {
    id: 1,
    visibility: "전체",
    group: null,
    title:
      "AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인dddddddddddd",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
    contents:
      "AAA 프로젝트 신설 안내 AAAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인vv줄인 경우두 줄인AA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두 줄인 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우두 줄인v",
  },
  {
    id: 2,
    visibility: "음성 1센터",
    group: "1그룹",
    title: "ddddd",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
    contents: "dd",
  },
];

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const boardData = boardListMock.find((board) => board.id === Number(id)); // 데이터 검색

  if (!boardData) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const NavItem = {
    icon: LeftIcon,
    text: "게시판",
    iconWidth: Number(11),
    iconHeight: Number(16),
    clickFunc: () => {
      navigate("/board");
    },
  };

  return (
    <Container>
      <TopNav lefter={NavItem} center={NavItem} righter={null} />

      <BoardContainer key={boardData.id}>
        <Head>
          <Category>
            <BoardVisibility
              className="caption-sm-300"
              visibility={boardData.visibility}
            >
              {boardData.visibility}
            </BoardVisibility>
            {boardData.group && (
              <BoardGroup className="caption-sm-300">
                {boardData.group}
              </BoardGroup>
            )}
          </Category>
          <BoardTitle className="text-sm-200">{boardData.title}</BoardTitle>
          <BoardDate className="caption-sm-100">
            작성일 {boardData.creationDate} | 수정일{" "}
            {boardData.modificationDate}
          </BoardDate>
        </Head>
        <DivLine></DivLine>
        <MainContents className="caption-md-100">
          {boardData.contents}
        </MainContents>
      </BoardContainer>

      <BottomNav />
    </Container>
  );
};

export default BoardPage;

const Container = styled.div``;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--sub-10);
  margin: 20px;
  margin-bottom: 100px;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px;
  gap: 5px;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  align-items: center;
`;

const BoardTitle = styled.div`
  color: var(--primary-80);

  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄까지만 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BoardDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-item: center;
  color: var(--gray-40);
`;

const BoardVisibility = styled.div<{ visibility: string }>`
  border-radius: 15px;
  padding: 3px 10px;

  background: ${(props) =>
    props.visibility === "전체" ? "var(--accent-70)" : "var(--primary-70)"};

  color: ${(props) =>
    props.visibility === "전체" ? "var(--accent-10)" : "var(--primary-10)"};
`;

const BoardGroup = styled.div`
  color: var(--primary-20);
  border-radius: 15px;
  align-items: center;

  padding: 3px 10px;

  border: 1px solid var(--primary-30);
  background: var(--primary-90);
`;

const DivLine = styled.div`
  margin: 0 8px;
  height: 0.5px;
  background: #474747;
`;

const MainContents = styled.div`
  margin: 14px 15px;
  color: var(--gray-80);
`;
