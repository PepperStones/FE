// AlertItem.tsx
import React from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

interface AlertItemProps {
  isRead: boolean;
  onClick?: () => void; // 클릭 이벤트 핸들러
  children?: React.ReactNode; // children 속성 추가
}

const AlertItem: React.FC<AlertItemProps> = ({ isRead, onClick, children }) => {
  return (
    <Alert isRead={isRead} onClick={onClick}>
      {children}
    </Alert>
  );
};

export default AlertItem;

const Alert = styled.div<{ isRead: boolean }>`
  width: 22.0625rem;
  height: 5.1875rem;
  background: var(--black-50);
  opacity: ${({ isRead }) => (isRead ? "0.5" : "1")};
  border-radius: 15px;
  margin-bottom: 16px; /* 항목 간의 간격 */

  &:last-child {
    margin-bottom: 0; /* 마지막 항목 간격 제거 */
  }

  &:hover {
    cursor: pointer;
  }

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;
`;

const AleContent = styled.div``;
