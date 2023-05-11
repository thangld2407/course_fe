import { getRequest, postRequest } from "@/api/request";
import { Button, Divider, Popconfirm, Space, notification } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseModal from "../BaseModal";
import BaseCardManage from "../Card";
import FormCreateClass from "./FormCreateClass";

function ListClass() {
  const [isCreateClass, setIsCreateClass] = useState(false);
  const [dataClass, setDataClass] = useState([]);
  const [typeAction, setTypeAction] = useState("create");
  const [dataClassUpdate, setDataClassUpdate] = useState({});

  const handleSubmitClass = async (data) => {
    try {
      let data_send = {};
      if (typeAction === "update") {
        setTypeAction("update");
        data_send = {
          class_name: data.class_name,
          description: data.description,
          topic: data.topic,
          teacher_email: data.teacher_email || null,
          class_id: dataClassUpdate?.class?._id || dataClassUpdate?._id || null,
        };
      } else {
        setTypeAction("create");
        data_send = {
          class_name: data.class_name,
          description: data.description,
          topic: data.topic,
          teacher_email: data.teacher_email || null,
        };
      }
      const URL_REQUEST =
        typeAction === "update" ? "/class/update-class" : "/class/create";
      const res = await postRequest(URL_REQUEST, data_send);
      if (res.status_code === 200) {
        notification.success({
          message: "Create class success",
          duration: 2,
        });
        fetchDataClass();
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

  const handleDetailClass = async (item) => {
    setTypeAction("update");
    setDataClassUpdate(item);
    setIsCreateClass(true);
  };

  const user = JSON.parse(localStorage.getItem("user"));

  async function fetchDataClass() {
    try {
      const response = await getRequest("/class/list");
      if (response.status_code === 200) {
        setDataClass(response.data);
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

  const handleConfirmDelete = async (id) => {
    try {
      const data = {
        class_id: id,
      };
      const response = await postRequest("/class/delete-class", data);
      if (response.status_code === 200) {
        notification.success({
          message: "Delete class success",
          duration: 2,
        });
        fetchDataClass();
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
  };

  useEffect(() => {
    fetchDataClass();
  }, []);

  return (
    <div>
      <Space
        style={{
          justifyContent: "space-between",
          width: "100%",
          marginTop: 20,
        }}
      >
        <h1>
          {user?.role === "student" ? "Lớp học của tôi" : "Quản lý lớp học"}
        </h1>
        {user?.role !== "student" && (
          <Button
            onClick={() => {
              setIsCreateClass(true),
                setTypeAction("create"),
                setDataClassUpdate(null);
            }}
          >
            Tạo lớp học
          </Button>
        )}
      </Space>
      <Divider />
      <Space wrap={true} size={30}>
        {dataClass &&
          dataClass.map((item, index) => {
            return (
              <BaseCardManage
                title={
                  <Link to={`/class/${item?.class?._id || item?._id}`}>
                    <h3>{item?.class?.title || item.title}</h3>
                  </Link>
                }
                bordered={false}
                style={{
                  width: 300,
                }}
                key={index}
              >
                <div>
                  Chủ đề: <b>{item?.class?.topic || item.topic}</b>
                </div>
                <br />
                <div>
                  Mã lớp học:{" "}
                  <b>{item?.class?.class_code || item.class_code}</b>
                </div>
                {user && user.role === "admin" && (
                  <>
                    <Divider />
                    <Space
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => handleDetailClass(item)}
                      >
                        Chỉnh sửa
                      </Button>
                      <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() =>
                          handleConfirmDelete(item?.class?._id || item?._id)
                        }
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="primary" danger>
                          Xóa
                        </Button>
                      </Popconfirm>
                    </Space>
                  </>
                )}
              </BaseCardManage>
            );
          })}
      </Space>
      <BaseModal
        footer={null}
        title={"Tạo lớp học"}
        visible={isCreateClass}
        setVisible={setIsCreateClass}
      >
        <FormCreateClass
          onFinish={handleSubmitClass}
          setModal={setIsCreateClass}
          values={dataClassUpdate}
          type={typeAction}
        />
      </BaseModal>
    </div>
  );
}

export default ListClass;
