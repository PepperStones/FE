
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

import TopNav from '../../components/nav/TopNav.tsx';
import FooterNav from '../../components/nav/FooterNav.tsx'
import DefaultModal from '../../components/modal/DefaultModal.tsx';
import LoadingModal from '../../components/loading/Loading.tsx'
import DefaultErrorModal from '../../components/modal/DefaultErrorModal.tsx';

import SynchronizeIcon from '../../assets/images/admin/gray_arrow_cycle.png'
import LogOutIcon from '../../assets/images/admin/gray_logout.png'

import { syncData, SyncType } from '../../api/admin/SynchronizationApi.ts';

function Setting() {
    const navigate = useNavigate();
    const Center = {
        text: "동기화",
    };

    const description = "동기화를 진행하면 최신 데이터로 업데이트됩니다.";

    const [isAllSynchroModalOpen, setIsAllSynchroModalOpen] = useState(false);
    const [isJobGroupSynchroModalOpen, setIsJobGroupSynchroModalOpen] = useState(false);
    const [isLeaderSynchroModalOpen, setIsLeaderSynchroModalOpen] = useState(false);
    const [isProjectSynchroModalOpen, setIsProjectSynchroModalOpen] = useState(false);
    const [isEvaluationSynchroModalOpen, setIsEvaluationSynchroModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isFailModalOpen, setIsFailModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const openAllSynchroModal = () => setIsAllSynchroModalOpen(true);
    const closeAllSynchroModal = () => setIsAllSynchroModalOpen(false);

    const openJobGroupSynchroModal = () => setIsJobGroupSynchroModalOpen(true);
    const closeJobGroupSynchroModal = () => setIsJobGroupSynchroModalOpen(false);

    const openLeaderSynchroModal = () => setIsLeaderSynchroModalOpen(true);
    const closeLeaderSynchroModal = () => setIsLeaderSynchroModalOpen(false);

    const openProjectSynchroModal = () => setIsProjectSynchroModalOpen(true);
    const closeProjectSynchroModal = () => setIsProjectSynchroModalOpen(false);

    const openEvaluationSynchroModal = () => setIsEvaluationSynchroModalOpen(true);
    const closeEvaluationSynchroModal = () => setIsEvaluationSynchroModalOpen(false);

    const openSuccessModal = () => setIsSuccessModalOpen(true);
    const closeSuccessModal = () => setIsSuccessModalOpen(false);

    const openFailModal = () => setIsFailModalOpen(true);
    const closeFailModal = () => setIsFailModalOpen(false);

    const openLogOutModal = () => setIsLogOutModalOpen(true);
    const closeLogOutModal = () => setIsLogOutModalOpen(false);

    const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');

        navigate('/login');
    };

    // 동기화 실행
    const handleSync = async (type: SyncType, closeModal: () => void) => {
        try {
            setIsLoading(true); // 로딩 시작
            const message = await syncData(type); // API 호출
            setErrorMessage(message);

            console.log("message: ", message);

            if (message.endsWith("완료되었습니다.")) {
                openSuccessModal();
            }
        } catch (error: any) {
            openFailModal();
        } finally {
            setIsLoading(false);
            closeModal();
        }
    };

    return (
        <MypageContainer>
            <TopNav lefter={null} center={Center} righter={null} isAdmin={true} />


            <ButtonConatainer className='text-lg-300'>
                <SettingTitle><SettingTitleIcon className='text-lg-300' src={SynchronizeIcon} />동기화</SettingTitle>
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

            <SettingDivider />

            <ButtonConatainer className='text-lg-300'>
                <SettingTitle><SettingTitleIcon className='text-lg-300' src={LogOutIcon} />로그아웃</SettingTitle>
                <SynchroButton onClick={openLogOutModal}>
                    <SynchroText>로그아웃</SynchroText>
                    <SynchroIcon className='caption-sm-200'>&gt;</SynchroIcon>
                </SynchroButton>
            </ButtonConatainer>

            <DefaultModal
                showDefaultModal={isAllSynchroModalOpen}
                title='전체 동기화를 진행하시겠습니까?'
                description={description}
                onAcceptFunc={() => handleSync("all", closeAllSynchroModal)}
                onUnacceptFunc={closeAllSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isJobGroupSynchroModalOpen}
                title='직무별 퀘스트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={() => handleSync("job", closeJobGroupSynchroModal)}
                onUnacceptFunc={closeJobGroupSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isLeaderSynchroModalOpen}
                title='리더부여 퀘스트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={() => handleSync("leader", closeLeaderSynchroModal)}
                onUnacceptFunc={closeLeaderSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isProjectSynchroModalOpen}
                title='전사 프로젝트를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={() => handleSync("project", closeProjectSynchroModal)}
                onUnacceptFunc={closeProjectSynchroModal}
            />

            <DefaultModal
                showDefaultModal={isEvaluationSynchroModalOpen}
                title='인사평가를 동기화 하시겠습니까?'
                description={description}
                onAcceptFunc={() => handleSync("evaluation", closeEvaluationSynchroModal)}
                onUnacceptFunc={closeEvaluationSynchroModal}
            />

            <LoadingModal isOpen={isLoading} />

            <DefaultErrorModal
                showDefaultErrorModal={isSuccessModalOpen}
                errorMessage='동기화가 성공적으로 완료되었습니다!'
                onAcceptFunc={closeSuccessModal}
                isSuccess={true}
            />

            <DefaultErrorModal
                showDefaultErrorModal={isFailModalOpen}
                errorMessage={errorMessage}
                onAcceptFunc={closeFailModal}
            />

            <DefaultModal
                showDefaultModal={isLogOutModalOpen}
                title="로그아웃 하시겠습니까?"
                description=""
                onAcceptFunc={handleLogOut}
                onUnacceptFunc={closeLogOutModal}
            />

            <FooterNav isAdmin={true} />
        </MypageContainer>

    );
}

export default Setting;

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

const SettingTitle = styled.div`
display: flex;
align-items: center;

padding: 0 10px;

color: var(--gray-60);
`;

const SettingTitleIcon = styled.img`
width: 16px;
height: 16px;

margin-right: 7px;
`;

const SynchroButton = styled.button`
display: flex;

border-radius: 15px;
border: none;
background: var(--black-50);

padding: 13px 20px;
`;

const SynchroText = styled.span`
display: flex;
flex: 1;

color: var(--orange-80);
`;

const SynchroIcon = styled.div`
display: flex;
justify-content: center;
align-items: center;

color: var(--gray-100);
`;

const SettingDivider = styled.div`
width: 100%;
height: 10px;

background: var(--black-30);
`;


const LogOutContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;

margin-top: 200px;
`;

const LogOut = styled.button`
border: none;
background: var(--black-20);
color: var(--gray-50);
`;