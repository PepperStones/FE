import React from "react";
import styled from "styled-components";

/* 
interface progress {
    progressContent: string;     // 하단 진행률 내용
    currentProgress: number; // 현재 진행도
    maxProgress: number; // 최중 진행도
}
*/

const ProgressBar = ({ progressContent, currentProgress, maxProgress }) => {
  // Calculate progressPercent dynamically
  const calculateProgressPercent = (current: number, max: number) => {
    if (max === 0) return 0; // Avoid division by zero
    return (current / max) * 100;
  };

  const progressPercent = calculateProgressPercent(
    currentProgress,
    maxProgress
  );

  return (
    <ProgressContainer>
      <BarContainer>
        <BarFill progress={progressPercent} />
        <Circle position={progressPercent} />
      </BarContainer>
      <BarContent>
        <ProgressSubText className="caption-sm-200">
          {progressContent}
        </ProgressSubText>
        <CurrentProgress className="caption-md-300">
          {currentProgress}/{maxProgress}
        </CurrentProgress>
      </BarContent>
    </ProgressContainer>
  );
};

export default ProgressBar;

const ProgressContainer = styled.div`
  border-radius: 15px;
  background: var(--black-50);

  padding: 1px 5px;

  text-align: center;
`;

const BarContainer = styled.div`
  position: relative;

  width: 100%;
  height: 9px; /* 게이지 바 높이 */
  border-radius: 13px; /* 게이지 바 radius */
  background: var(--gray-20);

  margin-top: 10px;
`;

const BarFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 9px;
  background: var(--orange-70);
  border-radius: 13px; /* 모서리 둥글게 */

  transition: width 0.3s ease; /* 애니메이션 효과 */
`;

const Circle = styled.div<{ position: number }>`
  position: absolute;
  left: ${({ position }) => `calc(${position}% - 10px)`};
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  transition: all 0.3s ease; /* 애니메이션 효과 */

  width: 13px;
  height: 13px;
  background-color: var(--orange-70);
  border: none;
  border-radius: 50%; /* 원형 */
`;

const BarContent = styled.div`
  display: flex;
  flex-direction: row;

  padding-top: 11px;
`;

const ProgressSubText = styled.div`
  display: flex;
  justify-content: left;
  flex: 1;

  color: var(--gray-40);
`;

const CurrentProgress = styled.div`
  display: flex;
  align-items: right;

  color: var(--orange-70);
`;
