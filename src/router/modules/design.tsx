import BaseLayout from "@/layouts/BaseLayout";
import { ExtendedRouteObject } from "@/typings/router";
import lazyLoad from "../shared/lazyLoad";
import React from "react";

const designRoutes: Array<ExtendedRouteObject> = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: 'design',
        element: lazyLoad(React.lazy(() => import('@/pages/design'))),
        meta: {
          auth: false,
          title: '设计',
          i18nKey: 'design'
        }
      }
    ]
  }
];

export default designRoutes;