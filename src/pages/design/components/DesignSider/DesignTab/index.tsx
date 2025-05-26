import TemplateIcon from '@/assets/icons/template.svg';
import ImageIcon from '@/assets/icons/image.svg';
import TextIcon from '@/assets/icons/text.svg';
import StickerIcon from '@/assets/icons/sticker.svg';
import MoreIcon from '@/assets/icons/more.svg';
import classNames from 'classnames';
import './style.less';
import { designStore } from '@/stores';

const tabList = [
  {
    icon: <TemplateIcon />,
    title: '模板',
    name: 'template',
  },
  {
    icon: <ImageIcon />,
    title: '图片',
    name: 'image',
  },
  {
    icon: <TextIcon />,
    title: '文本',
    name: 'text',
  },
  {
    icon: <StickerIcon />,
    title: '贴纸',
    name: 'sticker',
  },
  {
    icon: <MoreIcon />,
    title: '更多',
    name: 'more',
  }
];

const DesignTab: React.FC = () => {
  return (
    <ul className="flex flex-col gap-16px design-tab">
      {tabList.map((item, index) => (
        <li className={classNames('design-tab-item flex flex-col justify-center items-center gap-1 rounded-xl mx-1 p-1.5 cursor-pointer transition-all-300', { 'is-active': false })} key={index} onClick={() => designStore.setsourceType(item.name as UnionKey.SourceType)}>
          <i className="text-32px svg-icon">{ item.icon }</i>
          <span className="text-12px">{ item.title }</span>
        </li>
      ))}
    </ul>
  );
}

export default DesignTab;