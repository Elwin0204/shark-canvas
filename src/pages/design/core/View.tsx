import { BaseLayer, BasePage, ExLayer } from "@/typings/core";
import FrameComp from "./Frame";
import RecordManager from "./Record";
import { useEffect, useMemo, useState } from "react";
import CoreStore from "./store";
import { App, PointerEvent, DragEvent } from "leafer-ui";
import { ScrollBar } from "@leafer-in/scroll";
import { Ruler } from "leafer-x-ruler";
import RotateIcon from "@/assets/images/rotate.png";
import { EditorEvent, EditorMoveEvent, EditorRotateEvent, EditorScaleEvent } from "@leafer-in/editor";
import { utils } from "./shared";
import { debounce } from "throttle-debounce";
import { addListener, removeListener } from "resize-detector";
import ImageLayer from "./layers/Image";
import TextLayer from "./layers/Text";

export interface IViewProps {
  designMode: UnionKey.DesignMode;
  data: BasePage;
  target: HTMLElement;  // canvas放入的dom容器
  resourceHost: string;  // 资源文件前缀
  exLayers?: ExLayer[];  // 扩展组件
  callback?: (store: CoreStore) => void;
  onControlRotate?: (e: EditorEvent) => void;
  onControlScale?: (e: EditorEvent) => void;
  onControMove?: (e: EditorEvent) => void;
  onContextMenu?: (e: EditorEvent, layers: BaseLayer[]) => void;
  onControlSelect?: (e: EditorEvent, ids: string[]) => void;
  onDragUp?: (e: EditorEvent) => void;
}

