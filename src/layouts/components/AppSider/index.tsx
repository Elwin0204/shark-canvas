import React from "react";
import "./style.less";
import SiderMenu from "@/components/layouts/SiderMenu";
import SiderCollapse from "@/components/layouts/SiderCollapse";
import SiderMain from "@/components/layouts/SiderMain";
import SiderTrash from "@/components/layouts/SiderTrash";

interface Props {
  collapse: boolean;
}

const AppSider: React.FC<Props> = ({ collapse }) => {
  return (
    <div className="size-full flex">
      <div className="h-full flex flex-col justify-between sider-menu sider-menu-border-r">
        <div>
          {
            <div className="h-60px w-full flex justify-center items-center">
              <SiderCollapse collapse={collapse} />
            </div>
          }
          <SiderMenu />
        </div>
        <div className="mb-5">
          <SiderTrash />
        </div>
      </div>
      <div className="h-full w-272px">
        <SiderMain />
      </div>
    </div>
  );
};

export default AppSider;
