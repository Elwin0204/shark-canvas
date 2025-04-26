import { Button, Modal } from "@douyinfe/semi-ui";
import { useState } from "react";

const Login: React.FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Button onClick={() => setVisible(true)}>登录/注册</Button>
      <Modal
        width={1000}
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        header={null}
        footer={null}
      >
        <div>123</div>
      </Modal>
    </>
  );
};

export default Login;
