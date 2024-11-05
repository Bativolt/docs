import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [menuOpen, setMenuOpen] = useState(false); // État pour gérer l'ouverture du menu

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.async = true;
    script.onload = () => {
      window.particlesJS("particles-js", {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#ffaa00"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false
          },
          "size": {
            "value": 5,
            "random": true
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#ffaa00",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200
            },
            "push": {
              "particles_nb": 4
            }
          }
        },
        "retina_detect": true
      });
    };
    document.body.appendChild(script);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Bascule l'état du menu
  };

  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div id="particles-js" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="hero__title">
          docs.bativolt.com - Le Guide RGIE et la Référence en Documentation de Conformité Électrique en Belgique
        </h1>
        <p className="hero__subtitle">
          Accédez à des ressources complètes pour la conformité électrique : guide RGIE, conseils pratiques, et mise en relation avec des agences de conformité et électriciens agréés, gratuitement.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx(styles.ctaButton)}
            to="/docs/guide-rgie/introduction">
            Accéder au Guide RGIE
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className={styles.navbar}>
          <button className={styles.navbarToggle} onClick={toggleMenu}>
            Menu
          </button>
          <ul className={clsx(styles.navLinks, { [styles.active]: menuOpen })}>
            <li><Link to="/docs/guide-rgie/introduction">Introduction</Link></li>
            <li><Link to="/docs/guide-rgie/some-other-page">Autre Page</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title="docs.bativolt.com - Guide RGIE et Documentation de Conformité Électrique en Belgique"
      description="Le guide RGIE et documentation gratuite pour la conformité électrique en Belgique. Ressources pratiques, articles RGIE, et mise en relation avec des professionnels agréés. Découvrez les normes de sécurité électrique facilement.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