const View: React.FC<IViewProps> = ({ designMode, data, target, resourceHost, exLayers, callback, onControlRotate, onControlScale, onControMove, onContextMenu, onControlSelect, onDragUp }) => {
  const store = useMemo<CoreStore>(() => {
    const s = new CoreStore();

    return s;
  }, []);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const app =  new App({
      view: target,
      editor: {
        lockRatio: 'corner',
        stroke: '#3f99f7',
        skewable: false,
        hover: false,
        middlePoint: { cornerRadius: 100, width: 20, height: 6 },
        rotatePoint: {
          width: 20,
          height: 20,
          fill: {
            type: 'image',
            url: RotateIcon
          },
        },
      },
      tree: {
        usePartRender: true,
      },
      sky: {
        type: 'draw',
        usePartRender: true,
      }
    });

    store.app = app.tree;
    store.editor = app.editor;

    setLoaded(true);

    if(designMode === 'editor') {
      app.editor.on(EditorRotateEvent.ROTATE, (e: EditorEvent) => {
        const list = (e as any).current.leafList.list;
        const ids = list.map((item: any) => item.id);
        const layers = store.getLayerByIds(ids);

        list.forEach((box: any) => {
          const layer = layers.find((item) => item.id === box.id) as BaseLayer;
          if(layer) {
            layer.rotation = box.rotation;
            layer.x = utils.toInt(box.x);
            layer.y = utils.toInt(box.y);
          }
        });

        if(onControlRotate) {
          onControlRotate(e);
        }
      });

      app.editor.on(EditorScaleEvent.SCALE, (e: EditorEvent) => {
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map((item: any) => item.id));

        const setGroupChildrenSize = (node: any) => {
          const ids = node.children.map((item: any) => item.id);
          const innerLayers = store.getLayerByIds(ids);
          node.children.forEach((item: any) => {
            const inLayer = innerLayers.find((item2: any) => item2.id === item.id) as any;
            inLayer.width = item.width;
            inLayer.height = item.height;

            if(inLayer.type === 'text') {
              inLayer.x = item.x;
              inLayer.y = item.y;
            }
            if(inLayer.type === 'group') {
              setGroupChildrenSize(item);
            }
          });
        };

        // 数据同步
        list.forEach((item: any) => {
          const layer = layers.find((item2: any) => item2.id === item.id) as any;
          if(layer.type === 'text') {
            layer.x = item.x;
            layer.y = item.y;
          } else {
            layer.width = item.width;
            layer.height = item.height;
          }

          const func = store.controlScaleFuns[layer.id];
          if(func) {
            func();
          }

          if(layer.type === 'group') {
            setGroupChildrenSize(item);
          }
        });

        if(onControlScale) {
          onControlScale(e);
        }
      });

      app.editor.on(EditorMoveEvent.MOVE, (e: EditorEvent) => {
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map((item: any) => item.id));

        list.forEach((item: any) => {
          const layer = layers.find((item2: any) => item2.id === item.id);
          if(layer) {
            layer.x = item.x;
            layer.y = item.y;
          }
        });
        if(onControMove) {
          onControMove(e);
        }
      });

      app.editor.on(PointerEvent.MENU, (e: any) => {
        const list = e.current.leafList.list;
        const layers = store.getLayerByIds(list.map((item: any) => item.id));
        if(onContextMenu) {
          onContextMenu(e, layers);
        }
      });

      app.editor.on(EditorMoveEvent.SELECT, (e: EditorEvent) => {
        const ids: string[] = [];
        if(e.value) {
          if(e.value instanceof Array) {
            e.value.forEach((item: any) =>  {
              ids.push(item.id);
            });
          } else {
            ids.push((e.value as any).id);
          }
        }

        const layers = store.getLayerByIds(ids);
        if(layers.length > 1) {
          app.editor.config.lockRatio = true;
        } else {
          app.editor.config.lockRatio = 'corner';
        }

        ids.forEach((id) => {
          const func = store.controlSelectFuns[id];
          if(func) {
            func();
          }
        });

        if(onControlSelect) {
          onControlSelect(e, ids);
        }
      });

      app.editor.on(DragEvent.UP, (e) => {
        const elIds = utils.getIdsFromUI(store.editor.target!) as string[];
        if(elIds.length) {
          elIds.forEach((id) => {
            const func = store.elDragUp[id];
            if(func) {
              func();
            }
          });
        }

        store.record?.add({
          type: 'update',
          desc: '控制器鼠标抬起',
          selecteds: [...elIds],
        });
        if(onDragUp) {
          onDragUp(e);
        }
      });

      new ScrollBar(app);
      // 标尺
      const ruler = new Ruler(app);
      ruler.addTheme('dark2', {
        backgroundColor: '#16161a',
        textColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#686868',
        highlightColor: 'rgba(0, 102, 255, 0.5)'
      });
      store.ruler = ruler;
    }

    const onResize = debounce(100, () => {
      store.autoViewSize();
    });

    addListener(target, onResize);

    setTimeout(() => {
      store.autoViewSize();
    }, 100);

    if(callback) {
      callback(store);
    }

    return () => {
      removeListener(target, onResize);
    };
  }, [target, store]);

  useEffect(() => {
    if(store) {
      store.data = data;
    }
  }, [data]);

  if(!loaded) {
    return;
  }

  return (
    <>
      <FrameComp  data={{ ...data }} parent={store.app as any}>
        {data.layers.map((layer, i) => {
          switch(layer.type) {
            case 'image':
              return (
                <ImageLayer
                  key={layer.id}
                  hide={layer._hide}
                  lock={layer._lock}
                  dirty={layer._dirty}
                  zIndex={99999 - i}
                  layer={layer}
                  store={store}
                  mode={designMode}
                />
              ); 
            case 'text':
              return (
                <TextLayer
                  key={layer.id}
                  hide={layer._hide}
                  lock={layer._lock}
                  dirty={layer._dirty}
                  zIndex={99999-i}
                  layer={layer}
                  store={store}
                  mode={designMode}
                />);
            case 'group':
              return <div>123</div>;
            default:
              const exLayer = exLayers?.find((item) => item.config.pid === layer.type);
              if(exLayer) {
                const LayerComp = exLayer.layer as any;
                return (
                  <LayerComp
                    key={layer.id}
                    hide={layer._hide}
                    lock={layer._lock}
                    dirty={layer._dirty}
                    zIndex={99999-i}
                    layer={layer}
                    store={store}
                    mode={designMode}
                  />
                );
              }
          }
          return <></>;
        })}
      </FrameComp>
      { designMode === 'editor' &&  <RecordManager store={store} /> }
    </>
  );
}

export default View;