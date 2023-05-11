import { postRequest } from "@/api/request";
import { setLoading } from "@/store/reducer/loadingReducer";
import { Button, Form, Input, notification } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function ContentView({ content, id, setIsEdit }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (content) {
      form.setFieldsValue({
        content,
      });
    }
  }, [content]);

  const handleSaveChanges = async () => {
    const data = form.getFieldsValue();
    const data_send = {
      ...data,
      post_id: id,
    };

    try {
      const res = await postRequest("/blog/edit", data_send);
      console.log(res);
      if (res.status_code === 200) {
        notification.success({
          message: "Cập nhật thành công",
          duration: 2,
        });
        dispatch(setLoading(true));
        setIsEdit(false);
      } else {
        notification.warning({
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

  return (
    <Form
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      layout="vertical"
      onFinish={handleSaveChanges}
    >
      <Form.Item label="Nội dung" name={"content"}>
        <Input.TextArea style={{ minHeight: 250 }} />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">Lưu</Button>
      </Form.Item>
    </Form>
  );
}

export default ContentView;
