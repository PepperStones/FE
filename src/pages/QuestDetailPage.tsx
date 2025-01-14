
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'
import ProgressCircle from '../components/loading/ProgressCircle.tsx';

import profileImg from '../assets/images/reward/star_skin_1.png'
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

function QuestDetailPage() {
    const navigate = useNavigate();
    const location = useLocation(); // URL에서 전달된 state 데이터 가져오기
    const quest = location.state;

    const [questDetails, setQuestDetails] = useState<QuestDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Fetch quest details on component mount
    useEffect(() => {
        const loadQuestDetails = async () => {
            try {
                setIsLoading(true);
                const response = await fetchQuestDetail(quest.type, Number(quest.id));
                console.log("response.data: ", response.data);
                setQuestDetails(response);
            } catch (error) {
                console.error('Error fetching quest details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadQuestDetails();
    }, []);

    // 모든 기록 열람 함수
    const handleQuestClick = (quest: JobQuest | LeaderQuest) => {
        const type = 'questName' in quest ? 'leader' : 'job';
        navigate(`/quest-all/${quest.id}`, { state: { ...quest, type } }); // quest 데이터를 state로 전달
    };

    const buttons = questDetails
        ? Array.from({ length: questDetails.data.period === "WEEKLY" ? 50 : questDetails.data.period === "MONTHLY" ? 48 : 0 }) : [];
    const angleIncrement = 360 / buttons.length; // 각 버튼 간의 각도
    const radius = 700;

    const scrollContainerRef = useRef(null);
    const [dragStart, setDragStart] = useState(null);
    const rotationRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const lastVibrationAngleRef = useRef(0);

    // 햅틱 효과
    const triggerVibration = (currentAngle: number) => {
        // Normalize the angle to be within 0-360 degrees
        const normalizedAngle = (currentAngle % 360 + 360) % 360;

        // Calculate the closest button angle
        const closestButtonAngle = Math.round(normalizedAngle / angleIncrement) * angleIncrement;

        // Trigger vibration if the rotation crosses a new button angle
        if (closestButtonAngle !== lastVibrationAngleRef.current) {
            if (navigator.vibrate) {
                navigator.vibrate(100); // Vibrate for 100ms
            }
            lastVibrationAngleRef.current = closestButtonAngle; // Update last vibration angle
        }
    };

    // 드래그 시작
    const handleDragStart = (event) => {
        setIsDragging(true); // 드래그 상태 활성화
        const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
        setDragStart(clientX);
    };

    // 드래그 중
    const handleDrag = (event) => {
        if (dragStart !== null) {
            const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
            const deltaX = clientX - dragStart;
            rotationRef.current += deltaX * -0.5; // 회전값 업데이트
            setDragStart(clientX);

            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
            }
            triggerVibration(rotationRef.current);
        }
    };

    // 드래그 종료
    const handleDragEnd = () => {
        setIsDragging(false); // 드래그 상태 비활성화
        setDragStart(null);
    };

    // 스크롤 방지 로직
    useEffect(() => {
        const preventScroll = (event) => {
            if (isDragging) {
                event.preventDefault(); // 기본 스크롤 동작 차단
            }
        };

        // 전역 이벤트 리스너 추가
        document.addEventListener('touchmove', preventScroll, { passive: false });
        document.addEventListener('wheel', preventScroll, { passive: false });

        return () => {
            // 컴포넌트 언마운트 시 리스너 제거
            document.removeEventListener('touchmove', preventScroll);
            document.removeEventListener('wheel', preventScroll);
        };
    }, [isDragging]);

    // 뒤로가기 클릭 함수
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

    return (

        <QuestDetailPageContainer>
            <TopNav lefter={Center} center={Center} righter={null} />

            <QuestDetailTopContent className='no-drag'>
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
                        unit={quest.period === 'MONTHLY' ? '월' : '주'}
                        rate={null}
                        isMoreDetail={false}
                        onClick={() => handleQuestClick(quest)}
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
                        unit={quest.period === 'MONTHLY' ? '월' : '주'}
                        rate={quest.weight}
                        isMoreDetail={false}
                        onClick={() => handleQuestClick(quest)}
                    />
                )}

                <ViewAllButton className='text-md-300' onClick={() => handleQuestClick(quest)}>
                    <ViewAllText>모든 기록 열람</ViewAllText>
                    <ViewAllIcon className='caption-sm-200'>바로가기 &gt;</ViewAllIcon>

                    <MaxMinDescription className='caption-sm-200 no-drag n-pointer'>
                        <MaxPoint>Max</MaxPoint>
                        <MinPoint>Medium</MinPoint>
                    </MaxMinDescription>
                </ViewAllButton>


            </QuestDetailTopContent>

            <DonutWrapper
                ref={scrollContainerRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDrag}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
                onTouchStart={handleDragStart}
                onTouchMove={handleDrag}
                onTouchEnd={handleDragEnd}
                style={{
                    transform: `rotate(${rotationRef.current}deg)`,
                    cursor: isDragging ? 'grabbing' : 'grab',
                }}
            >
                <CenterHole />
                {buttons.map((_, index) => {
                    const unit = questDetails?.data.period === 'WEEKLY' ? index + 1 : index % 12 + 1;
                    const questData = questDetails?.data.questList.find((quest) => quest.unit === unit);

                    const currentProgress = (questData?.experience / (quest.maxScore || quest.maxPoints)) * 100;

                    return (
                        <CircleComponent
                            key={index}
                            style={{
                                // Arrange each button in a circular layout
                                transform: `
                    rotate(${angleIncrement * index}deg) 
                    translate(0, -${radius}px)
                `,
                            }}
                        >
                            <ButtonContainer className="no-drag">
                                <ShowUnit className="caption-sm-300">
                                    {questDetails?.data.period === 'WEEKLY' ? `${index + 1}주차` : `${index % 12 + 1}월`}
                                </ShowUnit>
                                <ProgressCircle
                                    currentProgress={currentProgress || null}
                                    maxProgress={quest.maxScore || quest.maxPoints}
                                    Variation={questData?.experience || null}
                                    circleRadius={27}
                                    isQuestDetail={true}
                                />
                            </ButtonContainer>
                        </CircleComponent>
                    );
                })}
            </DonutWrapper>

            <QuestDetailBottomContent>
                <ProfileSkin className='no-drag n-pointer' src={profileImg} />
            </QuestDetailBottomContent>

            <FooterNav />
        </QuestDetailPageContainer >

    );
}

