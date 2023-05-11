import { getRequest } from "@/api/request";
import { Layout, Menu, Space, notification, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet, useParams } from "react-router-dom";
const { Content, Sider } = Layout;
import { IoArrowBackOutline } from "react-icons/io5";

function LayoutClass() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token");
  const [menuItems, setMenuItems] = useState([]);
  const params = useParams();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  if (!user && !token) {
    return <Navigate to="/login" />;
  }

  const current_time = new Date().getTime();
  const expired_in = localStorage.getItem("expired_in");
  if (token && current_time > expired_in) {
    return <Navigate to="/login" />;
  }

  async function fetchDataClass() {
    try {
      const response = await getRequest("/class/list");
      if (response.status_code === 200) {
        let items = response.data.map((item) => {
          return {
            key: item?.class?._id || item._id,
            label: (
              <Link
                to={`/class/${item?.class?._id || item._id}`}
                style={{ color: "white" }}
              >
                {item?.class?.title || item?.title}
              </Link>
            ),
          };
        });
        setMenuItems(items);
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetchDataClass();
  }, []);

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Space
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 64,
            backgroundColor: "#fff",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#333",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            <h5>
              <IoArrowBackOutline />
            </h5>
          </Link>
        </Space>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={params.id}
          items={menuItems || []}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 24px)",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutClass;
