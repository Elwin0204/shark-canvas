import React from "react";
import lazyLoad from "@/router/shared/lazyLoad";
import { ExtendedRouteObject } from "@/typings/router";

// 错误页面路由
const errorRouter: Array<ExtendedRouteObject> = [
  {
    path: "/error/403",
    element: lazyLoad(React.lazy(() => import("@/pages/error/403"))),
    meta: {
      auth: false,
      title: "403页面",
    },
  },
  {
    path: "/error/404",
    element: lazyLoad(React.lazy(() => import("@/pages/error/404"))),
    meta: {
      auth: false,
      title: "404页面",
    },
  },
  {
    path: "/error/500",
    element: lazyLoad(React.lazy(() => import("@/pages/error/500"))),
    meta: {
      auth: false,
      title: "500页面",
    },
  },
];

export default errorRouter;
