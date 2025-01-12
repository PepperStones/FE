import axios from "../axiosInstance.ts";

export interface SignInRequest {
  userId: string;
  password: string;
}

export interface SignInResponse {
    userRole: string;
    accessToken: string;
    refreshToken: string;
}

export const LoginApi = async (requestBody: SignInRequest): Promise<SignInResponse> => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signin`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Login failed:', error.response?.data || error.message);
    throw new Error(error.response?.data?.data || '로그인 요청에 실패했습니다.');
  }
};