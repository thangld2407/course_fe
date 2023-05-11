import { getRequest, postFormData, postRequest } from "@/api/request";
import { Button, Divider, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import ListBlogs from "./components/ListBlogs";

// eslint-disable-next-line react/prop-types

function BlogPage() {
  const [form] = Form.useForm();

  const [dataBlog, setDataBlog] = useState([]);

  const handlePostForm = async () => {
    try {
      console.log("form", form.getFieldsValue());
      const formData = new FormData();
      let file = document.getElementById("attachment").files[0];
      let file_send = "";
      if (file) {
        formData.append("attachment", file);
        const response = await postFormData("/upload", formData);
        if (response.status_code === 200) {
          file_send = response.data;
        } else {
          file_send = "";
        }
      }

      let data_create = {
        title: form.getFieldsValue().title,
        content: form.getFieldsValue().content,
      };

      if (file_send) {
        data_create.image = file_send;
      }
      const response = await postRequest("/blog/create", data_create);
      if (response.status_code === 200) {
        notification.success({
          message: "Đăng bài thành công",
          duration: 2,
        });
        form.resetFields();
        fetchDataBlog();
      } else {
        notification.error({
          message: "Đăng bài thất bại",
          duration: 2,
        });
      }
    } catch (error) {
      notification.error({
        message: "Đăng bài thất bại",
        duration: 2,
      });
    }
  };

  const fetchDataBlog = async () => {
    try {
      const response = await getRequest("/blog/list");
      if (response.status_code === 200) {
        let process_data = response.data.map((item) => {
          return {
            href: item._id,
            title: item.title,
            avatar: item.user.avatar,
            content: item.content,
            image: item.image,
            id: item._id,
          };
        });
        setDataBlog(process_data);
      }
    } catch (error) {
      notification.error({
        message: error.message,
        duration: 2,
      });
    }
  };


  useEffect(() => {
    fetchDataBlog();
  }, []);

  return (
    <div className="container pb-5">
      <div
        className="row mt-4"
        style={{
          width: "100%",
        }}
      >
        <div className="col-12">
          <Form
            layout="vertical"
            name="basic"
            style={{
              width: "100%",
            }}
            form={form}
            onFinish={handlePostForm}
          >
            <Form.Item
              name="title"
              required={true}
              label="Tiêu đề"
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
              name="content"
              required={true}
              label="Nội dung"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung",
                },
              ]}
            >
              <Input.TextArea placeholder="Bạn đang nghĩ gì?" />
            </Form.Item>
            <Form.Item name="attachment" label="Tài liệu đính kèm">
              <Input type="file" id="attachment" />
            </Form.Item>
            <Button className="float-right" type="primary" htmlType="submit">
              Đăng bài
            </Button>
          </Form>
        </div>
      </div>
      <Divider />
      <ListBlogs dataBlog={dataBlog} />
    </div>
  );
}

export default BlogPage;
