import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../components/nav/TopNav.tsx";
import QuestRewardBtn from "../components/button/QuestRewardBtn.tsx";
import DefaultErrorModal from "../components/modal/DefaultErrorModal.tsx";
import Realistic from "../components/animation/Realistic.tsx";

import BackIcon from "../assets/images/left_arrow.png";

import { fetchChallenges, receiveChallengeReward, Challenge } from "../api/user/ChallengeApi.ts";
import { starSkinMap } from '../utils/ProfileImageUtil.ts'

function ChallengeQuest() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [startReceiveAnimation, setStartReceiveAnimation] = useState(false);

  const handleBackIconClick = () => navigate("/home");
  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const triggerReceiveAnimation = () => {
    setStartReceiveAnimation(false); // 먼저 false로 초기화
    setTimeout(() => {
      setStartReceiveAnimation(true); // 이후 true로 설정
    }, 0); // 짧은 지연 시간 추가
    setStartReceiveAnimation(false);
  };

  // 도전과제 리스트업 API
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await fetchChallenges();
        setChallenges(data); // 상태에 데이터 저장
        console.log("challenges: ", challenges);
      } catch (error) {
        console.log(error.message);
      }
    };

    loadChallenges();
  }, []);

  // 아이템 받기 Click 이벤트 처리
  const handleReceiveRewardClick = async (challengeProgressId: number) => {
    try {
      const response = await receiveChallengeReward(challengeProgressId);

      console.log("Response data:", response);

      // 성공적으로 수령한 경우 상태 업데이트
      setChallenges((prevChallenges) =>
        prevChallenges.map((challenge) =>
          challenge.challengeProgress.challengeProgressId === challengeProgressId
            ? { ...challenge, challengeProgress: { ...challenge.challengeProgress, receive: true } }
            : challenge
        )
      );

      console.log("start 폭죽 이벤트");
      triggerReceiveAnimation();
      console.log("start 성공 모달 출력");
      openSuccessModal();
    } catch (error: any) {
      console.error("Error receiving reward:", error);
      // alert(error.message || "아이템 수령에 실패했습니다.");
    }
  };

  const handleAnimationComplete = () => {
    setStartReceiveAnimation(false);
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
        <QuestTitle className="text-md-200">
          과제를 수행하고 <span className="text-lg-300">별 꾸미기 아이템</span>
          을 획득해보세요!
        </QuestTitle>

        {challenges.map((challenge) => (
          <QuestRewardBtn
            key={challenge.challengesId} // 고유한 key 값
            title={challenge.name}
            content={challenge.description}
            rewardImg={starSkinMap[challenge.itemValue]}
            isAvailable={challenge.challengeProgress.completed} // 완료되지 않은 경우 활성화
            isDone={challenge.challengeProgress.receive} // 완료 여부
            progress={{
              progressContent: `${challenge.challengeProgress.currentCount}/${challenge.requiredCount}`,
              currentProgress: challenge.challengeProgress.currentCount,
              maxProgress: challenge.requiredCount,
            }}
            onClick={() => handleReceiveRewardClick(challenge.challengeProgress.challengeProgressId)}
          />
        ))}

      </QuestContainer>

      <DefaultErrorModal
        showDefaultErrorModal={isSuccessModalOpen}
        errorMessage='도전과제 성공! 새로운 아이템을 확인해보세요!'
        onAcceptFunc={closeSuccessModal}
        isSuccess={true}
        isOverlayBlack={true}
        aboveButton={false}
      />

      <AnimationContainer><Realistic onStart={startReceiveAnimation} onComplete={handleAnimationComplete}/></AnimationContainer>


    </ChallengeQuestContainer>
  );
}

export default ChallengeQuest;

const ChallengeQuestContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    color: var(--orange-80);
  }
`;

const AnimationContainer = styled.div`
  display: flex;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  pointer-events: none; /* 클릭 이벤트 차단 */
`;