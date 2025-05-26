import { Popover } from "@douyinfe/semi-ui";
import classNames from "classnames";
import "./style.less";
import { DESIGN_SIZE_OPTIONS } from "@/constants/app";
import CheckIcon from "@/assets/icons/check.svg";

interface Props {
  text?: string;
}

const DesignSizeHandler: React.FC<Props> = ({ text }) => {
  const Options = () => {
    const setOption = () => {}
    return (<ul className="py-8px">
      {DESIGN_SIZE_OPTIONS.map((item) => {
        return (<li className="h-40px px-16px py-8px" onClick={setOption}>
          <span>{item.label}</span>
          <i className="svg-icon"><CheckIcon /></i>
        </li>);
      })}
    </ul>);
  };
  return (
    <Popover position="top" trigger="click" content={Options}>
      <button type="button" className={classNames("design-size-button transition-all-300")}>
        {text}
      </button>
    </Popover>
  );
};

export default DesignSizeHandler;