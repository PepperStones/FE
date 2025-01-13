import axios from "axios";

export interface MemberListResponse {
  code: number;
  data: {
    id: number,
    name: string,
    companyNum: string,
    centerGroup: string,
    jobGroup: string
  }[];
}

// 구성원 리스트 API
export const fetchMemberList = async (): Promise<MemberListResponse> => {
  try {
    const response = await axios.get<MemberListResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/member/list`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 200) {
      return response.data; // 전체 응답 데이터를 반환
    } else {
      throw new Error(response.data.code.toString() || "구성원 리스트 갱신 중 오류가 발생했습니다.");
    }
  } catch (error: any) {
    console.error("Error during synchronization:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};

export interface MemberDetailResponse {
  code: number;
  data: {
    id: number;
    companyNum: string;
    name: string;
    joinDate: string;
    centerGroup: string;
    jobGroup: string;
    level: string;
    userId: string;
    initPassword: string;
    password: string;
  };
}

// 구성원 세부정보 API
export const fetchMemberDetail = async (userId: number): Promise<MemberDetailResponse> => {
  try {
    const response = await axios.get<MemberDetailResponse>(
      `${process.env.REACT_APP_API_BASE_URL}/member/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 200) {
      return response.data; // 성공 시 데이터 반환
    } else {
      throw new Error(response.data.data || "구성원 정보를 불러오는 데 실패했습니다.");
    }
  } catch (error: any) {
    console.error("Error fetching member detail:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};

export interface UpdateMemberRequest {
  companyNum?: string;
  name?: string;
  joinDate?: string;
  centerGroup?: string;
  jobGroup?: string;
  level?: string;
}

// 구성원 업데이트 API
export const updateMemberDetail = async (userId: number, data: UpdateMemberRequest): Promise<boolean> => {
  try {
    const response = await axios.patch<{ code: number; data: boolean }>(
      `${process.env.REACT_APP_API_BASE_URL}/member/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 200) {
      return response.data.data; // 성공 여부 반환
    } else {
      throw new Error("구성원 정보 수정 중 오류가 발생했습니다.");
    }
  } catch (error: any) {
    console.error("Error updating member detail:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};

// 구성원 삭제 API
export const deleteMemberDetail = async (userId: number): Promise<boolean> => {
  try {
    const response = await axios.delete<{ code: number; data: boolean }>(
      `${process.env.REACT_APP_API_BASE_URL}/member/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 200) {
      return true; // 성공 시 true 반환
    } else {
      throw new Error("구성원 삭제 중 오류가 발생했습니다.");
    }
  } catch (error: any) {
    console.error("Error deleting member detail:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};

export interface AddMemberRequest {
  companyNum: string;
  name: string;
  joinDate: string;
  centerGroup: string;
  jobGroup: string;
  level: string;
  userId: string;
  initPassword: string;
}

// 구성원 추가 API
export const addMember = async (data: AddMemberRequest): Promise<boolean> => {
  try {

    console.log("request data in api: ",data);
    const response = await axios.post<{ code: number; data: boolean }>(
      `${process.env.REACT_APP_API_BASE_URL}/member/add`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === 200) {
      return response.data.data; // 성공 여부 반환
    } else {
      throw new Error("구성원 추가 중 오류가 발생했습니다.");
    }
  } catch (error: any) {
    console.error("Error adding member:", error);
    throw new Error(error.response?.data?.message || "서버 에러가 발생했습니다.");
  }
};