import { postRequest } from "@/api/request";
import { Form, Input, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function TableList({ id }) {
  const [dataSource, setDataSource] = useState([]);
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleEdit = async (user_id, asm_id) => {
    setIdEdit(asm_id);
    setIdUser(user_id);
    setIsEdit(true);
    form.resetFields();
  };

  const handleSubmit = async () => {
    const values = form.getFieldValue();
    const data = {
      user_id: idUser,
      asm_id: idEdit,
      point: values.point,
    };

    try {
      const response = await postRequest("/point/create", data);
      if (response.status_code === 200) {
        notification.success({
          message: response.message,
          duration: 2,
        });
        setIsEdit(false);
        fetchData();
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

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      key: "stt",
      render: (_, __, index) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: "Tên",
      dataIndex: "user",
      key: "name",
      render: (_, record) => {
        return <div>{record?.user?.name || "Chưa có tên"}</div>;
      },
    },
    {
      title: "Bài tập",
      dataIndex: "assigment",
      key: "assigment",
      render: (_, record) => {
        return (
          <Space direction="vertical">
            {record?.submission?.attachment
              ? record?.submission?.attachment?.map((item, index) => (
                  <Link
                    to={`http://localhost:7856/api/download${item}`}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                  >
                    File {index + 1}
                  </Link>
                ))
              : "Chưa có bài nộp"}
          </Space>
        );
      },
    },
    {
      title: "Điểm",
      dataIndex: "point",
      key: "point",
      render: (_, record) => {
        return (
          <>
            {idUser === record.user._id && isEdit ? (
              <Form
                form={form}
                initialValues={{
                  point: record?.point || 0,
                }}
              >
                <Form.Item name="point">
                  <Input type="number" placeholder="Nhập điểm" />
                </Form.Item>
              </Form>
            ) : (
              <div>{record?.point || "Chưa có điểm"}</div>
            )}
          </>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <>
            {user.role !== "student" && (
              <Space>
                {idUser === record.user._id && isEdit ? (
                  <a
                    onClick={() =>
                      handleSubmit(record?.user?._id, record?.assigment?._id)
                    }
                  >
                    Lwu
                  </a>
                ) : (
                  <a
                    onClick={() =>
                      handleEdit(record?.user?._id, record?.assigment?._id)
                    }
                  >
                    Sửa
                  </a>
                )}
              </Space>
            )}
          </>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      const data_send = {
        class_id: params.id,
        asm_id: id,
      };

      const response = await postRequest("/point/list-point", data_send);
      if (response.status_code === 200) {
        setDataSource(response.data);
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
    fetchData();
  }, []);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
    </>
  );
}

export default TableList;
