import { RouteObject } from "react-router";

export interface RouteMeta {
  title?: string;
  i18nKey?: string;
  icon?: string;
  hidden?: boolean;
  affix?: boolean;
  type?: string;
  link?: string;
  sort?: number;
  keepAlive?: boolean;
  auth?: boolean;
  roles?: string[];
}

export interface ExtendedRouteObject extends RouteObject {
  path?: string;
  key?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  index?: any;
  element?: ReactNode;
  children?: ExtendedRouteObject[];
  meta?: RouteMeta;
}

type EagerModuleExports = {
  default: ExtendedRouteObject[];
};

export type EagerRouteModules = {
  [key: string]: EagerModuleExports;
};
