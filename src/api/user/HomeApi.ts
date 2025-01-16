import axios from "../axiosInstance.ts";

////////////////
// Home List //
////////////////
export interface HomeResponse {
  code: Number;
  data: {
    user: User;
    team: Team;
  };
}

export interface User {
  name: string;
  level: string;
  centerName: string;
  jobName: string;
  recentExperience: number;
  totalExperienceThisYear: number;
  skin: string;
  decoration: string;
  effect: string;
}

export interface Team {
  count: number;
  levels: string[];
}

export const fetchHome = async (): Promise<HomeResponse> => {
  try {
    const response = await axios.get<HomeResponse>(`/home`);
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch Home:", error);
    throw new Error(
      error.response?.data?.data || "홈 데이터를 불러오는 데 실패했습니다."
    );
  }
};
