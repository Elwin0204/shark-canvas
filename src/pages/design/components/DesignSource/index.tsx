import { useMemo } from "react";
import SourceImage from "./SourceImage";
import SourceText from "./SourceText";
import SourceTemplate from "./SourceTemplate";
import SourceSticker from "./SourceSticker";
import SourceMore from "./SourceMore";
import SourceTabs from "./SourceTabs";

interface Props {
  sourceType: UnionKey.SourceType;
}

const DesignSource: React.FC<Props> = ({ sourceType }) => {
  const sourceIndex = ['projects','pages', 'layers',].includes(sourceType) ? 'tabs' : sourceType;
  const sourceMap = useMemo(() => ({
    tabs: <SourceTabs />,
    template: <SourceTemplate />,
    image: <SourceImage />,
    text: <SourceText />,
    sticker: <SourceSticker />,
    more: <SourceMore />
  }), []);

  type SourceMapKey = keyof typeof sourceMap;
  return sourceMap[sourceIndex as SourceMapKey];
}

export default DesignSource;