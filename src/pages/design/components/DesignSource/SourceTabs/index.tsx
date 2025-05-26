import { designStore } from "@/stores";
import { TabPane, Tabs } from "@douyinfe/semi-ui";
import DesignProjectsIcon from "@/assets/icons/design-projects.svg";
import DesignPagesIcon from "@/assets/icons/design-pages.svg";
import DesignLayersIcon from "@/assets/icons/design-layers.svg";
import { observer } from "mobx-react-lite";
import './style.less';

const SourceTabs: React.FC = observer(() => {
  return (
    <Tabs
      activeKey={designStore.sourceType}
      onChange={activeKey => {
        designStore.setsourceType(activeKey as UnionKey.SourceType);
      }}
      className="source-tabs"
    >
      <TabPane className="source-tab" itemKey="projects" tab={ <span className="flex items-center">
        <i className="svg-icon mr-1 text-18px"><DesignProjectsIcon /></i>
        <span>工程列表</span>
      </span> } >工程列表</TabPane>
      <TabPane className="source-tab" itemKey="pages" tab={ <span className="flex items-center">
        <i className="svg-icon mr-1 text-18px"><DesignPagesIcon /></i>
        <span>多页面</span>
      </span> }>多页面</TabPane>
      <TabPane className="source-tab" itemKey="layers" tab={ <span className="flex items-center">
        <i className="svg-icon mr-1 text-18px"><DesignLayersIcon /></i>
        <span>图层列表</span>
      </span> }>图层列表</TabPane>
    </Tabs>
  );
})

export default SourceTabs;