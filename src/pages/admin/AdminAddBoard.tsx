// AdminBoard.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../../components/nav/TopNav.tsx";
import LargeBtn from "../../components/button/LargeBtn.tsx";

import BackIcon from "../../assets/images/left_arrow.png";

import { addBoard } from "../../api/admin/adminBoardApi.ts";

import { DateUtil } from "../../utils/DateUtil.ts";
import LoadingModal from "../../components/loading/Loading.tsx";

const AdminAddBoard: React.FC = () => {
  const navigate = useNavigate();
  const [centerSelect, setCenterSelect] = useState("전체"); // 센터 수정 상태
  const [groupSelect, setGroupSelect] = useState(""); // 그룹 수정 상태
  const [title, setTitle] = useState(""); // 제목 수정 상태
  const [contents, setContents] = useState(""); // 내용 수정 상태
  const [textareaHeight, setTextareaHeight] = useState("auto"); // textarea 높이 상태

  const [loading, setLoading] = useState(false);

  // 완료 버튼 활성화 조건
  const isAvailable =
    centerSelect && // 센터 선택 확인
    (centerSelect !== "전체" ? groupSelect : true) && // 센터가 "전체"가 아니면 그룹 확인
    title.trim().length > 0 && // 제목 최소 1자 확인
    contents.trim().length > 0; // 내용 최소 1자 확인

  // 뒤로가기 클릭 함수
  const handleBackIconClick = () => {
    navigate("/admin-board");
  };

  // visibility 변경 시 그룹 값을 "그룹 없음"으로 설정
  const handleVisibilityChange = (value: string) => {
    setCenterSelect(value);
    if (value === "전체") {
      setGroupSelect(""); // 그룹 없음
    }
    if (value === "사업기획팀" || value === "그로스팀" || value === "CX팀") {
      setGroupSelect("1");
    }
  };
  const handleInputResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto"; // 초기화
    textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 맞춰 높이 조정
    setContents(textarea.value);
  };

  const handleAddClick = async () => {
    try {
      setLoading(true);

      const requestBody = {
        centerGroup: centerSelect, // 값이 없으면 빈 문자열로 설정
        jobGroup: groupSelect, // 값이 없으면 빈 문자열로 설정
        title,
        content: contents,
      };

      const response = await addBoard(requestBody);

      if (response.code === 200) {
        setCenterSelect("");
        setGroupSelect("");
        setTitle("");
        setContents("");

        setLoading(false);
      }
    } catch (error) {
      console.error("Error adding board:", error);
      alert("게시글 추가 중 오류가 발생했습니다.");
    }

    navigate(`/admin-board`);
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

  const Center = {
    icon: BackIcon,
    iconWidth: 9,
    iconHeight: 16,
    text: "게시글",
    clickFunc: handleBackIconClick,
  };

  const isActiveGroupSelect = (value) => {
    if (
      centerSelect === "전체" ||
      centerSelect === "사업기획팀" ||
      centerSelect === "그로스팀" ||
      centerSelect === "CX팀"
    ) {
      return false;
    } else return true;
  };

  return (
    <div>
      <TopNav lefter={Center} center={Center} righter={null} isAdmin={true} />
      <BoardContainer>
        <Head>
          <Category>
            <EditSelect
              className="caption-sm-300"
              value={centerSelect}
              onChange={(e) => handleVisibilityChange(e.target.value)}
            >
              <option value="전체">전체</option>
              <option value="음성 1센터">음성 1센터</option>
              <option value="음성 2센터">음성 2센터</option>
              <option value="용인백암센터">용인백암센터</option>
              <option value="남양주센터">남양주센터</option>
              <option value="파주센터">파주센터</option>
              <option value="사업기획팀">사업기획팀</option>
              <option value="그로스팀">그로스팀</option>
              <option value="CX팀">CX팀</option>
            </EditSelect>
            {isActiveGroupSelect(centerSelect) && (
              <EditSelect
                className="caption-sm-300"
                value={groupSelect}
                onChange={(e) => setGroupSelect(e.target.value)}
                style={{
                  background: "var(--orange-80)",
                  color: "var(--orange-20)",
                }} // 객체 형태로 스타일 지정
              >
                <option value="전체">그룹 없음</option>
                <option value="1">1그룹</option>
                <option value="2">2그룹</option>
              </EditSelect>
            )}
          </Category>
          <EditInput
            className="text-sm-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            size={Math.max(title.length, 10)}
            placeholder="제목을 입력해 주세요."
          />
        </Head>
        <DivLine></DivLine>
        <EditTextarea
          value={contents}
          onChange={handleInputResize}
          style={{ height: textareaHeight }} // 초기 높이를 상태로 반영
          placeholder="내용을 입력해 주세요."
        />
      </BoardContainer>
      <ButtonContainer>
        <LargeBtn
          content="등록"
          onClick={handleAddClick}
          isAvailable={isAvailable}
        />
      </ButtonContainer>

      <LoadingModal isOpen={loading}/>
    </div>
  );
};

export default AdminAddBoard;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: var(--black-50);
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

// 스타일 추가
const EditSelect = styled.select`
  padding: 5px 10px;
  font-size: 16px;
  border: none;

  border-radius: 15px;
  background: var(--orange-60);
  color: var(--orange-90);

  &:focus {
    outline: none;
    border-color: var(--primary-60);
  }
`;

// 스타일 추가
const EditInput = styled.input`
  width: 100%;
  margin-top: 5px;
  font-size: 16px;
  border: none;
  border-radius: 5px;

  background: var(--black-50); /* 배경 색상 */
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
  border: none;
  border-radius: 5px;

  background: var(--black-50); /* 배경 색상 */
  color: var(--primary-80); /* 텍스트 색상 */

  &:focus {
    outline: none; /* 포커스 시 기본 테두리 제거 */
    border-color: var(--primary-60); /* 포커스 시 테두리 강조 */
  }
`;

const DivLine = styled.div`
  margin: 0 8px;
  height: 0.5px;
  background: #474747;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;
