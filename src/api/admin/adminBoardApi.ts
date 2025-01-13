// src/api/adminBoardApi.ts
import axios from "../axiosInstance.ts";

//게시글 목록 인터페이스
export interface Board {
  id: number;
  centerGroup: string;
  jobGroup: string | null;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface BoardListResponse {
  data: Board[];
  code: number;
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
  data: BoardDetail;
  code: number;
}

// 게시글 목록
export const getBoardList = async (
  page: number = 0
): Promise<BoardListResponse> => {
  try {
    const response: BoardListResponse = await axios.get(`/board/admin/list`, {
      params: { page },
    });
    console.log("API Response:", response); // 응답 데이터를 확인
    // 성공 응답 처리
    return response.data; // 게시글 목록 반환
  } catch (error) {
    console.error("게시글 목록 조회 중 오류 발생:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};

export const getBoardDetail = async (
  boardId: number
): Promise<BoardDetailResponse> => {
  try {
    const response: BoardDetailResponse = await axios.get(
      `/board/admin/${boardId}`
    );
    console.log("API Response:", response); // 응답 데이터를 확인
    // 성공 응답 처리
    return response.data; // 게시글 목록 반환
  } catch (error) {
    console.error("게시글 세부내용 조회 중 오류 발생:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};

/*게시글 삭제 인터페이스*/
interface DeleteBoardResponse {
  data: boolean; // 삭제 성공 여부
  code: number; // 상태 코드
}

export const DeleteBoard = async (
  boardId: number
): Promise<DeleteBoardResponse> => {
  try {
    const response: DeleteBoardResponse = await axios.delete(
      `/board/${boardId}`
    );
    console.log("API Response:", response); // 응답 데이터를 확인
    return response.data;
    // 성공 응답 처리
  } catch (error) {
    console.error("게시글 삭제 실패:", error);
    throw error; // 에러를 상위에서 처리하도록 던짐
  }
};

/*게시글 수정 인터페이스*/
interface PatchBoardRequest {
  centerGroup?: string;
  jobGroup?: string;
  title?: string;
  content?: string;
}

interface PatchBoardResponse {
  data: boolean;
  code: number;
}

interface ErrorResponse {
  code: number;
  data: string;
}

/**
 * 게시글 수정 API 함수
 * @param boardId - 수정할 게시글 ID
 * @param requestBody - 수정할 데이터 (Body)
 * @param token - 사용자 인증 토큰
 * @returns 수정 결과 Promise
 */

export const patchBoard = async (
  boardId: number,
  requestBody: PatchBoardRequest
): Promise<PatchBoardResponse | ErrorResponse> => {
  try {
    const url = `/board/${boardId}`;

    const response = await axios.patch(url, requestBody);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 반환된 에러 응답
      return error.response.data as ErrorResponse;
    }

    // 기타 에러 (네트워크 문제 등)
    throw new Error("An unexpected error occurred.");
  }
};

/*게시글 수정 인터페이스*/
interface AddBoardRequest {
  centerGroup?: string;
  jobGroup?: string;
  title: string;
  content: string;
}

interface AddBoardResponse {
  code: number;
  data: boolean | string;
}

/**
 * 게시글 추가 API 함수
 * @param requestBody - 게시글 데이터 (Body)
 * @param token - 사용자 인증 토큰
 * @returns 추가 결과 Promise
 */
export const addBoard = async (
  requestBody: AddBoardRequest
): Promise<AddBoardResponse> => {
  try {
    const url = `/board/add`;

    const response = await axios.post<AddBoardResponse>(url, requestBody, {});

    console.log("수정된 제목:", requestBody.title);
    console.log("수정된 내용:", requestBody.content);
    console.log("수정된 센터:", requestBody.centerGroup);
    console.log("수정된 그룹:", requestBody.jobGroup);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // 서버에서 반환된 에러 응답
      return error.response.data;
    }

    // 기타 에러 (네트워크 문제 등)
    throw new Error("An unexpected error occurred while adding the board.");
  }
};
