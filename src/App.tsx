import { ConfigProvider } from "@douyinfe/semi-ui";
import { appStore } from "./stores";
import Router from "@/router/index";
import { BrowserRouter } from "react-router";

function App() {
  const { locale } = appStore;

  return (
    <ConfigProvider locale={locale}>
      <BrowserRouter basename="/shark-canvas">
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
