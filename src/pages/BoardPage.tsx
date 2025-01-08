import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TopNav from "../components/nav/TopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";

import RightIcon from "../assets/images/right_arrow.png";

export const boardListMock = [
  {
    id: 1,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 2,
    visibility: "음성 1센터",
    group: "1그룹",
    title:
      "AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두ddddddd 줄인ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우 두 줄 인...",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 3,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 4,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 5,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 6,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 7,
    visibility: "전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
];

const BoardPage: React.FC = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleClick = (id: number) => {
    navigate(`/board/${id}`); // 동적으로 URL 이동
  };

  const NavItem = {
    icon: null,
    text: "게시판",
    iconWidth: null, // 아이콘 너비 (px 단위)
    iconHeight: null, // 아이콘 높이 (px 단위)
    clickFunc: null,
  };

  return (
    <Container>
      <TopNav lefter={null} center={NavItem} righter={null} />
      <BoardList>
        {boardListMock.map((board) => (
          <BoardItem key={board.id} onClick={() => handleClick(board.id)}>
            <BoardContents>
              <ContentsHead>
                <BoardVisibility
                  className="caption-sm-300"
                  visibility={board.visibility}
                >
                  {board.visibility}
                </BoardVisibility>
                {board.group && (
                  <BoardGroup className="caption-sm-300">
                    {board.group}
                  </BoardGroup>
                )}
              </ContentsHead>
              <BoardTitle className="text-sm-200">{board.title}</BoardTitle>
              <BoardDate className="caption-sm-100">
                작성일 {board.creationDate} | 수정일 {board.modificationDate}
              </BoardDate>
            </BoardContents>
            <BoardIcon src={RightIcon}></BoardIcon>
          </BoardItem>
        ))}
      </BoardList>
      <BottomNav />
    </Container>
  );
};

export default BoardPage;

const Container = styled.div``;

const BoardList = styled.div`
  margin: 0 25px;
  flex: 1;
  overflow-y: auto;
  margin-bottom: 100px;
`;

const BoardItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 20px 0;

  border-bottom: 0.5px solid #474747;
`;
const BoardContents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

const BoardIcon = styled.img`
  width: 7px;
  height: 12px;
  margin-left: 18px;
`;

const ContentsHead = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  align-items: center;
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
