import axios from "axios";

// 동기화 타입 정의
export type SyncType = "all" | "job" | "leader" | "project" | "evaluation";

// 동기화 API 함수
export const syncData = async (type: SyncType): Promise<string> => {
  try {
    const response = await axios.get<{ code: number; message: string }>(
      `${process.env.REACT_APP_API_BASE_URL}/sync/googlesheet`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        params: { type },
      }
    );

    if (response.data.code === 200) {
      return response.data.message; // 성공 메시지 반환
    } else {
      throw new Error(response.data.message || "동기화 중 문제가 발생했습니다.");
    }
  } catch (error: any) {
    console.error("Error during synchronization:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};