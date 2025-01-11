//ExperiencePoint.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import styled from "styled-components";

import TwoButtonTopNav from "../components/nav/TwoButtonTopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";
import ExpModal from "../components/modal/ExpModal.tsx";

import BackIcon from "../assets/images/left_arrow.png";
import companyNumIcon from "../assets/images/hugeicons_id.png";
import jobNameIcon from "../assets/images/grommet-icons_group.png";
import centerNameIcon from "../assets/images/lucide_house.png";
import SpeechBubbleImage from "../assets/images/speech_bubble_1.png";
import taskIcon from "../assets/images/task_exp.png";
import leaderIcon from "../assets/images/leader_exp.png";
import performanceIcon from "../assets/images/hugeicons_chart-evaluation.png";
import informationIcon from "../assets/images/information_line.png";

export const myMock = [
  {
    code: 200,
    data: {
      user: {
        companyNum: 12345,
        centerName: "음성 2센터",
        jobName: "직무그룹1",
        name: "홍길동",
        level: "F1-Ⅱ",
      },
      experience: {
        nextLevelRequiredExperience: 27000, //다음 레벨 달성에 필요한 총 경험치
        accumulatedExperienceLastYear: 20000, //작년까지 누적 경험치
        totalExperienceThisYear: 5000, //올해 획득한 총 경험치
      },
    },
  },
];

const ExperiencePoint: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") === "receipt" ? 1 : 0;

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleOpenModal = () => setIsModalOpen(true); // 모달 열기
  const handleCloseModal = () => setIsModalOpen(false); // 모달 닫기

  const [activeTab, setActiveTab] = useState(initialTab); // 0: 현재 경험치 현황, 1: 수령 경험치 목록

  const navigate = useNavigate();
  const totalAccumulatedExperience =
    myMock[0].data.experience.accumulatedExperienceLastYear +
    myMock[0].data.experience.totalExperienceThisYear;
  const handleBackIconClick = () => {
    navigate("/home");
  };

  const NavItem = {
    icon: BackIcon,
    iconWidth: Number(11),
    iconHeight: Number(16),
    text: "경험치",
    clickFunc: handleBackIconClick,
  };

  const calculateProgressPercent = (current: number, max: number) => {
    if (max === 0) return 0; // Avoid division by zero
    return (current / max) * 100;
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // URL을 동기화하려면 다음 코드 추가
    const newTab = index === 1 ? "receipt" : "current";
    navigate(`/experience-point?tab=${newTab}`);
  };

  const totalProgressPercent = calculateProgressPercent(
    totalAccumulatedExperience,
    myMock[0].data.experience.nextLevelRequiredExperience
  );
  const yearProgressPercent = calculateProgressPercent(
    myMock[0].data.experience.totalExperienceThisYear,
    9000
  );

  const totalExperiencePercent = Math.floor(totalProgressPercent);

  const yearExperiencePercent = Math.floor(yearProgressPercent);

  return (
    <div>
      <TwoButtonTopNav
        lefter={NavItem}
        center={NavItem}
        righter={null}
        activeTab={activeTab} // activeTab 전달
        onTabChange={handleTabChange} // 탭 변경 핸들러 전달
      />
      {activeTab === 0 ? (
        <CurrentExpContainer>
          <My>
            <MyStar></MyStar>
            <MyProfile>
              <MyNameAndLevel>
                <p className="title-md-300 ">{myMock[0].data.user.name}</p>
                <SpeechBubble>
                  <img src={SpeechBubbleImage} alt="Speech Bubble Image" />
                  <span>
                    <p className="caption-sm-300"> 나의 레벨</p>
                    <p className="caption-md-300">
                      {myMock[0].data.user.level}
                    </p>
                  </span>
                </SpeechBubble>
              </MyNameAndLevel>
              <MyInfo className="caption-sm-300 ">
                <div>
                  <img src={companyNumIcon} alt="Company Num Icon" />
                  {myMock[0].data.user.companyNum}
                </div>
                <div>
                  <img src={centerNameIcon} alt="Center Name Icon" />
                  {myMock[0].data.user.centerName}
                </div>
                <div>
                  <img src={jobNameIcon} alt="Job Name Icon" />
                  {myMock[0].data.user.jobName}
                </div>
              </MyInfo>
            </MyProfile>
          </My>

          <ExpContainer>
            <Head className="text-md-300">
              다음 레벨 까지<p className="text-lg-300">7000 do</p> 남았어요!
              <img src={informationIcon} alt="" onClick={handleOpenModal}></img>
            </Head>
            <ExpModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <Exp>
              <div className="text-sm-200 ">총 누적 경험치</div>
              <BarContainer>
                <BarFill progress={totalProgressPercent} />
                <Circle position={totalProgressPercent} />
              </BarContainer>
              <BarCount>
                {" "}
                <ExpNum>
                  <h1 className="text-lg-300">
                    {totalAccumulatedExperience} do
                  </h1>
                  <p className="caption-md-300">
                    / {myMock[0].data.experience.nextLevelRequiredExperience}
                  </p>
                </ExpNum>
                <Percent className="text-lg-300">
                  {totalExperiencePercent}%
                </Percent>
              </BarCount>
            </Exp>
            <Exp>
              <div className="text-sm-200 ">올해 획득 경험치</div>
              <BarContainer>
                <BarFill progress={yearProgressPercent} />
                <Circle position={yearProgressPercent} />
              </BarContainer>
              <BarCount>
                {" "}
                <ExpNum>
                  <h1 className="text-lg-300">
                    {myMock[0].data.experience.totalExperienceThisYear} do
                  </h1>
                  <p className="caption-md-300">/ {9000}</p>
                </ExpNum>
                <Percent className="text-lg-300">
                  {yearExperiencePercent}%
                </Percent>
              </BarCount>
            </Exp>
            <LastYearExp>
              <p className="text-sm-200"> 23년 누적 경험치 </p>

              <span className="text-lg-300 ">
                {" "}
                {myMock[0].data.experience.accumulatedExperienceLastYear} do
              </span>
            </LastYearExp>
          </ExpContainer>
        </CurrentExpContainer>
      ) : (
        <ReceiptExpContainer>
          <div>
            <ReceiptHead>
              <div>
                <img src={taskIcon} alt=""></img>
                <h1 className="text-md-200">직무별 퀘스트</h1>
              </div>

              <p className="caption-sm-100">2025.01.06</p>
            </ReceiptHead>
            <ReceiptBody className="caption-md-100">
              AAA 프로젝트 기획안 업로드{" "}
            </ReceiptBody>
            <Div></Div>
            <ReceiptBottom>
              <div className="caption-sm-300">획득 경험치</div>
              <p>+ 3,000 do</p>
            </ReceiptBottom>
          </div>
          <div>
            <ReceiptHead>
              <div>
                <img src={leaderIcon} alt=""></img>
                <h1 className="text-md-200">리더부여 퀘스트</h1>
              </div>

              <p className="caption-sm-100">2025.01.06</p>
            </ReceiptHead>
            <ReceiptBody className="caption-md-100">월 특근하기 </ReceiptBody>
            <Div></Div>
            <ReceiptBottom>
              <div className="caption-sm-300">획득 경험치</div>
              <p>+ 3,000 do</p>
            </ReceiptBottom>
          </div>
          <div>
            <ReceiptHead>
              <div>
                <img src={performanceIcon} alt=""></img>
                <h1 className="text-md-200">상반기 인사평가</h1>
              </div>

              <p className="caption-sm-100">2025.01.06</p>
            </ReceiptHead>
            <ReceiptBody className="caption-md-100">
              상반기 인사평가 S등급{" "}
            </ReceiptBody>
            <Div></Div>
            <ReceiptBottom>
              <div className="caption-sm-300">획득 경험치</div>
              <p>+ 4,500 do</p>
            </ReceiptBottom>
          </div>
        </ReceiptExpContainer>
      )}
    </div>
  );
};

