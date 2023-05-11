import { getRequest } from "@/api/request";
import ListBlogs from "./components/ListBlogs";
import { useEffect, useState } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";

function MyBlog() {
  const [dataBlog, setDataBlog] = useState([]);
  let { loading } = useSelector((state) => state.loading);


  const fetchDataBlog = async () => {
    try {
      const response = await getRequest("/blog/my-list");
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
  }, [loading]);
  return (
    <div className="container mt-4">
      <ListBlogs dataBlog={dataBlog} />
    </div>
  );
}

export default MyBlog;
