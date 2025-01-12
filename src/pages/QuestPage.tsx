
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'

const progress = {
    currentProgress: 1341,
    maxProgress: 3000,
    isVariable: false
};

const Center = {
    text: "퀘스트",
};

const quests = [
    {
        id: 1,
        title: "직무별",
        subtitle: "생산성 향상",
        maxCondition: "업무 프로세스 개선 리드자",
        mediumCondition: "업무 프로세스 개선 리드자",
        progress,
        unit: "주",
        rate: null,
    },
    {
        id: 2,
        title: "리더부여",
        subtitle: "월 특근",
        maxCondition: "업무 프로세스 개선 리드자",
        mediumCondition: "업무 프로세스 개선 리드자",
        progress,
        unit: "월",
        rate: 60,
    },
    {
        id: 3,
        title: "직무별",
        subtitle: "생산성 향상",
        maxCondition: "업무 프로세스 개선 리드자",
        mediumCondition: "업무 프로세스 개선 리드자",
        progress,
        unit: "월",
        rate: null,
    },
    {
        id: 4,
        title: "리더부여",
        subtitle: "월 특근",
        maxCondition: "업무 프로세스 개선 리드자",
        mediumCondition: "업무 프로세스 개선 리드자",
        progress,
        unit: "월",
        rate: 60,
    },
];

function QuestPage() {
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleQuestClick = (quest) => {
        navigate(`/quest/${quest.id}`, { state: quest }); // quest 데이터를 state로 전달
    };

    return (

        <QuestPageContainer>
            <TopNav lefter={null} center={Center} righter={null} />

            <QuestCardContainer>
                {quests.map((quest) => (
                    <QuestCard
                        key={quest.id}
                        title={quest.title}
                        subtitle={quest.subtitle}
                        maxCondition={quest.maxCondition}
                        mediumCondition={quest.mediumCondition}
                        progress={quest.progress}
                        unit={quest.unit}
                        rate={quest.rate}
                        isMoreDetail={true}
                        onClick={() => handleQuestClick(quest)}
                    />
                ))}

                <div style={{ height: '100px' }}></div>
            </QuestCardContainer>

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
`;