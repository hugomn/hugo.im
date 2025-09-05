import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://hugo.im/",
  author: "Hugo Nogueira",
  profile: "https://hugo.im/",
  desc: "AI-forward CPTO building the future of enterprise software. 20+ years leading product x engineering x design teams. Currently shipping the most modern GRC platform at Complyance.",
  title: "Hugo Nogueira",
  ogImage: "meta-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 5,
  postPerIndex: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  editPost: {
    url: "https://github.com/hugomn/hugo.im/edit/main/src/content/blog",
    text: "Suggest Changes",
    appendFilePath: true,
  },
};

export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "pt"];

export const LOCALE = {
  lang: DEFAULT_LANGUAGE, // html lang code. Set this empty and default will be "en"
  langTag: [], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "http://github.hugo.im",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "http://facebook.hugo.im",
    linkTitle: `${SITE.title} on Facebook`,
    active: false,
  },
  {
    name: "Threads",
    href: "https://go.hugo.im/threads",
    linkTitle: `${SITE.title} on Threads`,
    active: true,
  },
  {
    name: "Instagram",
    href: "http://instagram.hugo.im",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "http://linkedin.hugo.im",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@hugo.im",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "X",
    href: "https://x.com/hugomn",
    linkTitle: `${SITE.title} on X`,
    active: true,
  },
  {
    name: "Twitch",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Twitch`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Snapchat",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Snapchat`,
    active: false,
  },
  {
    name: "Pinterest",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Pinterest`,
    active: false,
  },
  {
    name: "TikTok",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on TikTok`,
    active: false,
  },
  {
    name: "CodePen",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Skype",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Skype`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Steam`,
    active: false,
  },
  {
    name: "Telegram",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "Mastodon",
    href: "https://github.com/hugomn",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
