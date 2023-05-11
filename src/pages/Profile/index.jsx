import classNames from "classnames/bind";
import style from "./profile.module.css";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "@/api/request";
import { Form, Input, notification } from "antd";
let cx = classNames.bind(style);

function Profile() {
  const [dataProfile, setDataProfile] = useState({});

  const [form] = Form.useForm();
  async function fetchDataProfile() {
    try {
      const response = await getRequest("/auth/profile");
      if (response.status_code === 200) {
        setDataProfile(response.data);
        form.setFieldsValue({
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
        });
      } else {
        notification.error({
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

  async function handleUpdateProfile(values) {
    try {
      const data_send = {
        name: values.name,
        address: values.address,
      };
      if (values.old_password && values.new_password) {
        let data_change_password = {
          old_password: values.old_password,
          new_password: values.new_password,
        };

        const response_change_password = await postRequest(
          "/auth/changepassword",
          data_change_password
        );
        if (response_change_password.status_code === 200) {
          notification.success({
            message: response_change_password.message,
            duration: 2,
          });
        } else {
          return notification.error({
            message: response_change_password.error_message,
            duration: 2,
          });
        }
      }
      const response = await postRequest("/auth/change-profile", data_send);
      if (response.status_code === 200) {
        notification.success({
          message: response.message,
          duration: 2,
        });
        fetchDataProfile();
      } else {
        notification.error({
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
    fetchDataProfile();
  }, []);

  return (
    <div className={cx("container", "rounded", "bg-white", "mt-5", "mb-5")}>
      <div className={cx("row")}>
        <div className={cx("col-12")}>
          <div className={cx("p-3", "py-5")}>
            <div
              className={cx(
                "d-flex",
                "justify-content-between",
                "align-items-center",
                "mb-3"
              )}
            >
              <h4 className={cx("text-right")}>Profile Settings</h4>
            </div>
            <Form
              layout="vertical"
              initialValues={{
                name: dataProfile.name,
                address: dataProfile.address,
                email: dataProfile.email,
              }}
              form={form}
              onFinish={handleUpdateProfile}
            >
              <Form.Item label="Họ và Tên" name={"name"}>
                <Input placeholder="Nhập tên" />
              </Form.Item>
              <Form.Item label="Địa chỉ" name={"address"}>
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item label="Địa chỉ email" name={"email"}>
                <Input placeholder="Nhập địa chỉ email" disabled />
              </Form.Item>
              <Form.Item label="Mật khẩu cũ" name={"old_password"}>
                <Input type="password" placeholder="Nhập mật khẩu cũ" />
              </Form.Item>
              <Form.Item label="Mật khẩu mới" name={"new_password"}>
                <Input type="password" placeholder="Nhập mật khẩu mới" />
              </Form.Item>
              <div className={cx(("row", "mt-3"))}></div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="submit"
                >
                  Save Profile
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
