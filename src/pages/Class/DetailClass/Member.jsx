import classNames from "classnames/bind";
import style from "./peopleLearn.module.css";
import { notification } from "antd";
import { postRequest } from "@/api/request";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
let cx = classNames.bind(style);

export default function Member() {
  const [members, setMembers] = useState([]);
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  async function getListMember() {
    try {
      const data = {
        class_id: params.id,
      };
      const response = await postRequest("/class/list-member", data);
      if (response.status_code === 200) {
        setMembers(response.data);
      } else {
        notification.warning({
          message: response.message,
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  }

  useEffect(() => {
    getListMember();
  }, [params.id]);

  return (
    <div className={cx("people_content")}>
      <div className={cx("teacher")}>
        <h4>Giáo viên</h4>
        {members &&
          members.map(
            (item) =>
              item.user.role === "teacher" && (
                <div
                  className={cx("table__teacher")}
                  key={`GV-${item.user.name}`}
                >
                  <img src={item.user.avatar} alt="avatar" />
                  <h5>
                    {item.user.name}
                    {user && item.user._id === user._id && <span>(Bạn)</span>}
                  </h5>
                </div>
              )
          )}
      </div>
      <div className={cx("list__sutudent")}>
        <div className={cx("student__item")}>
          <h4>Bạn học</h4>
          <span>
            {members.filter((item) => item.user.role === "student").length}
          </span>
        </div>
        {members &&
          members.map(
            (item) =>
              item.user.role === "student" && (
                <div
                  className={cx("table__student")}
                  key={`ST-${item.user.name}`}
                >
                  <img src={item.user.avatar} alt="avatar" />
                  <h5>
                    {item.user.name}
                    {user && item.user._id === user._id && <span>(Bạn)</span>}
                  </h5>
                </div>
              )
          )}
      </div>
    </div>
  );
}
