import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import TopNav from "../components/nav/TopNav.tsx";
import QuestRewardBtn from "../components/button/QuestRewardBtn.tsx";

import BackIcon from "../assets/images/left_arrow.png";
import PalmTree from "../assets/images/reward/star_deco_1.png";

import { fetchChallenges, Challenge } from "../api/user/ChallengeApi.ts";

function ChallengeQuest() {
  const navigate = useNavigate();

  const [challenges, setChallenges] = useState<Challenge[]>([]); // 도전 과제 데이터 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 도전 과제 데이터를 가져오는 함수
  useEffect(() => {
    const loadChallenges = async () => {
      try {
        setIsLoading(true);
        const data = await fetchChallenges(); 
        setChallenges(data); // 상태에 데이터 저장
        console.log("challenges: ", challenges);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadChallenges();
  }, []);

  const handleBackIconClick = () => {
    navigate("/home");
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

        {isLoading ? (
          <p>로딩 중...</p>
        ) : (
          challenges.map((challenge) => (
            <QuestRewardBtn
              key={challenge.challengesId} // 고유한 key 값
              title={challenge.name}
              content={challenge.description}
              rewardImg={PalmTree} // 보상 이미지 (임시)
              isAvailable={challenge.challengeProgress.completed} // 완료되지 않은 경우 활성화
              isDone={challenge.challengeProgress.receive} // 완료 여부
              progress={{
                progressContent: `${challenge.challengeProgress.currentCount}/${challenge.requiredCount}`,
                currentProgress: challenge.challengeProgress.currentCount,
                maxProgress: challenge.requiredCount,
              }}
              onClick={() =>
                alert(
                  challenge.challengeProgress.completed
                    ? "이미 완료된 도전 과제입니다."
                    : "도전 과제를 진행하세요!"
                )
              }
            />
          ))
        )}

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
    color: var(--gray-80);
  }
`;
