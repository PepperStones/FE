import axios, { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

let isInterceptorSetup = false;
let isRefreshing = false;
let failedQueue: { resolve: (value: string | PromiseLike<string>) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: Error | null, token: string | undefined = undefined): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token ?? ""); // token이 undefined일 경우 빈 문자열로 대체
    }
  });

  failedQueue = [];
};


const createAxiosResponseInterceptor = (authActions: {
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}): void => {
  axios.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      if (!error.response || error.response.status !== 401) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
            }
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const newAccessToken = await authActions.refreshAccessToken();
          if (newAccessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            }
            processQueue(null, newAccessToken);
            resolve(axios(originalRequest));
          } else {
            processQueue(new Error("Failed to refresh token"), undefined);
            authActions.logout();
            window.location.href = "/signin";
            reject(error);
          }
        } catch (err) {
          processQueue(err as Error, undefined);
          authActions.logout();
          window.location.href = "/signin";
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }
  );
};

export const setupAxiosInterceptors = (authActions: {
  refreshAccessToken: () => Promise<string | null>;
  logout: () => void;
}): void => {
  if (isInterceptorSetup) {
    return;
  }

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get("accessToken");
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
  
  createAxiosResponseInterceptor(authActions);

  isInterceptorSetup = true;
};
