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

// 타입 정의
export interface StarCustomizationResponse {
  code: number;
  data: {
    nowSkin: string;
    nowDecoration: string;
    nowEffect: string;
    skins: string[];
    decorations: string[];
    effects: string[];
  };
}

// 별 커스터마이징 데이터 가져오기
export const fetchStarCustomization = async (): Promise<StarCustomizationResponse> => {
  const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/mypage/star`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};


export const updateStarCustomization = async (
  skin: string | null,
  decoration: string | null,
  effect: string | null
) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API_BASE_URL}/mypage/star`,
    { skin, decoration, effect }, // Request body
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
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