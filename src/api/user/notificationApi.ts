// notificationApi.ts
import axios from "../axiosInstance.ts";

// 알림 데이터 인터페이스
export interface Notification {
  pushId: number;
  title: string;
  content: string;
  createdAt: string;
  open: boolean;
}

// 알림 목록 가져오기 함수
export const fetchNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await axios.get(`/notification/list`);

    if (response.data.code === 200) {
      return response.data.data as Notification[]; // 알림 데이터 반환
    } else {
      throw new Error(
        response.data.message || "알림 데이터를 불러오는 데 실패했습니다."
      );
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "서버와의 통신 중 오류가 발생했습니다."
    );
  }
};

// 서버 응답 타입 정의
interface NotificationPatchResponse {
  code: number;
  data: {
    pushId: number;
    open: boolean;
  };
  message?: string;
}

export const markNotificationAsRead = async (
  id: number
): Promise<NotificationPatchResponse> => {
  try {
    const response = await axios.patch<NotificationPatchResponse>(
      `/notification/open`,
      null,
      {
        params: { pushId: id },
      }
    );

    if (response.data.code !== 200) {
      throw new Error(
        response.data.message || "알림 상태 변경에 실패했습니다."
      );
    }

    console.log(`Notification ${id} marked as read.`);
    return response.data;
  } catch (error: any) {
    console.error(
      error.response?.data?.message || "알림 상태 변경 중 오류가 발생했습니다."
    );
    throw new Error(
      error.response?.data?.message || "알림 상태 변경 중 오류가 발생했습니다."
    );
  }
};
