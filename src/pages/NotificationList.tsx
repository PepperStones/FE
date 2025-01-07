// NotificationList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import backIcon from "../assets/images/left_arrow.png";
import starIcon from "../assets/images/solar_star-line-duotone.png";
import grayStarIcon from "../assets/images/solar_star-line-duotone_gray.png";
import TopNav from "../components/nav/TopNav.tsx";
import AlertItem from "../components/button/AlertItem.tsx";

export const notificationsMock = [
  {
    id: 1,
    title: "신규 경험치(do) 획득!",
    icon: starIcon,
    message:
      "500 do를 획득하셨습니다. 더 자세한 내용은 홈 탭 > 최근 획득 경험치에서 확인해보세요.",
    date: "2025.01.06",
    isRead: true,
  },
  {
    id: 2,
    title: "신규 게시글 등록!",
    icon: starIcon,
    message:
      "신규 게시글이 등록되었습니다. 게시판 탭에서 등록된 내용을 확인해보세요.",
    date: "2025.01.06.",
    isRead: false,
  },
  {
    id: 3,
    title: "신규 게시글 등록!",
    icon: starIcon,
    message:
      "신규 게시글이 등록되었습니다. 게시판 탭에서 등록된 내용을 확인해보세요.",
    date: "2025.01.06.",
    isRead: false,
  },
  {
    id: 4,
    title: "신규 경험치(do) 획득!",
    icon: starIcon,
    message:
      "500 do를 획득하셨습니다. 더 자세한 내용은 홈 탭 > 최근 획득 경험치에서 확인해보세요.",
    date: "2025.01.06",
    isRead: false,
  },
  {
    id: 5,
    title: "새해맞이 복권 미션 도착",
    icon: starIcon,
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 6,
    title:
      "새해맞이 복권 미션 도착ddddddddddddddddddddddddddddddddddddddddddddd",
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    icon: starIcon,
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 7,
    title: "새해맞이 복권 미션 도착",
    icon: starIcon,
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 8,
    title: "새해맞이 복권 미션 도착",
    icon: starIcon,
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석이 성공입니다! 지금 당장 눌러보세요오",
    date: "2024-12-29",
    isRead: false,
  },
  {
    id: 9,
    title: "새해맞이 복권 미션 도착",
    icon: starIcon,
    message:
      "미션 참여 중인 포도님, 누르기만 하면 2일차 출석dddddddddddddddddddddddddddddddddddddd이 성공입니다! 지금 당장 눌러보ddddddddddddddddddddddddddddd세요오",
    date: "2024-12-29",
    isRead: false,
  },
];

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState(notificationsMock);

  // 알림 클릭 시 확인 상태로 변경
  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const NavItem = {
    icon: backIcon,
    text: "알림",
    clickFunc: null,
  };

  return (
    <Container>
      <TopNav lefter={NavItem} center={NavItem} righter={null} />
      <Notification_list>
        {notificationsMock.map((notification) => (
          <AlertItem
            key={notification.id}
            isRead={notification.isRead}
            onClick={() => handleNotificationClick(notification.id)}
          >
            <NoticeContent>
              <NoticeIcon src={notification.icon}></NoticeIcon>
              <Notice>
                <NoticeHead>
                  <NotificationTitle
                    className="text-md-200"
                    isRead={notification.isRead}
                  >
                    {notification.title}
                  </NotificationTitle>
                  <NotificationDate
                    className="caption-sm-100"
                    isRead={notification.isRead}
                  >
                    {notification.date}
                  </NotificationDate>
                </NoticeHead>

                <NotificationMessage
                  className="caption-md-100"
                  isRead={notification.isRead}
                >
                  {notification.message}
                </NotificationMessage>
              </Notice>
            </NoticeContent>
          </AlertItem>
        ))}
        <Footer className="text-sm-100">
          알림은 30일 이후 순차적으로 지워집니다
        </Footer>
      </Notification_list>
    </Container>
  );
};

export default NotificationList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  height: 100vh;
`;

const Notification_list = styled.div`
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

const NoticeIcon = styled.img<{ src: string }>`
  width: 14px;
  height: 14px;
  padding-top: 2px;
  padding-left: 2px;
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
  color: ${({ isRead }) => (isRead ? "var(--gray-20)" : "var(--primary-80)")};
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

  color: ${({ isRead }) => (isRead ? "var(--gray-20)" : "var(--gray-40)")};
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
