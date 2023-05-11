import { notification } from "antd";

export function noti(type, message) {
  return notification[type]({
    message,
    duration: 2,
  });
}
