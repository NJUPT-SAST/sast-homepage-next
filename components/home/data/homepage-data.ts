import homeContent from "@/content/home.json";

const slideMeta = [
  {
    image: "/home/carousel/slide-1.png",
    imageAlt: "SAST 技术部门",
    imageWidth: 527,
    imageHeight: 433,
    titleColor: "#53A0FD",
    moreColor: "#53A0FD",
  },
  {
    image: "/home/carousel/slide-2.png",
    imageAlt: "SAST 办公部门",
    imageWidth: 566,
    imageHeight: 434,
    titleColor: "#03E5BF",
    moreColor: "#03E5BF",
  },
  {
    image: "/home/carousel/slide-3.png",
    imageAlt: "SAST 管理部门",
    imageWidth: 650,
    imageHeight: 440,
    titleColor: "#27A29C",
    moreColor: "#27A29C",
  },
];

const summaryMeta = [
  { icon: "/home/icons/summary/summary-1.png", color: "#53A0FD" },
  { icon: "/home/icons/summary/summary-2.png", color: "#27A29C" },
  { icon: "/home/icons/summary/summary-3.png", color: "#53A0FD" },
  { icon: "/home/icons/summary/summary-4.png", color: "#27A29C" },
];

const statTones = [
  "sky",
  "mint",
  "sky",
  "mint",
  "sky",
  "mint",
] as const;

export const slides = homeContent.hero.slides.map((slide, index) => ({
  ...slide,
  ...slideMeta[index],
}));

export const introduceCards = homeContent.introduce.cards.map((item, index) => ({
  ...item,
  ...summaryMeta[index],
}));

export const stats = homeContent.data.stats.map((item, index) => ({
  ...item,
  tone: statTones[index] ?? "sky",
}));
