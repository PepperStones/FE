
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'

import { fetchQuestProgress, JobQuest, LeaderQuest } from '../api/user/QuestApi.ts';

// Define the fadeIn keyframes
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Center = {
    text: "퀘스트",
};

function QuestPage() {
    const navigate = useNavigate();

    const [jobQuests, setJobQuests] = useState<JobQuest[]>([]);
    const [leaderQuests, setLeaderQuests] = useState<LeaderQuest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch quest data on component mount
    useEffect(() => {
        const loadQuests = async () => {
            try {
                setIsLoading(true);
                const response = await fetchQuestProgress();
                setJobQuests(response.data.jobQuests);
                setLeaderQuests(response.data.leaderQuests);
            } catch (error) {
                console.error('Error loading quests:', error);

            } finally {
                setIsLoading(false);
            }
        };

        loadQuests();
    }, []);

    const handleQuestClick = (quest: JobQuest | LeaderQuest) => {
        const type = 'questName' in quest ? 'leader' : 'job';
        console.log("type & id : ", type, quest.id);
        console.log("Debug: ", quest);
        navigate(`/quest/${quest.id}`, { state: { ...quest, type } });
    };

    return (

        <QuestPageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <QuestCardContainer>
                {!isLoading && (
                    <>
                        {/* Render Job Quests */}
                        {jobQuests.map((quest) => (
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
                                unit={quest.period === 'MONTHLY' ? '월' : '주'}
                                rate={null}
                                isMoreDetail={true}
                                onClick={() => handleQuestClick(quest)}
                            />
                        ))}

                        {/* Render Leader Quests */}
                        {leaderQuests.map((quest) => (
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
                                unit={quest.period === 'MONTHLY' ? '월' : '주'}
                                rate={quest.weight}
                                isMoreDetail={true}
                                onClick={() => handleQuestClick(quest)}
                            />
                        ))}
                    </>
                )}

                <div style={{ height: '100px' }}></div>
            </QuestCardContainer>

            {isLoading && <p>로딩 중...</p>}

            <FooterNav />
        </QuestPageContainer>

    );
}

export default QuestPage;

const QuestPageContainer = styled.div`
display: flex;
flex-direction: column;
`;

const QuestCardContainer = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 20px;

animation: ${fadeIn} 0.3s ease-out;
`;