import Login from "@/components/common/login";
import DesignExport from "./DesignExport";

const DesignHeader = () => {
  return (
    <div className="size-full flex justify-between items-center">
      <section></section>
      <section className="flex items-center">
        <DesignExport />
        <Login />
      </section>
    </div>
  );
};

export default DesignHeader;
