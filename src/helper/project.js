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
    description:
      " NearVet is a web app for veterinary clinics with CRUD of Users, Pets, Veterinarians, Appointments, Medical records, with payment gateway integration, it has different views and is connected to a database deployed in OnRender.",
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
    description:
      "ShopAll is an e-commerce template created for a store of products such as cell phones, tablets and computers, mainly from the Apple market. It offers detailed product rendering with descriptions and prices from the PostGresSql database.",
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
    name: "Leyria & De Menezes",
    image: "/leyriaCaputara.png",
    path: "https://l-dm.vercel.app/",
    description:
      "Leyria & De Menezes is a web application for scheduling appointments with a law firm, applicable to law firms, it allows the publication of news and certifications as well as scheduling appointments online.",
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
    description:
      "ShowFilms  displays descriptions, authors, directors and contextual information about different movies, allowing you to rate them. Created with basic technologies (HTML, CSS & JavaScript) to demonstrate the potential without the use of any frameworks or libraries. Uses a mongodb as DataBase",
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
    description:
      "Sumario Legal App is a web app that allows you to upload and summarize criminal records using AI Geminis and download the synopsis in editable word. Designed to automate summary tasks for court rulings and decisions",
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
