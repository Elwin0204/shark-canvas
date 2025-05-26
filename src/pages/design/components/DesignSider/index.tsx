import SiderCollapse from "@/components/layouts/SiderCollapse";
import DesignTab from "./DesignTab";
import { appStore } from "@/stores";
import { observer } from "mobx-react-lite";
import HotkeysModal from "./HotkeysModal";
import './style.less';

const DesignSider = observer(() => {
  return (
    <div className="h-full flex flex-col justify-between design-sider design-sider-border-r">
      <div>
        { appStore.collapse ? <div className="design-sider-collapse w-full flex justify-center items-center">
          <SiderCollapse collapse={appStore.collapse} />
        </div> : ''}
        <DesignTab />
      </div>
      <div className="mb-5 flex flex-col justify-center items-center">
        <HotkeysModal />
      </div>
    </div>
  );
})

export default DesignSider;