import TrashIcon from '@/assets/icons/trash.svg';
import './style.less'

const SiderTrash: React.FC = () => {
  return (
    <div className='trash-wrapper mx-1 flex flex-col justify-center items-center gap-1 rounded-xl p-1.5 cursor-pointer transition-all-300'>
      <i className='svg-icon text-32px'>
        <TrashIcon />
      </i>
      <span className="text-12px">回收站</span>
    </div>
  );
}

export default SiderTrash;