import axios from "../axiosInstance.ts";

/*register*/
interface RegisterTokenQuery {
  token: string; // FCM 토큰
}
interface RegisterTokenResponse {
  code: number;
  message: string;
}

/*list*/
interface SendNotificationResponse {
  success: boolean;
  message?: string;
  error?: string;
}

/*open*/

// FCM 토큰 등록 API 함수
export const registerFcmToken = async (
  token: string
): Promise<RegisterTokenResponse> => {
  try {
    const response = await axios.post<RegisterTokenResponse>(
      "/notification/register",
      null, // Body가 필요 없으므로 null
      {
        params: { token },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "FCM 토큰 등록 중 오류 발생:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || "FCM 토큰 등록 실패");
  }
};

export const sendNotification = async (
  title: string,
  body: string,
  token: string
): Promise<SendNotificationResponse> => {
  try {
    const response = await axios.post<SendNotificationResponse>(
      `${SERVER_URL}/notification/send`,
      { title, body, token },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Notification sending 오류:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data || "Notification sending 오류");
  }
};
