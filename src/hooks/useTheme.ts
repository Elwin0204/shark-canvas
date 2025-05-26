import { themeStore } from "@/stores";
import { useEffect } from "react";

function useTheme() {
  const applyTheme = (themeMode: UnionKey.ThemeMode) => {
    const body = document.body;
    if(themeMode === 'dark') {
      body.setAttribute('theme-mode', 'dark');
    } else {
      body.removeAttribute('theme-mode');
    }
  }
  useEffect(() => {
    applyTheme(themeStore.themeMode);
  }, [themeStore.themeMode]);
}

export default useTheme;