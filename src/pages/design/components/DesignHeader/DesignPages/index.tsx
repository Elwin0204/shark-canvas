import TipButton from "@/components/ui/TipButton";
import DesignPagesIcon from "@/assets/icons/design-pages.svg";

interface Props {
  onClick: () => void;
}

const DesignPages: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="多页面" icon={ <DesignPagesIcon /> } onClick={onClick} />
  );
}

export default DesignPages;