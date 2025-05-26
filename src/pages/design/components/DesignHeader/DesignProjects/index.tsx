import TipButton from "@/components/ui/TipButton";
import DesignProjectsIcon from "@/assets/icons/design-projects.svg";

interface Props {
  onClick: () => void;
}

const DesignProjects: React.FC<Props> = ({ onClick }) => {
  return (
    <TipButton content="工程列表" icon={ <DesignProjectsIcon /> } onClick={onClick} />
  );
}

export default DesignProjects;