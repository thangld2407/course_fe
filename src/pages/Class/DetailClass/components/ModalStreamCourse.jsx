// eslint-disable-next-line react/prop-types

import { postFormData, postRequest } from "@/api/request";
import BaseModal from "@/components/BaseModal";
import get_day_of_time from "@/helper/get_day";
import { Button, Card, Form, Input, Space, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ModalStreamWrapper } from "./styles";

// eslint-disable-next-line react/prop-types
function ModalStreamCourse({ modal, setShowModal, data }) {
  // eslint-disable-next-line react/prop-types
  const [comments, setComments] = useState([]);
  const [files, setFiles] = useState([]);
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  const refInputFile = useRef(null);

  const handlePostComment = async (values) => {
    if (!values.comment) return;
    const data_send = {
      content: values.comment,
      // eslint-disable-next-line react/prop-types
      asm_id: data.assignment._id,
    };
    try {
      const response = await postRequest("/comment/create", data_send);
      if (response.status_code === 200) {
        setComments((prev) => [...prev, response.data]);
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
    form.resetFields();
  };

  const handleSubmitAsm = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("attachment", files[i]);
      }

      const responseFile = await postFormData("/upload-array", formData);
      if (responseFile.status_code === 200) {
        const data_send = {
          // eslint-disable-next-line react/prop-types
          asm_id: data.assignment._id,
          attachment: responseFile.data,
        };
        const response = await postRequest("/assignment/submit", data_send);
        if (response.status_code === 200) {
          notification.success({
            message: "Nộp bài thành công",
            duration: 2,
          });
          setShowModal(false);
        } else {
          notification.error({
            message: "Nộp bài thất bại",
            duration: 2,
          });
        }
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  };

  function checkIsOverDate() {
    let currentDate = new Date();
    // eslint-disable-next-line react/prop-types
    let dueDate = new Date(data?.assignment?.due_date);

    let dateTime = get_day_of_time(currentDate, dueDate);

    if (dateTime < 0) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (modal) {
      refInputFile.current.value = "";
    }
  }, [modal]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    setComments(data.comment);
    // eslint-disable-next-line react/prop-types
  }, [data.comment]);

  return (
    <BaseModal
      footer={null}
      visible={modal}
      // eslint-disable-next-line react/prop-types
      title={data?.assignment?.title}
      width={800}
      setVisible={setShowModal}
    >
      <ModalStreamWrapper>
        <div className="mt-2">
          {/* eslint-disable-next-line react/prop-types */}
          <p>{data?.assignment?.description}</p>
        </div>
        <div className="class__detail">
          <Space direction="vertical" className="mt-3">
            {data &&
              // eslint-disable-next-line react/prop-types
              data.assignment?.documentation.map((item, index) => (
                <div
                  key={`ASM_DOC_${index}`}
                  className="document__item d-flex align-items-center"
                >
                  <div className="download__link mr-3">
                    <div className="document__item__title">
                      Tài liệu {index + 1}
                    </div>
                  </div>
                  <Link
                    target="_blank"
                    to={`http://localhost:7856/api/download${item}`}
                  >
                    <AiOutlineCloudDownload size={24} />
                  </Link>
                </div>
              ))}
          </Space>
        </div>

        {user && user.role === "student" && (
          <div className="class__nopbai">
            <Space
              direction="vertical"
              className="mt-3"
              style={{
                width: "100%",
              }}
            >
              <Card
                title={
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="title">Nộp bài tập</div>
                    <div className="deadline">
                      Deadline:{" "}
                      {checkIsOverDate()
                        ? "Out date"
                        : get_day_of_time(
                            new Date(),
                            // eslint-disable-next-line react/prop-types
                            new Date(data?.assignment?.due_date)
                          ) + " days"}
                    </div>
                  </div>
                }
                style={{
                  width: "100%",
                }}
              >
                <div>
                  <input
                    id="attachments"
                    type="file"
                    placeholder="Nộp bài tập ở đây"
                    disabled={checkIsOverDate() ? true : false}
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    ref={refInputFile}
                  />
                </div>
                {!checkIsOverDate() && (
                  <Button className="mt-4" onClick={handleSubmitAsm}>
                    Nộp bài
                  </Button>
                )}
              </Card>
            </Space>
          </div>
        )}

        <div className="comment__list mt-4">
          {comments &&
            comments.map((item, index) => (
              <div key={index} className="comment__item">
                <div className="comment__item__avatar">
                  <img src={item.user.avatar} alt="user_avatar" />
                </div>
                <div className="comment__item__content">
                  <div className="comment__item__content__name">
                    <p>{item.user.name}</p>
                  </div>
                  <div className="comment__item__content__text">
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          {comments && comments.length === 0 && (
            <h6 className="mt-2 mb-2">
              Chưa có bình luận nào, hãy là người đầu tiên bình luận bài học này
            </h6>
          )}
        </div>
        <div className="comment__area">
          <Form layout="vertical" form={form} onFinish={handlePostComment}>
            <Form.Item
              label="Bình luận"
              name="comment"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung bình luận",
                },
              ]}
            >
              <Input.TextArea placeholder="Nội dung bình luận" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng bình luận
            </Button>
          </Form>
        </div>
      </ModalStreamWrapper>
    </BaseModal>
  );
}

export default ModalStreamCourse;
