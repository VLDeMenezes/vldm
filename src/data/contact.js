import { IoLogoGithub, IoLogoLinkedin, IoMail } from "react-icons/io5";
import { profile } from "./profile";

const utm = "utm_source=portfolio&utm_medium=contact&utm_campaign=recruiter";

export const contactLinks = [
  {
    id: "mail",
    href: `mailto:${profile.email}`,
    labelKey: "Contact.channels.mail",
    value: profile.email,
    icon: <IoMail />,
    external: false,
    event: "mail",
  },
  {
    id: "linkedin",
    href: `${profile.linkedin}?${utm}`,
    labelKey: "Contact.channels.linkedin",
    value: "linkedin.com/in/demenezesvictor",
    icon: <IoLogoLinkedin />,
    external: true,
    event: "linkedin",
  },
  {
    id: "github",
    href: `${profile.github}?${utm}`,
    labelKey: "Contact.channels.github",
    value: "github.com/VLDeMenezes",
    icon: <IoLogoGithub />,
    external: true,
    event: "github",
  },
];
