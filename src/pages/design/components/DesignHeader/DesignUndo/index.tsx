import TipButton from "@/components/ui/TipButton";
import DesignUndoIcon from "@/assets/icons/undo.svg";

interface Props {
  onClick: () => void;
}

const DesignUndo: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="撤销" icon={ <DesignUndoIcon /> } onClick={onClick} />
  );
}

export default DesignUndo;