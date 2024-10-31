import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Accès Simple et Intuitif',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Découvrez un accès facile aux ressources du RGIE, structurées de manière claire et accessible. Notre interface est conçue pour vous permettre de naviguer efficacement dans les exigences de conformité électrique, que vous soyez novice ou professionnel.
      </>
    ),
  },
  {
    title: 'Un Guide Complet pour la Conformité',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        docs.bativolt.com vous accompagne pas à pas à travers les normes du RGIE, en expliquant chaque aspect des installations électriques. Avec des exemples concrets et des explications détaillées, nous vous aidons à garantir la conformité de vos projets.
      </>
    ),
  },
  {
    title: 'Conçu pour Éduquer et Assister',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Plus qu'une simple documentation, notre site est une ressource pédagogique visant à éduquer et à assister les utilisateurs. Grâce aux dernières technologies, nous offrons une expérience de navigation fluide et fiable pour que vous puissiez vous concentrer sur l'essentiel : la sécurité et la conformité.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
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
