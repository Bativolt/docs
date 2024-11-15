import React, { useState } from 'react';
import styles from './ElectricianSearch.module.css';
import { translate } from '@docusaurus/Translate';


/* Liste des électriciens avec ranking manuel */
const electricians = [
    {
        company: 'Bativolt',
        logo: 'https://docs.bativolt.com/img/logo.png',
        address: 'Rue de Tubize 53, 1480 Tubize, Belgique',
        tva: 'BE0638.905.049',
        verified: true,
        registeredSince: '2015',
        postalCodes: Array.from(new Set([
            '1480', '1600', '1070', '1180',
            '1620', '1630', '1650', '1651', '1602',
            '1500', '1501', '1502',
            '1700', '1701', '1702', '1703', '1704',
            '1750', '1755',
            '1670', '1671', '1673',
            '1070', '1082', '1083', '1190', '1080',
        ])), // Suppression des doublons
        ranking: 1,
        phone: '0472 48 33 58',
        email: 'info@bativolt.com',
        website: 'https://www.bativolt.com',
        rating: 5.0,
        openingHours: 'Lundi-Vendredi 9h00 à 18h00',
    },
    {
        company: 'ABC ELEC',
        logo: 'ABCelec-logo.jpeg',
        address: 'Ninoofsesteenweg 115A, 1700 Dilbeek, Belgique',
        tva: 'BE 0833 751 325',
        verified: true,
        registeredSince: '1982',
        postalCodes: Array.from(new Set([
            '9300', '1790', '1652', '1070', '1730', '1650', '1701', '1761', '1420', '1501',
            '9470', '1831', '1700', '1620', '1653', '1050', '1040', '1140', '1083', '1332',
            '1755', '1850', '1702', '1500', '1790', '1654', '1090', '1081', '3078', '1950',
            '1020', '9280', '1630', '1840', '1651', '1830', '1860', '3071', '1120', '9400',
            '1930', '1760', '1745', '1785', '1601', '1030', '1082', '1640', '1060', '1080',
            '1210', '1742', '1200', '1602', '1150', '1932', '1741', '1410', '1170', '1780',
            '1970', '1600', '3090', '1180', '1800', '1190', '1932', '1601', '1785',
        ])), // Suppression des doublons
        ranking: 2,
        phone: '0485 058 365',
        email: 'info.abcelec@gmail.com',
        website: 'https://www.abcelec.be',
        rating: 5.0,
        openingHours: '24/7',
    },
];

