import React from "react";
import styled from "styled-components";

/* Props 정보
interface MediumBtnProps {
    content: string;        // 버튼 안 내용
    onClick: () => void;        // 온 클릭 함수
    isAvailable: boolean;       // 버튼 동작 여부
}
*/

const MediumBtn = ({ content, onClick, isAvailable }) => {
  return (
    <MediumBtnContainer
      className="text-lg-300"
      onClick={onClick}
      disabled={!isAvailable}
      isAvailable={isAvailable}
    >
      {content}
    </MediumBtnContainer>
  );
};

export default MediumBtn;

const MediumBtnContainer = styled.button<{ isAvailable: boolean }>`
  width: 20.3125rem;
  height: 3rem;

  padding: 15px 0px;
  border-radius: 15px;
  border: 1px solid
    ${({ isAvailable }) =>
      isAvailable ? "var(--orange-70)" : "var(--orange-90)"};
  background: ${({ isAvailable }) =>
    isAvailable ? "var(--orange-70)" : "var(--orange-90)"};

  gap: 6px;

  color: var(--gray-0);
  text-align: center;

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;

  @media (max-width: 360px) {
    width: 18rem; /* 더 작은 화면에서 크기 조정 */
    padding: 0.5rem;
    font-size: 0.9rem; /* 텍스트 크기 축소 */
  }
`;
