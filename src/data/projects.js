import {
  IoLogoVercel,
  IoLogoReact,
} from "react-icons/io5";
import { TbBrandTypescript } from "react-icons/tb";
import { RiNextjsLine, RiTailwindCssFill } from "react-icons/ri";
import {
  SiExpress,
  SiRender,
  SiPostgresql,
  SiSwagger,
  SiExpo,
  SiGoogleplay,
} from "react-icons/si";

/**
 * Six selected projects. Work-owned products (Beland, Happ3n, Awaq) are
 * intentionally excluded so the portfolio does not repeat the experience
 * timeline.
 */
export const projects = [
  {
    slug: "rnfactory",
    name: "RNFactory",
    image: "/rnfactory.webp",
    mainImage: "/rnfactory_main.webp",
    path: "https://rn-factory.com/",
    year: "2025",
    roleKey: "Work.roles.fullstack",
    tecs: [
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "React Native", icon: <IoLogoReact /> },
      { name: "Expo", icon: <SiExpo /> },
    ],
  },
  {
    slug: "lobacounter",
    name: "LobaCounter",
    image: "/lobacounter.webp",
    mainImage: "/lobacountermain.webp",
    path: "https://lobacounter.com",
    year: "2024",
    roleKey: "Work.roles.mobile",
    tecs: [
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "React Native", icon: <IoLogoReact /> },
      { name: "Expo", icon: <SiExpo /> },
      { name: "Google Play", icon: <SiGoogleplay /> },
    ],
  },
  {
    slug: "surveyapp",
    name: "SurveyApp",
    image: "/surveyAppPic.webp",
    mainImage: "/surveyappmain.webp",
    path: "https://surveyapp-xi.vercel.app/",
    year: "2024",
    roleKey: "Work.roles.fullstack",
    tecs: [
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "Vercel", icon: <IoLogoVercel /> },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
    ],
  },
  {
    slug: "sumariolegal",
    name: "Sumario Legal API",
    image: "/sentenciasPic.webp",
    path: "https://sentenciasapp.vercel.app/",
    year: "2024",
    roleKey: "Work.roles.fullstack",
    github: "https://github.com/VLDeMenezes/sentenciasapp",
    tecs: [
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "Vercel", icon: <IoLogoVercel /> },
      { name: "AI", icon: <SiSwagger /> },
    ],
  },
  {
    slug: "gilson",
    name: "Gilson Regalos",
    image: "/gilsonPic.webp",
    path: "https://gilsonregalos.com.ar/",
    year: "2024",
    roleKey: "Work.roles.frontend",
    tecs: [
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Vercel", icon: <IoLogoVercel /> },
      { name: "Tailwind CSS", icon: <RiTailwindCssFill /> },
    ],
  },
  {
    slug: "nearvet",
    name: "NearVet",
    image: "/NearVetPic.webp",
    path: "https://near-vet-front-git-main-teamhvets-projects.vercel.app/",
    year: "2024",
    roleKey: "Work.roles.fullstack",
    github: "https://github.com/VLDeMenezes/NearVet",
    tecs: [
      { name: "Next.js", icon: <RiNextjsLine /> },
      { name: "TypeScript", icon: <TbBrandTypescript /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "Render", icon: <SiRender /> },
    ],
  },
];
