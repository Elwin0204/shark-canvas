import React, { useState } from "react";
import "./style.less";
import DesignSider from "./components/DesignSider";
import classNames from "classnames";
import { useWindowSize } from "@/hooks";
import variables from "@/styles/variables.module.less";
import { px2Num } from "@/utils";
import { appStore } from "@/stores";
import { observer } from "mobx-react-lite";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import DesignHeader from "./components/DesignHeader";

const dims = {
  siderWidth: px2Num(variables["sider-width"]),
  siderCollapseWidth: px2Num(variables["sider-collapse-width"]),
  designSiderWidth: px2Num(variables["design-sider-width"]),
  designHeaderHeight: px2Num(variables["design-header-height"]),
  designSourceWidth: px2Num(variables["design-source-width"]),
  designOptionsWidth: px2Num(variables["design-options-width"]),
};

const Design: React.FC = observer(() => {
  const [sourceCollapse, setSourceCollapse] = useState(false);
  const [optionsCollapse, setOptionsCollapse] = useState(false);
  const size = useWindowSize();

  const editorStyle = {
    width: `${size.width - dims.siderWidth - dims.designSiderWidth - dims.designSourceWidth - dims.designOptionsWidth + (appStore.collapse ? dims.siderWidth : 0) + (sourceCollapse ? dims.designSourceWidth : 0) + (optionsCollapse ? dims.designOptionsWidth : 0)}px`,
    height: `${size.height - dims.designHeaderHeight}px`,
  };

  const headerStyle = {
    width: `${size.width - dims.siderWidth - dims.designSiderWidth - dims.designSourceWidth + (appStore.collapse ? dims.siderWidth : 0) + (sourceCollapse ? dims.designSourceWidth : 0)}px`,
    left: `${dims.designSiderWidth + (sourceCollapse ? 0 : dims.designSourceWidth)}px`,
  };
  return (
    <div className="design-wrapper relative size-full overflow-hidden select-none">
      <div className="design-sider absolute top-0 left-0 h-full z-10">
        <DesignSider />
      </div>
      <div
        className={classNames(
          "design-source absolute top-0 h-full z-9 transition-all-500",
          { "translate-x-source": sourceCollapse }
        )}
      >
        <i
          className="svg-icon btn-source-toggle absolute -right-16px top-50% -translate-y-50% h-60px w-16px rounded-r-6px flex justify-center items-center cursor-pointer"
          onClick={() => {
            setSourceCollapse(!sourceCollapse);
          }}
        >
          <span
            className={classNames("text-32px transition-all-300", {
              "rotate-180": sourceCollapse,
            })}
          >
            <ArrowLeftIcon />
          </span>
        </i>
      </div>
      <div
        className="design-header absolute top-0 left-0 z-99 transition-all-500"
        style={headerStyle}
      >
        <DesignHeader />
      </div>
      <div
        className={classNames(
          "design-editor absolute top-0 z-1 h-full overflow-hidden transition-all-500",
          sourceCollapse ? "left-collapse" : "left"
        )}
        style={editorStyle}
      >
        <div className="canvas-wrapper relative z-0">canvas</div>
      </div>
      <div
        className={classNames(
          "design-options absolute z-9 top-0 right-0 h-full transition-all-500",
          { "translate-x-options": optionsCollapse }
        )}
      >
        options
        <i
          className="svg-icon btn-options-toggle absolute -left-16px top-50% -translate-y-50% h-60px w-16px rounded-l-6px flex justify-center items-center cursor-pointer"
          onClick={() => {
            setOptionsCollapse(!optionsCollapse);
          }}
        >
          <span
            className={classNames("text-32px transition-all-300", {
              "rotate-180": optionsCollapse,
            })}
          >
            <ArrowRightIcon />
          </span>
        </i>
      </div>
    </div>
  );
});

export default Design;
