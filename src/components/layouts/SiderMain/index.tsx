import BrandIcon from "@/assets/images/logo.png";
import CloseIcon from "@/assets/icons/close.svg";
import ClientImg from "@/assets/images/client.png";
import AddIcon from "@/assets/icons/add-design.svg";
import "./style.less";

const SiderMain = () => {
  return (
    <div className="sider-main px-12px">
      <div className="flex items-center h-60px">
        <img src={BrandIcon} alt="brand" className="w-36px h-36px" />
        <span className="brand-text text-24px font-bold italic -mt-1 px-12px tracking-wider">
          鲨画
        </span>
      </div>
      <div className="my-12px">
        <button className="btn-create flex items-center justify-center h-40px w-100% rounded-md px-15px outline-none border-none cursor-pointer transition-all-300">
          <i className="svg-icon text-24px mr-5px">
            <AddIcon />
          </i>
          <span className="text-14px">新建设计</span>
        </button>
      </div>
      <div className="client-download relative rounded-md p-12px overflow-hidden">
        <i className="svg-icon absolute right-10px top-10px">
          <CloseIcon />
        </i>
        <div className="mt-20px">
          <img src={ClientImg} alt="客户端" className="max-w-full h-auto" />
        </div>
        <p className="client-desc text-14px my-12px leading-normal">
          下载Shark鲨画客户端，获取更稳定流畅的编辑体验
        </p>
        <button className="btn-download h-40px w-100% rounded-md px-15px py-8px text-center font-bold outline-none border-none bg-transparent cursor-pointer transition-all-300">
          下载桌面客户端
        </button>
      </div>
    </div>
  );
};

export default SiderMain;
