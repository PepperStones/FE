// AdminBoard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../../components/nav/TopNav.tsx";
import SearchFilter from "../../components/filter/SearchFilter.tsx";
import FooterNav from "../../components/nav/FooterNav.tsx";

import RightIcon from "../../assets/images/right_arrow.png";
import PlusIcon from "../../assets/images/add_icon.png";

export const boardListMock = [
  {
    id: 1,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 2,
    visibility: "음성 1센터",
    group: 1,
    title:
      "AAA 프로젝트 신설 안내 AAA 프로젝트 신설인데 두ddddddd 줄인ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ 경우두 줄인 경우 두 줄인 경우 두 줄인 경우두 줄인 경우 두 줄 인...",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 3,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 4,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 5,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 6,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
  {
    id: 7,
    visibility: "임직원 전체",
    group: null,
    title: "AAA 프로젝트 신설 안내 AAA 프로젝트 신설",
    creationDate: "2025.01.01",
    modificationDate: "2025.01.06",
  },
];

const AdminBoardList: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [department, setDepartment] = useState<string>("default");
  const [group, setGroup] = useState<string>("default");

  // 필터링된 게시글 목록 계산
  const filteredBoardList = boardListMock.filter((board) => {
    const matchesSearch = board.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDepartment =
      department === "default" || board.visibility === department;

    // 그룹 필터링: group이 숫자형이므로 비교 전 숫자로 변환
    const matchesGroup =
      group === "default" || board.group === parseInt(group, 10);

    return matchesSearch && matchesDepartment && matchesGroup;
  });

  // 뒤로가기 클릭 함수
  const handleAddIconClick = () => {
    navigate("/admin-add-board");
  };

  const handleClick = (id: number) => {
    navigate(`/admin-board/${id}`); // 동적으로 URL 이동
  };

  const Center = {
    icon: PlusIcon,
    iconWidth: 19,
    iconHeight: 19,
    text: "게시글 목록",
    clickFunc: handleAddIconClick,
  };

  return (
    <div>
      <TopNav lefter={null} center={Center} righter={Center} />
      <SearchFilter
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        group={group}
        setGroup={setGroup}
        title={"제목으로 검색 가능합니다."}
      />
      <BoardList>
        {filteredBoardList.length > 0 ? (
          filteredBoardList.map((board) => (
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
                      {board.group}그룹
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
