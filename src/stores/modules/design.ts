import CoreStore from "@/pages/design/core/store";
import { BasePage, ViewData } from "@/typings/core";
import { Ruler } from "leafer-x-ruler";
import { makeAutoObservable, transaction } from "mobx";

class DesignStore {
  sourceCollapse: boolean = false;
  optionsCollapse: boolean = false;
  sourceType: UnionKey.SourceType = "template";
  selectedPageId: string = "";
  selectedElIds: string[] = [];
  elOptionType: UnionKey.ElOptionType = 'basic';
  // 图片裁剪flag
  cropper: boolean = false;
  // 设计稿id
  designId: string = "";
  // 最后一次更新的数据
  lastUpdatedData: any = null;
  ruler: Ruler | null = null;

  public store!: CoreStore;
  public data!: ViewData;

  constructor() {
    makeAutoObservable(this);
  }

  get pageData() {
    return this.data.pages.find((item) => item.id === this.selectedPageId)!;
  }

  setSourceCollapse(value: boolean) {
    this.sourceCollapse = value;
  }

  setOptionsCollapse(value: boolean) {
    this.optionsCollapse = value;
  }

  setsourceType(value: UnionKey.SourceType) {
    this.sourceType = value;  
  }

  setElOptionType(value: UnionKey.ElOptionType) {
    this.elOptionType = value;
  }

  setDesignId(id: string) {
    this.designId = id;
  }

  setData(value: any) {
    this.data = value;
  }

  setLastUpdatedData(value: any) {
    this.lastUpdatedData = value;
  }

  setSelectedPageId(id: string) {
    this.selectedPageId = id;
  }

  setSelectedElIds(ids: string[]) {
    if(ids.length) {
      this.setOptionsCollapse(true);
    }
    transaction(() => {
      this.elOptionType = 'basic';
      this.selectedElIds = [...ids];
      if(ids.length === 0) {
        this.cropper = false;
      }
    });
  }

  save() {}
  undo() {}
  redo() {}
}

const designStore = new DesignStore();

export { designStore, DesignStore };