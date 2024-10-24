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
        title: 'Bativolt',
        logo: {
          alt: 'Bativolt Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            to: '/docs/guide-rgie/introduction',  // Vérifiez que cela correspond au fichier
            label: 'Guide R.G.I.E.',
            position: 'left',
          },
          {
            to: '/docs/checklist/introduction',  // Lien vers la page introduction de la checklist
            label: 'Checklist Conformité',
            position: 'left',
          },
          {
            to: '/infractions',  // Updated URL
            label: 'Infractions Fréquentes',
            position: 'left',
          },
          {
            to: '/electriciens-region',  // Updated URL
            label: 'Trouver un Électricien',
            position: 'left',
          },
          {
            to: '/agences-agreees',  // Updated URL
            label: 'Agences Agréées',
            position: 'left',
          },
          {
            href: 'https://www.bativolt.com',  // External link to the main website
            label: 'Bativolt.com',
            position: 'right',
          },
          {
            type: 'localeDropdown',  // Language selector
            position: 'right',
          },
          {
            type: 'search',  // Algolia search bar
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
                to: '/docs/guide-rgie/introduction',  // Updated URL
              },
              {
                label: 'Checklist Conformité',
                to: '/docs/checklist/introduction',  // Updated URL
              },
              {
                label: 'Infractions Fréquentes',
                to: '/infractions',  // Updated URL
              },
              {
                label: 'Trouver un Électricien',
                to: '/electriciens-region',  // Updated URL
              },
              {
                label: 'Agences Agréées',
                to: '/agences-agreees',  // Updated URL
              },
            ],
          },
          {
            title: 'Communauté',
            items: [
              {
                label: 'Instagram Bativolt',
                href: 'https://www.instagram.com/bativolt/',  // External link
              },
              {
                label: 'LinkedIn Bativolt',
                href: 'https://www.linkedin.com/company/bativolt',  // External link
              },
              {
                label: 'Facebook Bativolt',
                href: 'https://www.facebook.com/bativolt',  // External link
              },
              {
                label: 'Blog de doc.bativolt.com',
                to: '/blog',  // Lien vers le blog
              },
            ],
          },
          {
            title: 'Plus',
            items: [
              {
                label: 'Bativolt.com',
                href: 'https://www.bativolt.com',  // Lien externe vers le site principal
              },
              {
                label: 'Contactez-nous',
                href: 'mailto:docs@bativolt.com',  // Lien pour envoyer un e-mail
              },
            ],
            
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Bativolt. Tous droits réservés. Contenus protégés par des droits d'auteur.
`,
      },      
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
