import React from 'react';
import styled from 'styled-components';

/* 
interface progress {
    currentProgress: number; // Current progress value
    maxProgress: number;     // Maximum progress value
    Variation?: number;      // 변화량 (optional)
    circleRadius?: number;   // Circle radius (px)
}
*/

const ProgressCircle = ({ currentProgress, maxProgress, Variation, circleRadius = 35 }) => {
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
                        strokeDasharray={`${circleCircumference}, ${circleCircumference}`}
                        strokeDashoffset={`${circleCircumference - (progressPercent / 100) * circleCircumference}`}
                    />
                </CircularSvg>
                <ProgressText>
                    {Variation !== undefined ? (
                        <ProgressVariation className='caption-md-300'>{Variation !== null ? '+': undefined } {Variation}</ProgressVariation>
                    ) : (
                        <>
                            <ProgressValue>{currentProgress}</ProgressValue>
                            <ProgressMax> /{maxProgress}</ProgressMax>
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
    stroke: var(--sub-40); /* Background circle color */
`;

const CircleProgress = styled.circle`
    fill: none;
    stroke: var(--primary-70); /* Progress circle color */
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

const ProgressVariation = styled.div`
color: var(--primary-70);
`;

const ProgressValue = styled.span`
    color: var(--primary-70);
`;

const ProgressMax = styled.span`
    color: var(--gray-80);
`;
