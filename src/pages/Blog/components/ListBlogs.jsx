import {
  Avatar,
  Button,
  Image,
  List,
  Popconfirm,
  Space,
  notification,
} from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ContentView from "./ContentView";
import { postRequest } from "@/api/request";
import { useDispatch } from "react-redux";
import { setLoading } from "@/store/reducer/loadingReducer";

// eslint-disable-next-line react/prop-types
function ListBlogs({ dataBlog = [] }) {
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const deletePost = async (id) => {
    try {
      const response = await postRequest("/blog/delete", { post_id: id });
      if (response.status_code === 200) {
        notification.success({
          message: "Xóa thành công",
          duration: 2,
        });
        dispatch(setLoading(true));
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

  const handleActionBtn = () => {
    setIsEdit(true);
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={dataBlog}
      footer={null}
      renderItem={(item) => (
        <List.Item
          key={item.title}
          extra={
            item.image && (
              <Image width={120} src={`http://localhost:7856${item.image}`} />
            )
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<Link to={`/blog/${item.href}`}>{item.title}</Link>}
          />
          {isEdit ? (
            <ContentView
              content={item.content}
              id={item.id}
              setIsEdit={setIsEdit}
            />
          ) : (
            <>{item.content}</>
          )}
          {location.pathname === "/my-blog" && (
            <div className="mt-4">
              <Space>
                {isEdit && (
                  <>
                    <Button
                      type="primary"
                      danger
                      onClick={() => setIsEdit(false)}
                    >
                      Hủy
                    </Button>
                  </>
                )}
                {!isEdit && (
                  <>
                    <Button
                      type="primary"
                      onClick={() => handleActionBtn(item.content)}
                    >
                      Chỉnh sửa
                    </Button>
                    <Popconfirm
                      title="Bạn có chắc chắn muốn xóa bài viết này?"
                      okText="Có"
                      cancelText="Không"
                      onConfirm={() => deletePost(item.id)}
                    >
                      <Button type="primary" danger>
                        Xóa
                      </Button>
                    </Popconfirm>
                  </>
                )}
              </Space>
            </div>
          )}
        </List.Item>
      )}
    />
  );
}

export default ListBlogs;
