import {
  IoLogoCss3,
  IoLogoFigma,
  IoLogoVercel,
  IoLogoReact,
  IoLogoNodejs,
  IoLogoHtml5,
  IoLogoJavascript,
} from "react-icons/io5";
import { TbBrandTypescript } from "react-icons/tb";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiRender,
  SiAxios,
  SiBootstrap,
  SiRedux,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";
export const project = [
  {
    name: "NearVet",
    image: "/NearVetcaptura.png",
    path: "https://near-vet-front-git-main-teamhvets-projects.vercel.app/",

    status: "Deployed",
    tecs: [
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "NextJs", icon: <RiNextjsLine /> },
      { name: "Vercel", icon: <IoLogoVercel /> },
      { name: "TailwindCss", icon: <RiTailwindCssFill /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Render", icon: <SiRender /> },
    ],
    github: "https://github.com/VLDeMenezes/NearVet",
  },
  {
    name: "ShopAll",
    image: "/shopallCaptura.png",
    path: "https://github.com/VLDeMenezes/ShopAll",

    status: "Not deployed",
    tecs: [
      { name: "NextJs", icon: <RiNextjsLine /> },
      { name: "TailwindCss", icon: <RiTailwindCssFill /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Axios", icon: <SiAxios /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
    github: "https://github.com/VLDeMenezes/ShopAll",
  },
  {
    name: "LeyriaApp",
    image: "/leyriaCaputara.png",
    path: "https://l-dm.vercel.app/",

    status: "Deployed",
    tecs: [
      { name: "HTML 5", icon: <IoLogoReact /> },
      { name: "Axios", icon: <SiAxios /> },
      { name: "Bootstrap", icon: <SiBootstrap /> },
      { name: "ReduxJs", icon: <SiRedux /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
    ],
    github: "https://github.com/VLDeMenezes/L-DM",
  },
  {
    name: "ShowFilms",
    image: "/showfilmsCaputa.png",
    path: "https://github.com/VLDeMenezes/ShowFilms",

    status: "Not deployed",
    tecs: [
      { name: "HTML 5", icon: <IoLogoHtml5 /> },
      { name: "CSS 3", icon: <IoLogoCss3 /> },
      { name: "JavaScript", icon: <IoLogoJavascript /> },
      { name: "MongoDB", icon: <SiMongodb /> },
    ],
    github: "https://github.com/VLDeMenezes/ShowFilms",
  },
  {
    name: "SumarioLegalApp",
    image: "/sentenciasApp.png",
    path: "https://sentenciasapp.vercel.app/",

    status: "Deployed",
    tecs: [
      {
        name: "TypeScript",
        icon: <TbBrandTypescript />,
      },
      {
        name: "NextJs",
        icon: <RiNextjsLine />,
      },
      {
        name: "Vercel",
        icon: <IoLogoVercel />,
      },
      {
        name: "TailwindCss",
        icon: <RiTailwindCssFill />,
      },
    ],
    github: "https://github.com/VLDeMenezes/sentenciasapp",
  },
];
