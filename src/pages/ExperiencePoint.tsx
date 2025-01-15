//ExperiencePoint.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { formatNumberWithCommas } from "../utils/NumberWithComma.ts";
import styled from "styled-components";

import TwoButtonTopNav from "../components/nav/TwoButtonTopNav.tsx";
import BottomNav from "../components/nav/FooterNav.tsx";
import ExpModal from "../components/modal/ExpModal.tsx";

import StarImage from "../assets/images/star/real_star.png";

import {
  getCurrentExperience,
  CurrentExperienceResponse,
  getRecentExperience,
  RecentExperienceResponse,
  RecentExperience,
} from "../api/user/expApi.ts";

import BackIcon from "../assets/images/left_arrow.png";
import companyNumIcon from "../assets/images/hugeicons_id.png";
import jobNameIcon from "../assets/images/grommet-icons_group.png";
import centerNameIcon from "../assets/images/lucide_house.png";
import SpeechBubbleImage from "../assets/images/bubble_gray.png";
import taskIcon from "../assets/images/task_exp.png";
import leaderIcon from "../assets/images/leader_exp.png";
import performanceIcon from "../assets/images/hugeicons_chart-evaluation.png";
import informationIcon from "../assets/images/information_line.png";
import LevelBubble from "../assets/images/bubble_gray_2.png";
import levelData from "../constants/levels.json";

// interface User {
//   companyNum: number;
//   centerName: string;
//   jobName: string;
//   name: string;
//   level: string;
// }

// // 경험치 정보 인터페이스
// interface Experience {
//   accumulatedExperienceLastYear: number; //작년까지 누적 경험치
//   totalExperienceThisYear: number; //올해 획득한 총 경험치
// }

// // 현재 경험치 현황 응답 인터페이스
// export interface CurrentExperienceResponse {
//   code: number;
//   data: {
//     user: User;
//     experience: Experience;
//   };
// }

// // 최근 경험치 내역 인터페이스
// interface RecentExperience {
//   experience: number;
//   date: string;
//   questName?: string;
//   projectName?: string;
// }

// export interface RecentExperienceResponse {
//   code: number;
//   data: {
//     job: RecentExperience[];
//     leader: RecentExperience[];
//     project: RecentExperience[];
//     evaluation: RecentExperience[];
//   };
// }

const renderCategory = (categoryName: string, items: RecentExperience[]) => (
<div>
    {items.map((item, index) => {
      const displayName = item.projectName || item.questName || "_"; // 조건에 따라 값 결정
      let title = "";
      let icon = "";

      switch (categoryName) {
        case "Job": // projectName이 존재하는 경우
          title = "직무별 퀘스트";
          icon = taskIcon;
          break;
        case "Leader": // projectName이 존재하는 경우
          title = "리더부여 퀘스트";
          icon = leaderIcon;
          break;
        case "Project": // projectName이 존재하는 경우
          title = "전사 프로젝트 참여"!;
          icon = performanceIcon;
          break;
        case "Evaluation": // projectName이 존재하는 경우
          title = "상반기 인사평가";
          icon = leaderIcon;
          break;
      }

      return (
        <RecentExpDiv key={index}>
          <div>
            <ReceiptHead>
              <div>
                <div>
                  {" "}
                  <img src={icon} alt="" />
                  <h1 className="text-md-200">{title}</h1>
                </div>
                <p className="caption-md-100 ">
                  {displayName} {/* 결정된 값 출력 */}
                </p>
              </div>
              <p className="caption-sm-100">{item.date}</p>
            </ReceiptHead>
            <ReceiptBody className="caption-md-100"></ReceiptBody>
            <Div></Div>
            <ReceiptBottom>
              <div className="caption-sm-300">획득 경험치</div>
              <p>+ {formatNumberWithCommas(item.experience)} do</p>
            </ReceiptBottom>
          </div>
        </RecentExpDiv>
      );
    })}
  </div>
);

