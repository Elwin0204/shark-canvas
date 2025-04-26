import React from "react";
import Icon from "@douyinfe/semi-icons";
import IconHome2 from "@/assets/icons/home.svg";
import { Button } from "@douyinfe/semi-ui";

const Home: React.FC = () => {
  return (
    <div>
      首页
      <Icon svg={<IconHome2 />} />
      <Button>主要按钮</Button>
      <Button type="secondary">次要按钮</Button>
      <Button type="tertiary">第三按钮</Button>
      <Button type="warning">警告按钮</Button>
      <Button type="danger">危险按钮</Button>
    </div>
  );
};

export default Home;
