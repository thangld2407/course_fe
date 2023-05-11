import { Tabs } from "antd";
import Member from "./Member";
import Stream from "./Stream";
import { DetailWrapper } from "./styles";
import Grade from "./Grade";

function DetailClass() {
  const onChange = (key) => {
    console.log(key);
  };

  const itemsTab = [
    {
      key: "1",
      label: `Streamer`,
      children: <Stream />,
    },
    {
      key: "3",
      label: `Mọi người`,
      children: <Member />,
    },
    {
      key: "4",
      label: `Điểm`,
      children: <Grade />,
    },
  ];
  return (
    <DetailWrapper
      style={{
        width: "100%",
      }}
    >
      <Tabs
        style={{
          width: "100%",
        }}
        defaultActiveKey="1"
        items={itemsTab}
        onChange={onChange}
      />
    </DetailWrapper>
  );
}

export default DetailClass;
