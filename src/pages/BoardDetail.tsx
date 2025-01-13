import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";

import TopNav from "../components/nav/TopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";

import LeftIcon from "../assets/images/left_arrow.png";
import { getBoardDetail, BoardDetail } from "../api/user/boardApi.ts";

import { DateUtil } from "../utils/DateUtil.ts";

// const formattedDate = DateUtil.formatDate("2025-01-12T04:07:29.928354");

const BoardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  const [boardData, setBoardData] = useState<BoardDetail | null>(null); // 게시글 데이터

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // API 호출하여 게시글 데이터 가져오기
  useEffect(() => {
    const fetchBoardData = async () => {
      if (!id) return;

      try {
        const boardDetail = await getBoardDetail(Number(id));
        setBoardData(boardDetail);
      } catch (error) {
        console.error("Error fetching board detail:", error);
        alert("게시글을 불러오는 데 실패했습니다.");
        navigate("/admin-board"); // 오류 발생 시 목록 페이지로 이동
      }
    };

    fetchBoardData();
  }, [id, navigate]);

  if (!boardData) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const formattedCreatedAt = DateUtil.formatDate(boardData.createdAt);
  const formattedUpdatedAt = DateUtil.formatDate(boardData.updatedAt);

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
              visibility={boardData.centerGroup}
            >
              {boardData.centerGroup || "전체"}
            </BoardVisibility>
            {boardData.jobGroup && (
              <BoardGroup className="caption-sm-300">
                {boardData.jobGroup}그룹
              </BoardGroup>
            )}
          </Category>
          <BoardTitle className="text-sm-200">{boardData.title}</BoardTitle>
          <BoardDate className="caption-sm-100">
            작성일 {formattedCreatedAt} | 수정일 {formattedUpdatedAt}
          </BoardDate>
        </Head>
        <DivLine></DivLine>
        <MainContents className="caption-md-100">
          {boardData.content}
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
    props.visibility === null ? "var(--accent-70)" : "var(--primary-70)"};

  color: ${(props) =>
    props.visibility === null ? "var(--accent-10)" : "var(--primary-10)"};
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
