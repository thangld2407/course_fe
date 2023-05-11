import { Input } from "antd";

// eslint-disable-next-line react/prop-types
function FormJoinClass({ joinId, handleChangeJoinId }) {
  return (
    <Input
      placeholder="Liên hệ giáo viên để lấy mã lớp học"
      name="joinId"
      value={joinId}
      onChange={handleChangeJoinId}
    />
  );
}

export default FormJoinClass;
