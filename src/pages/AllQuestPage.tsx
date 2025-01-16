
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'
import ProgressCircle from '../components/loading/ProgressCircle.tsx';

import BackIcon from "../assets/images/left_arrow.png";

import { fetchQuestDetail, QuestDetailResponse, JobQuest, LeaderQuest } from '../api/user/QuestApi.ts';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

function AllQuestPage() {
    const navigate = useNavigate();
    const location = useLocation(); // URL에서 전달된 state 데이터 가져오기

    const quest = location.state; // 전달된 quest 데이터

    console.log("quest: ", quest);

    const [questDetails, setQuestDetails] = useState<QuestDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch quest details on component mount
    useEffect(() => {
        const loadQuestDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetchQuestDetail(quest.type, Number(quest.id));

                console.log("response: ", response);

                setQuestDetails(response);
            } catch (error) {
                console.error('Error fetching quest details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadQuestDetails();
    }, []);

    const handleBackIconClick = () => {
        navigate('/quest');
    };

    const Center = {
        icon: BackIcon,
        iconWidth: 11,
        iconHeight: 16,
        text: `${quest.type === 'job' ? '직무별' : '리더부여'} 퀘스트`,
        clickFunc: handleBackIconClick
    };

    // Generate 50 divs for the grid
    const gridItems = Array.from(
        { length: questDetails?.data.period === 'WEEKLY' ? 50 : questDetails?.data.period === 'MONTHLY' ? 12 : 0 },
        (_, index) => {
            // Determine the unit based on the period (WEEKLY or MONTHLY)
            const unit = questDetails?.data.period === 'WEEKLY' ? index + 1 : index % 12 + 1;

            // Find the corresponding quest data for this unit
            const questData = questDetails?.data.questList.find((quest) => quest.unit === unit);

            let currentProgress = questData
                ? Math.min(
                    (questData.experience / (quest.maxScore || quest.maxPoints || 100)) * 100,
                    quest.maxScore || quest.maxPoints // Cap at 100
                )
                : 0;

            // currentProgress가 0이면 10으로 고정
            if (currentProgress === 0) {
                currentProgress = 10;
            }

            console.log("currentProgress && index : ", currentProgress, "/", quest.maxScore || quest.maxPoints, " and ", index);

            return (
                <GridItem key={index} className="no-drag">
                    <ShowUnit className="caption-sm-300">
                        {unit}
                        {questDetails?.data.period === 'WEEKLY' ? '주차' : '월'}
                    </ShowUnit>
                    <ProgressCircle
                        currentProgress={currentProgress}
                        maxProgress={quest.maxScore || quest.maxPoints}
                        Variation={questData?.experience || null}
                        circleRadius={21}
                        isQuestDetail={false}
                        isAllQuest={true}
                    />
                </GridItem>
            );
        }
    );

    return (

        <QuestDetailPageContainer>
            <TopNav lefter={Center} center={Center} righter={null} />

            <QuestDetailTopContent>
                {quest.type === 'job' ? (
                    <QuestCard
                        key={`job-${quest.id}`}
                        title="직무별"
                        subtitle="생산성 향상"
                        maxCondition={quest.maxStandard}
                        mediumCondition={quest.mediumStandard}
                        progress={{
                            currentProgress: quest.accumulatedExperience,
                            maxProgress: 4000,
                            isVariable: false,
                        }}
                        unit={questDetails?.data.period === 'MONTHLY' ? '월' : '주'}
                        rate={null}
                        isMoreDetail={false}
                        onClick={null}
                    />
                ) : (
                    <QuestCard
                        key={`leader-${quest.id}`}
                        title="리더부여"
                        subtitle={quest.questName}
                        maxCondition={quest.maxCondition}
                        mediumCondition={quest.medianCondition}
                        progress={{
                            currentProgress: quest.accumulatedExperience,
                            maxProgress: 2000,
                            isVariable: false,
                        }}
                        unit={questDetails?.data.period === 'MONTHLY' ? '월' : '주'}
                        rate={quest.weight}
                        isMoreDetail={false}
                        onClick={null}
                    />
                )}
            </QuestDetailTopContent>

            <QuestDetailBottomContent>
                <GridContainer isWeekly={questDetails?.data.period === 'WEEKLY'}>
                    {gridItems}
                </GridContainer>
            </QuestDetailBottomContent>

            {questDetails?.data.period === 'WEEKLY' ? <div style={{ height: '100px' }}></div> : questDetails?.data.period === 'MONTHLY' ? undefined : undefined}

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

width: 100%;
background-color: var(--black-50);
border-radius: 15px;

padding: 15px; /* Optional padding */
`;

const GridItem = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

width: 100%;

border-radius: 8px; /* Optional rounded corners */
color: var(--accent-80); /* Text color */

margin-bottom: 15px;
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
