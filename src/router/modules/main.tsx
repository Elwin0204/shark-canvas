import BaseLayout from "@/layouts/BaseLayout";
import { ExtendedRouteObject } from "@/typings/router";
import lazyLoad from "../shared/lazyLoad";
import React from "react";

const mainRoutes: Array<ExtendedRouteObject> = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: lazyLoad(React.lazy(() => import('@/pages/main/home'))),
        meta: {
          auth: false,
          title: '首页',
          i18nKey: 'home'
        }
      },
      {
        path: 'project',
        element: lazyLoad(React.lazy(() => import('@/pages/main/project'))),
        meta: {
          auth: false,
          title: '项目',
          i18nKey: 'project'
        }
      },
      {
        path: 'template',
        element: lazyLoad(React.lazy(() => import('@/pages/main/template'))),
        meta: {
          auth: false,
          title: '模板',
          i18nKey: 'template'
        }
      },
      {
        path: 'ai',
        element: lazyLoad(React.lazy(() => import('@/pages/main/ai'))),
        meta: {
          auth: false,
          title: 'AI',
          i18nKey: 'template'
        }
      }
    ]
  }
];

export default mainRoutes;