export default QuestDetailPage;

const QuestDetailPageContainer = styled.div`
display: flex;
flex-direction: column;

overflow: hidden; /* 화면 밖으로 나가는 부분을 숨김 */
position: relative; /* DonutWrapper의 위치를 제한 */
`;

const QuestDetailTopContent = styled.div`
display: flex;
flex-direction: column;

padding: 20px;
gap: 20px
`;

const ViewAllButton = styled.button`
display: flex;
position: relative;

border-radius: 15px;
border: none;
background: var(--black-50);

padding: 13px 20px;

animation: ${fadeIn} 0.5s ease-in-out;
`;

const ViewAllText = styled.span`
display: flex;
flex: 1;

color: var(--gray-100);
`;

const ViewAllIcon = styled.div`
justify-content: center;
align-items: center;

color: var(--gray-70);
`;

const MaxMinDescription = styled.div`
  position: absolute;
  top: calc(100% + 38px); /* 버튼 아래로 8px 떨어진 위치 */
  left: 51%;
  transform: translateX(-50%);
  z-index: 100;

  width: auto;

  padding: 10px;

  color: var(--gray-100);
`;

const MaxPoint = styled.div`
margin-bottom: 65px;
`;

const MinPoint = styled.div`

`;

const QuestDetailBottomContent = styled.div`
display: flex;
justify-content: center;
align-items: center;

flex-grow: 1; /* 상단과 하단 영역의 균형 유지 */
overflow: hidden; /* 내용이 초과되지 않도록 숨김 */
`;

const ProfileSkin = styled.img`
width: 410px;
height: 410px;

margin-top: 135px;

z-index: 20;

animation: ${fadeIn} 0.5s ease-in-out;
`;

const DonutWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute; /* 페이지 내 특정 위치에 고정 */
top: 40%;
left: -140%;
transform: translate(-50%, -50%);

  width: 1500px;
  height: 1500px;
  border-radius: 50%;

  z-index: 10; /* 다른 컴포넌트보다 위에 배치 */
  overflow: hidden; /* 내부 요소가 튀어나오지 않도록 설정 */

  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CenterHole = styled.div`
  position: absolute;
  width: 1400px;
  height: 1400px;
  border-radius: 50%;

  background-color: var(--black-20); /* 도넛 배경 색 */
  clip-path: circle(150px at center) inset(75px); /* 중앙에 구멍을 만듦 */
  pointer-events: none; /* 클릭 이벤트를 아래로 전달 */
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

gap: 5px;
`;

const ShowUnit = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 50px;
border-radius: 15px;
background: var(--gray-40);

padding: 3px 5px;
margin-bottom: 10px;

color: var(--gray-0);
`;

const CircleComponent = styled.div`
    position: absolute;
    transform-origin: center; /* 회전 중심 설정 */

    width: 40px; /* 버튼 크기 */
    height: 40px; /* 버튼 크기 */
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
`;
