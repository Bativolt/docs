// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Bativolt - Documentation RGIE en Belgique',
  tagline: 'La référence belge pour la conformité électrique, dédiée aux professionnels et particuliers.',
  favicon: 'img/favicon.ico',

  url: 'https://docs.bativolt.com',
  baseUrl: '/',

  organizationName: 'Bativolt',
  projectName: 'docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  trailingSlash: false,

  i18n: {
    defaultLocale: 'fr', // Default language of the site
    locales: ['fr', 'nl', 'en'], // Available languages
    localeConfigs: {
      fr: {
        label: 'Français', // Label for French language
      },
      nl: {
        label: 'Nederlands', // Label for Dutch language
      },
      en: {
        label: 'English', // Label for English language
      },
    },
  },  

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  
  scripts: [
    // Script pour le consentement des cookies
    {
      src: '//cdn.cookie-script.com/s/62288a5116e61f853bc5928d7405283e.js',
      type: 'text/javascript',
      charset: 'UTF-8',
    },
    // Google Analytics
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-XL1Q15W2E6',
      async: true,
    },
    // Référence à notre fichier analytics.js
    {
      src: '/analytics.js',
      type: 'text/javascript',
    },
    // Script pour le menu hamburger
    {
      src: '/customNavbar.js',
      type: 'text/javascript',
    },
  ],
  
  
  

  themeConfig: {
    algolia: {
      apiKey: '3a9b2a5eac5a7c54b6b472e1689a4e69',
      indexName: 'bativolt',
      appId: 'WZYHMO3A0N',
      contextualSearch: true,
    },
    image: 'img/bativolt-social-card.jpg',
    metadata: [
      { name: 'keywords', content: 'RGIE, conformité électrique, Bativolt, documentation, Belgique, ingénieur électricien, étudiant en électricité' },
      { name: 'description', content: 'Bativolt est la plateforme documentaire de référence en Belgique pour la conformité électrique selon le RGIE, destinée aux électriciens, ingénieurs, étudiants et particuliers.' },
    ],
    navbar: {
      title: 'docs.bativolt',
      logo: {
        alt: 'Bativolt Logo',
        src: 'img/logo.png',
      },
      items: [
        { to: '/docs/guide-rgie/introduction', label: 'Guide R.G.I.E.', position: 'left' },
        { to: '/docs/checklist/introduction', label: 'Checklist Conformité', position: 'left' },
        { to: '/docs/infractions/introduction', label: 'Infractions & Résolutions', position: 'left' },
        { to: '/electriciens-region', label: 'Trouver un Électricien', position: 'left' },
        { to: '/agences-agreees', label: 'Agences Agréées', position: 'left' },
        { href: 'https://www.bativolt.com', label: 'Bativolt.com', position: 'right' },
        { type: 'search', position: 'right' },
        { type: 'localeDropdown', position: 'right' }, // Menu déroulant pour le changement de langue
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
            { label: 'Infractions Fréquentes', to: '/docs/infractions/introduction' },
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
            { label: 'Dernières Mises à Jour', to: '/dernieres-mises-a-jour' },
          ],
        },        
        {
          title: 'Plus',
          items: [
            { label: 'Bativolt.com', href: 'https://www.bativolt.com' },
            { label: 'Contactez-nous', href: 'mailto:docs@bativolt.com' },
            { label: 'Disclaimer', to: '/disclaimer' },
            { label: 'Confidentialité', to: '/policy' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Bativolt. Tous droits réservés.`,
    },
  },
};

export default config;
