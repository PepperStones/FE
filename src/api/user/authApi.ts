// src/api/authApi.ts
import axios from "../axiosInstance.ts";

// 요청 Body 타입 정의
interface SignInRequest {
  userId: string;
  password: string;
}

// 응답 Body 타입 정의
interface SignInResponse {
  data: {
    userRole: string;
    accessToken: string;
    refreshToken: string;
  };
  code: number;
}

// 로그인 API 함수
export const signIn = async (
  credentials: SignInRequest
): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      "/auth/signin",
      credentials
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.data || "로그인 요청 중 오류 발생");
    }
    throw new Error("네트워크 오류");
  }
};
