
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'
import ProgressCircle from '../components/loading/ProgressCircle.tsx';

import BackIcon from "../assets/images/left_arrow.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const progress = {
    currentProgress: 1341,
    maxProgress: 3000,
    circleRadius: 20,
    Variation: 40
};

function AllQuestPage() {
    const navigate = useNavigate();
    const location = useLocation(); // URL에서 전달된 state 데이터 가져오기

    const quest = location.state; // 전달된 quest 데이터

    const handleBackIconClick = () => {
        navigate('/quest');
    };

    const Center = {
        icon: BackIcon,
        iconWidth: 11,
        iconHeight: 16,
        text: quest.title + " 퀘스트",
        clickFunc: handleBackIconClick
    };

    // Generate 50 divs for the grid
    const gridItems = Array.from(
        { length: quest.unit === '주' ? 50 : quest.unit === '월' ? 12 : 0 }
        , (_, index) => (
            <GridItem key={index} className='no-drag'>
                <ShowUnit className='caption-sm-300'>
                    {index + 1}
                    {quest.unit === '주' ? '주차' : quest.unit === '월' ? '월' : undefined }
                </ShowUnit>
                <ProgressCircle
                    currentProgress={progress.currentProgress}
                    maxProgress={progress.maxProgress}
                    Variation={progress.Variation}
                    circleRadius={progress.circleRadius}
                />
            </GridItem>
        ));

    return (

        <QuestDetailPageContainer>
            <TopNav lefter={Center} center={Center} righter={null} />

            <QuestDetailTopContent>
                {quest ? (
                    <QuestCard
                        title={quest.title}
                        subtitle={quest.subtitle}
                        maxCondition={quest.maxCondition}
                        mediumCondition={quest.mediumCondition}
                        progress={quest.progress}
                        unit={quest.unit}
                        rate={quest.rate}
                        onClick={null}
                    />
                ) : (
                    null
                )}
            </QuestDetailTopContent>

            <QuestDetailBottomContent>
                <GridContainer isWeekly={quest.unit === '주'}>
                    {gridItems}
                </GridContainer>
            </QuestDetailBottomContent>

            {quest.unit === '주' ? <div style={{ height: '100px' }}></div> : quest.unit === '월' ? undefined : undefined}

            <FooterNav />
        </QuestDetailPageContainer >

    );
}

export default AllQuestPage;

const QuestDetailPageContainer = styled.div`
display: flex;
flex-direction: column;

overflow-y: hidden;
`;

const QuestDetailTopContent = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 20px
`;

const QuestDetailBottomContent = styled.div`
display: flex;
justify-content: center;
align-items: center;

padding: 20px;
overflow: hidden; /* 내용이 초과되지 않도록 숨김 */

animation: ${fadeIn} 0.5s ease-in-out;
`;

const GridContainer = styled.div<{ isWeekly: boolean }>`
display: grid;
grid-template-columns: repeat(5, 1fr); /* Create 10 columns */
grid-template-rows: ${({ isWeekly }) => (isWeekly ? 'repeat(10, 1fr)' : 'repeat(3, 1fr)')}; /* Rows based on isWeekly */

width: 100%; /* Adjust width as needed */
background-color: var(--sub-20);
border-radius: 15px;

gap: 14px; /* Space between grid items */
padding: 20px; /* Optional padding */
`;

const GridItem = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 100%; /* Full width of the grid cell */
aspect-ratio: 1 / 1; /* Make each cell a square */

 /* Example background color */
border-radius: 8px; /* Optional rounded corners */
color: var(--accent-80); /* Text color */
font-size: 14px; /* Adjust text size as needed */
font-weight: bold;
`;

const ShowUnit = styled.div`
display: flex;
justify-content: center;
align-items: center;

border-radius: 15px;
background: var(--gray-40);

padding: 3px 12px;
margin-bottom: 10px;

color: var(--gray-0);
`;
