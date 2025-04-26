import { appStore } from "@/stores";
import classNames from "classnames";
import { Outlet, useLocation } from "react-router";
import "./BaseLayout.less";
import AppSider from "./components/AppSider";
import { observer } from "mobx-react-lite";

const BaseLayout: React.FC = observer(() => {
  const { pathname } = useLocation();
  const asideWidth = appStore.collapse
    ? pathname && pathname.indexOf("/design") !== -1
      ? "sider-zero-width"
      : "sider-collapse-width"
    : "sider-width";
  const asideBoardVisible = !(pathname === "/design" && appStore.collapse);
  return (
    <div className={classNames("size-full flex transition-all-300")}>
      <aside
        className={classNames(
          "h-full overflow-hidden transition-all-300",
          asideWidth,
          { "sider-border-r": asideBoardVisible }
        )}
      >
        <AppSider collapse={appStore.collapse} />
      </aside>
      <main className={classNames("h-full flex-1 bg-green")}>
        <Outlet />
      </main>
    </div>
  );
});

export default BaseLayout;
