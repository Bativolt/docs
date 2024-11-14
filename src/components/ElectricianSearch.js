import React, { useState } from 'react';
import styles from './ElectricianSearch.module.css';

/* Liste des électriciens avec ranking manuel */
const electricians = [
    {
        company: 'Bativolt',
        logo: 'https://docs.bativolt.com/img/logo.png',
        address: 'Rue de Tubize 53, 1480 Tubize, Belgique',
        tva: 'BE0638.905.049',
        verified: true,
        registeredSince: '2015',
        postalCodes: ['1480', '1600', '1070', '1180'], // Codes postaux couverts par Bativolt
        ranking: 1,
        phone: '0472 48 33 58',
        email: 'info@bativolt.com',
        website: 'https://www.bativolt.com',
        rating: 4.9,
    },
    {
        company: 'ABC ELEC',
        logo: 'https://www.abcelec.be/images/ABB%20CC%20EEELLLLEEEC.png',
        address: 'Ninoofsesteenweg 115A, 1700 Dilbeek, Belgique',
        tva: 'BE 0833 751 325',
        verified: true,
        registeredSince: '1982',
        postalCodes: ['1050', '1000', '1200', '1600'], // Codes postaux couverts par Electricien Pro
        ranking: 2,
        phone: '0485 058 365',
        email: 'info.abcelec@gmail.com',
        website: 'https://www.abcelec.be',
        rating: 4.9,
    },
];

/* Préparation de la correspondance des noms des communes */
const postalCodeMap = {
    // Ajouter ici les correspondances des communes
    '1000': 'Bruxelles',
    '1050': 'Ixelles',
    '1200': 'Woluwe-Saint-Lambert',
    '1600': 'Sint-Pieters-Leeuw',
    '1480': 'Tubize',
    // Ajouter la suite des codes postaux et des communes belges ici
};

const ElectricianSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [commune, setCommune] = useState('');

    const handleSearch = () => {
        const communeName = postalCodeMap[query] || 'Commune inconnue';
        setCommune(communeName);

        // Filtrer les électriciens qui couvrent le code postal demandé
        const filteredResults = electricians
            .filter((electrician) => electrician.postalCodes.includes(query))
            .sort((a, b) => a.ranking - b.ranking);

        setResults(filteredResults);
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} className={i < rating ? styles.filledStar : styles.emptyStar}>
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recherchez un Électricien par Code Postal</h2>
            <div className={styles.searchBox}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="Entrez le code postal..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button className={styles.button} onClick={handleSearch}>
                    Rechercher
                </button>
            </div>

            <div className={styles.results}>
                {results.length > 0 ? (
                    <ul className={styles.list}>
                        {results.map((electrician, index) => (
                            <li key={index} className={styles.listItem}>
                                <div className={styles.logoContainer}>
                                    <span className={styles.index}>{index + 1}.</span>
                                    <img src={electrician.logo} alt={`${electrician.company} logo`} className={styles.logo} />
                                    <div>
                                        <h3 className={styles.companyName}>{electrician.company}</h3>
                                        <p className={styles.tvaInfo}>
                                            N° TVA : {electrician.tva} ✅ (vérifié) | Agréé depuis : {electrician.registeredSince}
                                        </p>
                                    </div>
                                </div>
                                <p><strong>Intervient dans {commune} :</strong> Oui</p>
                                <p><strong>Adresse du QG :</strong> {electrician.address}</p>
                                <p><strong>Téléphone :</strong> <a href={`tel:${electrician.phone}`}>{electrician.phone}</a></p>
                                <p><strong>Email :</strong> <a href={`mailto:${electrician.email}`}>{electrician.email}</a></p>
                                <p><strong>Site Internet :</strong> <a href={electrician.website} target="_blank" rel="noopener noreferrer">Visitez le site</a></p>
                                <p><strong>Note :</strong> {renderStars(electrician.rating)} ({electrician.rating}/5)</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noResults}>
                        Aucun électricien agréé n'est encore enregistré pour ce code postal. <br />
                        Si vous êtes électricien ou client, contactez-nous pour être listé et aider la communauté.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ElectricianSearch;
