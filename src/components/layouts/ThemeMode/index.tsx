import TipButton from "@/components/ui/TipButton";
import ThemeLightIcon from "@/assets/icons/theme-light.svg";
import ThemeDarkIcon from "@/assets/icons/theme-dark.svg";

interface Props {
  themeMode: UnionKey.ThemeMode;
  themeClick: () => void;
}

const ThemeMode: React.FC<Props> = ({ themeMode, themeClick }) => {
  const ThemeIconMap = {
    auto: <ThemeLightIcon />,
    light: <ThemeLightIcon />,
    dark: <ThemeDarkIcon />
  };
  return (
    <TipButton content="切换主题" icon={ ThemeIconMap[themeMode] } onClick={themeClick} />
  );
}

export default ThemeMode;