import React from 'react';
import styled from 'styled-components';

/* 
interface progress {
    currentProgress: number; // Current progress value
    maxProgress: number;     // Maximum progress value
    Variation?: number;      // 변화량 (optional)
    circleRadius?: number;   // Circle radius (px)
    isQuestDetail?: boolean;
    isAllQuest?: boolean;
}
*/

const ProgressCircle = ({ currentProgress, maxProgress, Variation, circleRadius = 35, isQuestDetail = false, isAllQuest = false }) => {
    // Calculate progress percentage dynamically
    const calculateProgressPercent = (current: number, max: number) => {
        if (max === 0) return 0; // Avoid division by zero
        return (current / max) * 100;
    };

    const progressPercent = calculateProgressPercent(currentProgress, maxProgress);

    // Derived values based on radius
    const circleCircumference = 2 * Math.PI * circleRadius;
    const viewBoxSize = circleRadius * 2 + 12; // Add padding for stroke width

    return (
        <ProgressCircleContainer className='no-drag'>
            <CircularProgressWrapper size={viewBoxSize}>
                <CircularSvg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
                    {/* Background Circle */}
                    <CircleBackground
                        cx={viewBoxSize / 2}
                        cy={viewBoxSize / 2}
                        r={circleRadius}
                        strokeWidth="10"
                    />
                    {/* Progress Circle */}
                    <CircleProgress
                        cx={viewBoxSize / 2}
                        cy={viewBoxSize / 2}
                        r={circleRadius}
                        strokeWidth="10"
                        isQuestDetail={isQuestDetail}
                        strokeDasharray={`${circleCircumference}, ${circleCircumference}`}
                        strokeDashoffset={`${circleCircumference - (progressPercent / 100) * circleCircumference}`}
                        progressPercent={progressPercent}
                    />
                </CircularSvg>
                <ProgressText>
                    {Variation !== undefined ? (
                        <ProgressVariation className='text-md-300' isAllQuest={isAllQuest}>{Variation !== null ? '+' : undefined} {Variation}</ProgressVariation>
                    ) : (
                        <>
                            <ProgressValue className='caption-md-300' >{currentProgress}</ProgressValue>
                            <ProgressMax className='caption-sm-100'> /{maxProgress}</ProgressMax>
                        </>
                    )}
                </ProgressText>
            </CircularProgressWrapper>
        </ProgressCircleContainer>
    );
};

export default ProgressCircle;

// Styled Components
const ProgressCircleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CircularProgressWrapper = styled.div<{ size: number }>`
    position: relative;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
`;

const CircularSvg = styled.svg`
    transform: rotate(-90deg); /* Rotate to start progress from the top */
    width: 100%;
    height: 100%;
`;

const CircleBackground = styled.circle`
    fill: none;
    stroke: var(--gray-20);
`;

const CircleProgress = styled.circle<{ progressPercent: number, isQuestDetail: boolean }>`
fill: none;
stroke: ${({ progressPercent, isQuestDetail }) =>
        isQuestDetail
            ? "var(--orange-70)" // isQuestDetail이 true일 경우 무조건 orange-70
            : progressPercent === 100
                ? "var(--orange-60)"
                : progressPercent <= 30
                    ? "#A88077"
                    : progressPercent <= 50
                        ? "#FF8365"
                        : "#4caf50"};
stroke-linecap: round; /* Rounded ends for the progress */
transition: stroke-dashoffset 0.35s ease; /* Smooth animation */
`;

const ProgressText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
`;

const ProgressVariation = styled.div <{ isAllQuest: boolean }>`
font-size: ${({ isAllQuest }) => isAllQuest ? "10px" : "12px"};
color: var(--orange-90);
`;

const ProgressValue = styled.span`
font-size: 16px;
color: var(--orange-80);
`;

const ProgressMax = styled.span`
    color: var(--gray-80);
`;
