// src/api/adminBoardApi.ts
import axios from "../axiosInstance.ts";

// 게시글 데이터 타입 정의
export interface Board {
  id: number;
  centerGroup: string;
  jobGroup: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
}

// 응답 데이터 타입 정의
interface BoardListResponse {
  data: Board[];
  code: number;
}

// 게시글 목록 조회 함수
export const getBoardList = async (page: number = 0): Promise<Board[]> => {
  try {
    const response: BoardListResponse = await axios.get(`/board/admin/list`, {
      params: { page },
    });
    console.log("API Response:", response); // 응답 데이터를 확인
    // 성공 응답 처리
    if (response.code === 200) {
      return response.data; // 게시글 목록 반환
    } else {
      throw new Error(`Error Code: ${response.code}`);
    }
  } catch (error) {
    console.error("게시글 목록 조회 중 오류 발생:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};
