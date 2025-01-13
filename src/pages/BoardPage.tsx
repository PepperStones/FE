import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import TopNav from "../components/nav/TopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";

import RightIcon from "../assets/images/right_arrow.png";

import { getBoardList, Board } from "../api/user/boardApi.ts";

const BoardPage: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef<number>(0);

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleClick = (id: number) => {
    navigate(`/board/${id}`); // 동적으로 URL 이동
  };

  // 새로운 데이터를 불러오는 함수
  const loadMoreBoards = async () => {
    if (loading || !hasMore) {
      return; // 이미 로딩 중이면 중복 호출 방지
    }

    setLoading(true); // 로딩 상태 설정

    try {
      const newBoards = await getBoardList(pageRef.current);

      // 더 이상 불러올 데이터가 없으면 중지
      if (newBoards.length === 0) {
        setHasMore(false);
      } else {
        setBoards((prevBoards) => [
          ...prevBoards,
          ...newBoards.filter(
            (newBoard) => !prevBoards.some((board) => board.id === newBoard.id)
          ),
        ]);
        pageRef.current += 1; // Ref로 페이지 증가
        setPage(pageRef.current); // 페이지 증가
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMoreBoards();
  });

  // Intersection Observer 설정
  const lastElementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      async (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          hasMore &&
          pageRef.current === page
        ) {
          await loadMoreBoards(); // 데이터 요청
        } else {
          console.log(`${page}loadMoreBoards요청 안돼!!!!`);
        }
      },
      { threshold: 0.1 } // 마지막 요소가 100% 보일 때 트리거
    );

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }

    return () => observer.current?.disconnect(); // 컴포넌트 언마운트 시 정리
  }, [loading, hasMore, boards]);

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
        {boards.map((board) => (
          <BoardItem key={board.id} onClick={() => handleClick(board.id)}>
            <BoardContents>
              <ContentsHead>
                <BoardVisibility
                  className="caption-sm-300"
                  visibility={board.centerGroup}
                >
                  {board.centerGroup || "전체"}
                </BoardVisibility>
                {board.jobGroup && (
                  <BoardGroup className="caption-sm-300">
                    {board.jobGroup}그룹
                  </BoardGroup>
                )}
              </ContentsHead>
              <BoardTitle className="text-sm-200">{board.title}</BoardTitle>
              <BoardDate className="caption-sm-100">
                작성일 {board.createdAt} | 수정일 {board.updatedAt}
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
