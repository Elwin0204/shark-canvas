import { BaseLayer } from "@/typings/core";
import { IUI } from "leafer-ui";
import CoreStore from "../store";
import { useEffect } from "react";

export default function useLayerBaseStyle(layer: BaseLayer, box: IUI, store: CoreStore, zIndex: number) {
  useEffect(() => {
    box.x = layer.x;
    box.y = layer.y;
    box.opacity = layer.opacity;
    // 模糊
    box.blur = layer.blur;
    // 混合模式
    box.blendMode = layer.blendMode;
    // 边框
    if(layer.type === 'image') {
      const imgUI = box.children![0];
      imgUI.stroke = layer.border.stroke;
      imgUI.strokeWidth = layer.border.visible ? layer.border.strokeWidth : 0;
      imgUI.dashPattern = layer.border.dashPattern;
    } else {
      box.stroke = layer.border.stroke;
      box.strokeWidth = layer.border.visible ? layer.border.strokeWidth : 0;
      box.dashPattern = layer.border.dashPattern;
    }
    // 旋转
    box.rotation = layer.rotation;
  }, [layer.x, layer.y, layer.opacity, layer.blendMode, layer.blur, layer.border, layer.rotation]);

  useEffect(() => {
    box.zIndex = zIndex;
  }, [zIndex]);
  // 阴影
  useEffect(() => {
    if(layer.shadow && layer.shadow.visible) {
      if(['image', 'text'].includes(layer.type)) {
        const imgUI = box.children![0];
        imgUI.shadow = { ...layer.shadow };
      } else {
        box.shadow = {...layer.shadow};
      }
    } else {
      if(['image', 'text'].includes(layer.type)) {
        const imgUI = box.children![0];
        imgUI.shadow = undefined;
      } else {
        box.shadow = undefined;
      }
    }
  }, [layer.shadow.x, layer.shadow.y, layer.shadow.blur, layer.shadow.color, layer.shadow.visible, layer.shadow.spread]);

  useEffect(() => {
    box.visible = !layer._hide;
    box.locked = layer._lock;

    if(layer._lock) {
      box.hittable = false;
    } else {
      box.hittable = true;
    }
  }, [layer._hide, layer._lock]);

  return [];
}