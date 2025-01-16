import React from 'react'
import styled from 'styled-components'

import ProgressCircle from '../loading/ProgressCircle.tsx'

import UnitIcon from '../../assets/images/clock_cycle.png'
import PaperIcon from '../../assets/images/orange_paper.png'
import PersonPrizeIcon from '../../assets/images/orange_person_prize.png'
import RateIcon from '../../assets/images/percentage-circle.png'
import GoIconImg from '../../assets/images/lightgray_arrow_right.png'

/* Props 정보
interface QuestCardBtnProps {
    maxCondition: string;        // max 조건
    mediumCondition: string      // max 조건
    progress: interface progressnProps      // 프로그래스 내용
    unit: string        // 월, 주 단위
    isMoreDetail?: boolean       // 상세보기 유무
    onClick: () => void;        // 온 클릭 함수
}

interface progressProps {
    currentProgress: number; // Current progress value
    maxProgress: number;     // Maximum progress value
    Variation?: number;      // 변화량 (optional)
    circleRadius?: number;   // Circle radius (px)
}
*/

const QuestCardBtn = ({ title, subtitle, maxCondition, mediumCondition, progress, unit, rate, isMoreDetail = false, onClick }) => {
    return (

        <QuestSection>
            <QuestHeader>
                <QuestTitleWrapper className='no-drag'>
                    <QuestLeftContent>
                        {title === '직무별' ? <QuestIcon src={PaperIcon} alt="퀘스트 아이콘" /> : <QuestIcon src={PersonPrizeIcon} alt="퀘스트 아이콘" />}
                        <QuestTitle className='text-sm-200'>{title} 퀘스트</QuestTitle>
                        <QuestSubtitle className='text-lg-300'>{subtitle}</QuestSubtitle>
                    </QuestLeftContent>
                    {isMoreDetail ? <QuestRightContent className='caption-sm-200' onClick={onClick}>상세보기 <GoIcon src={GoIconImg}/></QuestRightContent> : undefined}
                </QuestTitleWrapper>
            </QuestHeader>

            <QuestCardContainer>
                <ProgressContainer className='no-drag'>
                    <ProgressCircleContainer>
                        <ConditionTitle className='caption-sm-300'>누적 획득 경험치<DownwardTriangle /></ConditionTitle>
                        <ProgressCircle
                            currentProgress={progress.currentProgress}
                            maxProgress={rate !== null ? progress.maxProgress * rate / 100 : progress.maxProgress}
                            Variation={progress.Variable}
                            circleRadius={progress.circleRadius}
                            isQuestDetail={true}
                        />
                    </ProgressCircleContainer>

                    <QuestDivider />

                    <ProgressDetails className='caption-sm-300'>

                        <ConditionContainer>
                            <ConditionTitle>Max 조건</ConditionTitle>
                            <Condition>{maxCondition}</Condition>
                        </ConditionContainer>

                        <ConditionContainer>
                            <ConditionTitle>Medium 조건</ConditionTitle>
                            <Condition>{mediumCondition}</Condition>
                        </ConditionContainer>

                        <>
                            <GetPurpose className='caption-sm-300'>
                                <GetPurposeIcon src={UnitIcon} />
                                {unit} 단위 테스트
                                {title !== '직무별' && (
                                    <>
                                        <PercentageDivider /> <PercentageIcon src={RateIcon} /> 비중 {rate}%
                                    </>
                                )}</GetPurpose>
                        </>
                    </ProgressDetails>

                </ProgressContainer>
            </QuestCardContainer>
        </QuestSection>
    )
}

export default QuestCardBtn

const QuestSection = styled.div`
`;

const QuestHeader = styled.div`
    display: flex;
    align-items: center;

    margin-bottom: 15px;
`;

const QuestTitleWrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

width: 100%;
`;

const QuestLeftContent = styled.div`
display: flex;
flex: 1;

gap: 7px;
`;

const QuestRightContent = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;

margin-right: 10px;

color: var(--gray-70);
`;

const GoIcon = styled.img`
width: 5px;
height: 8px;

margin-left: 7px;
`;

const QuestIcon = styled.img`
width: 14px;
height: 16px;
`;

const QuestTitle = styled.div`
color: var(--orange-100);    
`;

const QuestSubtitle = styled.div`
color: var(--orange-80);
`;

const QuestCardContainer = styled.div`
    background-color: var(--black-50);
    border-radius: 15px;
    padding: 12px 18px;

    display: flex;
    flex-direction: column;
`;

const ProgressCircleContainer = styled.div`
display: flex;
flex-direction: column;

gap: 13px;
`;

const QuestDivider = styled.div`
border: 1px solid var(--gray-10);
`;


const ProgressContainer = styled.div`
display: flex;

gap: 17px;
`;

const ProgressDetails = styled.div`
display: flex;
flex-direction: column;
justify-content: center;

gap: 10px;
`;

const ConditionContainer = styled.div`
display: flex;

gap: 8px;
`;

const ConditionTitle = styled.div`
border-radius: 15px;
background: var(--gray-60);

padding: 3px 10px;

color: var(--sub-20);
text-align: center;

position: relative;
`;

const DownwardTriangle = styled.div`
  width: 0;
  height: 0;
  border-left: 6px solid transparent; /* Adjust size */
  border-right: 6px solid transparent; /* Adjust size */
  border-top: 6px solid var(--gray-60); /* Color of the triangle */
  
  position: absolute; /* Positioning relative to parent */
  left: 50%; /* Center horizontally */
  transform: translateX(-50%); /* Adjust for exact center alignment */
  top: calc(100%); /* Position below the ConditionTitle with spacing */
`;

const Condition = styled.div`
display: flex;
justify-content: center;
align-items: center;    

color: var(--gray-80);
`;

const GetPurpose = styled.div`
display: flex;
justify-content: left;
align-items: center;

width: fit-content;
border-radius: 15px;
border: none;
border-top: 1px solid #666;
background: var(--black-30);

padding: 7px 10px;
margin-top: 7px;

color: var(--gray-70);
`;

const GetPurposeIcon = styled.img`
width: 15px;
height: 15px;

margin-right: 6px;
`;

const PercentageDivider = styled.div`
height: 10px;
border: 0.5px solid var(--gray-20);

margin: 0 10px;
`;

const PercentageIcon = styled.img`
width: 15px;
height: 15px;

margin-right: 6px;
`;