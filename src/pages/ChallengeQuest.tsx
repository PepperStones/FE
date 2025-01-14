import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../components/nav/TopNav.tsx";
import QuestRewardBtn from "../components/button/QuestRewardBtn.tsx";

import BackIcon from "../assets/images/left_arrow.png";
import PalmTree from "../assets/images/reward/star_skin_3.png";

import StarSkin1 from "../assets/images/reward/star_skin_2.png";
import StarSkin2 from "../assets/images/reward/star_skin_3.png";
import StarSkin3 from "../assets/images/reward/star_skin_4.png";
import StarSkin4 from "../assets/images/reward/star_skin_5.png";
import StarSkin5 from "../assets/images/reward/star_skin_6.png";

import { fetchChallenges, receiveChallengeReward, Challenge } from "../api/user/ChallengeApi.ts";

const rewardImageMap: Record<string, string> = {
  S1: StarSkin1,
  S2: StarSkin2,
  S3: StarSkin3,
  S4: StarSkin4,
  S5: StarSkin5,
};

function ChallengeQuest() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState<Challenge[]>([]); // 도전 과제 데이터 상태

  const handleBackIconClick = () => navigate("/home");

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

  // 아이템 받기 API
  const handleReceiveRewardClick = async (challengeProgressId: number) => {
    try {
      console.log("Sending challengeProgressId:", challengeProgressId);

      // API 호출
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

      alert("아이템을 성공적으로 수령했습니다!");
    } catch (error: any) {
      console.error("Error receiving reward:", error);
      alert(error.message || "아이템 수령에 실패했습니다.");
    }
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
            rewardImg={rewardImageMap[challenge.itemValue]} // 보상 이미지 (임시)
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
