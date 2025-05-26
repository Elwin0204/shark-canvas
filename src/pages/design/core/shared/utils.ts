import { nanoid } from 'nanoid';
import type { IUI } from '@leafer-ui/interface';

// 生成一个唯一ID
export function createID(n?: number) {
  return nanoid(n? n : 10);
}

export function toInt(n: number, m?: number) {
  if(m === undefined) {
    m = 0;
  }
  if(n === null || n === undefined) {
    n = 0;
  }
  try {
    let v = Number(n.toFixed(m));
    if(isNaN(v)) {
      v = 0;
    }
    return v;
  } catch(err) {
    console.error(err);
    return 0;
  }
}

// 获取目标元素的id
export function getIdsFromUI(target: IUI | IUI[]) {
  if(target instanceof Array) {
    return target.map((item) => item.id);
  } else {
    return [target.id];
  }
}

// 替换svg颜色
export function replaceSvgColor(svgStr: string, newColor: string | string[]) {
  const parser = new DOMParser();
  const svg = parser.parseFromString(svgStr, 'image/svg+xml').querySelector('svg');

  const els = svg?.querySelectorAll('[fill], [stroke]');
  let index = 0;
  els?.forEach((el) => {
    const fill = el.getAttribute('fill');
    const stroke = el.getAttribute('stroke');
    if(typeof newColor === 'string') {
      if(fill && fill !== 'none') {
        el.setAttribute('fill', newColor || '#000000');
      }
      if(stroke && stroke !== 'none') {
        el.setAttribute('stroke', '#000000');
      }
      index++;
    } else {
      if(fill && fill !== 'none') {
        el.setAttribute('fill', newColor[index] || '#000000');
        index++;
      }
      if(stroke && stroke !== 'none') {
        el.setAttribute('stroke', newColor[index] || '#000000');
        index++;
      }
    }
  });

  const serializer = new XMLSerializer();
  return serializer.serializeToString(svg!);
}

// 获取url文件扩展名
export function getFileExt(filePath: string) {
  const fileName = filePath.split('/').pop();
  const ext = fileName?.split('.').pop();

  return ext?.split('?')[0];
}

// 加载字体
if(!window._hasLoadFonts) {
  window._hasLoadFonts = {};
}

export async function loadFont(fontFamily: string, url: string) {
  if(window._hasLoadFonts[fontFamily]) {
    console.log('The font has been loaded:', fontFamily);
    return true;
  }

  window._hasLoadFonts[fontFamily] = true;

  if(fontFamily && !url) {
    url = `/assets/fonts/${fontFamily}/font.woff`;
  }

  if(url) {
    const preFont = new FontFace(fontFamily, `url("${url}")`);
    try {
      const res = await preFont.load();
      document.fonts.add(res);
      return true;
    } catch(err) {
      console.log('Error loading font resources', url);
    }
  } else {
    console.log('The font resource file does not exist.');
  }

  return false;
}