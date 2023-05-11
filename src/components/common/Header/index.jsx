import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Popover, notification } from "antd";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import LOGO from "@/assets/images/logo.jpg";
import { HeaderWrapper } from "./styles";
import BaseModal from "@/components/BaseModal";
import { useState } from "react";
import FormJoinClass from "@/components/Class/FormJoinClass";
import FormCreateClass from "@/components/Class/FormCreateClass";
import { postRequest } from "@/api/request";
let cx = classNames.bind(style);

export default function Header() {
  const [isCreateClass, setIsCreateClass] = useState(false);
  const [isJoinClass, setIsJoinClass] = useState(false);
  const [joinId, setJoinId] = useState("");
  const navi = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleJoinClassCode = async () => {
    try {
      const data = {
        class_code: joinId,
      };
      const response = await postRequest("/class/join", data);
      if (response.status_code === 200) {
        notification.success({
          message: "Join class success",
          duration: 2,
        });
        setJoinId("");
        setIsJoinClass(false);
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
  };

  const handleCreateClass = async (data) => {
    try {
      const DATA = {
        class_name: data.class_name,
        description: data.description,
        topic: data.topic,
      };

      const res = await postRequest("/class/create", DATA);
      if (res.status_code === 200) {
        notification.success({
          message: "Create class success",
          duration: 2,
        });
      } else {
        notification.error({
          message: res.message,
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navi("/login");
  };

  const content = (
    <div className={cx("menu_header")}>
      <ul>
        <li>
          <UserOutlined />
          <Link to={"/profile"}> Profile</Link>
        </li>
        {(user && user.role === "teacher") ||
          (user.role === "student" && (
            <li
              onClick={() => {
                navi("/my-class");
              }}
            >
              <UserOutlined />
              <Link> Lớp học của tôi</Link>
            </li>
          ))}

        <li
          onClick={() => {
            handleLogout();
          }}
        >
          <LogoutOutlined />
          <Link>Logout</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <HeaderWrapper
      className="site-navbar py-4 js-sticky-header site-navbar-target"
      role="banner"
    >
      <div className="px-5">
        <div className="d-flex align-items-center">
          <div className="site-logo">
            <a href="/" className="d-block">
              <img src={LOGO} alt="logo" className="img-fluid" />
            </a>
          </div>
          <div className="mr-auto">
            <nav
              className="site-navigation position-relative text-right"
              role="navigation"
            >
              <ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
                <li className="active">
                  <a href="/" className="nav-link text-left">
                    Home
                  </a>
                </li>
                {user && user.role !== "student" && (
                  <li className="has-children">
                    <span href="about.html" className="nav-link text-left">
                      Quản lý
                    </span>
                    <ul className="dropdown">
                      {user && user.role === "admin" && (
                        <li>
                          <Link style={{ fontSize: 14 }} to="/manage-account">
                            Quản lý tài khoản
                          </Link>
                        </li>
                      )}
                      <li>
                        <Link style={{ fontSize: 14 }} to="/manage-class">
                          Quản lý lớp học
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
                <li className="active" style={{ marginRight: 20 }}>
                  {user && user.role === "student" && (
                    <Button onClick={() => setIsJoinClass(true)}>
                      Tham gia lớp học
                    </Button>
                  )}
                </li>
                <li className="has-children" style={{ marginRight: 100 }}>
                  <span href="about.html" className="nav-link text-left">
                    Blog
                  </span>
                  <ul className="dropdown">
                    <li>
                      <Link style={{ fontSize: 14 }} to="/my-blog">
                        My blog
                      </Link>
                    </li>
                    <li>
                      <Link style={{ fontSize: 14 }} to="/blog">
                        View blog
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className={cx("ml-auto", "avatar_user")}>
            <img src={user && user.avatar ? user.avatar : LOGO} alt="avatar" />
            <div>
              <Popover
                className={cx("over_avatar")}
                placement="bottomRight"
                content={content}
              >
                <Button>{user && user.name}</Button>
                <DownOutlined />
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <BaseModal
        visible={isJoinClass}
        setVisible={setIsJoinClass}
        onOk={handleJoinClassCode}
        title={"Tham gia lớp học"}
        okText={"Join"}
      >
        <FormJoinClass
          joinId={joinId}
          handleChangeJoinId={(e) => setJoinId(e.target.value)}
        />
      </BaseModal>
      <BaseModal
        footer={null}
        title={"Tạo lớp học"}
        visible={isCreateClass}
        setVisible={setIsCreateClass}
      >
        <FormCreateClass
          onFinish={handleCreateClass}
          setModal={setIsCreateClass}
        />
      </BaseModal>
    </HeaderWrapper>
  );
}
