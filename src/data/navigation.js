import { IoHome, IoBriefcase, IoAlbums, IoMail } from "react-icons/io5";

export const sectionIds = ["home", "experience", "work", "contact"];

export const navItems = [
  { id: "home", href: "#home", labelKey: "Nav.home", icon: <IoHome /> },
  {
    id: "experience",
    href: "#experience",
    labelKey: "Nav.experience",
    icon: <IoBriefcase />,
  },
  { id: "work", href: "#work", labelKey: "Nav.work", icon: <IoAlbums /> },
  { id: "contact", href: "#contact", labelKey: "Nav.contact", icon: <IoMail /> },
];
