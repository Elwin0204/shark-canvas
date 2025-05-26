import { Navigate, useRoutes } from 'react-router'
import Login from '@/pages/login'
import { EagerRouteModules, ExtendedRouteObject } from '@/typings/router'

const metaRoutes: EagerRouteModules = import.meta.glob("./modules/*.tsx", { eager: true })
export const routeArray: ExtendedRouteObject[] = [];

Object.keys(metaRoutes).forEach((path) => {
  const module = metaRoutes[path];
  routeArray.push(...module.default);
});

export const rootRoutes: ExtendedRouteObject[] = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      title: '登录',
      hidden: true
    }
  },
  ...routeArray,
  {
		path: "*",
		element: <Navigate to="error/404" />
	}
]

const Router = () => {
	const routes = useRoutes(rootRoutes);
	return routes;
};

export default Router;