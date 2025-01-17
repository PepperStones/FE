import React from "react";
import styled, { keyframes, css } from "styled-components";

import MediumBtn from "./MediumBtn.tsx";
import ProgressBar from "../loading/ProgressBar.tsx";

import Lock from "../../assets/images/reward/reward_lock.png";

/* Props 정보
interface QuestRewardBtnProps {
    title: string;      // 상단 제목 내용
    content: string;    // 중단 주요 내용
    rewardImg: string;       // 보상 아이콘
    isAvailable: boolean;       // 버튼 동작 가능 여부
    isDone: boolean;        // 달성 여부
    
    onClick: () => void;        // 온 클릭 함수
}

interface progressnProps {
    progressContent: string;      // 프로그래스 내용
    currentProgress: number;    // 현재 진행도
    maxProgress: number;       // 최종 진행도
}
*/

const animationStyles = (isDone: boolean) => css`
  animation: ${isDone ? fadeInOverlay : fadeOutOverlay} 0.3s ease-in-out;
`;

const QuestRewardBtn = ({
  title,
  content,
  rewardImg,
  isAvailable,
  isDone,
  progress,
  onClick,
}) => {
  return (
    <QuestRewardBtnContainer
      className="text-md-300"
      disabled={!isAvailable}
      isAvailable={isAvailable}
      isDone={isDone}
    >
      <TopContent>
        <TopLeftContent>
          <ProgressTitle className="caption-sm-200">{title}</ProgressTitle>
          <ProgressContent className="caption-md-200">
            {content}
          </ProgressContent>
        </TopLeftContent>

        <TopRightContent>
          <TopContentIconContainer isAvailable={isAvailable}>
            <TopContentIcon src={rewardImg} />
          </TopContentIconContainer>
        </TopRightContent>
      </TopContent>

      <ContentDivider />

      <BottomContent>
        {isDone ? (
          <MediumBtn
            content="아이템 받기 완료"
            onClick={null}
            isAvailable={false}
          />
        ) : isAvailable ? (
          <MediumBtn
            content="아이템 받기"
            onClick={onClick}
            isAvailable={isAvailable}
          />
        ) : (
          <ProgressBar
            progressContent="도전과제 진행중"
            currentProgress={progress.currentProgress}
            maxProgress={progress.maxProgress}
          />
        )}
      </BottomContent>
    </QuestRewardBtnContainer>
  );
};

export default QuestRewardBtn;

const QuestRewardBtnContainer = styled.button<{
  isAvailable: boolean;
  isDone: boolean;
}>`
  width: 22.0625rem;
  border-radius: 15px;
  background: var(--black-50);
  border: none;

  padding: 5px;

  text-align: center;

  user-select: none; /* 텍스트 선택 방지 */
  -webkit-user-select: none; /* Safari에서 드래그 방지 */
  -moz-user-select: none; /* Firefox에서 드래그 방지 */
  -ms-user-select: none;

  position: relative;

  /* isDone이 true일 때 오버레이 추가 */
  ${({ isDone }) =>
    isDone &&
    `
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 15px;
        opacity: ${({ isDone }) => (isDone ? 1 : 0)};
        pointer-events: none; /* 클릭 이벤트 방지 */
        
        opacity: ${({ isDone }) => (isDone ? "1" : "0")}; /* 초기 투명도 설정 */
        ${({ isDone }) => animationStyles(isDone)}; /* 애니메이션 스타일 적용 */
        animation-fill-mode: forwards; /* 애니메이션 종료 후 상태 유지 */
    }
`} /* 반응형 디자인 추가 */
//   @media (max-width: 768px) {
//     width: 20rem; /* 화면이 작은 경우 버튼 크기 축소 */
//     padding: 0.7rem;
//   }

  @media (max-width: 360px) {
    width: 20rem; /* 더 작은 화면에서 크기 조정 */
    padding: 0.5rem;
    font-size: 0.9rem; /* 텍스트 크기 축소 */
  }
`;

const TopContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopLeftContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  gap: 11px;
  padding: 10px;
  padding-bottom: 14px;
`;

const TopRightContent = styled.div`
  padding: 10px;
  padding-bottom: 14px;
`;

const TopContentIconContainer = styled.div<{ isAvailable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55px;
  height: 55px;
  border-radius: 15px;
  background: var(--gray-30);
  border: 1px solid var(--gray-60);

  padding: 8px;

  position: relative;
  ${({ isAvailable }) =>
    !isAvailable &&
    `
  /* 모자이크 효과 */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.001);
    backdrop-filter: blur(6px) brightness(1.3) contrast(1.0);
    border-radius: inherit;
    pointer-events: none;
    z-index: 1;
  }

  /* Lock 이미지 */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    background-image: url(${Lock});
    background-size: contain;
    background-repeat: no-repeat;
    z-index: 2;
    pointer-events: none;
  }
`}
`;

const TopContentIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const ContentDivider = styled.div`
  border: 0.5px solid var(--gray-10);
`;

const BottomContent = styled.div`
  padding: 10px 9px;
`;

const ProgressTitle = styled.div`
  display: flex;
  justify-content: left;

  color: var(--gray-40);
`;

const ProgressContent = styled.div`
  display: flex;

  text-align: left;
  color: var(--gray-80);
`;

const fadeInOverlay = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOutOverlay = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;
