import { Tooltip } from "@douyinfe/semi-ui";
import { Position } from "@douyinfe/semi-ui/lib/es/tooltip";
import classNames from "classnames";
import "./style.less";

interface Props {
  icon?: React.ReactNode;
  content?: string;
  position?: Position;
  text?: string;
  iconClass?: string;
  buttonClass?: string;
  link?: string;
  onClick?: () => void;
}

const TipButton: React.FC<Props> = ({ icon, content, position, text, iconClass, buttonClass, link, onClick }) => {
  return (
    <Tooltip content={content} position={ position || 'bottom' }>
      {link ? (<a href={link} target="_blank">
        <button type="button" className={classNames("tip-button transition-all-300", buttonClass)}>
          <i className={classNames("svg-icon text-20px", {"mr-5px": !!text}, iconClass)}>{icon}</i>
          <span>{text}</span>
        </button>
      </a>) : (<button type="button" className={classNames("tip-button transition-all-300", buttonClass)} onClick={onClick}>
        <i className={classNames("svg-icon text-20px",{"mr-5px": !!text}, iconClass)}>{icon}</i>
        <span>{text}</span>
      </button>)}
    </Tooltip>
  );
}

export default TipButton;