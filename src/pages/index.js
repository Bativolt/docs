import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          docs.bativolt.com - Votre Référence RGIE
        </Heading>
        <p className="hero__subtitle">
          Bienvenue sur docs.bativolt.com, votre plateforme documentaire dédiée à la conformité électrique en Belgique. Conçu pour éduquer, informer, assister et guider tous les professionnels et particuliers dans la compréhension des normes RGIE.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="https://docs.bativolt.com/docs/guide-rgie/introduction">
            Accéder au Guide RGIE
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="docs.bativolt.com - Documentation RGIE"
      description="Votre référence en documentation RGIE pour la conformité électrique en Belgique, un site éducatif, informatif et d'assistance pour les professionnels et les particuliers.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
