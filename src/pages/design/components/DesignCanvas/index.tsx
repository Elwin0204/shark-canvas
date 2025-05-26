import { useEffect, useState } from "react";
import { View } from "../../core";
import { designStore, themeStore } from "@/stores";
import { config } from "@/config";
import CoreStore from "../../core/store";
import DesignSizeHandler from "./DesignSizeHandler";

const DesignCanvas: React.FC = () => {
  const [target, setTarget] = useState<any>();

  const callback = (store: CoreStore) => {
    designStore.ruler = store.ruler;
    if(themeStore.themeMode === "dark") {
      designStore.ruler.changeTheme('dark2');
    }

    designStore.store = store;
  }

  useEffect(() => {
    setTarget(document.getElementById('JS_CanvasInner'));
  }, []);
  return (
    <div className="flex justify-center items-center size-full">
      <div className="relative size-full z-99" id="JS_CanvasInner">
        { target && (
          <View designMode="editor" target={target} resourceHost={config.resourceHost} data={designStore.pageData} callback={callback} />
        ) }
      </div>
      <div className="absolute bottom-20px right-20px z-900">
        <DesignSizeHandler text="123" />
      </div>
    </div>
  );
}

export default DesignCanvas;