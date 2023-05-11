import { postFormData, postRequest } from "@/api/request";
import BaseCardManage from "@/components/Card";
import {
  Button,
  Collapse,
  DatePicker,
  Form,
  Input,
  List,
  Space,
  notification,
} from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "./classDetail.module.css";
import ModalStreamCourse from "./components/ModalStreamCourse";
let cx = classNames.bind(style);
const { Panel } = Collapse;

function Stream() {
  const params = useParams();
  const [dataDetail, setDataDetail] = useState({});
  const [dataAssignment, setDataAssignment] = useState([]);
  const [dataDetailAsm, setDataDetailAsm] = useState({});
  const [modal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));

  async function fetchDataDetail() {
    try {
      const data = {
        class_id: params.id,
      };
      const response = await postRequest("/class/detail-class", data);
      if (response.status_code === 200) {
        setDataDetail(response.data);
      } else {
        notification.error({
          message: response.message,
          duration: 2,
        });
      }
    } catch (e) {
      notification.error({
        message: e.message,
        duration: 2,
      });
    }
  }

  async function fetchDataAssignment() {
    try {
      const response = await postRequest("/assignment/list-assignment", {
        class_id: params.id,
      });

      if (response.status_code === 200) {
        setDataAssignment(response.data);
      } else {
        setDataAssignment([]);
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  }

  const handleSubmit = async (values) => {
    const date = new Date(values.due_date);
    const data = {
      class_id: params.id,
      title: values.title,
      description: values.description,
      due_date: date,
    };
    try {
      const files = document.getElementById("attachment").files;
      if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append("attachment", files[i]);
        }
        const response = await postFormData("/upload-array", formData);
        if (response.status_code === 200) {
          data.documentation = response.data;
        } else {
          notification.error({
            message: response.message,
            duration: 2,
          });
        }
      }
      const response = await postRequest("/assignment/create", data);
      if (response.status_code === 200) {
        notification.success({
          message: "Đăng bài tập thành công",
          duration: 2,
        });
        form.resetFields();
        fetchDataDetail();
        fetchDataAssignment();
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

  const handleGetDetail = async (id) => {
    try {
      const response = await postRequest("/assignment/detail", {
        asm_id: id,
      });
      if (response.status_code === 200) {
        setDataDetailAsm(response.data);
        setShowModal(true);
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

  useEffect(() => {
    fetchDataDetail();
    fetchDataAssignment();
  }, [params.id]);

  return (
    <div className="row">
      <div className="col-3">
        <BaseCardManage title="Thông tin lớp học">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            <div>Tên lớp học</div>
            <div className="font-weight-bold">{dataDetail.title} </div>

            <div>Mã lớp học</div>
            <div className=" font-weight-bold">{dataDetail.class_code} </div>
          </Space>
        </BaseCardManage>
      </div>
      <div className="col-9">
        <BaseCardManage title="Tổng quan">
          <Space
            direction="vertical"
            style={{
              width: "100%",
            }}
          >
            {user && user.role !== "student" && (
              <Collapse
                onChange={() => {
                  form.resetFields();
                }}
              >
                <Panel header="Đăng bài tập" key="1">
                  <Form
                    layout="vertical"
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 24,
                    }}
                    form={form}
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      label="Tiêu đề"
                      name="title"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tiêu đề",
                        },
                      ]}
                    >
                      <Input placeholder="Tiêu đề" />
                    </Form.Item>
                    <Form.Item
                      label="Ngày hết hạn"
                      name="due_date"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng chọn ngày hết hạn",
                        },
                      ]}
                    >
                      <DatePicker placeholder="Ngày hết hạn" />
                    </Form.Item>
                    <Form.Item
                      label="Mô tả"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập mô tả",
                        },
                      ]}
                    >
                      <Input.TextArea placeholder="Tiêu đề" />
                    </Form.Item>
                    <Form.Item
                      label="Tài liệu"
                      name="attachment"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tài liệu",
                        },
                      ]}
                    >
                      <Input
                        id="attachment"
                        multiple
                        type="file"
                        placeholder="Tiêu đề"
                      />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Đăng bài tập
                    </Button>
                  </Form>
                </Panel>
              </Collapse>
            )}

            <List>
              {dataAssignment.map((item, index) => {
                return (
                  <List.Item
                    style={{
                      width: "100%",
                    }}
                    key={index}
                  >
                    <div
                      className={cx("content__stream")}
                      style={{
                        width: "100%",
                      }}
                      onClick={() => handleGetDetail(item._id)}
                    >
                      <div
                        className={cx("content__work")}
                        style={{
                          position: "relative",
                        }}
                      >
                        <div className={cx("assign_to_me")}>
                          <div className={cx("title_assign")}>
                            <div className={cx("title")}>
                              <p className={cx("title_text")}>
                                Tiêu đề: {item.title}
                              </p>
                            </div>
                            <div className="d-block mt-2">
                              Mô tả: {item.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </List.Item>
                );
              })}
            </List>
          </Space>
          <ModalStreamCourse
            data={dataDetailAsm}
            modal={modal}
            setShowModal={setShowModal}
          />
        </BaseCardManage>
      </div>
    </div>
  );
}

export default Stream;
