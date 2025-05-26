import { ImageLayer, LayerProps } from "@/typings/core";
import { Box, Image } from "leafer-ui";
import { useEffect, useMemo, useRef } from "react";
import useLayerBaseStyle from "../hooks/useLayerBaseStyle";
import { getFileExt, replaceSvgColor } from "../shared/utils";

const ImageComp: React.FC<LayerProps> = (props) => {
  const layer = props.layer as ImageLayer;
  const svgStr = useRef('');
  const [imgBox, imgUI] = useMemo<[Box, Image]>(() => {
    const box = new Box({
      editable: props.isGroup ? false : true,
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      rotation: layer.rotation,
      opacity: layer.opacity,
      fill: 'rgba(0,0,0,0)',
      hoverStyle: {
        stroke: '#000',
      }
    });
    box.id = layer.id;
    box.zIndex = props.zIndex;
    const img = new Image({
      fill: {
        type: 'image',
        mode: 'clip',
        url: props.store.setURL(layer.url),
      },
      around: 'center',
      x: layer.width / 2,
      y: layer.height / 2,
      width: layer.width,
      height: layer.height,
      cornerRadius: [...layer.cornerRadius],
      shadow: {...layer.shadow},
      stroke: layer.border.stroke,
      dashOffset: layer.border.dashOffset,
      strokeWidth: layer.border.visible ? layer.border.strokeWidth : 0
    });

    box.add(img as any);
    props.parent!.add(box);
    return [box, img];
  }, []);

  useLayerBaseStyle(layer, imgBox, props.store, props.zIndex);

  const replaceColor = (value: string) => {
    if(!layer.svgColorType) {
      layer.svgColorType = 'more';
    }
    if(layer.svgColorType === 'one') {
      if(layer.svgColors && layer.svgColors[0]) {
        value = replaceSvgColor(value, layer.svgColors[0] || '#000000');
      }
    } else {
      if(layer.svgColors && layer.svgColors.length) {
        value = replaceSvgColor(value, layer.svgColors);
      }
    }
    return 'data:image/svg+xml,' + encodeURIComponent(value);
  }

  const svgHTML = async (url: string) => {
    const ext = getFileExt(url);
    if(svgStr.current) {
      return replaceColor(svgStr.current);
    }
    if(ext === 'svg') {
      return await fetch(url).then(async res => {
        if(res.ok) {
          const txt = await res.text();
          svgStr.current = txt;
          return replaceColor(txt);
        }
        throw new Error('Network response was not ok');
      }).catch(err => {
        console.error('There has been a problem with your fetch operation:', err);
      })
    } else {
      return url;
    }
  }

  useEffect(() => {
    const url = props.store.setURL(layer.url);

    const { x, y, width, height } = layer.cropSize || {
      x: 0,
      y: 0,
      width: layer.naturalWidth,
      height: layer.naturalHeight
    };

    const scaleX = layer.width / width;
    const scaleY = layer.height / height;

    imgUI.width = layer.width;
    imgUI.height = layer.height;
    imgUI.x = layer.width / 2;
    imgUI.y = layer.height / 2;

    imgBox.width = layer.width;
    imgBox.height = layer.height;

    if(layer.flipX) {
      imgUI.scaleX = -1;
    } else {
      imgUI.scaleX = 1;
    }

    if(layer.flipY) {
      imgUI.scaleY = -1;
    } else {
      imgUI.scaleY = 1;
    }

    imgUI.cornerRadius = layer.cornerRadius ? [...layer.cornerRadius] : undefined;

    svgHTML(url).then(res => {
      imgUI.fill = {
        url: res || '',
        type: 'image',
        mode: 'clip',
        scale: { x: scaleX, y: scaleY },
        offset: { x: -x * scaleX, y: -y * scaleX }
      };
    });
  }, [layer.width, layer.height, layer.flipX, layer.flipY, layer.cornerRadius, layer.url, layer.cropSize, layer.svgColorType, layer.svgColors]);

  useEffect(() => {
    props.store.controlScaleFuns[layer.id] = () => {
      imgUI.width = layer.width;
      imgUI.height = layer.height;
      imgUI.x = layer.width / 2;
      imgUI.y = layer.height / 2;

      const { x, y, width, height } = layer.cropSize || {
        x: 0,
        y: 0,
        width: layer.naturalWidth,
        height: layer.naturalHeight
      };

      const scaleX = layer.width / width;
      const scaleY = layer.height / height;

      svgHTML(props.store.setURL(layer.url)).then(res => {
        imgUI.fill = {
          url: res || '',
          type: 'image',
          mode: 'clip',
          scale: { x: scaleX, y: scaleY },
          offset: { x: -x * scaleX, y: -y * scaleX }
        };
      });
    };

    return () => {
      delete props.store.controlScaleFuns[layer.id];
      imgBox.remove();
    };
  }, []);

  return null;
}

export default ImageComp;