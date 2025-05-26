import { BaseLayer, BasePage, RecordManager } from "@/typings/core";
import { setURL } from "@/utils";
import { IEditorBase, ILeafer } from "leafer-ui";
import { Ruler } from "leafer-x-ruler";

export default class CoreStore {
  public data!: BasePage;
  // 历史记录
  public record?: RecordManager;
  public editor!: IEditorBase;

  public app!: ILeafer;
  public ruler!: Ruler;

  // 控制器缩放时触发每个元素内部的函数
  public controlScaleFuns: Record<string, () => void> = {};

  // 控制器选中元素时触发每个元素内部的函数
  public controlSelectFuns: Record<string, () => void> = {};

  // 拖动鼠标抬起时触发
  public elDragUp: Record<string, () => void> = {};

  // 資源host
  public resourceHost: string = '';

  // 通过id获取图层数据
  public getLayerByIds(ids: string[]): BaseLayer[] {
    const arr: any[] = [];
    const findLayers = (layers: any[]) => {
      layers.forEach((layer) => {
        if(ids.includes(layer.id)) {
          arr.push(layer);
        }
        if(layer.childs) {
          findLayers(layer.childs);
        }
      });
    }

    findLayers(this.data.layers);

    return arr;
  }

  public autoViewSize() {
    const padding = 100;
    const target = this.app.view as HTMLDivElement;
    const scale = Math.min((this.app.width! - padding) / this.data.width, (this.app.height! - padding) / this.data.height);
    this.app.scale = scale;
    this.app.x = (target.clientWidth - padding - this.data.width * scale) / 2 + padding / 2;
    this.app.y = (target.clientHeight - padding - this.data.height * scale) / 2 + padding / 2;
  }

  public setViewSize() {
    
  }

  public setURL(url: string) {
    return setURL(url, this.resourceHost);
  }
}