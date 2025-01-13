// AdminBoard.tsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getBoardList, Board } from "../../api/admin/adminBoardApi.ts";

import TopNav from "../../components/nav/TopNav.tsx";
import SearchFilter from "../../components/filter/SearchFilter.tsx";
import FooterNav from "../../components/nav/FooterNav.tsx";

import RightIcon from "../../assets/images/right_arrow.png";
import PlusIcon from "../../assets/images/add_icon.png";

const AdminBoardList: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const pageRef = useRef<number>(0);

  const [search, setSearch] = useState<string>("");
  const [centerGrup, setCenterGrup] = useState<string>("default");
  const [jobGroup, setJobGroup] = useState<string>("default");

  const navigate = useNavigate();

  // 새로운 데이터를 불러오는 함수
  const loadMoreBoards = async () => {
    if (loading || !hasMore) {
      return; // 이미 로딩 중이면 중복 호출 방지
    }

    setLoading(true); // 로딩 상태 설정

    try {
      const newBoards = await getBoardList(pageRef.current);

      // 더 이상 불러올 데이터가 없으면 중지
      if (newBoards.data.length === 0) {
        setHasMore(false);
      } else {
        setBoards((prevBoards) => [
          ...prevBoards,
          ...newBoards.data.filter(
            (newBoard) => !prevBoards.some((board) => board.id === newBoard.id)
          ),
        ]);
        pageRef.current += 1; // Ref로 페이지 증가
        setPage(pageRef.current); // 페이지 증가
      }
      setLoading(false);
    } catch (error) {}
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

  // 필터링된 게시글 목록 계산
  const filteredBoardList = boards.filter((board) => {
    const matchesSearch = board.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCenterGroup =
      centerGrup === "default" || board.centerGroup === centerGrup;

    const matchesGroup = jobGroup === "default" || board.jobGroup === jobGroup;

    return matchesSearch && matchesCenterGroup && matchesGroup;
  });

  // 뒤로가기 클릭 함수
  const handleAddIconClick = () => {
    navigate("/admin-add-board");
  };

  const handleClick = (id: number) => {
    navigate(`/admin-board/${id}`); // 동적으로 URL 이동
  };

  const Top = {
    icon: PlusIcon,
    iconWidth: 19,
    iconHeight: 19,
    text: "게시글 목록",
    clickFunc: handleAddIconClick,
  };

  return (
    <div>
      <TopNav lefter={null} center={Top} righter={Top} />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        department={centerGrup}
        setDepartment={setCenterGrup}
        group={jobGroup}
        setGroup={setJobGroup}
        title={"제목으로 검색 가능합니다."}
      />
      <BoardList>
        {filteredBoardList.length > 0 ? (
          filteredBoardList.map((board, index) => (
            <BoardItem
              key={board.id}
              ref={
                index === filteredBoardList.length - 1 ? lastElementRef : null
              } // 마지막 요소에 ref 연결
              onClick={() => handleClick(board.id)}
            >
              <BoardContents>
                <ContentsHead>
                  <BoardVisibility
                    className="caption-sm-300"
                    centerGroup={board.centerGroup}
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
          ))
        ) : (
          <NoResults>검색 결과가 없습니다.</NoResults>
        )}
      </BoardList>
      <FooterNav isAdmin={true} />
    </div>
  );
};

export default AdminBoardList;

const BoardList = styled.div`
  margin: 0 25px;
  flex: 1;
  overflow-y: auto;
  padding-bottom: 150px; /* 여유 공간 추가 */
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

const BoardVisibility = styled.div<{ centerGroup: string }>`
  border-radius: 15px;
  padding: 3px 10px;

  background: var(--sub-80);

  color: color: var(--sub-20);
`;

const BoardGroup = styled.div`
  color: var(--primary-20);
  border-radius: 15px;
  align-items: center;

  padding: 3px 10px;

  border: 1px solid var(--primary-30);
  background: var(--primary-90);
`;

const NoResults = styled.div`
  text-align: center;
  color: var(--gray-40);
  padding: 20px;
  font-size: 14px;
`;
