import HomeIcon from "@/assets/icons/home.svg";
import ProjectIcon from "@/assets/icons/project.svg";
import TemplateIcon from "@/assets/icons/template.svg";
import AiIcon from "@/assets/icons/ai.svg";
import { Link, useLocation } from "react-router";
import "./style.less";
import classNames from "classnames";

const menuList = [
  {
    icon: <HomeIcon />,
    title: "首页",
    name: "home",
    link: "/",
  },
  {
    icon: <ProjectIcon />,
    title: "项目",
    name: "project",
    link: "/project",
  },
  {
    icon: <TemplateIcon />,
    title: "模板",
    name: "template",
    link: "/template",
  },
  {
    icon: <AiIcon />,
    title: "AI",
    name: "ai",
    link: "/ai",
  },
];

const SiderMenu = () => {
  const { pathname } = useLocation();
  console.log("path", pathname);
  return (
    <ul className="flex flex-col gap-16px sider-menu">
      {menuList.map((item, index) => (
        <Link
          to={item.link}
          className="mx-1"
          style={{
            textDecoration: "none",
          }}
          key={index}
        >
          <li
            className={classNames(
              "sider-menu-item flex flex-col justify-center items-center gap-1 rounded-xl p-1.5 transition-all-300",
              { "is-active": pathname === item.link }
            )}
          >
            <i className="text-32px svg-icon">{item.icon}</i>
            <span className="text-12px">{item.title}</span>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SiderMenu;
