import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

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
  {
    title: 'Guide Complet pour la Conformité Électrique',
    Svg: require('@site/static/img/docs_bativolt_goals_re_lu76.svg').default,
    altText: 'Image représentant un guide complet pour la conformité électrique',
    description: (
      <>
        docs.bativolt.com vous accompagne pas à pas à travers les normes du RGIE, en expliquant chaque aspect des installations électriques. Avec des exemples concrets et des explications détaillées, nous vous aidons à garantir la conformité de vos projets.
      </>
    ),
  },
  {
    title: 'Ressource Pédagogique pour la Sécurité Électrique',
    Svg: require('@site/static/img/docs_bativolt_education_f8ru.svg').default,
    altText: 'Image représentant une ressource pédagogique pour la sécurité électrique',
    description: (
      <>
        Plus qu'une simple documentation, notre site est une ressource pédagogique visant à éduquer et à assister les utilisateurs. Grâce aux dernières technologies, nous offrons une expérience de navigation fluide et fiable pour que vous puissiez vous concentrer sur l'essentiel : la sécurité et la conformité.
      </>
    ),
  },
  {
    title: 'Mise en Relation avec des Professionnels Agréés',
    Svg: require('@site/static/img/docs_bativolt_connecting_teams_re_hno7.svg').default,
    altText: 'Image représentant la mise en relation avec des professionnels agréés',
    description: (
      <>
        Trouvez facilement des agences agréées et des électriciens vérifiés et qualifiés. docs.bativolt.com vous met en relation avec des professionnels de confiance pour assurer la sécurité et la conformité de vos installations électriques.
      </>
    ),
  },
  {
    title: 'Interprétation des Normes et Infractions RGIE',
    Svg: require('@site/static/img/docs_bativolt_file_analysis_8k9b.svg').default,
    altText: 'Image représentant l\'interprétation des normes et infractions RGIE',
    description: (
      <>
        Comprenez facilement les articles et infractions du RGIE grâce à notre guide détaillé. Que vous soyez un particulier ou un professionnel, docs.bativolt.com vous aide à interpréter les réglementations pour une conformité optimale.
      </>
    ),
  },
  {
    title: 'Amélioration Continue de l’Expérience Utilisateur',
    Svg: require('@site/static/img/docs_bativolt_innovative_re_rr5i.svg').default,
    altText: 'Image représentant l\'amélioration continue de l\'expérience utilisateur',
    description: (
      <>
        Notre plateforme évolue constamment pour répondre aux besoins des utilisateurs et s’adapter aux nouvelles normes. Profitez de mises à jour régulières et de nouvelles fonctionnalités pour un support toujours plus complet.
      </>
    ),
  },
];

function Feature({ Svg, title, description, altText }) {
  return (
    <div className={clsx('col col--4')} role="region" aria-label={title}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" aria-label={altText} alt={altText} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h2">{title}</Heading> {/* Utiliser h2 pour l'importance SEO */}
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
