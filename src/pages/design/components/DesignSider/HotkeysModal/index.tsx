import { Modal } from "@douyinfe/semi-ui";
import { useState } from "react";
import './style.less';
import CopyIcon from "@/assets/icons/copy.svg";
import ClipIcon from "@/assets/icons/clip.svg";
import PasteIcon from "@/assets/icons/paste.svg";
import KeyboardIcon from "@/assets/icons/keyboard.svg";
import SelectAllIcon from "@/assets/icons/select-all.svg";
import SelectCancelIcon from "@/assets/icons/select-cancel.svg";
import MoveTop1Icon from "@/assets/icons/move-top1.svg";
import MoveBottom1Icon from "@/assets/icons/move-bottom1.svg";
import MoveTopIcon from "@/assets/icons/move-top.svg";
import MoveBottomIcon from "@/assets/icons/move-bottom.svg";
import DeleteIcon from "@/assets/icons/delete.svg";
import UndoIcon from "@/assets/icons/undo.svg";
import RedoIcon from "@/assets/icons/redo.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left-o.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right-o.svg";
import ArrowUpIcon from "@/assets/icons/arrow-up-o.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down-o.svg";
import ZoomInIcon from "@/assets/icons/zoom-in.svg";
import ZoomOutIcon from "@/assets/icons/zoom-out.svg";
import ZoomBestIcon from "@/assets/icons/zoom-best.svg";
import SaveIcon from "@/assets/icons/save.svg";
import { toChunkArr } from "@/utils";

const hotkeyList = [
  {
    name: '复制',
    icon: <CopyIcon />,
    win: 'Ctrl + C',
    mac: '⌘ + C',
  },
  {
    name: '剪切',
    win: 'Ctrl + X',
    mac: '⌘ + X',
    icon: <ClipIcon />,
  },
  {
    name: '粘贴',
    win: 'Ctrl + V',
    mac: '⌘ + V',
    icon: <PasteIcon />,
  },
  {
    name: '删除',
    win: 'Delete/Backspace',
    mac: 'Delete/Backspace',
    icon: <DeleteIcon />,
  },
  {
    name: '全选',
    win: 'Ctrl + A',
    mac: '⌘ + A',
    icon: <SelectAllIcon />,
  },
  {
    name: '取消选择',
    win: 'Ctrl + D',
    mac: '⌘ + D',
    icon: <SelectCancelIcon />,
  },
  {
    name: '上移一层',
    win: 'Ctrl + ]',
    mac: '⌘ + ]',
    icon: <MoveTop1Icon />,
  },
  {
    name: '下移一层',
    win: 'Ctrl + [',
    mac: '⌘ + [',
    icon: <MoveBottom1Icon />,
  },
  {
    name: '移到顶层',
    win: 'Ctrl + Shift + ]',
    mac: '⌘ + Shift + ]',
    icon: <MoveTopIcon />,
  },
  {
    name: '移到底层',
    win: 'Ctrl + Shift + [',
    mac: '⌘ + Shift + [',
    icon: <MoveBottomIcon />,
  },
  {
    name: '撤销',
    win: 'Ctrl + Z',
    mac: '⌘ + Z',
    icon: <UndoIcon />,
  },
  {
    name: '重做',
    win: 'Ctrl + Shift + Z',
    mac: '⌘ + Shift + Z',
    icon: <RedoIcon />,
  },
  {
    name: '右移1px',
    win: '→',
    mac: '→',
    icon: <ArrowRightIcon />,
  },
  {
    name: '左移1px',
    win: '←',
    mac: '←',
    icon: <ArrowLeftIcon />,
  },
  {
    name: '上移1px',
    win: '↑',
    mac: '↑',
    icon: <ArrowUpIcon />,
  },
  {
    name: '下移1px',
    win: '↓',
    mac: '↓',
    icon: <ArrowDownIcon />,
  },
  {
    name: '画布放大',
    win: 'Ctrl + +',
    mac: '⌘ + +',
    icon: <ZoomInIcon />,
  },
  {
    name: '画布缩小',
    win: 'Ctrl + -',
    mac: '⌘ + -',
    icon: <ZoomOutIcon />,
  },
  {
    name: '画布调至最佳尺寸',
    win: 'Ctrl + 0',
    mac: '⌘ + 0',
    icon: <ZoomBestIcon />,
  },
  {
    name: '保存',
    win: 'Ctrl + S',
    mac: '⌘ + S',
    icon: <SaveIcon />,
  },
];

const HotkeysModal = () => {
  const [visible, setVisible] = useState(false);

  const [leftList, rightList] = toChunkArr(hotkeyList, Math.ceil(hotkeyList.length / 2));
  const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
  const platform = isMac ? 'mac' : 'win';

  return (
    <>
      <Modal
        width={1000}
        title="快捷键"
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <div className="hotkey-body h-full flex justify-between pb-30px">
          <ul className="hotkey-list mx-30px">
            { leftList.map((item, index) => {
              return (<li className="flex justify-between items-center h-40px leading-normal" key={index}>
                <span className="flex items-center">
                  <i className="svg-icon text-24px mr-5px">
                    { item.icon }
                  </i>
                  <span>{ item.name }</span>
                </span>
                <span>{ item[platform] }</span>
              </li>)
            }) }
          </ul>
          <div className="devider -min-h-520px w-1px"></div>
          <ul className="hotkey-list mx-30px">
            { rightList.map((item, index) => {
              return (<li className="flex justify-between items-center h-40px leading-normal" key={index}>
                <span className="flex items-center">
                  <i className="svg-icon text-24px mr-5px">
                    { item.icon }
                  </i>
                  <span>{ item.name }</span>
                </span>
                <span>{ item[platform] }</span>
              </li>)
            }) }
          </ul>
        </div>
      </Modal>
      <i className="svg-icon hotkeys text-32px cursor-pointer transition-all-300" onClick={() => setVisible(true)}>
        <KeyboardIcon />
      </i>
    </>
  );
}

export default HotkeysModal;