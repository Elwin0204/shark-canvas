import Login from "@/components/common/login";
import DesignExport from "./DesignExport";
import Github from "@/components/layouts/Github";
import ThemeMode from "@/components/layouts/ThemeMode";
import DesignProjects from "./DesignProjects";
import DesignPages from "./DesignPages";
import DesignLayers from "./DesignLayers";
import DesignSave from "./DesignSave";
import DesignUndo from "./DesignUndo";
import DesignRedo from "./DesignRedo";

interface Props {
  themeMode: UnionKey.ThemeMode;
  themeClick: () => void;
  projectsClick: () => void;
  pagesClick: () => void;
  layersClick: () => void;
  saveClick: () => void;
  undoClick: () => void;
  redoClick: () => void;
}

const DesignHeader: React.FC<Props> = ({ themeMode, themeClick, projectsClick, pagesClick, layersClick, saveClick, undoClick, redoClick }) => {
  return (
    <div className="size-full flex justify-between items-center px-6">
      <section className="flex items-center gap-1">
        <DesignProjects onClick={projectsClick} />
        <DesignPages onClick={pagesClick} />
        <DesignLayers onClick={layersClick} />
        <DesignSave onClick={saveClick} />
        <DesignUndo onClick={undoClick} />
        <DesignRedo onClick={redoClick} />
      </section>
      <section className="flex items-center gap-3">
        <Github />
        <ThemeMode themeMode={themeMode} themeClick={themeClick} />
        <DesignExport />
        <Login />
      </section>
    </div>
  );
}

export default DesignHeader;