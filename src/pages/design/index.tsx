import React, { useCallback, useEffect, useState } from "react";
import './style.less';
import DesignSider from "./components/DesignSider";
import classNames from "classnames";
import { useWindowSize } from "@/hooks";
import variables from "@/styles/variables.module.less";
import { px2Num } from "@/utils";
import { appStore, designStore, themeStore } from "@/stores";
import { observer } from "mobx-react-lite";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import DesignHeader from "./components/DesignHeader";
import DesignSource from "./components/DesignSource";
import DesignCanvas from "./components/DesignCanvas";
import { tdata } from "@/mock/tdata";
import DesignOptions from "./components/DesignOptions";

const dims = {
  siderWidth: px2Num(variables['sider-width']),
  siderCollapseWidth: px2Num(variables['sider-collapse-width']),
  designSiderWidth: px2Num(variables['design-sider-width']),
  designHeaderHeight: px2Num(variables['design-header-height']),
  designSourceWidth: px2Num(variables['design-source-width']),
  designOptionsWidth: px2Num(variables['design-options-width']),
};

const Design: React.FC = observer(() => {
  const size = useWindowSize();
  
  const editorStyle = {
    width: `${size.width-dims.siderWidth-dims.designSiderWidth-dims.designSourceWidth-dims.designOptionsWidth+(appStore.collapse ? dims.siderWidth : 0)+(designStore.sourceCollapse ? dims.designSourceWidth : 0)+(designStore.optionsCollapse ? dims.designOptionsWidth : 0)}px`,
    height: `${size.height-dims.designHeaderHeight}px`
  };

  const headerStyle = {
    width: `${size.width-dims.siderWidth-dims.designSiderWidth-dims.designSourceWidth+(appStore.collapse ? dims.siderWidth : 0)+(designStore.sourceCollapse ? dims.designSourceWidth : 0)}px`,
    left: `${dims.designSiderWidth+(designStore.sourceCollapse ? 0 : dims.designSourceWidth)}px`,
  };

  const urlParams = new URLSearchParams(window.location.search);
  const designId = urlParams.get('designId');

  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    if(themeStore.themeMode === "light") {
      themeStore.setThemeMode("dark");
      if(designStore.ruler) {
        designStore.ruler.changeTheme('dark2');
      }
    } else if(themeStore.themeMode === "dark") {
      themeStore.setThemeMode("light");
      if(designStore.ruler) {
        designStore.ruler.changeTheme('light');
      }
    } else {
      themeStore.setThemeMode("light");
      if(designStore.ruler) {
        designStore.ruler.changeTheme('light');
      }
    }
  }

  const initDesign = useCallback(async () => {
    if(designId) {
      designStore.setDesignId(designId);
    }
    if(!designStore.data) {
      designStore.setData(tdata);
    }
    designStore.setSelectedPageId(designStore.data.selectedPageId || designStore.data.pages[0].id);
    designStore.setLastUpdatedData(JSON.stringify(designStore.data));
    setLoading(false);
  }, []);

  useEffect(() => {
    initDesign();
  }, []);

  if(loading) {
    return (<div>loading...</div>);
  }

  return (
    <div className="design-wrapper relative size-full overflow-hidden select-none">
      <div className="design-sider absolute top-0 left-0 h-full z-10">
        <DesignSider />
      </div>
      <div className={classNames("design-source absolute top-0 h-full z-9 transition-all-500", { "translate-x-source": designStore.sourceCollapse })}>
        <i
          className="svg-icon btn-source-toggle absolute -right-16px top-50% -translate-y-50% h-60px w-16px rounded-r-6px flex justify-center items-center cursor-pointer"
          onClick={() => { designStore.setSourceCollapse(!designStore.sourceCollapse) }}>
          <span className={classNames("text-32px transition-all-300", { "rotate-180": designStore.sourceCollapse })}>
            <ArrowLeftIcon />
          </span>
        </i>
        <div className={classNames('source-wrapper size-full', { 'border-r-source': !designStore.sourceCollapse })}>
          <DesignSource sourceType={designStore.sourceType} />
        </div>
      </div>
      <div className="design-header absolute top-0 left-0 z-99 transition-all-500" style={headerStyle}>
        <DesignHeader
          themeMode={themeStore.themeMode}
          themeClick={toggleTheme}
          projectsClick={() => designStore.setsourceType('projects')}
          pagesClick={() => designStore.setsourceType('pages')}
          layersClick={() => designStore.setsourceType('layers')}
          saveClick={() => designStore.save()}
          undoClick={() => designStore.undo()}
          redoClick={() => designStore.redo()}
        />
      </div>
      <div className={classNames('design-editor absolute top-0 z-1 h-full overflow-hidden transition-all-500',
        designStore.sourceCollapse ? 'left-collapse' : 'left')} style={editorStyle}>
        <div className="canvas-wrapper relative z-0 size-full">
          <DesignCanvas />
        </div>
      </div>
      <div className={classNames("design-options absolute z-9 top-0 right-0 h-full transition-all-500", { "translate-x-options": designStore.optionsCollapse })}>
        <i 
          className="svg-icon btn-options-toggle absolute -left-16px top-50% -translate-y-50% h-60px w-16px rounded-l-6px flex justify-center items-center cursor-pointer"
          onClick={() => { designStore.setOptionsCollapse(!designStore.optionsCollapse) }}>
          <span className={classNames("text-32px transition-all-300", { "rotate-180": designStore.optionsCollapse })}>
            <ArrowRightIcon />
          </span>
        </i>
        <div className={classNames('options-wrapper size-full', { 'border-l-options': true })}>
          <DesignOptions />
        </div>
      </div>
    </div>
  );
})

export default Design;