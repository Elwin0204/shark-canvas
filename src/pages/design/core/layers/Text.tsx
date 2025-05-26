import { LayerProps, Textlayer } from "@/typings/core";
import { Box, IText } from "leafer-ui";
import { useEffect, useMemo } from "react";
import { loadFont, toInt } from "../shared/utils";
import useLayerBaseStyle from "../hooks/useLayerBaseStyle";

const TextComp: React.FC<LayerProps> = (props) => {
  const layer = props.layer as Textlayer;

  const textBox = useMemo(() => {
    if(layer.textStyle.fontFamily === '思源黑体' || layer.textStyle.fontFamily === 'Default') {
      layer.textStyle.fontFamily = 'Arial, sans-serif';
    }

    const box = new Box({
      editable: props.isGroup ? false : true,
      x: layer.x,
      y: layer.y,
      width: 0,
      height: 0,
      rotation: layer.rotation,
      opacity: layer.opacity,
      fill: layer.fill || 'rgba(0,0,0,0)',
      shadow: {...layer.shadow},
      stroke: layer.border.stroke,
      strokeWidth: layer.border.visible ? layer.border.strokeWidth : 0,
      children: [
        {
          tag: 'Text',
          text: layer.text,
          strokeCap: 'square',
          textAlign: 'center',
          strokeJoin: 'round',
          verticalAlign: 'top',
          ...layer.textStyle,
          fontFamily: '',
        }
      ]
    });

    box.id = layer.id;
    box.zIndex = props.zIndex;
    props.parent!.add(box);

    return box;
  }, []);

  const resizeText = () => {
    const textEl = textBox.children[0] as IText;
    switch(textEl.textAlign) {
      case 'center':
        textEl.x = textEl.getBounds('box', 'local').width / 2;
        break;
      case 'left':
        textEl.x = 0;
        break;
      case 'right':
        textEl.x = textEl.getBounds('box', 'local').width;
        break;
    }
    textEl.height = undefined;
    textEl.width = undefined;
  };

  useEffect(() => {
    const textEl = textBox.children[0] as IText;
    textBox.fill = layer.fill;
    textEl.text = layer.text;
    Object.assign(textEl, {
      fontWeight: 'normal',
      italic: false,
      textDecoration: 'none',
      textAlign: 'left',
      fill: '#000000'
    }, layer.textStyle);

    resizeText();
  }, [layer.fill, layer.text, layer.textStyle, layer._dirty]);

  useEffect(() => {
    if(layer.fontFamilyUrl) {
      const textEl = textBox.children[0] as IText;
      textEl.fontFamily = 'Arial, sans-serif';
      loadFont(layer.textStyle.fontFamily!, layer.fontFamilyUrl).then(res => {
        textEl.fontFamily = layer.textStyle.fontFamily;
        resizeText();
      });
    }
  }, [layer.fontFamilyUrl, layer.textStyle.fontFamily]);

  useLayerBaseStyle(layer, textBox, props.store, props.zIndex);

  useEffect(() => {
    if(!layer.textStyle.letterSpacing) {
      layer.textStyle.letterSpacing = { value: 0, type: 'percent' };
      const textEl = textBox.children[0] as IText;
      textEl.letterSpacing = { value: 0, type: 'percent' };
    }

    if(!layer.textStyle.lineHeight) {
      layer.textStyle.lineHeight = { value: 150, type: 'percent' };
      const textEl = textBox.children[0] as IText;
      textEl.lineHeight = { value: 150, type: 'percent' };
    }

    const tempData = {
      width: layer.textStyle.width,
      fontSize: layer.textStyle.fontSize,
      strokeWidth: layer.textStyle.strokeWidth! as number
    };

    props.store.controlSelectFuns[layer.id] = () => {
      const textEl = textBox.children[0] as IText;
      tempData.width = textEl.width;
      tempData.fontSize = textEl.fontSize;
      tempData.strokeWidth = textEl.strokeWidth as number;
    };

    props.store.elDragUp[layer.id] = () => {
      const textEl = textBox.children[0] as IText;
      layer.textStyle.fontSize = textEl.fontSize;
      layer.textStyle.strokeWidth = textEl.strokeWidth;
      resizeText();
    }

    props.store.controlScaleFuns[layer.id] = () => {
      const textEl = textBox.children[0] as IText;
      textEl.x = 0;
      const fontScale = textEl.width! / tempData.width!;
      const fontSize = toInt(Math.max(tempData.fontSize! * fontScale, 1), 2);
      const strokeWidth = toInt(Math.max(tempData.strokeWidth * fontScale), 2);
      textEl.fontSize = fontSize;
      textEl.strokeWidth = strokeWidth;

      layer.textStyle.fontSize = fontSize;
      layer.textStyle.strokeWidth = strokeWidth;
    };

    return () => {
      delete props.store.controlSelectFuns[layer.id];
      delete props.store.controlScaleFuns[layer.id];
      delete props.store.elDragUp[layer.id];
      textBox.remove();
      textBox.destroy();
    };
  }, []);

  return null;
};

export default TextComp;