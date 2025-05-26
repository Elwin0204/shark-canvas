import TipButton from "@/components/ui/TipButton";
import DesignSaveIcon from "@/assets/icons/save.svg";

interface Props {
  onClick: () => void;
}

const DesignSave: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="保存" icon={ <DesignSaveIcon /> } onClick={onClick} />
  );
}

export default DesignSave;