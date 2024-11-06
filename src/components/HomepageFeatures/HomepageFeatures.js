import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css'; // Assurez-vous que le chemin est correct

const FeatureList = [
  {
    title: 'Accès Simple et Intuitif aux Normes RGIE',
    Svg: require('@site/static/img/docs_bativolt_browsing_re_eycn.svg').default,
    altText: 'Image représentant un accès simple aux normes RGIE',
    description: (
      <>
        Découvrez un accès facile aux ressources du RGIE, structurées de manière claire et accessible. Notre interface est conçue pour vous permettre de naviguer efficacement dans les exigences de conformité électrique, que vous soyez novice ou professionnel.
      </>
    ),
  },
  // Ajoutez les autres caractéristiques ici...
];

function Feature({ Svg, title, description, altText }) {
  return (
    <div className={clsx('col col--4')} role="region" aria-label={title}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" aria-label={altText} alt={altText} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h2">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} aria-label="Caractéristiques principales de docs.bativolt.com">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
