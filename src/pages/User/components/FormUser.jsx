import { Button, Input, Space, Form, Select } from "antd";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function FormUser({ onFinish, setModal, type, values, ...props }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (type === "update" && values) {
      form.setFieldsValue(values);
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
      }}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      {...props}
    >
      <Form.Item label="Họ và tên" name="name">
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>
      <Form.Item label="Địa chỉ email" name="email">
        <Input placeholder="Nhập địa chỉ Email" />
      </Form.Item>
      <Form.Item label="Địa chỉ" name="address">
        <Input placeholder="Nhập địa chỉ" />
      </Form.Item>
      <Form.Item label="Vai trò" name="role">
        <Select placeholder="Chọn vai trò">
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="teacher">Teacher</Select.Option>
          <Select.Option value="student">Student</Select.Option>
        </Select>
      </Form.Item>
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
          {type === "update" ? "Cập nhật" : "Tạo"}
        </Button>
      </Space>
    </Form>
  );
}

export default FormUser;
