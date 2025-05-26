import TipButton from "@/components/ui/TipButton";
import DesignRedoIcon from "@/assets/icons/redo.svg";

interface Props {
  onClick: () => void;
}

const DesignRedo: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="重做" icon={ <DesignRedoIcon /> } onClick={onClick} />
  );
}

export default DesignRedo;