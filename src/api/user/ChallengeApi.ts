import axios from "axios";

// 도전 과제 데이터 타입 정의
export interface Challenge {
    challengesId: number;
    name: string;
    description: string;
    itemValue: string;
    requiredCount: number;
    challengeProgress: {
        challengeProgressId: number;
        currentCount: number;
        completed: boolean;
        receive: boolean;
    };
}

// 도전과제 리스트업 API
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

        console.log("response.data.data: ", response.data.data);

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
            `${process.env.REACT_APP_API_BASE_URL}/challenge/receive/${challengeProgressId}`,
            null, // No body needed
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Error receive challenges:", error);
        throw new Error(error.response?.data?.message);
    }
};