/* Préparation de la correspondance des noms des communes */
const postalCodeMap = {
    // Ajouter ici les correspondances des communes
'1000': 'Bruxelles', '1020': 'Laeken', '1030': 'Schaerbeek', '1040': 'Etterbeek', '1050': 'Ixelles', '1060': 'Saint-Gilles', '1070': 'Anderlecht', '1080': 'Molenbeek-Saint-Jean', '1081': 'Koekelberg', '1082': 'Berchem-Sainte-Agathe', '1083': 'Ganshoren', '1090': 'Jette',
'1100': 'Bruxelles X', '1110': 'Bruxelles Nato', '1120': 'Neder-Over-Heembeek', '1130': 'Haren', '1140': 'Evere', '1150': 'Woluwe-Saint-Pierre', '1160': 'Auderghem', '1170': 'Watermael-Boitsfort', '1180': 'Uccle', '1190': 'Forest',
'1200': 'Woluwe-Saint-Lambert', '1210': 'Saint-Josse-ten-Noode',
'1300': 'Wavre', '1310': 'La Hulpe', '1320': 'Beauvechain', '1325': 'Chaumont-Gistoux', '1330': 'Rixensart', '1340': 'Ottignies-Louvain-la-Neuve', '1341': 'Céroux-Mousty', '1342': 'Limelette', '1350': 'Orp-Jauche', '1360': 'Perwez', '1370': 'Jodoigne', '1380': 'Lasne', '1390': 'Grez-Doiceau',
'1400': 'Nivelles', '1420': 'Braine-l’Alleud', '1430': 'Rebecq', '1440': 'Braine-le-Château', '1450': 'Chastre', '1460': 'Ittre', '1470': 'Genappe', '1471': 'Loupoigne', '1480': 'Tubize', '1481': 'Saintes', '1490': 'Court-Saint-Étienne',
'1500': 'Halle', '1501': 'Buizingen', '1502': 'Lembeek', '1540': 'Herne', '1541': 'Sint-Pieters-Kapelle', '1547': 'Bever', '1560': 'Hoeilaart', '1570': 'Galmaarden', '1571': 'Tollembeek', '1572': 'Vollezele',
'1600': 'Sint-Pieters-Leeuw', '1620': 'Drogenbos', '1630': 'Linkebeek', '1640': 'Rhode-Saint-Genèse', '1650': 'Beersel', '1651': 'Lot', '1652': 'Alsemberg', '1653': 'Dworp', '1670': 'Pepingen', '1671': 'Elingen', '1673': 'Beert', '1674': 'Bellingen',
'1700': 'Dilbeek', '1701': 'Itterbeek', '1702': 'Groot-Bijgaarden', '1703': 'Sint-Ulriks-Kapelle', '1704': 'Sint-Martens-Bodegem', '1730': 'Asse', '1740': 'Ternat', '1750': 'Lennik', '1755': 'Gaasbeek', '1760': 'Roosdaal', '1770': 'Liedekerke', '1780': 'Wemmel',
'1800': 'Vilvoorde', '1830': 'Machelen', '1850': 'Grimbergen', '1860': 'Meise', '1880': 'Kapelle-op-den-Bos',
'1910': 'Kampenhout', '1930': 'Zaventem', '1932': 'Sint-Stevens-Woluwe', '1933': 'Sterrebeek', '1950': 'Kraainem', '1970': 'Wezembeek-Oppem', '1980': 'Zemst', '1981': 'Hofstade', '1982': 'Elewijt', '1990': 'Overijse',
'2000': 'Antwerpen-Centrum', '2018': 'Antwerpen-Zuid', '2020': 'Antwerpen-Kiel', '2030': 'Antwerpen-Haven', '2040': 'Antwerpen-Lillo', '2050': 'Antwerpen-Linkeroever', '2060': 'Antwerpen-Noord',
'2100': 'Deurne', '2140': 'Borgerhout', '2150': 'Borsbeek', '2170': 'Merksem', '2180': 'Ekeren', 
'2200': 'Herentals', '2220': 'Heist-op-den-Berg', '2230': 'Herselt', '2240': 'Zandhoven', '2250': 'Olen', '2260': 'Westerlo', '2270': 'Herenthout', '2280': 'Grobbendonk', '2290': 'Vorselaar', 
'2300': 'Turnhout', '2310': 'Rijkevorsel', '2320': 'Hoogstraten', '2330': 'Merksplas', '2340': 'Beerse', '2350': 'Vosselaar', '2360': 'Oud-Turnhout', '2370': 'Arendonk', '2380': 'Ravels', '2390': 'Malle', 
'2400': 'Mol', '2430': 'Laakdal', '2440': 'Geel', '2450': 'Meerhout', '2460': 'Kasterlee', '2470': 'Retie', '2480': 'Dessel', '2490': 'Balen', 
'2500': 'Lier', '2520': 'Ranst', '2530': 'Boechout', '2540': 'Hove', '2550': 'Kontich', '2560': 'Nijlen', '2570': 'Duffel', '2580': 'Putte', '2590': 'Berlaar', 
'2600': 'Berchem', '2610': 'Wilrijk', '2620': 'Hemiksem', '2630': 'Aartselaar', '2640': 'Mortsel', '2650': 'Edegem', '2660': 'Hoboken', 
'2800': 'Mechelen', '2811': 'Leest', '2820': 'Bonheiden', '2830': 'Willebroek', '2840': 'Rumst', '2850': 'Boom', '2860': 'Sint-Katelijne-Waver', '2870': 'Puurs-Sint-Amands', '2880': 'Bornem', '2890': 'Oppuurs', 
'2900': 'Schoten', '2910': 'Essen', '2920': 'Kalmthout', '2930': 'Brasschaat', '2940': 'Stabroek', '2950': 'Kapellen', '2960': 'Brecht', '2970': 'Schilde', '2980': 'Zoersel', '2990': 'Wuustwezel', 

    // Ajouter la suite des codes postaux et des communes belges ici
};

const ElectricianSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [commune, setCommune] = useState('');
    const [isSearched, setIsSearched] = useState(false);

    const handleSearch = () => {
        // Réinitialiser les résultats avant de lancer une nouvelle recherche
        setResults([]);
      
        // Vérifier que le code postal a exactement 4 chiffres
        if (!/^\d{4}$/.test(query)) {
            setIsSearched(false);
            return;
        }
      
        // Obtenir le nom de la commune à partir du code postal
        const communeName = postalCodeMap[query] || 'Commune inconnue';
        setCommune(communeName);
      
        // Utiliser un Set pour éviter les doublons
        const uniqueCompanies = new Set();
        const filteredResults = electricians
            .filter((electrician) => {
                const isUnique = !uniqueCompanies.has(electrician.company) && electrician.postalCodes.includes(query);
                if (isUnique) {
                    uniqueCompanies.add(electrician.company);
                }
                return isUnique;
            })
            .sort((a, b) => a.ranking - b.ranking);
      
        // Mettre à jour les résultats
        setResults(filteredResults);
        setIsSearched(true);
        
        // Appliquer dynamiquement le style (gap) à la liste des résultats
        const resultsContainer = document.querySelector('.results');
        if (resultsContainer) {
            resultsContainer.style.gap = '2rem'; // Applique un écart de 2rem entre chaque élément
        }
    };
    
    


    // Détecter l'appui sur la touche "Enter" pour lancer la recherche
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating); // Étoiles pleines
        const halfStars = rating % 1 >= 0.5 ? 1 : 0; // Si la partie décimale est >= 0.5, ajouter une demi-étoile
        const emptyStars = 5 - fullStars - halfStars; // Compléter avec des étoiles vides
    
        // Ajouter les étoiles pleines
        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <span key={`full-${i}`} className={styles.filledStar}>
                    ★
                </span>
            );
        }
    
        // Ajouter les demi-étoiles
        for (let i = 0; i < halfStars; i++) {
            stars.push(
                <span key={`half-${i}`} className={styles.halfStar}>
                    ★
                </span>
            );
        }
    
        // Ajouter les étoiles vides
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
                <span key={`empty-${i}`} className={styles.emptyStar}>
                    ★
                </span>
            );
        }
    
        return stars;
    };
    
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>
                {translate({ id: 'search.title', message: 'Recherchez un Électricien par Code Postal (Beta Version)' })}
            </h2>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={translate({ id: 'search.placeholder', message: 'Entrez le code postal...' })}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className={styles.button} onClick={handleSearch}>
                    {translate({ id: 'search.button', message: 'Rechercher' })}
                </button>
            </div>

            <div className={styles.results}>
                {!isSearched && (
                    <p className={styles.searchHint}>
                        {translate({
                            id: 'search.hint',
                            message: '🕵️‍♂️ Entrez le code postal de votre région et appuyez sur "Rechercher" pour découvrir les électriciens agréés qui y interviennent.',
                        })}
                    </p>
                )}

                {isSearched && results.length > 0 ? (
                    <ul className={styles.list}>
                        {results.map((electrician, index) => (
                            <li key={electrician.company} className={styles.listItem}>
                                <span className={styles.index}>#{index + 1}</span>
                                <div className={styles.contentContainer}>
                                    <img
                                        src={electrician.logo.includes('http') ? electrician.logo : `/img/${electrician.logo}`}
                                        alt={`${electrician.company} logo`}
                                        className={styles.logo}
                                    />
                                    <div className={styles.infoContainer}>
                                        <h3 className={styles.companyName}>{electrician.company}</h3>
                                        <p className={styles.tvaInfo}>
                                            {translate({ id: 'search.tva', message: '🔍 N° TVA' })} : {electrician.tva} ✅ | {translate({ id: 'search.registeredSince', message: '📅 Agréé depuis' })} : {electrician.registeredSince}
                                        </p>
                                    </div>
                                </div>
                                <hr className={styles.separator} />
                                <p>📍 <strong>{translate({ id: 'search.serviceArea', message: 'Intervient dans' })}</strong> {commune} ✅</p>
                                <p>🕒 <strong>{translate({ id: 'search.openingHours', message: 'Heures d\'ouverture' })}</strong> {electrician.openingHours}</p>
                                <p>📞 <strong>{translate({ id: 'search.phone', message: 'Téléphone' })}</strong> <a href={`tel:${electrician.phone}`}>{electrician.phone}</a></p>
                                <p>✉️ <strong>{translate({ id: 'search.email', message: 'Email' })}</strong> <a href={`mailto:${electrician.email}`}>{electrician.email}</a></p>
                                <p>🌐 <strong>{translate({ id: 'search.website', message: 'Site Internet' })}</strong> <a href={electrician.website} target="_blank" rel="noopener noreferrer">{electrician.website}</a></p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    isSearched && (
                        <div className={styles.noResultsContainer}>
                            <div className={styles.warningBox}>
                                {translate({
                                    id: 'search.noResults',
                                    message: `⚠️ Aucun électricien agréé n'est encore enregistré pour la région de ${commune}. Recommandez-nous un électricien dans cette région !`,
                                })} <br />
                                {translate({
                                    id: 'search.contactUs',
                                    message: '📩 Contactez-nous dès maintenant à docs@bativolt.com pour être ajouté à notre liste et faire partie des meilleurs électriciens agréés de la région. 🌟',
                                })}
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ElectricianSearch;
