import { ConfigProvider } from "@douyinfe/semi-ui";
import { appStore } from "./stores";
import Router from "@/router/index";
import { BrowserRouter } from "react-router";
import { useTheme } from "./hooks";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const { locale } = appStore;
  useTheme();
  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
})

export default App;
