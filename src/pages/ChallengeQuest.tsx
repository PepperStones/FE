
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import QuestRewardBtn from '../components/button/QuestRewardBtn.tsx'

import BackIcon from '../assets/images/left_arrow.png'
import PalmTree from '../assets/images/reward/palm_tree.png'

const progress = {
    progressContent: "도전과제 진행률",
    currentProgress: 1341,
    maxProgress: 30000,
};

// QuestRewardBtn에 필요한 데이터 배열
const questData = [
    {
        title: '앱 둘러보기 도전!',
        content: '홈 탭에 접속해서 우리 팀 별자리를 확인해보세요!',
        rewardImg: PalmTree,
        isAvailable: true,
        isDone: false,
        progress,
    },
    {
        title: '친구 초대 도전!',
        content: '팀원 한 명을 초대해보세요!',
        rewardImg: PalmTree,
        isAvailable: false,
        isDone: false,
        progress,
    },
    {
        title: '첫 메시지 보내기!',
        content: '팀 채팅방에서 첫 메시지를 전송해보세요!',
        rewardImg: PalmTree,
        isAvailable: true,
        isDone: true,
        progress,
    },
    {
        title: '별 꾸미기 시작!',
        content: '별 꾸미기 탭에서 첫 아이템을 추가해보세요!',
        rewardImg: PalmTree,
        isAvailable: true,
        isDone: false,
        progress,
    },
    {
        title: '도전 과제 완료하기!',
        content: '모든 도전을 완료하고 보상을 받아보세요!',
        rewardImg: PalmTree,
        isAvailable: false,
        isDone: false,
        progress,
    },
];


function ChallengeQuest() {
    const navigate = useNavigate();

    const handleBackIconClick = () => {
        navigate('/home');
    };

    const NavItem = {
        icon: BackIcon,
        iconWidth: 9, // 아이콘 너비 (px 단위)
        iconHeight: 16, // 아이콘 높이 (px 단위)
        text: "도전과제",
        clickFunc: handleBackIconClick, // 클릭 시 /home으로 이동
    };

    return (

        <ChallengeQuestContainer>
            <TopNav lefter={NavItem} center={NavItem} righter={null} />

            <QuestContainer>
                <QuestTitle className='text-md-200'>과제를 수행하고 <span className='text-lg-300'>별 꾸미기 아이템</span>을 획득해보세요!</QuestTitle>

                {questData.map((quest, index) => (
                    <QuestRewardBtn
                        key={index} // 고유한 key 값
                        title={quest.title}
                        content={quest.content}
                        rewardImg={quest.rewardImg}
                        isAvailable={quest.isAvailable}
                        isDone={quest.isDone}
                        progress={quest.progress}
                        onClick={null} // 클릭 이벤트 추가 가능
                    />
                ))}

            </QuestContainer>
        </ChallengeQuestContainer>

    );
}

export default ChallengeQuest;

const ChallengeQuestContainer = styled.div`
display: flex;
flex-direction: column;

overflow: hidden;
`;

const QuestContainer = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 15px;
`;

const QuestTitle = styled.div`
color: var(--gray-60);

    span {
        color: var(--gray-80);
    }
`;