const ExperiencePoint: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") === "receipt" ? 1 : 0;
  const MAX_PERCENT = 100;

  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const handleOpenModal = () => setIsModalOpen(true); // 모달 열기
  const handleCloseModal = () => setIsModalOpen(false); // 모달 닫기
  const [activeTab, setActiveTab] = useState(initialTab); // 0: 현재 경험치 현황, 1: 수령 경험치 목록
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [currentExperience, setCurrentExperience] =
    useState<CurrentExperienceResponse | null>(null); // API 데이터 상태
  const [recentExperience, serRecentExperience] =
    useState<RecentExperienceResponse | null>(null); // API 데이터 상태

  useEffect(() => {
    const fetchExperience = async () => {
      setIsLoading(true);
      try {
        const responseCurrent = await getCurrentExperience();
        const responseResent = await getRecentExperience();
        setCurrentExperience(responseCurrent);
        serRecentExperience(responseResent);
      } catch (error) {
        console.error("Error fetching current experience:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExperience();
  }, []);

  const navigate = useNavigate();

  if (!currentExperience) {
    return navigate('/login');
  }

  if (!recentExperience) {
    return navigate('/login');
  }

  const totalAccumulatedExperience =
    currentExperience.data.experience.accumulatedExperienceLastYear +
    currentExperience.data.experience.totalExperienceThisYear;

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

    const cal = (current / max) * 100;
    if (cal > MAX_PERCENT) {
      return MAX_PERCENT;
    } else {
      return Math.floor(cal);
    }
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    // URL을 동기화하려면 다음 코드 추가
    const newTab = index === 1 ? "receipt" : "current";
    navigate(`/experience-point?tab=${newTab}`);
  };

  // 그룹 레벨 경험치 데이터를 저장할 배열
  const savedData: Array<{
    level: string;
    total_experience: number;
  }> = [];

  // 해당 그룹 레벨 경험치 를 저장 및 반환하는 함수
  const saveData = (
    levelString: string
  ): Array<{ level: string; total_experience: number }> => {
    const groupKey = levelString[0]; // "F1-I" → "F"

    // 그룹 데이터 가져오기
    const groupData = levelData[groupKey];

    if (!groupData) {
      throw new Error(`No data found for group ${groupKey}`);
    }

    groupData.forEach((data) => {
      savedData.push(data);
    });
    console.log("savedData : ", savedData);
    // 반환
    return savedData;
  };

  // 현재 레벨 확인 함수
  const getCurrentLevel = (
    totalExp: number,
    levelDataArray: Array<{ level: string; total_experience: number }>
  ) => {
    for (let i = levelDataArray.length - 1; i >= 0; i--) {
      if (totalExp >= levelDataArray[i].total_experience) {
        return {
          level: levelDataArray[i + 1].level,
          requiredExperience: levelDataArray[i + 1].total_experience,
        };
      }
    }

    return {
      level: levelDataArray[0].level,
      requiredExperience: levelDataArray[1].total_experience,
    };
  };

  const { level, requiredExperience } = getCurrentLevel(
    totalAccumulatedExperience,
    saveData(currentExperience.data.user.level)
  );

  const totalProgressPercent = calculateProgressPercent(
    totalAccumulatedExperience,
    requiredExperience
  );

  const yearProgressPercent = Math.floor(
    (currentExperience.data.experience.totalExperienceThisYear / 9000) * 100
  );

  const totalExperiencePercent = Math.floor(totalProgressPercent);

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
            <MyStar src={StarImage} alt="star"></MyStar>
            <MyProfile>
              <MyNameAndLevel>
                <p className="title-md-300 ">
                  {currentExperience.data.user.name}
                </p>
                <SpeechBubble>
                  <img src={SpeechBubbleImage} alt="Speech Bubble Image" />
                  <span>
                    <p className="caption-sm-300"> 나의 레벨</p>
                    <p className="caption-md-300">
                      {currentExperience.data.user.level}
                    </p>
                  </span>
                </SpeechBubble>
              </MyNameAndLevel>
              <MyInfo className="caption-sm-300 ">
                <div>
                  <img src={companyNumIcon} alt="Company Num Icon" />
                  {currentExperience.data.user.companyNum}
                </div>
                <div>
                  <img src={centerNameIcon} alt="Center Name Icon" />
                  {currentExperience.data.user.centerName}
                </div>
                <div>
                  <img src={jobNameIcon} alt="Job Name Icon" />
                  그룹 {currentExperience.data.user.jobName}
                </div>
              </MyInfo>
            </MyProfile>
          </My>

          <ExpContainer>
            <Head className="text-md-300">
              다음 레벨 까지
              <p className="text-lg-300">
                {formatNumberWithCommas(
                  requiredExperience - totalAccumulatedExperience
                )}{" "}
                do
              </p>{" "}
              남았어요!
              <img src={informationIcon} alt="" onClick={handleOpenModal}></img>
            </Head>
            <ExpModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              user={currentExperience.data.user}
            />
            <Exp>
              <div className="text-sm-200 ">
                총 누적 경험치{" "}
                <Level>
                  <img src={LevelBubble} alt="" />
                  <p className="caption-sm-300"> {level}</p>
                </Level>
              </div>
              <BarContainer>
                <BarFill progress={totalProgressPercent} />
                <Circle position={totalProgressPercent} />
              </BarContainer>
              <BarCount>
                {" "}
                <ExpNum>
                  <h1 className="text-lg-300">
                    {formatNumberWithCommas(totalAccumulatedExperience)} do
                  </h1>
                  <p className="caption-md-300">
                    / {formatNumberWithCommas(requiredExperience)}
                  </p>
                </ExpNum>
                <Percent className="text-lg-300">
                  {formatNumberWithCommas(totalExperiencePercent)}%
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
                    {formatNumberWithCommas(
                      currentExperience.data.experience.totalExperienceThisYear
                    )}{" "}
                    do
                  </h1>
                  <p className="caption-md-300">/ 중위평균 9,000</p>
                </ExpNum>
                <Percent className="text-lg-300">
                  {yearProgressPercent}%
                </Percent>
              </BarCount>
            </Exp>

            <Exp>
              <div className="text-sm-200 ">23년 누적 경험치</div>
              <BarContainer>
                <BarFill
                  progress={calculateProgressPercent(
                    currentExperience.data.experience
                      .accumulatedExperienceLastYear,
                    requiredExperience
                  )}
                />
                <Circle
                  position={calculateProgressPercent(
                    currentExperience.data.experience
                      .accumulatedExperienceLastYear,
                    requiredExperience
                  )}
                />
              </BarContainer>
              <BarCount>
                {" "}
                <ExpNum>
                  <h1 className="text-lg-300">
                    {formatNumberWithCommas(
                      currentExperience.data.experience
                        .accumulatedExperienceLastYear
                    )}{" "}
                    do
                  </h1>
                  <p className="caption-md-300">
                    / {formatNumberWithCommas(requiredExperience)}
                  </p>
                </ExpNum>
                <Percent className="text-lg-300">
                  {calculateProgressPercent(
                    currentExperience.data.experience
                      .accumulatedExperienceLastYear,
                    requiredExperience
                  )}
                  %
                </Percent>
              </BarCount>
            </Exp>
          </ExpContainer>
        </CurrentExpContainer>
      ) : (
        <div>
          {recentExperience && (
            <ReceiptExpContainer>
              {renderCategory("Job", recentExperience.data.job)}

              {renderCategory("Leader", recentExperience.data.leader)}

              {renderCategory("Project", recentExperience.data.project)}

              {renderCategory("Evaluation", recentExperience.data.evaluation)}
            </ReceiptExpContainer>
          )}
          {/* <ReceiptHead>
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
            </ReceiptBottom> */}
        </div>
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
  background: var(--black-50);

  z-index: 0; /* 텍스트 위에 표시되지 않도록 뒤로 보냄 */
`;

const MyStar = styled.img`
  width: 61px;
  height: 61px;
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
  color: var(--black-70);
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
    color: var(--orange-80);
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
  background: var(--black-50);

  margin-bottom: 15px;
  padding: 14px;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    color: var(--Grayscale-gray-90, #f7f7f7);
    margin-bottom: 9px;
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
  background-color: var(--orange-70);
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
  background-color: var(--orange-70);
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
    color: var(--orange-70);
  }
`;

const Percent = styled.span`
  color: var(--orange-70);
`;

const ReceiptExpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 20px;
`;

const RecentExpDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 353px;
  height: 107px;
  border-radius: 15px;
  background: var(--black-50);

  margin-bottom: 12px;
`;

const ReceiptHead = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 11px 14px 0 13px;
  > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
    > div {
      display: flex;
      flex-direction: row;

      gap: 9px;
      > img {
        width: 15px;
        height: 16px;
      }
      > h1 {
        color: var(--orange-100);
      }
    }
    > p {
      color: var(--Grayscale-gray-40, #999);
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

    background: var(--orange-60);

    color: var(--orange-90);
    text-align: center;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  }

  > p {
    margin-right: 14px;
    color: var(--Accent-accent-80, #e9f5fa);
  }
`;

const Level = styled.div`
  position: relative;
  width: 43px;
  height: 26px;

  > img {
    object-fit: cover; /* 이미지 크기 조정 */
    width: 100%;
    height: 100%;
  }

  > p {
    position: absolute;
    top: 40%; /* 부모 요소의 50% 지점 */
    left: 50%; /* 부모 요소의 50% 지점 */

    transform: translate(-50%, -50%); /* 중앙 정렬 */
    color: white; /* 텍스트 색상 */
    font-size: 12px; /* 텍스트 크기 */
    font-weight: bold; /* 텍스트 굵기 */
    z-index: 1; /* 텍스트를 이미지 위에 표시 */
    white-space: nowrap;

    color: var(--Primary-primary-10, #59543a);
  }
`;
