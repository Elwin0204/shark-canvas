import { GroupLayer, LayerProps } from "@/typings/core";
import { Group } from "leafer-ui";
import { useEffect, useMemo } from "react";
import useLayerBaseStyle from "../hooks/useLayerBaseStyle";
import ImageLayer from "./Image";
import TextLayer from "./Text";

const GroupComp: React.FC<LayerProps> = (props) => {
  const layer = props.layer as GroupLayer;
  const groupBox = useMemo(() => {
    const group = new Group({
      editable: props.isGroup ? false : true,
      hitChildren: false,
      x: layer.x,
      y: layer.y,
      rotation: layer.rotation,
      opacity: layer.opacity,
      fill: 'rgba(0,0,0,0)'
    });

    group.id = layer.id;
    group.zIndex = props.zIndex;
    props.parent!.add(group);

    return group;
  }, []);

  useLayerBaseStyle(layer, groupBox, props.store, props.zIndex);

  useEffect(() => {
    props.store.controlSelectFuns[layer.id] = () => {
      layer.children.forEach((item) => {
        if(props.store.controlSelectFuns[item.id]) {
          props.store.controlSelectFuns[item.id]();
        }
      });
    };

    props.store.controlScaleFuns[layer.id] = () => {
      layer.children.forEach((item) => {
        if(props.store.controlScaleFuns[item.id]) {
          props.store.controlScaleFuns[item.id]();
        }
      });
    };

    return () => {
      delete props.store.controlScaleFuns[layer.id];
      groupBox.remove();
      groupBox.destroy();
    };
  }, []);

  const { store, mode } = props;

  return (
    <>
      {[...layer.children].map((layer, i) => {
        switch (layer.type) {
          case 'image':
            return (
              <ImageLayer
                key={layer.id}
                hide={layer._hide}
                lock={layer._lock}
                dirty={layer._dirty}
                parent={groupBox}
                isGroup={true}
                zIndex={99999-i}
                layer={layer}
                store={store}
                mode={mode}
              />
            );
          case 'text':
            return (
              <TextLayer
                key={layer.id}
                hide={layer._hide}
                lock={layer._lock}
                dirty={layer._dirty}
                isGroup={true}
                parent={groupBox}
                zIndex={99999-i}
                layer={layer}
                store={store}
                mode={mode}
              />
            );
          case 'group':
            return (
              <GroupComp
                key={layer.id}
                hide={layer._hide}
                lock={layer._lock}
                dirty={layer._dirty}
                isGroup={true}
                parent={groupBox}
                zIndex={99999-i}
                layer={layer}
                store={store}
                mode={mode}
              />
            );
          default:
            // const exLayer = exLayers
        }
      })}
    </>
  );
};

export default GroupComp;