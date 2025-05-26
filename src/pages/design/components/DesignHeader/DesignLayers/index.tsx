import TipButton from "@/components/ui/TipButton";
import DesignLayersIcon from "@/assets/icons/design-layers.svg";

interface Props {
  onClick: () => void;
}

const DesignLayers: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="图层列表" icon={ <DesignLayersIcon /> } onClick={onClick} />
  );
}

export default DesignLayers;