
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import FooterNav from '../../components/nav/FooterNav.tsx'
import DefaultModal from '../../components/modal/DefaultModal.tsx';

function Synchronization() {
    const Center = {
        text: "동기화",
    };

    const description = "동기화를 진행하면 최신 데이터로 업데이트됩니다.";

    const [isAllSynchroModalOpen, setIsAllSynchroModalOpen] = useState(false);
    const [isJobGroupSynchroModalOpen, setIsJobGroupSynchroModalOpen] = useState(false);
    const [isLeaderSynchroModalOpen, setIsLeaderSynchroModalOpen] = useState(false);
    const [isProjectSynchroModalOpen, setIsProjectSynchroModalOpen] = useState(false);
    const [isEvaluationSynchroModalOpen, setIsEvaluationSynchroModalOpen] = useState(false);

    const openAllSynchroModal = () => {
        setIsAllSynchroModalOpen(true);
    };

    const closeAllSynchroModal = () => {
        setIsAllSynchroModalOpen(false);
    };
    
    const openJobGroupSynchroModal = () => {
        setIsJobGroupSynchroModalOpen(true);
    };

    const closeJobGroupSynchroModal = () => {
        setIsJobGroupSynchroModalOpen(false);
    };

    const openLeaderSynchroModal = () => {
        setIsLeaderSynchroModalOpen(true);
    };

    const closeLeaderSynchroModal= () => {
        setIsLeaderSynchroModalOpen(false);
    };

    const openProjectSynchroModal = () => {
        setIsProjectSynchroModalOpen(true);
    };

    const closeProjectSynchroModal = () => {
        setIsProjectSynchroModalOpen(false);
    };

    const openEvaluationSynchroModal = () => {
        setIsEvaluationSynchroModalOpen(true);
    };

    const closeEvaluationSynchroModal = () => {
        setIsEvaluationSynchroModalOpen(false);
    };

    const AllSynchro = () => {
        
        closeAllSynchroModal();
    };

    const JobGroupSynchro = () => {
        
        closeJobGroupSynchroModal();
    };

    const LeaderSynchro = () => {
        
        closeLeaderSynchroModal();
    };

    const ProjectSynchro = () => {
        
        closeProjectSynchroModal();
    };

    const EvaluationSynchro = () => {
        closeEvaluationSynchroModal();
    };

    return (
        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={null} />


            <ButtonConatainer className='text-lg-300'>
                <SynchroButton onClick={openAllSynchroModal}>
                    <SynchroText>전체 동기화</SynchroText>
                    <SynchroIcon className='caption-sm-200'>시작하기 &gt;</SynchroIcon>
                </SynchroButton>
                <SynchroButton onClick={openJobGroupSynchroModal}>
                    <SynchroText>직무별 퀘스트 동기화</SynchroText>
                    <SynchroIcon className='caption-sm-200'>시작하기 &gt;</SynchroIcon>
                </SynchroButton>
                <SynchroButton onClick={openLeaderSynchroModal}>
                    <SynchroText>리더부여 퀘스트 동기화</SynchroText>
                    <SynchroIcon className='caption-sm-200'>시작하기 &gt;</SynchroIcon>
                </SynchroButton>
                <SynchroButton onClick={openProjectSynchroModal}>
                    <SynchroText>전사 프로젝트 동기화</SynchroText>
                    <SynchroIcon className='caption-sm-200'>시작하기 &gt;</SynchroIcon>
                </SynchroButton>
                <SynchroButton onClick={openEvaluationSynchroModal}>
                    <SynchroText>인사평가 동기화</SynchroText>
                    <SynchroIcon className='caption-sm-200'>시작하기 &gt;</SynchroIcon>
                </SynchroButton>
            </ButtonConatainer>

            <DefaultModal
                showDefaultModal={isAllSynchroModalOpen}
                title='전체 동기화를 진행하시겠습니까?'
                description={description}
                onAcceptFunc={AllSynchro}
                onUnacceptFunc={closeAllSynchroModal}
            />
            
            <DefaultModal
                showDefaultModal={isJobGroupSynchroModalOpen}
                title='직무별 퀘스트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={JobGroupSynchro}
                onUnacceptFunc={closeJobGroupSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isLeaderSynchroModalOpen}
                title='리더부여 퀘스트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={LeaderSynchro}
                onUnacceptFunc={closeLeaderSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isProjectSynchroModalOpen}
                title='전사 프로젝트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={ProjectSynchro}
                onUnacceptFunc={closeProjectSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isEvaluationSynchroModalOpen}
                title='인사평가를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={EvaluationSynchro}
                onUnacceptFunc={closeEvaluationSynchroModal}
            />

            <FooterNav isAdmin={true} />
        </MypageContainer>

    );
}

export default Synchronization;

const MypageContainer = styled.div`
display: flex;
flex-direction: column;

`;

const ButtonConatainer = styled.div`
display: flex;
flex-direction: column;

gap: 20px;
padding: 20px;
`;

const SynchroButton = styled.div`
display: flex;

border-radius: 15px;
border: 1px solid var(--sub-40);
background: linear-gradient(to bottom, var(--sub-40), var(--sub-20));

padding: 13px 20px;
`;

const SynchroText = styled.span`
display: flex;
flex: 1;

color: var(--accent-80);
`;

const SynchroIcon = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--gray-70);
`;

