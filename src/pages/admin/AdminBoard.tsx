// AdminBoard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../../components/nav/TopNav.tsx";
import LargeBtn from "../../components/button/LargeBtn.tsx";
import SmallBtn from "../../components/button/SmallBtn.tsx";
import BackIcon from "../../assets/images/left_arrow.png";

import DefaultModal from "../../components/modal/DefaultModal.tsx";
import { DateUtil } from "../../utils/DateUtil.ts";
import {
  getBoardDetail,
  BoardDetail,
  DeleteBoard,
  patchBoard,
} from "../../api/admin/adminBoardApi.ts";

const AdminBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URL에서 id 가져오기
  // const boardData = boardListMock.find((board) => board.id === Number(id)); // 데이터 검색

  const [boardData, setBoardData] = useState<BoardDetail | null>(null); // 게시글 데이터

  const [isEditable, setIsEditable] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editVisibility, setEditVisibility] = useState(""); // 센터 수정 상태
  const [editGroup, setEditGroup] = useState(""); // 그룹 수정 상태
  const [editTitle, setEditTitle] = useState(""); // 제목 수정 상태
  const [editContents, setEditContents] = useState(""); // 내용 수정 상태

  const [textareaHeight, setTextareaHeight] = useState("auto"); // textarea 높이 상태

  const navigate = useNavigate();

  // API 호출하여 게시글 데이터 가져오기
  useEffect(() => {
    const fetchBoardData = async () => {
      if (!id) return;

      try {
        const boardDetail = await getBoardDetail(Number(id));
        setBoardData(boardDetail.data);
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

  // 뒤로가기 클릭 함수
  const handleBackIconClick = () => {
    navigate("/admin-board");
  };

  const handleEditClick = () => {
    setIsEditable(true); // 수정 모드 활성화
    setEditTitle(boardData.title); // 현재 제목 상태에 저장
    setEditContents(boardData.content); // 현재 내용 상태에 저장
    setEditVisibility(boardData.centerGroup); // 현재 내용 상태에 저장
    setEditGroup(boardData.jobGroup); // 현재 내용 상태에 저장
    adjustTextareaHeight(boardData.content); // textarea 높이 조정
  };

  const adjustTextareaHeight = (content: string) => {
    const textarea = document.createElement("textarea");
    textarea.style.visibility = "hidden";
    textarea.style.position = "absolute";
    textarea.style.height = "auto";
    textarea.value = content;

    document.body.appendChild(textarea); // DOM에 추가
    const height = textarea.scrollHeight; // 텍스트 내용 기반 높이 계산
    document.body.removeChild(textarea); // DOM에서 제거
    setTextareaHeight(`${height}px`);
  };

  // centerGroup 변경 시 그룹 값을 "그룹 없음"으로 설정
  const handleVisibilityChange = (value: string) => {
    setEditVisibility(value === "" ? "전체" : value); // "전체"를 ""로 변환
    if (value === "" || value === "전체") {
      setEditGroup("전체"); // centerGroup이 없으면 group도 초기화
      setEditVisibility("전체");
    }

    if (value === "사업기획팀" || value === "그로스팀" || value === "CX팀") {
      setEditGroup("1");
    }
  };

  // 삭제 처리 함수
  const handleDeleteClick = async () => {
    try {
      const result = await DeleteBoard(Number(id)); // API 호출
      if (result) {
        navigate("/admin-board"); // 삭제 후 목록 페이지로 이동
      }
    } catch (error: any) {
      alert(`삭제 실패: ${error.message}`);
    }
  };

  // 수정 처리 함수
  const handleModifyClick = async () => {
    const requestBody = {
      centerGroup: editVisibility,
      jobGroup: nullTitle() ? "전체" : editGroup,
      title: editTitle,
      content: editContents,
    };

    try {
      const response = await patchBoard(Number(id), requestBody);
      setBoardData((prev) => ({
        ...prev!,
        centerGroup: requestBody.centerGroup,
        jobGroup: nullTitle() ? "" : requestBody.jobGroup,
        title: requestBody.title,
        content: requestBody.content,
      }));
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }

    // 수정 모드 비활성화
    setIsEditable(false);

    navigate(`/admin-board/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰 높이 조정
    setEditContents(textarea.value);
  };

  const Center = {
    icon: BackIcon,
    iconWidth: 9,
    iconHeight: 16,
    text: "게시글",
    clickFunc: handleBackIconClick,
  };

  const nullTitle = () => {
    if (editVisibility === null || editVisibility === "전체") {
      return true;
    } else return false;
  };

  const isActiveSelect = () => {
    if (
      editVisibility === "사회기획팀" ||
      editVisibility === "그로스팀" ||
      editVisibility === "CX팀"
    ) {
      return false;
    }
  };
  return (
    <div>
      <TopNav lefter={Center} center={Center} righter={null} />
      <BoardContainer key={boardData.id}>
        <Head>
          <Category>
            {isEditable ? (
              <EditSelect
                value={editVisibility}
                onChange={(e) => handleVisibilityChange(e.target.value)}
              >
                <option value="전체">전체</option>
                <option value="음성 1센터">음성 1센터</option>
                <option value="음성 2센터">음성 2센터</option>
                <option value="용인백암센터">용인백암센터</option>
                <option value="남양주센터">남양주센터</option>
                <option value="파주센터">파주센터</option>
                <option value="사회기획팀">사회기획팀</option>
                <option value="그로스팀">그로스팀</option>
                <option value="CX팀">CX팀</option>
              </EditSelect>
            ) : (
              <BoardVisibility
                className="caption-sm-300"
                visibility={boardData.centerGroup}
              >
                {boardData.centerGroup || "전체"}
              </BoardVisibility>
            )}
            {isEditable
              ? editVisibility !== null && (
                  <EditSelect
                    value={editGroup}
                    onChange={(e) => setEditGroup(e.target.value)}
                    disabled={nullTitle()}
                    style={{ background: "var(--primary-90)" }} // 객체 형태로 스타일 지정
                  >
                    <option value="전체">그룹 없음</option>
                    <option value="1">1그룹</option>
                    {!isActiveSelect && <option value="2">2그룹</option>}
                  </EditSelect>
                )
              : boardData.jobGroup && (
                  <BoardGroup className="caption-sm-300">
                    {boardData.jobGroup}그룹
                  </BoardGroup>
                )}
          </Category>
          {isEditable ? (
            <EditInput
              className="text-sm-200"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              size={Math.max(editTitle.length, 10)}
            />
          ) : (
            <BoardTitle className="text-sm-200">{boardData.title}</BoardTitle>
          )}

          <BoardDate className="caption-sm-100">
            작성일 {DateUtil.formatDate(boardData.createdAt)} | 수정일{" "}
            {DateUtil.formatDate(boardData.updatedAt)}
          </BoardDate>
        </Head>
        <DivLine></DivLine>

        {/* 수정 상태에 따라 내용 표시 */}
        {isEditable ? (
          <EditTextarea
            value={editContents}
            onChange={handleInputResize}
            style={{ height: textareaHeight }} // 초기 높이를 상태로 반영
          />
        ) : (
          <MainContents className="caption-md-100">
            {boardData.content}
          </MainContents>
        )}
      </BoardContainer>
      <ButtonContainer>
        {isEditable ? (
          <LargeBtn
            content="완료"
            onClick={handleModifyClick}
            isAvailable={isEditable}
          />
        ) : (
          <>
            <SmallBtn
              content="삭제"
              onClick={openDeleteModal}
              isAvailable={true}
              isDarkblue={true}
            />
            <SmallBtn
              content="수정"
              onClick={handleEditClick}
              isAvailable={true}
              isDarkblue={false}
            />
          </>
        )}
      </ButtonContainer>

      <DefaultModal
        showDefaultModal={isDeleteModalOpen}
        title="게시글을 정말 삭제하시겠습니까?"
        description="삭제한 게시글은 다시 복구 불가합니다."
        onAcceptFunc={handleDeleteClick} // 삭제 함수 연결
        onUnacceptFunc={closeDeleteModal}
      />
    </div>
  );
};

export default AdminBoard;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--sub-10);
  margin: 20px;
  margin-bottom: 20px;
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

  background: var(--sub-80);
  color: var(--sub-20);
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

// 스타일 추가
const EditInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid var(--sub-10);
  border-radius: 5px;

  background: var(--sub-10); /* 배경 색상 */
  color: var(--primary-80); /* 텍스트 색상 */

  &:focus {
    outline: none; /* 포커스 시 기본 테두리 제거 */
    border-color: var(--primary-60); /* 포커스 시 테두리 강조 */
  }
`;

const EditTextarea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid var(--sub-10);
  border-radius: 5px;

  background: var(--sub-10); /* 배경 색상 */
  color: var(--primary-80); /* 텍스트 색상 */

  &:focus {
    outline: none; /* 포커스 시 기본 테두리 제거 */
    border-color: var(--primary-60); /* 포커스 시 테두리 강조 */
  }
`;

// 스타일 추가
const EditSelect = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid var(--sub-40);

  border-radius: 15px;
  background: var(--sub-80);
  color: var(--sub-20);

  &:focus {
    outline: none;
    border-color: var(--primary-60);
  }
`;
