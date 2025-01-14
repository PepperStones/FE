import axios from "axios";

// 도전 과제 데이터 타입 정의
export interface Challenge {
    challengesId: number;
    name: string;
    description: string;
    requiredCount: number;
    challengeProgress: {
        challengeProgressId: number;
        currentCount: number;
        completed: boolean;
        receive: boolean;
    };
}

// API 호출 함수
export const fetchChallenges = async (): Promise<Challenge[]> => {
    try {
        const response = await axios.get<{ code: number; data: Challenge[] }>(
            `${process.env.REACT_APP_API_BASE_URL}/challenge/list`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.code !== 200) {
            throw new Error("도전 과제 데이터를 불러오는 데 실패했습니다.");
        }

        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching challenges:", error);
        throw new Error(error.response?.data?.message);
    }
};

export const receiveChallengeReward = async (challengeProgressId: number) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/challenge/receive`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Replace with your token logic
            'Content-Type': 'application/json',
          },
          params: {
            challengeProgressId,
          },
        }
      );
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to receive reward.');
    }
  };