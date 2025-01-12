//TwoButtonTopNav.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* lefter, center, righter 모두 인터페이스 동일
interface lefter {
    icon: string;
    iconWidth?: number; // 아이콘 너비 (px 단위)
    iconHeight?: number; // 아이콘 높이 (px 단위)
    text: string;
    clickFunc: () => void;
}
*/

const TwoButtonTopNav = ({
  lefter,
  center,
  righter,
  activeTab,
  onTabChange,
}) => {
  const [activeOption, setActiveOption] = useState(0); // 0: 첫 번째 옵션, 1: 두 번째 옵션
  const navigate = useNavigate();

  const handleOptionClick = (index: number) => {
    setActiveOption(index);
    if (onTabChange) onTabChange(index);
  };

  return (
    <Container>
      <NavContainer>
        <ImageContainer onClick={lefter ? lefter.clickFunc : undefined}>
          {lefter ? (
            lefter.icon ? (
              <LeftIcon
                src={lefter ? lefter.icon : undefined}
                alt="LeftIcon"
                width={lefter.iconWidth}
                height={lefter.iconHeight}
              />
            ) : lefter.text ? (
              <span>{lefter ? lefter.text : undefined}</span>
            ) : null
          ) : undefined}
        </ImageContainer>

        <CenterContent className="title-sm-300">
          {center ? center.text : null}
        </CenterContent>

        <ImageContainer onClick={righter ? righter.clickFunc : undefined}>
          {righter ? (
            righter.icon ? (
              <RightIcon
                src={righter ? righter.icon : undefined}
                alt="RightIcon"
                width={righter.iconWidth}
                height={righter.iconHeight}
              />
            ) : righter.text ? (
              <span>{righter ? righter.text : undefined}</span>
            ) : null
          ) : undefined}
        </ImageContainer>
      </NavContainer>
      <OptionContainer>
        <Option
          className={activeTab === 0 ? "active" : "disable"}
          onClick={() => handleOptionClick(0)}
        >
          <p>현재 경험치 현황</p>
        </Option>
        <Option
          className={activeTab === 1 ? "active" : "disable"}
          onClick={() => handleOptionClick(1)}
        >
          <p>수령 경험치 목록</p>
        </Option>
      </OptionContainer>
    </Container>
  );
};

export default TwoButtonTopNav;

const Container = styled.nav`
  display: flex;
  flex-direction: column;

  position: sticky;
  top: 0;
  background: var(--bg-10);
  z-index: 1000;

  border-bottom: 1px solid var(--gray-10);
  height: auto;
  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;
`;

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;

  height: 71px;
`;

const CenterContent = styled.div`
  display: flex;
  justify-content: center;
  text-align: center; /* 중앙 정렬 */

  width: 210px;

  color: var(--gray-100);
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--gray-100);
  width: 80px;
  height: 40px;
`;

const LeftIcon = styled.img<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "20px")};
  height: ${({ height }) => (height ? `${height}px` : "20px")};
`;

const RightIcon = styled.img<{ width?: number; height?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "20px")};
  height: ${({ height }) => (height ? `${height}px` : "20px")};
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Option = styled.div`
  flex: 1;
  text-align: center;

  &.active {
    color: var(--primary-70); /* 활성화된 텍스트 색상 */
    border-bottom: 1px solid var(--primary-70);
  }

  &.disable {
    color: var(--Grayscale-gray-50, #a3a3a3);
  }
  margin: 0 31px;
  padding-bottom: 12px;
`;
