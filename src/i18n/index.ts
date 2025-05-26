import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';
import ja_JP from '@douyinfe/semi-ui/lib/es/locale/source/ja_JP';

const localeMap = {
  'zh_CN': zh_CN,
  'en_US': en_US,
  'ja_JP': ja_JP,
};

export type LocaleMapType =  keyof typeof localeMap;

export { localeMap };