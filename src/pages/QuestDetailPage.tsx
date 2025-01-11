
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import TopNav from '../components/nav/TopNav.tsx';
import FooterNav from '../components/nav/FooterNav.tsx'
import QuestCard from '../components/button/QuestCardBtn.tsx'
import ProgressCircle from '../components/loading/ProgressCircle.tsx';

import profileImg from '../assets/images/reward/star_skin_1.png'
import BackIcon from "../assets/images/left_arrow.png";

const progress = {
    currentProgress: 1341,
    maxProgress: 3000,
    Variation: 40,
    circleRadius : 27
};

function QuestDetailPage() {
    const navigate = useNavigate();
    const location = useLocation(); // URL에서 전달된 state 데이터 가져오기
    const quest = location.state; // 전달된 quest 데이터

    const buttons = Array.from({ length: quest.unit === '주' ? 50 : quest.unit === '월' ? 12 : 0 }); // 버튼 50개 생성
    const angleIncrement = 360 / buttons.length; // 각 버튼 간의 각도
    const radius = 700; // 원의 반지름 (버튼 배치 반경)

    const scrollContainerRef = useRef(null);
    const [dragStart, setDragStart] = useState(null);
    const rotationRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);

    // 드래그 시작
    const handleDragStart = (event) => {
        event.preventDefault();
        setIsDragging(true); // 드래그 상태 활성화
        const clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX;
        setDragStart(clientX);
    };

    // 드래그 중
    const handleDrag = (event) => {
        if (dragStart !== null) {
            event.preventDefault();
            const clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX;
            const deltaX = clientX - dragStart;
            rotationRef.current += deltaX * -0.5; // 회전값 업데이트
            setDragStart(clientX);

            if (scrollContainerRef.current) {
                scrollContainerRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
            }
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

    // 모든 기록 열람 함수
    const handleQuestClick = (quest) => {
        navigate(`/quest-all/${quest.id}`, { state: quest }); // quest 데이터를 state로 전달
    };

    const Center = {
        icon: BackIcon,
        iconWidth: 11,
        iconHeight: 16,
        text: quest.title + " 퀘스트",
        clickFunc: handleBackIconClick
    };

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

                <ViewAllButton className='text-md-300' onClick={() => handleQuestClick(quest)}>
                    <ViewAllText>모든 기록 열람</ViewAllText>
                    <ViewAllIcon className='caption-sm-200'>바로가기 &gt;</ViewAllIcon>
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
                {buttons.map((_, index) => (
                    <CircleComponent
                        key={index}
                        style={{
                            // 각 버튼을 원형으로 배치하고, 텍스트가 중심을 바라보게 설정
                            transform: `
                            rotate(${angleIncrement * index}deg) 
                            translate(0, -${radius}px) 
                        `,
                        }}
                    >
                        <ButtonContainer>
                            <ShowUnit className='caption-sm-300'>
                                {index + 1}
                                {quest.unit === '주' ? '주차' : quest.unit === '월' ? '월' : undefined}
                            </ShowUnit>
                            <ProgressCircle
                                currentProgress={progress.currentProgress}
                                maxProgress={progress.maxProgress}
                                Variation={progress.Variation}
                                circleRadius={progress.circleRadius}
                            />
                        </ButtonContainer>
                    </CircleComponent>
                ))}
            </DonutWrapper>

            <QuestDetailBottomContent>
                <ProfileSkin src={profileImg} />
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

const ViewAllButton = styled.div`
display: flex;

border-radius: 15px;
border: 1px solid var(--sub-40);
background: var(--sub-20);

padding: 13px 20px;
`;

const ViewAllText = styled.span`
display: flex;
flex: 1;

color: var(--accent-80);
`;

const ViewAllIcon = styled.div`
justify-content: center;
align-items: center;

color: var(--gray-70);
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
`;

const CenterHole = styled.div`
  position: absolute;
  width: 1400px;
  height: 1400px;
  border-radius: 50%;

  background-color: var(--bg-10); /* 도넛 배경 색 */
  clip-path: circle(150px at center) inset(75px); /* 중앙에 구멍을 만듦 */
  pointer-events: none; /* 클릭 이벤트를 아래로 전달 */
`;

const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const ShowUnit = styled.div`
display: flex;
justify-content: center;
align-items: center;

width: 50px;
border-radius: 15px;
background: var(--gray-40);

padding: 3px 10px;
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
