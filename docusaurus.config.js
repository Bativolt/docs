// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr', // Par défaut en français
    locales: ['fr', 'en', 'nl'], // Langues disponibles : français, anglais, néerlandais
    localeConfigs: {
      fr: {
        label: 'Français',
        direction: 'ltr', // Texte de gauche à droite
      },
      en: {
        label: 'English',
        direction: 'ltr',
      },
      nl: {
        label: 'Nederlands',
        direction: 'ltr',
      },
    },
  },
  

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        apiKey: '3a9b2a5eac5a7c54b6b472e1689a4e69',
        indexName: 'bativolt',
        appId: 'WZYHMO3A0N',
        contextualSearch: true, // Active la recherche contextuelle pour les sites multilingues
      },      
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Docs.Bativolt',
        logo: {
          alt: 'Bativolt Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/guide-rgie',  // Page du Guide RGIE
            label: 'Guide R.G.I.E.',
            position: 'left',
          },
          {
            to: '/checklist-conformite',  // Page de la Checklist de Conformité
            label: 'Checklist de Conformité',
            position: 'left',
          },
          {
            to: '/infractions-resolutions',  // Page des Infractions et Résolutions
            label: 'Infractions Fréquentes et Résolutions',
            position: 'left',
          },
          {
            to: '/trouver-electricien',  // Page pour Trouver un Électricien
            label: 'Trouver un Électricien',
            position: 'left',
          },
          {
            to: '/agences-agreees',  // Page des Agences Agréées
            label: 'Agences Agréées',
            position: 'left',
          },
          {
            href: 'https://www.bativolt.com',  // Lien vers le site principal
            label: 'Bativolt.com',
            position: 'right',
          },
          {
            type: 'localeDropdown',  // Sélecteur de langue
            position: 'right',
          },
          {
            type: 'search',  // Barre de recherche Algolia
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Guide R.G.I.E.',
                to: '/guide-rgie',
              },
              {
                label: 'Checklist de Conformité',
                to: '/checklist-conformite',
              },
              {
                label: 'Infractions Fréquentes et Résolutions',
                to: '/infractions-resolutions',
              },
              {
                label: 'Trouver un Électricien',
                to: '/trouver-electricien',
              },
              {
                label: 'Agences Agréées',
                to: '/agences-agreees',
              },
            ],
          },
          {
            title: 'Communauté',
            items: [
              {
                label: 'Instagram Bativolt',
                href: 'https://www.instagram.com/bativolt/',
              },
              {
                label: 'LinkedIn Bativolt',
                href: 'https://www.linkedin.com/company/bativolt',
              },
              {
                label: 'Facebook Bativolt',
                href: 'https://www.facebook.com/bativolt',
              },
            ],
          },
          {
            title: 'Plus',
            items: [
              {
                label: 'Bativolt.com',
                href: 'https://www.bativolt.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bativolt. Tous droits réservés.`,
      },
      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
