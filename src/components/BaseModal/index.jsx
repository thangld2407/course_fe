import { Modal } from "antd";

// eslint-disable-next-line react/prop-types
function BaseModal({ children, title, visible, setVisible, onOk, ...props }) {
  return (
    <Modal
      title={title}
      open={visible}
      onCancel={() => setVisible(false)}
      onOk={onOk}
      {...props}
    >
      {children}
    </Modal>
  );
}

export default BaseModal;
