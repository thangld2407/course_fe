import { Button, Form, Input, Space } from "antd";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function FormCreateClass({ onFinish, setModal, values, type, ...props }) {
  const [form] = Form.useForm();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (values && type === "update") {
      let dataUpdate = {
        ...values,
        // eslint-disable-next-line react/prop-types
        class_name: values?.title,
      };
      form.setFieldsValue(dataUpdate);
    } else {
      form.resetFields();
    }
  }, [values]);
  return (
    <Form
      form={form}
      onFinish={() => {
        onFinish(form.getFieldsValue());
        form.resetFields();
        setModal(false);
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      {...props}
    >
      <Form.Item label="Tên lớp học" name="class_name">
        <Input placeholder="Nhập tên lớp học" />
      </Form.Item>
      <Form.Item label="Mô tả" name="description">
        <Input placeholder="Nhập mô tả lớp học" />
      </Form.Item>
      <Form.Item label="Chủ đề " name="topic">
        <Input placeholder="Mô tả chủ đề" />
      </Form.Item>
      {user && user.role === "admin" && (
        <Form.Item label="Chọn giáo viên " name="teacher_email">
          <Input placeholder="Nhập email của giáo viên " />
        </Form.Item>
      )}
      <Space
        style={{
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {type === "update" && (
          <Button
            onClick={() => {
              setModal(false);
              form.resetFields();
            }}
          >
            Hủy
          </Button>
        )}
        <Button label="Tạo lớp học" htmlType="submit">
          {type === "update" ? "Cập nhật" : "Tạo lớp học"}
        </Button>
      </Space>
    </Form>
  );
}

export default FormCreateClass;
