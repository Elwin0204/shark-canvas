import FoldLeftIcon from "@/assets/icons/fold-left.svg";
import FoldRightIcon from "@/assets/icons/fold-right.svg";
import classNames from "classnames";
import './style.less';
import { appStore } from "@/stores";

interface Props {
  collapse: boolean;
}

const SiderCollapse: React.FC<Props> = ({ collapse }) => {
  const toggleCollapse = () => {
    appStore.toggleSider();
  }

  return (
    <div className='collapse-wrapper h-50px w-full flex flex-col justify-center items-center rounded-xl mx-1 p-1.5 cursor-pointer transition-all-300' onClick={toggleCollapse}>
      <i className={classNames('svg-icon text-32px')}>
        { collapse ?  <FoldRightIcon/> : <FoldLeftIcon /> }
      </i>
    </div>
  );
}

export default SiderCollapse;