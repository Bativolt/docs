// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  url: 'https://your-docusaurus-site.example.com',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'nl'],
    localeConfigs: {
      fr: { label: 'Français', direction: 'ltr' },
      en: { label: 'English', direction: 'ltr' },
      nl: { label: 'Nederlands', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    algolia: {
      apiKey: '3a9b2a5eac5a7c54b6b472e1689a4e69',
      indexName: 'bativolt',
      appId: 'WZYHMO3A0N',
      contextualSearch: true,
    },
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'docs.bativolt',
      logo: {
        alt: 'Bativolt Logo',
        src: 'img/logo.png', // Logo par défaut
      },
      items: [
        { to: '/docs/guide-rgie/introduction', label: 'Guide R.G.I.E.', position: 'left' },
        { to: '/docs/checklist/introduction', label: 'Checklist Conformité', position: 'left' },
        { to: '/infractions', label: 'Infractions Fréquentes', position: 'left' },
        { to: '/electriciens-region', label: 'Trouver un Électricien', position: 'left' },
        { to: '/agences-agreees', label: 'Agences Agréées', position: 'left' },
        { href: 'https://www.bativolt.com', label: 'Bativolt.com', position: 'right' },
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            { label: 'Guide R.G.I.E.', to: '/docs/guide-rgie/introduction' },
            { label: 'Checklist Conformité', to: '/docs/checklist/introduction' },
            { label: 'Infractions Fréquentes', to: '/infractions' },
            { label: 'Trouver un Électricien', to: '/electriciens-region' },
            { label: 'Agences Agréées', to: '/agences-agreees' },
          ],
        },
        {
          title: 'Communauté',
          items: [
            { label: 'Instagram Bativolt', href: 'https://www.instagram.com/bativolt/' },
            { label: 'LinkedIn Bativolt', href: 'https://www.linkedin.com/company/bativolt' },
            { label: 'Facebook Bativolt', href: 'https://www.facebook.com/bativolt' },
            { label: 'Blog de doc.bativolt.com', to: '/blog' },
          ],
        },
        {
          title: 'Plus',
          items: [
            { label: 'Bativolt.com', href: 'https://www.bativolt.com' },
            { label: 'Contactez-nous', href: 'mailto:docs@bativolt.com' },
            { label: 'Disclaimer', to: '/disclaimer' },
            { label: 'Confidentialité', to: '/privacy-policy' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bativolt. Tous droits réservés.`,
    },
  },
};

export default config;
