// NotificationList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import backIcon from "../assets/images/left_arrow.png";
import starIcon from "../assets/images/notification/solar_star-line-duotone.png";
import pinIcon from "../assets/images/notification/pin.png";
import chartIcon from "../assets/images/notification/hugeicons_chart-evaluation.png";
import questIcon from "../assets/images/notification/hugeicons_task-01.png";
import leaderIcon from "../assets/images/notification/Vector-1.png";
import companyIcon from "../assets/images/notification/solar_buildings-linear.png";
import challengeIcon from "../assets/images/notification/chellenge.png";
import TopNav from "../components/nav/TopNav.tsx";
import AlertItem from "../components/button/AlertItem.tsx";
import {
  fetchNotifications,
  Notification,
  markNotificationAsRead,
} from "../api/user/notificationApi.ts";

interface ExtendedNotification extends Notification {
  icon: string;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const getIconByTitle = (title: string, open: boolean): string => {
    if (title.startsWith("신규 경험치")) {
      return starIcon;
    } else if (title.startsWith("신규 게시글")) {
      return pinIcon;
    } else if (title.startsWith("상반기 인사평가")) {
      return chartIcon;
    } else if (title.startsWith("하반기 인사평가")) {
      return chartIcon;
    } else if (title.startsWith("직무별")) {
      return questIcon;
    } else if (title.startsWith("리더부여")) {
      return leaderIcon;
    } else if (title.startsWith("전사")) {
      return companyIcon;
    } else if (title.startsWith("도전과제")) {
      return challengeIcon;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchNotifications();

        const updatedNotifications = data.map((data) => ({
          ...data,
          icon: getIconByTitle(data.title, data.open),
        }));

        setNotifications(updatedNotifications);
      } catch (err: any) {
        setError(err.message || "알림 데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchData();
  }, [notifications]);

  // 알림 클릭 시 확인 상태로 변경 및 페이지 이동
  const handleNotificationClick = async (id: number, title: string) => {
    if (title.startsWith("신규 경험치")) {
      navigate("/experience-point?tab=receipt");
    } else if (title.startsWith("신규 게시글")) {
      navigate("/board");
    } else if (title.startsWith("도전과제")) {
      navigate("/challenge");
    } else if (title.startsWith("직무별")) {
      navigate("/experience-point?tab=receipt");
    } else if (title.startsWith("리더부여")) {
      navigate("/experience-point?tab=receipt");
    } else if (title.startsWith("전사")) {
      navigate("/experience-point?tab=receipt");
    } else if (title.startsWith("인사평가")) {
      navigate("/mypage");
    }
    try {
      // 알림 읽음 상태로 변경
      const response = await markNotificationAsRead(id);

      // 상태 업데이트
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.pushId === response.data.pushId
            ? { ...notification, open: response.data.open }
            : notification
        )
      );
    } catch (error: any) {
      console.error("알림 클릭 처리 실패:", error.message);
      setError(error.message || "알림 상태 변경 중 오류가 발생했습니다.");
    }
  };

  const handlePageNav = () => {
    navigate("/home");
  };

  const NavItem = {
    icon: backIcon,
    iconWidth: Number(11), // 아이콘 너비 (px 단위)
    iconHeight: Number(16), // 아이콘 높이 (px 단위)
    text: "알림",
    clickFunc: handlePageNav,
  };

  return (
    <Container>
      <TopNav lefter={NavItem} center={NavItem} righter={null} />
      <Notificationlist>
        {notifications.map((notification) => (
          <AlertItem
            key={notification.pushId}
            isRead={notification.open}
            onClick={() =>
              handleNotificationClick(notification.pushId, notification.title)
            }
          >
            <NoticeContent>
              <NoticeIcon src={notification.icon}></NoticeIcon>
              <Notice>
                <NoticeHead>
                  <NotificationTitle
                    className="text-md-200"
                    isRead={notification.open}
                  >
                    {notification.title}
                  </NotificationTitle>
                  <NotificationDate
                    className="caption-sm-100"
                    isRead={notification.open}
                  >
                    {notification.createdAt}
                  </NotificationDate>
                </NoticeHead>

                <NotificationMessage
                  className="caption-md-100"
                  isRead={notification.open}
                >
                  {notification.content}
                </NotificationMessage>
              </Notice>
            </NoticeContent>
          </AlertItem>
        ))}

        <Footer className="text-sm-100">
          알림은 30일 이후 순차적으로 지워집니다
        </Footer>
      </Notificationlist>
    </Container>
  );
};

export default NotificationList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Notificationlist = styled.div`
  margin: auto;
  flex: 1;
  overflow-y: auto;
  padding-top: 20px;
  padding-bottom: 261px;
`;

const NoticeContent = styled.div`
  hight: 100%;
  display: flex;
  flex-direction: row;
  padding: 11px 14px;
  gap: 9px;
`;

const NoticeIcon = styled.img<{ src: string; isRead: boolean }>`
  width: 14px;
  height: 14px;

  aspect-ratio: 1 / 1; /* 1:1 비율 유지 */

  object-fit: contain; /* 비율 유지하며 크기 조정 */

  padding-top: 2px;
  padding-left: 2px;
  opacity: ${({ isRead }) => (isRead ? "0.5" : "1")};
`;

const NoticeHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Notice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
`;
const NotificationTitle = styled.div<{ isRead: boolean }>`
  color: var(--orange-100);
  text-align: left;
  max-width: 220px;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NotificationDate = styled.div<{ isRead: boolean }>`
  color: ${({ isRead }) => (isRead ? "var(--gray-20)" : "var(--gray-40)")};
`;
const NotificationMessage = styled.div<{ isRead: boolean }>`
  width: 303px;
  height: 32px;

  color: var(--gray-40);
  text-align: left;

  overflow: hidden;
  text-overflow: ellipsis;
`;

const Footer = styled.div`
  color: #53575b;
  text-align: center;
  justify-item: center;

  margin-top: 50px;
`;
