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
    {
      src: '//cdn.cookie-script.com/s/cb9b7cb807b525bb72dd46257d2d4fc0.js',
      type: 'text/javascript',
      charset: 'UTF-8',
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
