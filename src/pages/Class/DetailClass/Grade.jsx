import { postRequest } from "@/api/request";
import { Collapse, notification } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TableList from "./components/TableList";

function Grade() {
  const [listAsm, setListAsm] = useState([]);
  const params = useParams();
  const fetchData = async () => {
    try {
      const response = await postRequest("/assignment/list-assignment", {
        class_id: params.id,
      });
      if (response.status_code === 200) {
        setListAsm(response.data);
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
    <Collapse collapsible="header">
      {listAsm.map((item) => (
        <Collapse.Panel header={item.title} key={item._id}>
          <TableList id={item._id} />
        </Collapse.Panel>
      ))}
    </Collapse>
  );
}

export default Grade;
