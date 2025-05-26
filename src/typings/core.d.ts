import { IBlendMode, IPaint, IPointData, IRect, IShadowEffect, IText } from "@leafer-ui/interface";
import type { Group } from "leafer-ui";
import CoreStore from "@/pages/design/core/store";

export interface ViewData {
  name: string;
  desc: string;
  version: string;
  thumb: string;
  selectedPageId: string;
  createTime: number;  // 创建时间, 时间戳
  updateTime: number;  // 更新时间, 时间戳
  pages: BasePage[];
}

export interface ExLayerConfig {
  pid: string;
  version: string;
}

export interface ExLayer {
  layer: JSX.Element;
  options: JSX.Element;
  layerData: BaseLayer;
  config: ExLayerConfig;
}


export interface BaseLayer {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
  type: UnionKey.LayerType;
  blur: number;
  border: {
    stroke: string;
    dashPattern?: number[];
    dashOffset?: number;
    strokeWidth: number;
    visible: boolean;
  };
  blendMode: IBlendMode;
  opacity: number;
  rotation: number;
  shadow: IShadowEffect;
  _unKeepRadio?: boolean;
  _radio?: number;
  _dirty: string;
  _lock: boolean;
  _hide: boolean;
  extend?: any;  // 扩展字段
}


export interface BasePage {
  id: string;
  name: string;
  desc: string;
  width: number;
  height: number;
  thumb?: string;
  background: IPaint;
  layers: BaseLayer[];
}

// 图片
export interface ImageLayer extends BaseLayer {
  type: 'image';
  width: number;
  height: number;
  naturalHeight: number;
  naturalWidth: number;
  flipX: boolean;
  flipY: boolean;
  cropSize?: { x: number; y: number; width: number; height: number; };  //  裁剪参数
  svgColors?: string[];
  svgColorType?: UnionKey.SvgColorType;
  url: string;  // 图片链接
  cornerRadius: [number, number, number, number];  // 圆角
}

// 文本
export interface Textlayer extends BaseLayer {
  type: 'text';
  width: number;
  height: number;
  fontFamilyUrl: string;
  text: string;
  fill: string;
  textStyle: Partial<IText>;
}

// 形状: eg.矩形、线条...
export interface ShapeRectLayer extends BaseLayer {
  type: 'shape';
  shape: 'rect';
  width: number;
  height: number;
  cornerRadius: [number, number, number, number];  // 圆角
}

export interface ShapeEllipseLayer extends BaseLayer {
  type: 'shape';
  shape: 'ellipse';
  width: number;
  height: number;
  angleStart: number;
  angleEnd: number;
  innerRadius: number;
}

export interface ShapeLineLayer extends BaseLayer {
  type: 'shape';
  shape: 'line';
  width: number;
  rotation: number;
  toPoint: IPointData;
  cornerRadius: number;  // 圆角大小，使折线拐角处变的圆滑。
  points?: number[];  // 通过坐标组 [ x1,y1, x2,y2, ...] 绘制折线。
  curve?: boolean | number;  // 是否转换为平滑路径，默认为 false。  可设置 0 ～ 1 控制曲率，默认为 0.5。
}

export interface ShapePolygonLayer extends BaseLayer {
  type: 'shape';
  shape: 'polygon';
  width: number;
  height: number;
  sides: number; // 正多边形的边数，取值范围为 >=3。内部逻辑：在一个圆上每 (360 / sides) 度取一个点，再将点连成线，组成一个正多边形。
  cornerRadius: number; // 圆角大小，使折线拐角处变的圆滑。
  points?: number[]; // 通过坐标组 [ x1,y1, x2,y2, ...] 绘制折线。
  curve?: boolean | number; // 是否转换为平滑路径，默认为 false。  可设置 0 ～ 1 控制曲率，默认为 0.5。
}

export interface ShapeStarLayer extends BaseLayer {
  type: 'shape';
  shape: 'star';
  width: number;
  height: number;
  corners: number; // 星形的角数，取值范围为 >=3。  内部逻辑：在内外圆上每 (360 / corners) 度取一个点，再将点连成线，组成一个多角星形。
  innerRadius: number; // 内半径比例，默认 0.382，取值范围为 0.0 ～ 1.0。
  cornerRadius: number; //圆角大小，使折线拐角处变的圆滑。
}

// 组
export interface GroupLayer extends BaseLayer {
  type: 'group';
  children: BaseLayer[];
}

// 图表
export interface ChartLayer extends BaseLayer {
  width: number;
  height: number;
  data: Record<string, any>;
  options: Record<string, any>;
}

export interface ControlChangeValues {
  elId: string;  // 目标元素ID
  x: number;
  y: number;
  alpha?: number;
  width: number;
  height: number;
  rotation: number;
}

export interface InjectParams {
  parent?: IRect;
  data?: any;
}

export interface PageSizeType {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: UnionKey.UnitType;
  icon: JSX.Element;
}

// 每个layer传入的参数
export interface LayerProps {
  hide: boolean;
  lock: boolean;
  zIndex: number;
  isGroup?: boolean;  // 是否分组
  layer: BaseLayer;
  dirty: string;
  parent?: Group;
  store: CoreStore;
  mode: UnionKey.DesignMode;
}

export type RecordMap = {
  elDelete: BaseLayer[];
  elCreate: BaseLayer[];
  elUpdate: BaseLayer[];
  global: BasePage;
}

export interface RecordItem<T> {
  desc: string;
  type: T;
  selecteds?: string[];
  data?: T extends keyof RecordMap ? RecordMap[T] : never;
  mdata?: BasePage;
}

export interface RecordManager {
  add: (item: RecordItem<UnionKey.RecordType>) => void;
  debounceAdd: (item: RecordItem<UnionKey.RecordType>) => void;
  redo: () => void;
  undo: () => void;
  manager: any;
}