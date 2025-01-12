import axios from 'axios';


////////////////
// Quest List //
////////////////
export interface JobQuest {
    id: number;
    period: string;
    maxScore: number;
    mediumScore: number;
    accumulatedExperience: number;
    maxStandard?: number;
    mediumStandard?: number;
}

export interface LeaderQuest {
    id: number;
    period: string;
    accumulatedExperience: number;
    questName: string;
    maxPoints: number;
    medianPoints: number;
    maxCondition: string;
    medianCondition: string;
    weight: number;
}

export interface QuestProgressResponse {
    code: number;
    data: {
        jobQuests: JobQuest[];
        leaderQuests: LeaderQuest[];
    };
}

export const fetchQuestProgress = async (): Promise<QuestProgressResponse> => {
    try {
        const response = await axios.get<QuestProgressResponse>(
            `${process.env.REACT_APP_API_BASE_URL}/quest/progress`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch quest progress:', error);
        throw new Error(error.response?.data?.data || '퀘스트 데이터를 불러오는 데 실패했습니다.');
    }
};

//////////////////
// Quest Detail //
//////////////////
export interface QuestDetailProgress {
    week?: number;
    month?: number;
    experience: number;
}

export interface QuestDetailResponse {
    code: number;
    data: {
        type: string; // "job" or "leader"
        period: string; // "WEEKLY" or "MONTHLY"
        progress: QuestDetailProgress[];
    };
}

export const fetchQuestDetail = async (type: string, questId: number): Promise<QuestDetailResponse> => {
    try {
        const response = await axios.get<QuestDetailResponse>(
            `${process.env.REACT_APP_API_BASE_URL}/quest/detail`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    'Content-Type': 'application/json',
                },
                params: { type, questId },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch quest detail:', error);
        throw new Error(error.response?.data?.message);
    }
};