import { IoHome, IoBriefcase, IoMail, IoAlbums } from "react-icons/io5";

export const navItems = [
  {
    name: "Home",
    path: "/",
    icon: <IoHome />,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: <IoBriefcase />,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: <IoAlbums />,
  },
  {
    name: "Contact",
    path: "/contact",
    icon: <IoMail />,
  },
];
