import { getRequest, postRequest } from "@/api/request";
import BaseModal from "@/components/BaseModal";
import { Button, Divider, Popconfirm, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import FormUser from "./components/FormUser";

function UserPage() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState("create");
  const [oneUser, setOneUser] = useState({});
  const handleAction = (type, userObject) => {
    if (type === "delete") {
      setTypeAction("delete");
      return deleteUser(userObject);
    }
    setShowModal(true);
    if (type === "update") {
      setTypeAction("update");
      console.log("update", userObject);
    }

    if (userObject) {
      setOneUser(userObject);
    }

    if (type === "create") {
      setOneUser(null);
      setTypeAction("create");
    }
  };

  const deleteUser = async (userObject) => {
    try {
      const data = {
        user_id: userObject._id,
      };
      const res = await postRequest("/user/delete", data);
      if (res.status_code === 200) {
        notification.success({
          message: "Delete user success",
          duration: 2,
        });
        fetchDataUser();
        setShowModal(false);
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

  const updateUser = async (data) => {
    const data_send = {
      name: data?.name || "",
      address: data?.address || "",
      role: data?.role || "",
      user_id: oneUser._id,
    };
    try {
      const res = await postRequest("/user/edit", data_send);
      if (res.status_code === 200) {
        notification.success({
          message: "Update user success",
          duration: 2,
        });
        setShowModal(false);
        fetchDataUser();
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

  const createUser = async (data) => {
    try {
      const data_send = {
        email: data?.email || "",
        name: data?.name || "",
        address: data?.address || "",
        role: data?.role || "",
      };
      const res = await postRequest("/user/create", data_send);
      if (res.status_code === 200) {
        notification.success({
          message: "Create user success",
          duration: 2,
        });
        setShowModal(false);
        fetchDataUser();
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

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: "25%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => {
        return (
          <Space size={20}>
            <Button
              type="primary"
              title="Sửa"
              onClick={() => handleAction("update", record)}
            >
              Sửa
            </Button>
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá?"
              onConfirm={() => handleAction("delete", record)}
              okText="Xoá"
              cancelText="Huỷ"
            >
              <Button danger title="Xoá">
                Xóa
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  async function fetchDataUser() {
    try {
      const response = await getRequest("/user/list");
      if (response.status_code === 200) {
        setDataUser(response.data);
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
    fetchDataUser();
  }, []);

  return (
    <div className="container">
      <Space
        style={{
          justifyContent: "space-between",
          width: "100%",
          marginTop: 20,
        }}
      >
        <h1>Quản lý tài khoản</h1>
        {user?.role === "admin" && (
          <Button onClick={() => handleAction("create")}>Tạo tài khoản</Button>
        )}
      </Space>
      <Divider />
      <Table
        scroll={{
          y: 350,
        }}
        dataSource={dataUser}
        columns={columns}
      />
      <BaseModal
        visible={showModal}
        title="Tạo tài khoản"
        footer={null}
        setVisible={setShowModal}
      >
        <FormUser
          onFinish={
            typeAction === "update"
              ? updateUser
              : typeAction === "create"
              ? createUser
              : null
          }
          values={oneUser}
          setModal={setShowModal}
          type={typeAction}
        />
      </BaseModal>
    </div>
  );
}

export default UserPage;