export default ExperiencePoint;

const CurrentExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;

  gap: 20px;
`;

const My = styled.div`
  width: 353px;
  height: 99px;

  display: flex;
  flex-direction: row;

  padding: 19px 25px;
  gap: 25px;

  border-radius: 15px;
  background: var(--sub-20);

  z-index: 0; /* 텍스트 위에 표시되지 않도록 뒤로 보냄 */
`;

const MyStar = styled.div`
  width: 61px;
  height: 61px;
  border: 1px solid var(--accent-40);
`;

const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const MyNameAndLevel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 10px;
  width: fit-content; /* 컨텐츠 크기에 맞게 자동으로 조절 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */

  p {
    color: var(--gray-80);
    line-height: 20px; /* 텍스트 높이와 말풍선 이미지 높이 일치 */
  }
`;

const SpeechBubble = styled.div`
  display: flex;
  align-items: center;

  position: relative;

  justify-content: right;
  color: var(--sub-20);
  position: relative;
  padding-top: 4px;
  padding-bottom: 4px;
  width: fit-content; /* 컨텐츠 크기에 맞게 자동으로 조절 */

  > img {
    height: 20px; /* 높이는 고정 */
    width: 100%; /* 텍스트에 맞게 가로 크기 조정 */
    object-fit: contain; /* 텍스트 길이에 맞게 이미지를 축소/확대 */
    position: absolute; /* 텍스트와 이미지가 겹치도록 설정 */
    z-index: 0; /* 텍스트 위에 표시되지 않도록 뒤로 보냄 */
  }

  > span {
    display: flex;
    flex-direction: row;
    gap: 5px;

    position: relative; /* 텍스트 위치 고정 */
    pointer-events: none;
    padding-right: 10px; /* 텍스트 양쪽 여백 */
    padding-left: 15px;

    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    z-index: 1; /* 텍스트가 이미지 위에 보이도록 설정 */

    > p {
      color: var(--sub-20);
    }
  }
`;

