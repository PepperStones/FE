// src/api/boardApi.ts
import axios from "../axiosInstance.ts";

//게시글 목록 인터페이스
export interface Board {
  id: number;
  centerGroup: string;
  jobGroup: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface BoardListResponse {
  data: { code: number; data: Board[] };
}

// 게시글 세부 인터페이스
export interface BoardDetail {
  id: number;
  centerGroup: string;
  jobGroup: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

interface BoardDetailResponse {
  data: {
    data: BoardDetail;
    code: number;
  };
}

// 게시글 목록
export const getBoardList = async (page: number = 0): Promise<Board[]> => {
  try {
    const response: BoardListResponse = await axios.get(`/board/list`, {
      params: { page },
    });
    console.log("API Response:", response.data); // 응답 데이터를 확인
    // 성공 응답 처리
    if (response.data.code === 200) {
      return response.data.data; // 게시글 목록 반환
    } else {
      throw new Error(`Error Code: ${response.data.code}`);
    }
  } catch (error) {
    console.error("게시글 목록 조회 중 오류 발생:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};

export const getBoardDetail = async (boardId: number): Promise<BoardDetail> => {
  try {
    const response: BoardDetailResponse = await axios.get(`/board/${boardId}`);
    console.log("API Response:", response); // 응답 데이터를 확인
    // 성공 응답 처리
    if (response.data.code === 200) {
      return response.data.data; // 게시글 목록 반환
    } else {
      throw new Error(`Error Code: ${response.data.code}`);
    }
  } catch (error) {
    console.error("게시글 세부내용 조회 중 오류 발생:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};
