import axios from "../axiosInstance.ts";


// 사용자 정보 인터페이스
interface User {
  companyNum: number;
  centerName: string;
  jobName: string;
  name: string;
  level: string;
}

// 경험치 정보 인터페이스
interface Experience {
  accumulatedExperienceLastYear: number; //작년까지 누적 경험치
  totalExperienceThisYear: number; //올해 획득한 총 경험치
}

// 현재 경험치 현황 응답 인터페이스
export interface CurrentExperienceResponse {
  code: number;
  data: {
    user: User;
    experience: Experience;
  };
}

// 최근 경험치 내역 인터페이스
export interface RecentExperience {
  experience: number;
  date: string;
  questName?: string;
  projectName?: string;
}

export interface RecentExperienceResponse {
  code: number;
  data: {
    job: RecentExperience[];
    leader: RecentExperience[];
    project: RecentExperience[];
    evaluation: RecentExperience[];
  };
}

/**
 * 현재 경험치 현황 API 호출 함수
 * @returns {Promise<CurrentExperienceResponse>} API 응답 데이터
 */

export const getCurrentExperience =
  async (): Promise<CurrentExperienceResponse> => {
    try {
      const response = await axios.get<CurrentExperienceResponse>(
        `/exp/current`
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "현재 겅험치 등록 실패");
    }
  };

/**
 * 최근 경험치 내역 API 호출 함수
 * @returns {Promise<RecentExperienceResponse>} API 응답 데이터
 */
export const getRecentExperience =
  async (): Promise<RecentExperienceResponse> => {
    try {
      const response = await axios.get<RecentExperienceResponse>(`/exp/recent`);

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data || "현재 겅험치 등록 실패");
    }
  };