const MyLevel = styled.img``;

const MyInfo = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center; /* 수직 가운데 정렬 */

  color: var(--Grayscale-gray-80, #efefef);
  gap: 13px;

  div {
    display: flex;
    flex-direction: row;
    text-align: center;
    gap: 5px;
  }

  img {
    width: 12px;
    height: 13px;
    flex-shrink: 0;
  }
`;

const ExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Head = styled.div`
  color: var(--Grayscale-gray-100, #fafafa);
  display: flex;
  flex-direction: row;
  // border: 1px solid var(--accent-40);
  gap: 4px;
  align-items: center;

  margin-bottom: 10px;

  > p {
    color: var(--primary-primary-70-main, #fff0a5);
  }
  > img {
    width: 18px;
    height: 18px;
  }
`;
const Exp = styled.div`
  width: 100%;
  height: 98px;
  border-radius: 15px;
  background: var(--Sub-sub-20, #262d46);

  margin-bottom: 15px;
  padding: 14px;

  > div {
    color: var(--Grayscale-gray-90, #f7f7f7);
    margin-bottom: 14px;
  }
`;
const LastYearExp = styled.div`
  display: flex;
  flex-direction: row;

  padding: 13px 14px;
  border-radius: 15px;
  background: var(--Sub-sub-20, #262d46);
  justify-content: space-between;
  align-items: center;

  > p {
    color: var(--gray-90);
  }
  > span {
    color: var(--primary-70);
    text-align: right;
  }
`;

const BarContainer = styled.div`
  position: relative;

  width: 100%;
  height: 9px; /* 게이지 바 높이 */
  border-radius: 13px; /* 게이지 바 radius */
  background: var(--gray-20);
  margin-bottom: 11px;
`;

const BarCount = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;

const BarFill = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 9px;
  background: var(--primary-70);
  border-radius: 13px; /* 모서리 둥글게 */

  transition: width 0.3s ease; /* 애니메이션 효과 */
`;

const Circle = styled.div<{ position: number }>`
  position: absolute;
  left: ${({ position }) => `calc(${position}% - 10px)`};
  top: 50%; /* 세로 중앙 정렬 */
  transform: translateY(-50%); /* 세로 중앙 정렬 */
  transition: all 0.3s ease; /* 애니메이션 효과 */

  width: 13px;
  height: 13px;
  background-color: var(--primary-70);
  border: none;
  border-radius: 50%; /* 원형 */
`;

const ExpNum = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: baseline; /* 텍스트 베이스라인 정렬 */

  text-align: center;

  color: var(--Grayscale-gray-40, #999);
  > h1 {
    color: var(--primary-70);
  }
`;

const Percent = styled.span`
  color: var(--primary-70);
`;

const ReceiptExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  padding: 20px;

  gap: 15px;

  > div {
    width: 100%;
    height: 107px;
    border-radius: 15px;
    background: var(--Sub-sub-20, #262d46);

    display: flex;
    flex-direction: column;
  }
`;

const ReceiptHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 7px;
  padding: 11px 14px 0 13px;
  > div {
    display: flex;
    flex-direction: row;
    gap: 9px;
    > img {
      width: 15px;
      height: 16px;
    }
    > h1 {
      color: var(--Primary-primary-80, #fffae3);
    }
  }

  > p {
    color: var(--Grayscale-gray-40, #999);
  }
`;

const ReceiptBody = styled.div`
  color: var(--Grayscale-gray-40, #999);
  margin-bottom: 11px;
  padding-left: 13px;
`;

const Div = styled.div`
  margin: 0 5px;
  margin-bottom: 11px;

  height: 0.5px;

  background: #474747;
`;
const ReceiptBottom = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 13px;
  justify-content: space-between;
  > div {
    width: 66px;
    height: 22px;
    padding: 3px 10px;
    align-items: center;
    border-radius: 15px;
    border: 1px solid var(--Accent-accent-40, #89a7b4);
    background: var(--Accent-accent-80, #e9f5fa);

    color: var(--Accent-accent-10, #404e54);
    text-align: center;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  }

  > p {
    margin-right: 14px;
    color: var(--Accent-accent-80, #e9f5fa);
  }
`;
