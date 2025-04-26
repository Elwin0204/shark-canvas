import { Button } from "@douyinfe/semi-ui";
import ExportDesignIcon from "@/assets/icons/export-design.svg";

const DesignExport: React.FC = () => {
  const exportDesign = () => {
    console.log("exportDesign");
  };
  return (
    <Button
      icon={
        <i className="svg-icon">
          <ExportDesignIcon />
        </i>
      }
      onClick={exportDesign}
    >
      导出
    </Button>
  );
};

export default DesignExport;
