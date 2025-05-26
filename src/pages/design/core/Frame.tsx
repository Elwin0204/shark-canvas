import { BasePage } from "@/typings/core"
import { Frame, IFrame } from "leafer-ui";
import { helper } from './shared';
import { useEffect, useMemo } from "react";

export interface IFrameProps {
  data: BasePage;
  parent?: IFrame;
  children?: JSX.Element | JSX.Element[];
}

const FrameComp: React.FC<IFrameProps> = ({ data, parent, children }) => {
  const { width, height, background } = data;
  const frame = useMemo(() => {
    const fra = new Frame({ width, height, overflow: 'hide', fill: background });
    fra.name = 'frame';
    parent?.add(fra);
    return fra;
  }, []);

  useEffect(() => {
    frame.width = width;
    frame.height = height;
    frame.fill = background;
  }, [width, height, background]);

  useEffect(() => {
    return () => {
      frame.removeAll(true);
    };
  }, []);

  return (
    <>{ helper.childrenInjectProps({ parent: frame }, children) }</>
  );
}

export default FrameComp;