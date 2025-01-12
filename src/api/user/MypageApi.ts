import axios from "axios";

export interface MypageInfoResponse {
    code: number;
    data: {
        id: number;
        name: string;
        companyNum: string;
        centerGroup: string;
        joinDate: string;
        level: string;
        evaluationPeriod: string;
        grade: string;
        experience: number;
    };
}

export interface StarCustomizationResponse {
    code: number;
    data: {
        skin: string;
        decoration: string;
        effect: string;
    };
}

export interface UpdateStarCustomizationResponse {
    code: number;
    data: {
      starImg: string; // URL of the updated star image
    };
  }

export interface ChangePasswordResponse {
    code: number;
    data: boolean | string; // `true` for success, error message string for failure
}

export const fetchMyInfo = async (): Promise<MypageInfoResponse> => {
    try {
        const response = await axios.get<MypageInfoResponse>(`${process.env.REACT_APP_API_BASE_URL}/mypage/info`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Failed to fetch my info:", error);
        throw new Error(error.response?.data?.data || "나의 정보를 불러오는 데 실패했습니다.");
    }
};

export const fetchStarCustomization = async (): Promise<StarCustomizationResponse> => {
    try {
        const response = await axios.get<StarCustomizationResponse>(`${process.env.REACT_APP_API_BASE_URL}/mypage/star`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Failed to fetch star customization:', error);
        throw new Error(error.response?.data?.data || '별 커스터마이징 데이터를 불러오는 데 실패했습니다.');
    }
};

// Update star customization
export const updateStarCustomization = async (
    skin?: string,
    decoration?: string,
    effect?: string
  ): Promise<UpdateStarCustomizationResponse> => {
    try {
      const response = await axios.patch<UpdateStarCustomizationResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/mypage/star`,
        { skin, decoration, effect },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Failed to update star customization:', error);
      throw new Error(error.response?.data?.data || '별 커스터마이징 업데이트에 실패했습니다.');
    }
  };

export const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ): Promise<ChangePasswordResponse> => {
    try {
      const response = await axios.patch<ChangePasswordResponse>(
        `${process.env.REACT_APP_API_BASE_URL}/mypage/update`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error('Failed to change password:', error);
      throw new Error(error.response?.data?.data || '비밀번호 변경에 실패했습니다.');
    }
  };