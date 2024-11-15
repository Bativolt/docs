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
        tva: 'BE0833.751.325',
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
            // 1000
            '1000': 'Brussel | Bruxelles', '1005': 'Bruxelles', '1006': 'Raad van de Vlaamse Gemeenschapscommissie | Conseil de la Commission communautaire flamande', '1007': 'Parlement francophone bruxellois', '1008': 'Kamer van volksvertegenwoordigers | Chambre des représentants', '1009': 'Senaat van België | Sénat de Belgique', '1010': 'Administratief centrum van de Staat | Cité administrative de l\'État', '1011': 'Vlaams Parlement | Parlement flamand', '1012': 'Parlement van de Franse Gemeenschap | Parlement de la Communauté française', '1020': 'Laeken | Laken', '1030': 'Schaerbeek | Schaarbeek', '1031': 'Sociale Christelijke Organisaties | Organisations sociales chrétiennes', '1033': 'RTL-TVI | télévision privée francophone', '1035': 'Ministerie van de Vlaamse Gemeenschap | Ministère de la Région de Bruxelles-Capitale', '1040': 'Etterbeek', '1041': 'International Press Center', '1043': 'Vlaamse Radio- en Televisieomroep (VRT) | télévision publique flamande', '1044': 'Radio-télévision belge de la Communauté française (RTBF) | télévision publique francophone', '1045': 'Dienst voor Inschrijving van Voertuigen | Direction d\'Immatriculation des Véhicules (DIV)', '1046': 'Europese Dienst voor Extern Actie [archief] | Service Européen pour l\'action extérieure [archive] (SEAE/EEAS European External Action Service)', '1047': 'Europees Parlement | Parlement européen', '1048': 'Raad van de Europese Unie | Conseil de l\'Union européenne', '1049': 'Europese Commissie | Commission européenne', '1050': 'Ixelles | Elsene', '1060': 'Sint-Gillis | Saint-Gilles', '1070': 'Anderlecht', '1080': 'Sint-Jans-Molenbeek | Molenbeek-Saint-Jean', '1081': 'Koekelberg', '1082': 'Sint-Agatha-Berchem | Berchem-Sainte-Agathe', '1083': 'Ganshoren', '1090': 'Jette',
            '1100': 'Chèques postaux', '1105': 'Dienst voor Sociale Post | Service social de la Poste (SOC)', '1110': 'Organisatie van het Noord-Atlantisch Verdrag | Organisation du traité de l\'Atlantique nord (OTAN)', '1120': 'Neder-Over-Heembeek', '1130': 'Haren', '1140': 'Evere', '1150': 'Sint-Pieters-Woluwe | Woluwe-Saint-Pierre', '1160': 'Oudergem | Auderghem', '1170': 'Watermaal-Bosvoorde | Watermael-Boitsfort', '1180': 'Ukkel | Uccle', '1190': 'Vorst | Forest',
            '1200': 'Sint-Lambrechts-Woluwe | Woluwe-Saint-Lambert', '1210': 'Sint-Joost-ten-Node | Saint-Josse-ten-Noode', '1212': 'Federale Overheidsdienst Mobiliteit en Vervoer | Service public fédéral Mobilité et Transports',
            '1300': 'Limal | Wavre', '1301': 'Bierges', '1310': 'Terhulpen | La Hulpe', '1315': 'Glimes, Incourt, Opprebais, Piétrebais, Roux-Miroir', '1320': 'Beauvechain, Hamme-Mille, L\'Écluse, Nodebais, Tourinnes-la-Grosse', '1325': 'Bonlez, Chaumont-Gistoux, Corroy-le-Grand, Dion-Valmont, Longueville', '1330': 'Rixensart', '1331': 'Rosières', '1332': 'Genval', '1340': 'Ottignies-Louvain-la-Neuve | Ottignies', '1341': 'Céroux-Mousty', '1342': 'Limelette', '1348': 'Louvain-la-Neuve', '1350': 'Orp-Jauche, Énines, Folx-les-Caves, Jandrain-Jandrenouille, Jauche, Marilles, Noduwez, Orp-le-Grand', '1357': 'Hélécine, Linsmeau, Neerheylissem, Opheylissem', '1360': 'Malèves-Sainte-Marie-Wastines, Orbais, Perwez, Thorembais-les-Béguines, Thorembais-Saint-Trond', '1367': 'Autre-Église, Gérompont, Bomal, Geest-Gérompont-Petit-Rosière, Mont-Saint-André, Grand-Rosière-Hottomont, Huppaye, Ramillies', '1370': 'Dongelberg, Jauchelette, Jodoigne, Jodoigne-Souveraine, Lathuy, Mélin, Piétrain, Saint-Jean-Geest, Saint-Remy-Geest, Zétrud-Lumay', '1380': 'Lasne, Couture-Saint-Germain, Lasne-Chapelle-Saint-Lambert, Maransart, Ohain, Plancenoit', '1390': 'Archennes, Biez, Bossut-Gottechain, Grez-Doiceau, Nethen',
            '1400': 'Monstreux | Nivelles', '1401': 'Baulers', '1402': 'Thines', '1404': 'Bornival', '1410': 'Waterloo', '1414': 'Promo-Control', '1420': 'Braine-l\'Alleud', '1421': 'Ophain-Bois-Seigneur-Isaac', '1428': 'Lillois-Witterzée', '1430': 'Rebecq, Bierghes, Quenast, Rebecq-Rognon', '1435': 'Corbais, Hévillers, Mont-Saint-Guibert', '1440': 'Braine-le-Château, Wauthier-Braine', '1450': 'Chastre, Chastre-Villeroux-Blanmont, Cortil-Noirmont, Gentinnes, Saint-Géry', '1457': 'Walhain, Nil-Saint-Vincent-Saint-Martin, Tourinnes-Saint-Lambert, Walhain-Saint-Paul', '1460': 'Ittre, Virginal-Samme', '1461': 'Haut-Ittre', '1470': 'Baisy-Thy, Bousval, Genappe', '1471': 'Loupoigne', '1472': 'Vieux-Genappe', '1473': 'Glabais', '1474': 'Ways', '1476': 'Houtain-le-Val', '1480': 'Clabecq, Oisquercq, Saintes, Tubize', '1490': 'Court-Saint-Étienne', '1495': 'Marbais, Mellery, Sart-Dames-Avelines, Tilly, Villers-la-Ville',
            '1500': 'Halle | Hal', '1501': 'Buizingen', '1502': 'Lembeek', '1540': 'Herfelingen | Herne (Hérinnes)', '1541': 'Sint-Pieters-Kapelle | Saint-Pierre-Capelle', '1547': 'Biévène | Bever', '1560': 'Hoeilaart', '1570': 'Galmaarden (Gammerages), Tollembeek, Vollezele',
            '1600': 'Oudenaken, Sint-Laureins-Berchem, Sint-Pieters-Leeuw (Leeuw-Saint-Pierre)', '1601': 'Ruisbroek', '1602': 'Vlezenbeek', '1620': 'Drogenbos', '1630': 'Linkebeek', '1640': 'Sint-Genesius-Rode (Rhode-Saint-Genèse)', '1650': 'Beersel', '1651': 'Lot', '1652': 'Alsemberg', '1653': 'Dworp (Tourneppe)', '1654': 'Huizingen', '1670': 'Bogaarden, Heikruis (Haute-Croix), Pepingen', '1671': 'Elingen', '1673': 'Brages', '1674': 'Bellingen',
            '1700': 'Dilbeek, Sint-Martens-Bodegem, Sint-Ulriks-Kapelle', '1701': 'Itterbeek', '1702': 'Groot-Bijgaarden (Grand-Bigard)', '1703': 'Schepdaal', '1730': 'Asse, Bekkerzeel, Kobbegem, Mollem', '1731': 'Relegem, Zellik', '1740': 'Ternat', '1741': 'Wambeek', '1742': 'Sint-Katherina-Lombeek', '1745': 'Mazenzele', '1745': 'Opwijk', '1750': 'Gaasbeek, Lennik, Sint-Kwintens-Lennik, Sint-Martens-Lennik', '1755': 'Gooik, Kester, Leerbeek, Oetingen', '1760': 'Onze-Lieve-Vrouw-Lombeek, Pamel, Roosdaal, Strijtem', '1761': 'Borchtlombeek', '1770': 'Liedekerke', '1780': 'Wemmel', '1785': 'Brussegem, Hamme, Merchtem', '1790': 'Affligem, Essene, Hekelgem, Teralfene',
            '1800': 'Peutie, Vilvoorde (Vilvorde)', '1804': 'Cargovil', '1818': 'Vlaamse Televisie Maatschappij (VTM, télévision privée flamande)', '1820': 'Melsbroek, Perk, Steenokkerzeel', '1830': 'Machelen', '1831': 'Diegem', '1840': 'Londerzeel, Malderen, Steenhuffel', '1850': 'Grimbergen', '1851': 'Humbeek', '1852': 'Beigem', '1853': 'Strombeek-Bever', '1860': 'Meise', '1861': 'Wolvertem', '1880': 'Capelle-au-Bois, Nieuwenrode, Ramsdonk',
            '1910': 'Berg, Buken, Kampenhout, Nederokkerzeel', '1930': 'Nossegem, Zaventem', '1931': 'Brucargo', '1932': 'Sint-Stevens-Woluwe (Woluwe-Saint-Étienne)', '1933': 'Sterrebeek', '1934': 'Bruxelles X-Aéroport Remailing', '1935': 'Corporate Village', '1950': 'Kraainem', '1970': 'Wezembeek-Oppem', '1980': 'Eppegem, Zemst', '1981': 'Hofstade', '1982': 'Elewijt, Weerde',
            // 2000
            '2000': 'Antwerpen-Centrum', '2018': 'Antwerpen-Zuid', '2020': 'Antwerpen-Kiel','2030': 'Antwerpen-Haven', '2040': 'Antwerpen-Lillo', '2050': 'Antwerpen-Linkeroever','2060': 'Antwerpen-Noord',
            '2100': 'Deurne', '2140': 'Borgerhout', '2150': 'Borsbeek','2170': 'Merksem', '2180': 'Ekeren',
            '2200': 'Herentals', '2220': 'Heist-op-den-Berg', '2230': 'Herselt', '2240': 'Zandhoven','2250': 'Olen', '2260': 'Westerlo', '2270': 'Herenthout', '2280': 'Grobbendonk', '2290': 'Vorselaar',
            '2300': 'Turnhout', '2310': 'Rijkevorsel', '2320': 'Hoogstraten', '2330': 'Merksplas','2340': 'Beerse', '2350': 'Vosselaar', '2360': 'Oud-Turnhout', '2370': 'Arendonk','2380': 'Ravels', '2390': 'Malle',
            '2400': 'Mol', '2430': 'Laakdal', '2440': 'Geel', '2450': 'Meerhout','2460': 'Kasterlee', '2470': 'Retie', '2480': 'Dessel', '2490': 'Balen',
            '2500': 'Lier', '2520': 'Ranst', '2530': 'Boechout', '2540': 'Hove','2550': 'Kontich', '2560': 'Nijlen', '2570': 'Duffel', '2580': 'Putte', '2590': 'Berlaar',
            '2600': 'Berchem', '2610': 'Wilrijk', '2620': 'Hemiksem', '2630': 'Aartselaar','2640': 'Mortsel', '2650': 'Edegem', '2660': 'Hoboken',
            '2800': 'Mechelen (Malines), Walem', '2801': 'Heffen', '2811': 'Hombeek, Leest', '2812': 'Muizen', '2820': 'Bonheiden, Rijmenam', '2830': 'Blaasveld, Heindonk, Tisselt, Willebroek', '2840': 'Reet, Rumst, Terhagen', '2845': 'Niel', '2850': 'Boom', '2860': 'Sint-Katelijne-Waver (Wavre-Sainte-Catherine)', '2861': 'Onze-Lieve-Vrouw-Waver (Wavre-Notre-Dame)', '2870': 'Breendonk, Liezele, Puurs, Ruisbroek', '2880': 'Bornem, Hingene, Mariekerke, Weert', '2890': 'Lippelo, Oppuurs, Sint-Amands (Saint-Amand)',
            '2900': 'Schoten', '2910': 'Essen', '2920': 'Kalmthout', '2930': 'Brasschaat', '2940': 'Hoevenen, Stabroek', '2950': 'Kapellen', '2960': 'Brecht, Sint-Job-in-\'t-Goor, Sint-Lenaarts (Saint-Léonard)', '2970': '\'s-Gravenwezel, Schilde', '2980': 'Halle, Zoersel', '2990': 'Loenhout, Wuustwezel',
            //3000
            '3000': 'Leuven (Louvain)', '3001': 'Heverlee', '3010': 'Kessel-Lo', '3012': 'Wilsele', '3018': 'Wijgmaal', '3020': 'Herent, Veltem-Beisem, Winksele', '3040': 'Huldenberg, Loonbeek, Neerijse, Ottenburg, Sint-Agatha-Rode (Rhode-Sainte-Agathe)', '3050': 'Oud-Heverlee', '3051': 'Sint-Joris-Weert', '3052': 'Blanden', '3053': 'Haasrode', '3054': 'Vaalbeek', '3060': 'Bertem, Korbeek-Dijle', '3061': 'Leefdaal', '3070': 'Kortenberg', '3071': 'Erps-Kwerps', '3078': 'Everberg, Meerbeek', '3080': 'Duisburg, Tervuren, Vossem', '3090': 'Overijse',
            '3110': 'Rotselaar', '3111': 'Wezemaal', '3118': 'Werchter', '3120': 'Tremelo', '3128': 'Baal', '3130': 'Begijnendijk, Betekom', '3140': 'Keerbergen', '3150': 'Haacht, Tildonk, Wespelaar', '3190': 'Boortmeerbeek', '3191': 'Hever',
            '3200': 'Aarschot, Gelrode', '3201': 'Langdorp', '3202': 'Rillaar', '3210': 'Linden, Lubbeek', '3211': 'Binkom', '3212': 'Pellenberg', '3220': 'Holsbeek, Kortrijk-Dutsel (Courtrai-Dutsel), Sint-Pieters-Rode (Rhode-Saint-Pierre)', '3221': 'Nieuwrode', '3270': 'Scherpenheuvel-Zichem (Montaigu-Zichem), Scherpenheuvel (Montaigu)', '3271': 'Averbode, Zichem', '3272': 'Messelbroek, Testelt', '3290': 'Deurne, Diest, Schaffen, Webbekom', '3293': 'Kaggevinne', '3294': 'Molenstede',
            '3300': 'Bost, Goetsenhoven (Gossoncourt), Hakendover, Kumtich, Oorbeek, Oplinter, Sint-Margriete-Houtem (Hautem-Sainte-Marguerite), Tienen (Tirlemont), Vissenaken', '3320': 'Hoegaarden, Meldert', '3321': 'Outgaarden', '3350': 'Linter, Drieslinter, Melkwezer, Neerhespen, Neerlinter, Orsmaal-Gussenhoven, Overhespen, Wommersom', '3360': 'Bierbeek, Korbeek-Lo, Lovenjoel, Opvelp', '3370': 'Boutersem, Kerkom, Neervelp, Roosbeek, Vertrijk, Willebringen', '3380': 'Bunsbeek, Glabbeek-Zuurbemde', '3381': 'Kapellen', '3384': 'Attenrode', '3390': 'Tielt-Winge, Houwaart, Sint-Joris-Winge (Winghe-Saint-Georges), Tielt', '3391': 'Meensel-Kiezegem',
            '3400': 'Eliksem, Ezemaal, Laar, Landen, Neerwinden, Overwinden, Rumsdorp, Wange', '3401': 'Waasmont (Wamont), Walsbets, Walshoutem (Houtain-l\'Évêque), Vesdrin', '3404': 'Attenhoven, Neerlanden', '3440': 'Budingen, Dormaal, Halle-Booienhoven, Helen-Bos, Zoutleeuw (Léau)', '3450': 'Geetbets, Grazen', '3454': 'Rummen', '3460': 'Assent, Bekkevoort', '3461': 'Molenbeek-Wersbeek', '3470': 'Kortenaken, Ransberg', '3471': 'Hoeleden', '3472': 'Kersbeek-Miskom', '3473': 'Waanrode',
            '3500': 'Hasselt, Sint-Lambrechts-Herk (Herck-Saint-Lambert)', '3501': 'Wimmertingen', '3510': 'Kermt, Spalbeek', '3511': 'Kuringen, Stokrooie', '3512': 'Stevoort', '3520': 'Zonhoven', '3530': 'Houthalen-Helchteren, Helchteren, Houthalen', '3540': 'Berbroek, Donk, Herk-de-Stad (Herck-la-Ville), Schulen', '3545': 'Halen, Loksbergen, Zelem', '3550': 'Heusden-Zolder, Heusden, Zolder', '3560': 'Linkhout, Lummen, Meldert', '3570': 'Alken', '3580': 'Beringen', '3581': 'Beverlo', '3582': 'Koersel', '3583': 'Paal', '3590': 'Diepenbeek',
            '3600': 'Genk', '3620': 'Gellik, Lanaken, Neerharen, Veldwezelt', '3621': 'Rekem', '3630': 'Maasmechelen, Eisden, Leut, Mechelen-aan-de-Maas, Meeswijk, Opgrimbie, Vucht', '3631': 'Boorsem, Uikhoven', '3640': 'Kessenich, Kinrooi, Molenbeersel, Ophoven', '3650': 'Dilsen-Stokkem, Dilsen, Elen, Lanklaar, Rotem, Stokkem', '3660': 'Opglabbeek', '3665': 'As', '3668': 'Niel-bij-As', '3670': 'Meeuwen-Gruitrode, Ellikom, Gruitrode, Meeuwen, Neerglabbeek, Wijshagen', '3680': 'Maaseik, Neeroeteren, Opoeteren', '3690': 'Zutendaal',
            '3700': '\'s Herenelderen, Berg, Vreren (Frères), Henis, Diets-Heur (Heure-le-Tixhe), Koninksem, Lauw, Mal, Neerrepen, Nerem, Overrepen, Piringen, Riksingen, Rutten (Russon), Sluizen (Sluse), Tongeren (Tongres), Widooie', '3717': 'Herstappe', '3720': 'Kortessem', '3721': 'Vliermaalroot', '3722': 'Wintershoven', '3723': 'Guigoven', '3724': 'Vliermaal', '3730': 'Hoeselt, Romershoven, Sint-Huibrechts-Hern, Werm', '3732': 'Schalkhoven', '3740': 'Beverst, Bilzen, Eigenbilzen, Grote-Spouwen, Hees, Kleine-Spouwen, Mopertingen, Munsterbilzen, Rijkhoven, Rosmeer, Spouwen, Waltwilder', '3742': 'Martenslinde', '3746': 'Hoelbeek', '3770': 'Floot (Flétange), Genoelselderen, Herderen, Kanne, Membruggen, Millen, Riemst, Val-Meer, Vroenhoven, Zichen-Zussen-Bolder', '3790': 'Voeren (Fourons), Moelingen (Mouland), Sint-Martens-Voeren (Fouron-Saint-Martin)', '3791': 'Remersdaal (Rémersdael)', '3792': 'Sint-Pieters-Voeren (Fouron-Saint-Pierre)', '3793': 'Teuven', '3798': '\'s Gravenvoeren (Fouron-le-Comte)',
            '3800': 'Aalst (Alost), Brustem, Engelmanshoven, Gelinden, Groot-Gelmen (Grande-Jamine), Halmaal, Kerkom-bij-Sint-Truiden (Kerckom-lez-Saint-Trond), Ordingen, Sint-Truiden (Saint-Trond), Zepperen', '3803': 'Duras, Gorsem, Runkelen, Wilderen', '3806': 'Velm', '3830': 'Berlingen, Wellen', '3831': 'Herten', '3832': 'Ulbeek', '3840': 'Bommershoven, Broekom, Gors-Opleeuw, Gotem, Groot-Loon, Haren, Hendrieken, Hoepertingen, Jesseren, Kerniel, Kuttekoven, Borgloon (Looz), Rijkel (Ryckel), Voort', '3850': 'Binderveld, Kozen, Nieuwerkerken, Wijer', '3870': 'Batsheers, Bovelingen, Mechelen-Bovelingen (Marlinne), Rukkelingen-Loon, Veulen (Fologne), Gutschoven, Heers, Heks, Horpmaal, Mettekoven, Opheers, Klein-Gelmen (Petite-Jamine), Vechmaal', '3890': 'Boekhout, Kortijs (Cortis), Vorsen (Fresin), Gingelom, Jeuk, Montenaken, Niel-bij-Sint-Truiden', '3891': 'Borlo, Buvingen, Mielen-boven-Aalst, Muizen',
            '3900': 'Overpelt', '3910': 'Neerpelt, Lille-Saint-Hubert', '3920': 'Lommel', '3930': 'Hamont-Achel, Achel, Hamont', '3940': 'Hechtel-Eksel, Hechtel', '3941': 'Eksel', '3945': 'Ham, Kwaadmechelen, Oostham', '3950': 'Bocholt, Kaulille, Reppel', '3960': 'Beek, Bree (Brée), Gerdingen, Opitter, Tongerlo', '3970': 'Leopoldsburg (Bourg-Léopold)', '3971': 'Heppen', '3980': 'Tessenderlo', '3990': 'Grote-Brogel, Kleine-Brogel, Peer, Wijchmaal',
            //4000
            '4000': 'Glain, Liège (Luik), Rocourt', '4020': 'Bressoux, Jupille-sur-Meuse, Liège, Longdoz, Wandre', '4030': 'Grivegnée, Liège', '4031': 'Angleur', '4032': 'Chênée', '4040': 'Herstal', '4041': 'Milmort, Vottem', '4042': 'Liers', '4050': 'Chaudfontaine', '4051': 'Vaux-sous-Chèvremont', '4052': 'Beaufays', '4053': 'Embourg', '4090': 'Forces belges en Allemagne (Belgische strijdkrachten in Duitsland)',
            '4100': 'Boncelles, Seraing', '4101': 'Jemeppe-sur-Meuse', '4102': 'Ougrée', '4120': 'Éhein, Neupré, Rotheux-Rimière', '4121': 'Neuville-en-Condroz', '4122': 'Plainevaux', '4130': 'Esneux, Tilff', '4140': 'Dolembreux, Gomzé-Andoumont, Rouvreux, Sprimont', '4141': 'Louveigné', '4160': 'Anthisnes', '4161': 'Villers-aux-Tours', '4162': 'Hody', '4163': 'Tavier', '4170': 'Comblain-au-Pont, Poulseur', '4180': 'Comblain-Fairon, Comblain-la-Tour, Hamoir', '4181': 'Filot', '4190': 'Ferrières, My, Vieuxville, Werbomont, Xhoris',
            '4210': 'Burdinne, Hannêche, Lamontzée, Marneffe, Oteppe', '4217': 'Héron, Lavoir, Waret-l\'Évêque', '4218': 'Couthuin', '4219': 'Acosse, Ambresin, Meeffe, Wasseiges', '4250': 'Boëlhe, Geer, Hollogne-sur-Geer, Lens-Saint-Servais', '4252': 'Omal', '4253': 'Darion', '4254': 'Ligney', '4257': 'Berloz, Corswarem, Rosoux-Crenwick', '4260': 'Avennes, Braives, Ciplet, Fallais, Fumal, Ville-en-Hesbaye', '4261': 'Latinne', '4263': 'Tourinne', '4280': 'Hannut, Abolens, Avernas-le-Bauduin, Avin, Bertrée, Blehen, Cras-Avernas, Crehen, Grand-Hallet, Lens-Saint-Remy, Merdorp, Moxhe, Petit-Hallet, Poucet, Thisnes, Trognée, Villers-le-Peuplier, Wansin', '4287': 'Lincent, Pellaines, Racour',
            '4300': 'Waremme, Bettincourt, Bleret, Bovenistier, Grand-Axhe, Lantremange, Oleye', '4317': 'Faimes, Aineffe, Borlez, Celles, Les Waleffes, Viemme', '4340': 'Awans, Fooz, Othée, Villers-l\'Évêque', '4342': 'Hognoul', '4347': 'Fexhe-le-Haut-Clocher, Freloux, Noville, Roloux, Voroux-Goreux', '4350': 'Remicourt, Lamine, Momalle, Pousset', '4351': 'Hodeige', '4357': 'Donceel, Haneffe, Jeneffe, Limont', '4360': 'Oreye, Bergilers, Grandville, Lens-sur-Geer, Otrange', '4367': 'Crisnée, Fize-le-Marsal, Kemexhe, Odeur, Thys',
            '4400': 'Flémalle, Awirs, Chokier, Flémalle-Grande, Flémalle-Haute, Gleixhe, Ivoz-Ramet, Mons-lez-Liège', '4420': 'Montegnée, Saint-Nicolas, Tilleur', '4430': 'Ans', '4431': 'Loncin', '4432': 'Alleur, Xhendremael', '4450': 'Juprelle, Lantin, Slins', '4451': 'Voroux-lez-Liers', '4452': 'Paifve, Wihogne', '4453': 'Villers-Saint-Siméon', '4458': 'Fexhe-Slins', '4460': 'Grâce-Hollogne, Bierset, Grâce-Berleur, Hollogne-aux-Pierres, Horion-Hozémont, Velroux', '4470': 'Saint-Georges-sur-Meuse', '4480': 'Clermont-sous-Huy, Engis, Hermalle-sous-Huy',
            '4500': 'Huy (Hoei), Ben-Ahin, Tihange', '4520': 'Antheit, Bas-Oha, Huccorgne, Moha, Vinalmont, Wanze', '4530': 'Fize-Fontaine, Vaux-et-Borset, Vieux-Waleffe, Villers-le-Bouillet, Warnant-Dreye', '4537': 'Bodegnée, Chapon-Seraing, Seraing-le-Château, Verlaine', '4540': 'Amay, Ampsin, Flône, Jehay, Ombret', '4550': 'Nandrin, Saint-Séverin-en-Condroz, Villers-le-Temple, Yernée-Fraineux', '4557': 'Tinlot, Abée, Fraiture, Ramelot, Seny, Soheit-Tinlot', '4560': 'Bois-et-Borsu, Clavier, Les Avins, Ocquier, Pailhe, Terwagne', '4570': 'Marchin, Vyle-et-Tharoul', '4577': 'Modave, Outrelouxhe, Strée-lez-Huy, Vierset-Barse', '4590': 'Ellemelle, Ouffet, Warzée',
            '4600': 'Lanaye, Lixhe, Richelle, Visé (Wezet)', '4601': 'Argenteau', '4602': 'Cheratte', '4606': 'Saint-André', '4607': 'Berneau, Bombaye, Dalhem, Feneur, Mortroux', '4608': 'Neufchâteau, Warsage', '4610': 'Bellaire, Beyne-Heusay, Queue-du-Bois', '4620': 'Fléron', '4621': 'Retinne', '4623': 'Magnée', '4624': 'Romsée', '4630': 'Ayeneux, Micheroux, Soumagne, Tignée', '4631': 'Évegnée', '4632': 'Cerexhe-Heuseux', '4633': 'Melen', '4650': 'Chaineux, Grand-Rechain, Herve, Julémont', '4651': 'Battice', '4652': 'Xhendelesse', '4653': 'Bolland', '4654': 'Charneux', '4670': 'Blegny, Mortier, Trembleur', '4671': 'Barchon, Housse, Saive', '4672': 'Saint-Remy', '4680': 'Hermée, Oupeye', '4681': 'Hermalle-sous-Argenteau', '4682': 'Heure-le-Romain, Houtain-Saint-Siméon', '4683': 'Vivegnis', '4684': 'Haccourt', '4690': 'Bassenge, Boirs, Ében-Émael, Glons, Roclenge-sur-Geer, Wonck',
            '4700': 'Eupen', '4701': 'Kettenis', '4710': 'Lontzen', '4711': 'Walhorn', '4720': 'La Calamine (Kelmis)', '4721': 'Neu-Moresnet', '4728': 'Hergenrath', '4730': 'Hauset, Raeren', '4731': 'Eynatten', '4750': 'Bütgenbach (Butgenbach), Elsenborn', '4760': 'Büllingen (Bullange), Manderfeld', '4761': 'Rocherath', '4770': 'Amblève (Amel), Meyerode', '4771': 'Heppenbach', '4780': 'Recht, Saint-Vith (Sankt Vith)', '4782': 'Schönberg (Schoenberg)', '4783': 'Lommersweiler', '4784': 'Crombach', '4790': 'Burg-Reuland, Reuland', '4791': 'Thommen',
            '4800': 'Ensival, Lambermont, Petit-Rechain, Verviers', '4801': 'Stembert', '4802': 'Heusy', '4820': 'Dison', '4821': 'Andrimont', '4830': 'Limbourg', '4831': 'Bilstain', '4834': 'Goé', '4837': 'Baelen, Membach', '4840': 'Welkenraedt', '4841': 'Henri-Chapelle', '4845': 'Jalhay, Sart-lez-Spa', '4850': 'Montzen, Moresnet, Plombières', '4851': 'Gemmenich, Sippenaeken', '4852': 'Hombourg', '4860': 'Cornesse, Pepinster, Wegnez', '4861': 'Soiron', '4870': 'Forêt, Fraipont, Nessonvaux, Trooz', '4877': 'Olne', '4880': 'Aubel', '4890': 'Thimister-Clermont, Clermont, Thimister',
            '4900': 'Spa', '4910': 'La Reid, Polleur, Theux', '4920': 'Aywaille, Ernonheid, Harzé, Sougné-Remouchamps', '4950': 'Faymonville, Robertville, Sourbrodt, Waimes (Weismes)', '4960': 'Bellevaux-Ligneuville, Bévercé, Malmedy', '4970': 'Francorchamps, Stavelot', '4980': 'Trois-Ponts, Fosse, Wanne', '4983': 'Basse-Bodeux', '4987': 'Chevron, La Gleize, Lorcé, Rahier, Stoumont', '4990': 'Arbrefontaine, Bra, Lierneux',
            //5000
            '5000': 'Namur, Beez', '5001': 'Belgrade', '5002': 'Saint-Servais', '5003': 'Saint-Marc', '5004': 'Bouge', '5012': 'Parlement Wallon', '5020': 'Champion, Daussoulx, Flawinne, Malonne, Suarlée, Temploux, Vedrin', '5021': 'Boninne', '5022': 'Cognelée', '5024': 'Gelbressée, Marche-les-Dames', '5030': 'Gembloux, Beuzet, Ernage, Gembloux, Grand-Manil, Lonzée, Sauvenière', '5031': 'Grand-Leez', '5032': 'Bossière, Bothey, Corroy-le-Château, Isnes, Mazy', '5060': 'Sambreville, Arsimont, Auvelais, Falisolle, Moignelée, Sambreville, Tamines, Velaine-sur-Sambre', '5070': 'Fosses-la-Ville, Aisemont, Fosses-la-Ville, Le Roux, Sart-Eustache, Sart-Saint-Laurent, Vitrival', '5080': 'La Bruyère, Émines, La Bruyère, Rhisnes, Villers-lez-Heest, Warisoulx', '5081': 'Bovesse, Meux, Saint-Denis-Bovesse',
            '5100': 'Dave, Jambes, Naninne, Wépion, Wierde', '5101': 'Erpent, Lives-sur-Meuse, Loyers', '5140': 'Boignée, Ligny, Sombreffe, Tongrinne', '5150': 'Floreffe, Floriffoux, Franière, Soye', '5170': 'Arbre, Bois-de-Villers, Lesve, Lustin, Profondeville, Rivière', '5190': 'Jemeppe-sur-Sambre, Balâtre, Ham-sur-Sambre, Jemeppe-sur-Sambre, Mornimont, Moustier-sur-Sambre, Onoz, Saint-Martin, Spy',
            '5300': 'Andenne, Andenne, Bonneville, Coutisse, Landenne, Maizeret, Namêche, Sclayn, Seilles, Thon, Vezin', '5310': 'Éghezée, Aische-en-Refail, Bolinne, Boneffe, Branchon, Dhuy, Éghezée, Hanret, Leuze, Liernu, Longchamps, Mehaigne, Noville-sur-Mehaigne, Saint-Germain, Taviers, Upigny, Waret-la-Chaussée', '5330': 'Assesse, Assesse, Maillen, Sart-Bernard', '5332': 'Crupet', '5333': 'Sorinne-la-Longue', '5334': 'Florée', '5336': 'Courrière', '5340': 'Faulx-les-Tombes, Gesves, Haltinne, Mozet, Sorée', '5350': 'Évelette, Ohey', '5351': 'Haillot', '5352': 'Perwez-Haillot', '5353': 'Goesnes', '5354': 'Jallet', '5360': 'Hamois, Natoye', '5361': 'Mohiville, Scy', '5362': 'Achet, Emptinne, Schaltin', '5370': 'Barvaux-Condroz, Flostoy, Havelange, Jeneffe, Porcheresse, Verlée', '5372': 'Méan', '5374': 'Maffe', '5376': 'Miécret', '5377': 'Baillonville, Bonsin, Heure, Hogne, Nettinne, Noiseux, Sinsin, Somme-Leuze, Waillet', '5380': 'Bierwart, Cortil-Wodon, Fernelmont, Forville, Franc-Waret, Hemptinne, Hingeon, Marchovelette, Noville-les-Bois, Pontillas, Tillier',
            '5500': 'Anseremme, Bouvignes-sur-Meuse, Dinant, Dréhance, Falmagne, Falmignoul, Furfooz', '5501': 'Lisogne', '5502': 'Thynes', '5503': 'Sorinnes', '5504': 'Foy-Notre-Dame', '5520': 'Anthée, Onhaye', '5521': 'Serville', '5522': 'Falaën', '5523': 'Sommière, Weillen', '5524': 'Gerin', '5530': 'Dorinne, Durnal, Évrehailles, Godinne, Houx, Mont, Purnode, Spontin, Yvoir', '5537': 'Anhée, Annevoie-Rouillon, Bioul, Denée, Haut-le-Wastia, Sosoye, Warnant', '5540': 'Hastière, Hastière-Lavaux, Hermeton-sur-Meuse, Waulsort', '5541': 'Hastière-par-delà', '5542': 'Blaimont', '5543': 'Heer', '5544': 'Agimont', '5550': 'Alle, Bagimont, Bohan, Chairière, Laforêt, Membre, Mouzaive, Nafraiture, Orchimont, Pussemange, Sugny, Vresse-sur-Semois', '5555': 'Baillamont, Bellefontaine, Bièvre, Cornimont, Graide, Gros-Fays, Monceau-en-Ardenne, Naomé, Oizy, Petit-Fays', '5560': 'Ciergnon, Finnevaux, Houyet, Hulsonniaux, Mesnil-Église, Mesnil-Saint-Blaise', '5561': 'Celles', '5562': 'Custinne', '5563': 'Hour', '5564': 'Wanlin', '5570': 'Baronville, Beauraing, Dion, Felenne, Feschaux, Honnay, Javingue, Vonêche, Wancennes, Winenne', '5571': 'Wiesme', '5572': 'Focant', '5573': 'Martouzin-Neuville', '5574': 'Pondrôme', '5575': 'Bourseigne-Neuve, Bourseigne-Vieille, Gedinne, Houdremont, Louette-Saint-Denis, Louette-Saint-Pierre, Malvoisin, Patignies, Rienne, Sart-Custinne, Vencimont, Willerzie', '5576': 'Froidfontaine', '5580': 'Ave-et-Auffe, Buissonville, Eprave, Han-sur-Lesse, Jemelle, Lavaux-Sainte-Anne, Lessive, Mont-Gauthier, Rochefort, Villers-sur-Lesse, Wavreille', '5590': 'Achêne, Braibant, Chevetogne, Ciney, Conneux, Haversin, Leignon, Pessoux, Serinchamps, Sovet',
            '5600': 'Philippeville, Fagnolle, Franchimont, Jamagne, Jamiolle, Merlemont, Neuville, Omezée, Philippeville, Roly, Romedenne, Samart, Sart-en-Fagne, Sautour, Surice, Villers-en-Fagne, Villers-le-Gambon, Vodecée', '5620': 'Florennes, Corenne, Flavion, Florennes, Hemptinne-lez-Florennes, Morville, Rosée, Saint-Aubin', '5621': 'Hanzinelle, Hanzinne, Morialmé, Thy-le-Bauduin', '5630': 'Cerfontaine, Cerfontaine, Daussois, Senzeille, Silenrieux, Soumoy, Villers-Deux-Églises', '5640': 'Mettet, Biesme, Biesmerée, Graux, Mettet, Oret, Saint-Gérard', '5641': 'Furnaux (Mettet)', '5644': 'Ermeton-sur-Biert (Mettet)', '5646': 'Stave (Mettet)', '5650': 'Walcourt, Castillon, Chastrès, Clermont, Fontenelle, Fraire, Pry, Vogenée, Walcourt, Yves-Gomezée', '5651': 'Berzée, Gourdinne, Laneffe, Rognée, Somzée, Tarcienne, Thy-le-Château', '5660': 'Couvin, Aublain, Boussu-en-Fagne, Brûly, Brûly-de-Pesche, Couvin, Cul-des-Sarts, Dailly, Frasnes, Gonrieux, Mariembourg, Pesche, Petigny, Petite-Chapelle, Presgaux', '5670': 'Viroinval, Dourbes, Le Mesnil, Mazée, Nismes, Oignies-en-Thiérache, Olloy-sur-Viroin, Treignes, Vierves-sur-Viroin', '5680': 'Doische, Doische, Gimnée, Gochenée, Matagne-la-Grande, Matagne-la-Petite, Niverlée, Romerée, Soulme, Vaucelles, Vodelée',
            //6000
            '6000': 'Charleroi', '6001': 'Charleroi, Marcinelle', '6010': 'Charleroi, Couillet', '6020': 'Charleroi, Dampremy', '6030': 'Charleroi, Goutroux, Marchienne-au-Pont', '6031': 'Charleroi, Monceau-sur-Sambre', '6032': 'Charleroi, Mont-sur-Marchienne', '6040': 'Charleroi, Jumet', '6041': 'Charleroi, Gosselies', '6042': 'Charleroi, Lodelinsart', '6043': 'Charleroi, Ransart', '6044': 'Charleroi, Roux', '6060': 'Charleroi, Gilly', '6061': 'Charleroi, Montignies-sur-Sambre',
            '6110': 'Montigny-le-Tilleul', '6111': 'Landelies', '6120': 'Ham-sur-Heure-Nalinnes, Cour-sur-Heure, Ham-sur-Heure, Jamioulx, Marbaix, Nalinnes', '6140': 'Fontaine-l\'Évêque', '6141': 'Forchies-la-Marche (Fontaine-l\'Évêque)', '6142': 'Leernes (Fontaine-l\'Évêque)', '6150': 'Anderlues', '6180': 'Courcelles (Charleroi)', '6181': 'Gouy-lez-Piéton (Charleroi)', '6182': 'Souvret (Charleroi)', '6183': 'Trazegnies (Charleroi)',
            '6200': 'Châtelet, Bouffioulx, Châtelet, Châtelineau', '6210': 'Les Bons Villers, Frasnes-lez-Gosselies, Rèves, Villers-Perwin, Wayaux', '6211': 'Mellet (Les Bons Villers)', '6220': 'Fleurus, Fleurus, Heppignies, Lambusart, Wangenies', '6221': 'Saint-Amand (Fleurus)', '6222': 'Brye (Fleurus)', '6223': 'Wagnelée (Fleurus)', '6224': 'Wanfercée-Baulet (Fleurus)', '6230': 'Pont-à-Celles, Buzet, Obaix, Pont-à-Celles, Thiméon, Viesville', '6238': 'Pont-à-Celles, Liberchies, Luttre', '6240': 'Farciennes, Farciennes, Pironchamps', '6250': 'Aiseau-Presles, Aiseau, Pont-de-Loup, Presles, Roselies', '6280': 'Gerpinnes, Acoz, Gerpinnes, Gougnies, Joncret, Loverval, Villers-Poterie',
            '6440': 'Froidchapelle, Boussu-lez-Walcourt, Fourbechies, Froidchapelle, Vergnies', '6441': 'Erpion (Froidchapelle)', '6460': 'Chimay, Bailièvre, Chimay, Robechies, Saint-Remy, Salles, Villers-la-Tour', '6461': 'Virelles (Chimay)', '6462': 'Vaulx-lez-Chimay (Chimay)', '6463': 'Lompret (Chimay)', '6464': 'Chimay, Baileux, Bourlers, Forges, L\'Escaillère, Rièzes', '6470': 'Sivry-Rance, Grandrieu, Montbliart, Rance, Sautin, Sivry',
            '6500': 'Beaumont, Barbençon, Beaumont, Leugnies, Leval-Chaudeville, Renlies, Solre-Saint-Géry, Thirimont', '6511': 'Beaumont, Strée', '6530': 'Thuin, Leers-et-Fosteau, Thuin', '6531': 'Biesme-sous-Thuin (Thuin)', '6532': 'Ragnies (Thuin)', '6533': 'Biercée (Thuin)', '6534': 'Gozée (Thuin)', '6536': 'Thuin, Donstiennes, Thuillies', '6540': 'Lobbes, Lobbes, Mont-Sainte-Geneviève', '6542': 'Sars-la-Buissière (Lobbes)', '6543': 'Bienne-lez-Happart (Lobbes)', '6560': 'Erquelinnes, Bersillies-l\'Abbaye, Erquelinnes, Grand-Reng, Hantes-Wihéries, Montignies-Saint-Christophe, Solre-sur-Sambre', '6567': 'Merbes-le-Château, Fontaine-Valmont, Labuissière, Merbes-le-Château, Merbes-Sainte-Marie', '6590': 'Momignies', '6591': 'Macon (Momignies)', '6592': 'Monceau-Imbrechies (Momignies)', '6593': 'Macquenoise (Momignies)', '6594': 'Beauwelz (Momignies)', '6596': 'Momignies, Forge-Philippe, Seloignes',
            '6600': 'Bastogne, Longvilly, Noville, Villers-la-Bonne-Eau, Wardin', '6630': 'Martelange', '6637': 'Fauvillers, Hollange, Tintange', '6640': 'Hompré, Morhet, Nives, Sibret, Vaux-lez-Rosières, Vaux-sur-Sûre', '6642': 'Juseret', '6660': 'Houffalize, Nadrin', '6661': 'Mont, Tailles', '6662': 'Tavigny', '6663': 'Mabompré', '6666': 'Wibrin', '6670': 'Gouvy, Limerlé', '6671': 'Bovigny', '6672': 'Beho', '6673': 'Cherain', '6674': 'Montleban', '6680': 'Amberloup, Sainte-Ode, Tillet', '6681': 'Lavacherie', '6686': 'Flamierge', '6687': 'Bertogne, Longchamps', '6690': 'Bihain, Vielsalm', '6692': 'Petit-Thier', '6698': 'Grand-Halleux',
            '6700': 'Arlon, Bonnert, Heinsch, Toernich', '6704': 'Guirsch', '6706': 'Autelbas', '6717': 'Attert, Nobressart, Nothomb, Thiaumont, Tontelange', '6720': 'Habay, Habay-la-Neuve, Hachy', '6721': 'Anlier', '6723': 'Habay-la-Vieille', '6724': 'Houdemont, Rulles', '6730': 'Bellefontaine, Rossignol, Saint-Vincent, Tintigny, Han (Tintigny), Breuvanne (Tintigny), Lahage (Tintigny), Poncelle (Tintigny), Ansart (Tintigny)', '6740': 'Étalle, Sainte-Marie-sur-Semois, Villers-sur-Semois', '6741': 'Vance', '6742': 'Chantemelle', '6743': 'Buzenol', '6747': 'Châtillon, Meix-le-Tige, Saint-Léger', '6750': 'Musson, Mussy-la-Ville, Signeulx', '6760': 'Bleid, Èthe, Ruette, Virton', '6761': 'Latour', '6762': 'Saint-Mard', '6767': 'Dampicourt, Harnoncourt, Lamorteau, Rouvroy, Torgny', '6769': 'Gérouville, Meix-devant-Virton, Robelmont, Sommethonne, Villers-la-Loue', '6780': 'Hondelange, Messancy, Wolkrange', '6781': 'Sélange', '6782': 'Habergy', '6790': 'Aubange', '6791': 'Athus', '6792': 'Halanzy, Rachecourt',
            '6800': 'Bras, Freux, Libramont, Moircy, Recogne, Remagne, Sainte-Marie-Chevigny, Saint-Pierre', '6810': 'Chiny, Izel, Jamoigne', '6811': 'Les Bulles', '6812': 'Suxy', '6813': 'Termes', '6820': 'Florenville, Fontenoille, Muno, Sainte-Cécile', '6821': 'Lacuisine', '6823': 'Villers-devant-Orval', '6824': 'Chassepierre', '6830': 'Bouillon, Les Hayons, Poupehan, Rochehaut', '6831': 'Noirefontaine', '6832': 'Sensenruth', '6833': 'Ucimont, Vivy', '6834': 'Bellevaux', '6836': 'Dohan', '6838': 'Corbion', '6840': 'Grandvoir, Grapfontaine, Hamipré, Longlier, Neufchâteau, Tournay', '6850': 'Carlsbourg, Offagne, Paliseul', '6851': 'Nollevaux', '6852': 'Maissin, Opont', '6853': 'Framont', '6856': 'Fays-les-Veneurs', '6860': 'Assenois, Ébly, Léglise, Mellier, Witry', '6870': 'Arville, Awenne, Hatrival, Mirwart, Saint-Hubert, Vesqueville', '6880': 'Auby-sur-Semois, Bertrix, Cugnon, Jehonville, Orgeo', '6887': 'Herbeumont, Saint-Médard, Straimont', '6890': 'Anloy, Libin, Ochamps, Redu, Smuid, Transinne, Villance',
            '6900': 'Aye, Hargimont, Humain, Marche-en-Famenne, On, Roy, Waha, Verdenne, Lignières, Grimbiémont', '6920': 'Sohier, Wellin', '6921': 'Chanly', '6922': 'Halma', '6924': 'Lomprez', '6927': 'Bure, Grupont, Resteigne, Tellin', '6929': 'Daverdisse, Gembes, Haut-Fays, Porcheresse', '6940': 'Barvaux-sur-Ourthe, Durbuy, Grandhan, Septon, Wéris', '6941': 'Bende, Bomal-sur-Ourthe, Borlon, Heyd, Izier, Tohogne, Villers-Sainte-Gertrude', '6950': 'Harsin, Nassogne', '6951': 'Bande', '6952': 'Grune', '6953': 'Ambly, Forrières, Lesterny, Masbourg', '6960': 'Dochamps, Grandmenil, Harre, Malempré, Manhay, Odeigne, Vaux-Chavanne', '6970': 'Tenneville', '6971': 'Champlon', '6972': 'Erneuville', '6980': 'Beausaint, La Roche-en-Ardenne', '6982': 'Samrée', '6983': 'Ortho', '6984': 'Hives', '6986': 'Halleux', '6987': 'Beffe, Hodister, Marcourt, Rendeux', '6990': 'Fronville, Hampteau, Hotton, Marenne', '6997': 'Amonines, Érezée, Mormont, Soy',
            //7000
            '7000': 'Mons', '7010': 'Shape', '7011': 'Ghlin', '7012': 'Flénu, Jemappes', '7020': 'Maisières, Nimy', '7021': 'Havré', '7022': 'Harmignies, Harveng, Hyon, Mesvin, Nouvelles', '7024': 'Ciply', '7030': 'Saint-Symphorien', '7031': 'Villers-Saint-Ghislain', '7032': 'Spiennes', '7033': 'Cuesmes', '7034': 'Obourg, Saint-Denis', '7040': 'Quévy, Asquillies, Aulnois, Blaregnies, Bougnies, Genly, Gœgnies-Chaussée, Quévy-le-Grand, Quévy-le-Petit', '7041': 'Givry, Havay', '7050': 'Erbaut, Erbisœul, Herchies, Jurbise, Masnuy-Saint-Jean, Masnuy-Saint-Pierre', '7060': 'Horrues, Soignies', '7061': 'Casteau, Thieusies', '7062': 'Naast', '7063': 'Chaussée-Notre-Dame-Louvignies, Neufvilles', '7070': 'Gottignies, Le Rœulx, Mignault, Thieu, Ville-sur-Haine', '7080': 'Eugies, Frameries, La Bouverie, Noirchain, Sars-la-Bruyère', '7090': 'Braine-le-Comte, Hennuyères, Henripont, Petit-Rœulx-lez-Braine, Ronquières, Steenkerque',
            '7100': 'Haine-Saint-Paul, Haine-Saint-Pierre, La Louvière, Saint-Vaast, Trivières', '7110': 'Boussoit, Houdeng-Aimeries, Houdeng-Gœgnies, Maurage, Strépy-Bracquegnies', '7120': 'Estinnes, Croix-lez-Rouveroy, Estinnes-au-Mont, Estinnes-au-Val, Faurœulx, Haulchin, Peissant, Rouveroy, Vellereille-les-Brayeux, Vellereille-le-Sec', '7130': 'Binche, Bray', '7131': 'Waudrez', '7133': 'Buvrinnes', '7134': 'Épinois, Leval-Trahegnies, Péronnes-lez-Binche, Ressaix', '7140': 'Morlanwelz, Morlanwelz-Mariemont', '7141': 'Carnières, Mont-Sainte-Aldegonde', '7160': 'Chapelle-lez-Herlaimont, Godarville, Piéton', '7170': 'Bellecourt, Bois-d\'Haine, Fayt-lez-Manage, La Hestre, Manage', '7180': 'Seneffe', '7181': 'Arquennes, Familleureux, Feluy, Petit-Rœulx-lez-Nivelles', '7190': 'Écaussinnes, Écaussinnes-d\'Enghien, Marche-lez-Écaussinnes', '7191': 'Écaussinnes-Lalaing',
            '7300': 'Boussu', '7301': 'Hornu', '7320': 'Bernissart', '7321': 'Blaton, Harchies', '7322': 'Pommerœul, Ville-Pommeroeul', '7330': 'Saint-Ghislain', '7331': 'Baudour', '7332': 'Neufmaison, Sirault', '7333': 'Tertre', '7334': 'Hautrage, Villerot', '7340': 'Colfontaine, Pâturages, Warquignies, Wasmes', '7350': 'Hainin, Hensies, Montrœul-sur-Haine, Thulin', '7370': 'Blaugies, Dour, Élouges, Wihéries', '7380': 'Baisieux, Quiévrain', '7382': 'Audregnies', '7387': 'Honnelles, Angre, Angreau, Athis, Autreppe, Erquennes, Fayt-le-Franc, Marchipont, Montignies-sur-Roc, Onnezies, Roisin', '7390': 'Quaregnon, Wasmuel',
            '7500': 'Tournai (Doornik), Ere, Saint-Maur', '7501': 'Orcq', '7502': 'Esplechin', '7503': 'Froyennes', '7504': 'Froidmont', '7506': 'Willemeau', '7520': 'Ramegnies-Chin, Templeuve', '7521': 'Chercq', '7522': 'Blandain, Hertain, Lamain, Marquain', '7530': 'Gaurain-Ramecroix', '7531': 'Havinnes', '7532': 'Beclers', '7533': 'Thimougies', '7534': 'Barry, Maulde', '7536': 'Vaulx', '7538': 'Vezon', '7540': 'Kain, Melles, Quartes, Rumillies', '7542': 'Mont-Saint-Aubert', '7543': 'Mourcourt', '7548': 'Warchin',
            '7600': 'Péruwelz', '7601': 'Roucourt', '7602': 'Bury', '7603': 'Bon-Secours', '7604': 'Baugnies, Braffe, Brasmenil, Callenelle, Wasmes-Audemez-Briffœil, Wasmes', '7608': 'Wiers', '7610': 'Rumes', '7611': 'La Glanerie', '7618': 'Taintignies', '7620': 'Bléharies, Brunehaut, Guignies, Hollain, Jollain-Merlin, Wez-Velvain', '7621': 'Lesdain', '7622': 'Laplaigne', '7623': 'Rongy', '7624': 'Howardries', '7640': 'Antoing, Maubray, Péronnes-lez-Antoing', '7641': 'Bruyelle', '7642': 'Calonne', '7643': 'Fontenoy',
            '7700': 'Mouscron (Moeskroen), Luingne', '7711': 'Dottignies', '7712': 'Herseaux', '7730': 'Bailleul, Estaimbourg, Estaimpuis, Evregnies, Leers-Nord, Néchin, Saint-Léger', '7740': 'Pecq, Warcoing', '7742': 'Hérinnes-lez-Pecq', '7743': 'Esquelmes, Obigies', '7750': 'Mont-de-l\'Enclus, Amougies, Anserœul, Orroir, Russeignies', '7760': 'Celles, Escanaffles, Molenbaix, Popuelles, Pottes, Velaines', '7780': 'Comines-Warneton, Comines', '7781': 'Houthem', '7782': 'Ploegsteert', '7783': 'Le Bizet', '7784': 'Bas-Warneton, Warneton',
            '7800': 'Ath', '7801': 'Irchonwelz', '7802': 'Ormeignies', '7803': 'Bouvignies', '7804': 'Ostiches, Rebaix', '7810': 'Maffle', '7811': 'Arbre', '7812': 'Houtaing, Ligne, Mainvault, Moulbaix, Villers-Notre-Dame, Villers-Saint-Amand', '7822': 'Ghislenghien, Isières, Meslin-l\'Évêque', '7823': 'Gibecq', '7830': 'Bassilly, Fouleng, Gondregnies, Graty, Hellebecq, Hoves, Silly, Thoricourt', '7850': 'Enghien, Marcq, Petit-Enghien', '7860': 'Lessines', '7861': 'Papignies, Wannebecq', '7862': 'Ogy', '7863': 'Ghoy', '7864': 'Deux-Acren', '7866': 'Bois-de-Lessines, Ollignies', '7870': 'Bauffe, Cambron-Saint-Vincent, Lens, Lombise, Montignies-lez-Lens', '7880': 'Flobecq', '7890': 'Ellezelles, Lahamaide, Wodecq',
            '7900': 'Grandmetz, Leuze-en-Hainaut', '7901': 'Thieulain', '7903': 'Blicquy, Chapelle-à-Oie, Chapelle-à-Wattines', '7904': 'Pipaix, Tourpes, Willaupuis', '7906': 'Gallaix', '7910': 'Frasnes-lez-Anvaing, Anvaing, Arc-Ainières, Arc-Wattripont, Cordes, Ellignies-lez-Frasnes, Forest, Wattripont', '7911': 'Buissenal, Frasnes-lez-Buissenal, Hacquegnies, Herquegies, Montrœul-au-Bois, Moustier, Œudeghien', '7912': 'Dergneau, Saint-Sauveur', '7940': 'Brugelette, Cambron-Casteau', '7941': 'Attre', '7942': 'Mévergnies-lez-Lens', '7943': 'Gages', '7950': 'Chièvres, Grosage, Huissignies, Ladeuze, Tongre-Saint-Martin', '7951': 'Chièvres', '7970': 'Belœil', '7971': 'Basècles, Ramegnies, Thumaide, Wadelincourt', '7972': 'Aubechies, Ellignies-Sainte-Anne, Quevaucamps', '7973': 'Grandglise, Stambruges',
            //8000
            '8000': 'Brugge (Bruges), Koolkerke', '8020': 'Oostkamp, Hertsberge, Ruddervoorde, Waardamme',
            '8200': 'Sint-Andries, Sint-Michiels', '8210': 'Loppem, Veldegem, Zedelgem', '8211': 'Aartrijke',
            '8300': 'Knokke-Heist, Knokke, Westkapelle', '8301': 'Heist, Ramskapelle', '8310': 'Assebroek, Sint-Kruis', '8340': 'Damme, Hoeke, Lapscheure, Moerkerke, Oostkerke, Sijsele', '8370': 'Blankenberge, Uitkerke', '8377': 'Houtave, Meetkerke, Nieuwmunster, Zuienkerke', '8380': 'Dudzele, Lissewege, Zeebrugge (Zeebruges)',
            '8400': 'Oostende (Ostende), Stene, Zandvoorde', '8420': 'De Haan (Le Coq), Klemskerke, Wenduine', '8421': 'Vlissegem', '8430': 'Middelkerke', '8431': 'Wilskerke', '8432': 'Leffinge', '8433': 'Mannekensvere, Schore, Sint-Pieters-Kapelle, Slijpe, Spermalie', '8434': 'Lombardsijde, Westende', '8450': 'Bredene', '8460': 'Ettelgem, Oudenburg, Roksem, Westkerke', '8470': 'Gistel, Moere, Snaaskerke, Zevekote', '8480': 'Bekegem, Eernegem, Ichtegem', '8490': 'Jabbeke, Snellegem, Stalhille, Varsenare, Zerkegem',
            '8500': 'Kortrijk (Courtrai)', '8501': 'Bissegem, Heule', '8510': 'Bellegem, Kooigem, Marke, Rollegem', '8511': 'Aalbeke', '8520': 'Kuurne', '8530': 'Harelbeke', '8531': 'Bavikhove, Hulste', '8540': 'Deerlijk', '8550': 'Zwevegem', '8551': 'Heestert, Moen, Otegem', '8554': 'Saint-Genois', '8560': 'Gullegem, Moorsele, Wevelgem', '8570': 'Anzegem, Gijzelbrechtegem, Ingooigem, Vichte', '8572': 'Kaster', '8573': 'Tiegem', '8580': 'Avelgem', '8581': 'Kerkhove, Waarmaarde', '8582': 'Outrijve', '8583': 'Bossuit', '8587': 'Espierres-Helchin (Spiere-Helkijn), Espierres (Spiere), Helchin (Helkijn)',
            '8600': 'Diksmuide (Dixmude), Beerst, Driekapellen, Oudekapelle, Nieuwkapelle, Sint-Jacobskapelle, Esen, Kaaskerke, Keiem, Lampernisse, Leke, Oostkerke, Pervijze, Stuivekenskerke, Vladslo, Woumen', '8610': 'Handzame, Kortemark, Werken, Zarren', '8620': 'Nieuwpoort (Nieuport), Ramskapelle, Saint-Georges', '8630': 'Avekapelle, Beauvoorde, Vinkem, Wulveringem, Booitshoeke, Bulskamp, De Moeren, Eggewaartskapelle, Houtem, Steenkerke, Veurne (Furnes), Zoutenaaie', '8640': 'Vleteren, Oostvleteren, Westvleteren, Woesten', '8647': 'Lo-Reninge, Lo, Noordschote, Pollinkhove, Reninge', '8650': 'Houthulst, Klerken, Merkem', '8660': 'Adinkerke (Adinkerke), La Panne (De Panne)', '8670': 'Koksijde (Coxyde), Ostdunkerque, Wulpen', '8680': 'Bovekerke, Koekelare, Zande', '8690': 'Alveringem, Hoogstade, Oeren, Sint-Rijkers', '8691': 'Beveren-aan-den-Ijzer, Gijverinkhove, Izenberge, Leisele, Stavele',
            '8700': 'Aarsele, Kanegem, Schuiferskapelle, Tielt', '8710': 'Ooigem, Sint-Baafs-Vijve, Wielsbeke', '8720': 'Dentergem, Markegem, Oeselgem, Wakken', '8730': 'Beernem, Oedelem, Sint-Joris (Beernem)', '8740': 'Egem, Pittem', '8750': 'Wingene, Zwevezele', '8755': 'Ruiselede', '8760': 'Meulebeke', '8770': 'Ingelmunster', '8780': 'Oostrozebeke', '8790': 'Waregem', '8791': 'Beveren', '8792': 'Desselgem', '8793': 'Vive-Saint-Éloi',
            '8800': 'Beveren, Oekene, Roeselare (Roulers), Rumbeke', '8810': 'Lichtervelde', '8820': 'Torhout (Thourout)', '8830': 'Gits, Hooglede', '8840': 'Oostnieuwkerke, Staden, Westrozebeke', '8850': 'Ardooie', '8851': 'Koolskamp', '8860': 'Lendelede', '8870': 'Emelgem, Iseghem, Kachtem', '8880': 'Ledeghem, Rollegem-Kapelle, Winkel-Saint-Éloi', '8890': 'Dadizele, Moorslede',
            '8900': 'Brielen, Dikkebus, Sint-Jan, Ieper (Ypres)', '8902': 'Hollebeke, Voormezele, Zillebeke', '8904': 'Boezinge, Zuidschote', '8906': 'Elverdinge', '8908': 'Vlamertinge', '8920': 'Langemark-Poelkapelle, Bikschote, Langemark, Poelkapelle', '8930': 'Lauwe, Menen (Menen), Rekkem', '8940': 'Geluwe, Wervik', '8950': 'Heuvelland, Neuve-Église', '8951': 'Dranoutre', '8952': 'Wulverghem', '8953': 'Wijtschate', '8954': 'Westouter', '8956': 'Kemmel', '8957': 'Mesen (Messines)', '8958': 'Loker', '8970': 'Poperinge, Reningelst', '8972': 'Krombeke, Proven, Roesbrugge-Haringe', '8978': 'Watou', '8980': 'Beselare, Geluveld, Passendale, Zanvoorde, Zonnebeke',
            //9000
            '9000': 'Gent (Gand)', '9030': 'Mariakerke', '9031': 'Drongen', '9032': 'Wondelgem', '9040': 'Sint-Amandsberg', '9041': 'Oostakker', '9042': 'Desteldonk, Mendonk, Sint-Kruis-Winkel (Winkel-Sainte-Croix)', '9050': 'Gentbrugge, Ledeberg', '9051': 'Afsnee, Sint-Denijs-Westrem (Saint-Denis-Westrem)', '9052': 'Zwijnaarde', '9060': 'Zelzate', '9070': 'Destelbergen, Heusden', '9080': 'Beervelde, Lochristi, Zaffelare, Zeveneken', '9090': 'Melle, Gontrode',
            '9100': 'Sint-Niklaas (Saint-Nicolas), Nieuwkerken-Waas', '9111': 'Belsele', '9112': 'Sinaai', '9120': 'Beveren-Waas, Haasdonk, Melsele, Kallo (une partie de l\'ancienne commune de Kallo), Vrasene', '9130': 'Doel, Kallo (une partie de l\'ancienne commune de Kallo), Kieldrecht, Verrebroek', '9140': 'Elversele, Steendorp, Temse (Tamise), Tielrode', '9150': 'Bazel, Kruibeke, Rupelmonde', '9160': 'Daknam, Eksaarde, Lokeren', '9170': 'La Clinge, Meerdonk, Sint-Gillis-Waas (Saint-Gilles-Waes), Sint-Pauwels (Saint-Paul)', '9180': 'Moerbeke-Waas', '9185': 'Wachtebeke', '9190': 'Stekene, Kemzeke',
            '9200': 'Appels, Baesrode (Baasrode), Grembergen, Mespelare, Oudegem (Audeghem), Schoonaarde, Sint-Gillis-bij-Dendermonde (Saint-Gilles-lez-Termonde), Dendermonde (Termonde)', '9220': 'Hamme, Moerzeke', '9230': 'Massemen, Westrem, Wetteren', '9240': 'Zele', '9250': 'Waasmunster', '9255': 'Buggenhout, Opdorp', '9260': 'Wichelen, Schellebelle, Serskamp', '9270': 'Laerne, Kalken', '9280': 'Denderbelle, Lebbeke, Wieze', '9290': 'Berlare, Overmere, Uitbergen',
            '9300': 'Aalst (Alost)', '9308': 'Gijzegem, Hofstade', '9310': 'Baardegem, Herdersem, Meldert, Moorsel', '9320': 'Erembodegem, Nieuwerkerken', '9340': 'Impe, Lede, Oordegem, Smetlede, Wanzele',
            '9400': 'Appelterre-Eichem, Denderwindeke, Lieferinge, Nederhasselt, Ninove, Okegem, Voorde', '9401': 'Pollare', '9402': 'Meerbeke', '9403': 'Neigem', '9404': 'Aspelare', '9406': 'Outer', '9420': 'Erpe-Mere, Aaigem, Bambrugge, Burst, Erondegem, Erpe, Mere, Ottergem, Vlekkem', '9450': 'Denderhoutem (Denderhautem), Haaltert, Heldergem', '9451': 'Kerksken', '9470': 'Denderleeuw', '9472': 'Iddergem', '9473': 'Welle',
            '9500': 'Geraardsbergen (Grammont), Goeferdinge, Moerbeke, Nederboelare, Onkerzele, Ophasselt, Overboelare, Viane, Zarlardinge', '9506': 'Grimminge, Idegem, Nieuwenhove, Schendelbeke, Smeerebbe-Vloerzegem, Waarbeke, Zandbergen', '9520': 'Sint-Lievens-Houtem (Hautem-Saint-Liévin), Bavegem, Vlierzele, Zonnegem', '9521': 'Letterhoutem', '9550': 'Herzele, Hillegem, Sint-Antelinks (Saint-Antelinkx), Sint-Lievens-Esse (Essche-Saint-Liévin), Steenhuize-Wijnhuize, Woubrechtegem', '9551': 'Ressegem', '9552': 'Borsbeke', '9570': 'Lierde, Deftinge, Sint-Maria-Lierde (Lierde-Sainte-Marie)', '9571': 'Hemelveerdegem', '9572': 'Sint-Martens-Lierde (Lierde-Saint-Martin)',
            '9700': 'Oudenaarde (Audenarde), Bevere, Edelare, Eine, Ename, Heurne, Leupegem, Mater, Melden, Mullem, Nederename, Volkegem, Welden', '9750': 'Zingem, Huysse, Ouwegem', '9770': 'Kruishoutem', '9771': 'Nokere', '9772': 'Wannegem-Lede', '9790': 'Wortegem-Petegem, Elsegem, Moregem, Ooike, Petegem-aan-de-Schelde, Wortegem',
            '9800': 'Deinze, Astene, Bachte-Maria-Leerne, Gottem, Grammene, Leerne-Saint-Martin, Meigem, Petegem-aan-de-Leie, Vinkt, Wontergem, Zeveren', '9810': 'Nazareth, Eke', '9820': 'Merelbeke, Bottelare, Lemberge, Melsen, Munte, Schelderode', '9830': 'Sint-Martens-Latem (Laethem-Saint-Martin), Deurle', '9840': 'La Pinte, Zevergem', '9850': 'Nevele, Hansbeke, Landegem, Merendree, Poesele, Vosselare', '9860': 'Oosterzele, Balegem, Gijzenzele, Landskouter, Moortsele, Scheldewindeke', '9870': 'Zulte, Machelen, Olsene', '9880': 'Aalter, Lotenhulle, Poeke', '9881': 'Bellem', '9890': 'Gavre, Asper, Baaigem, Dikkelvenne, Semmerzake, Vurste',
            '9900': 'Eeklo', '9910': 'Knesselare, Ursel', '9920': 'Lovendegem', '9921': 'Vinderhoute', '9930': 'Zomergem, Oostwinkel, Ronsele', '9940': 'Everghem, Ertvelde, Kluizen, Sleidinge', '9950': 'Waarschoot', '9960': 'Assenede, Boekhoute', '9968': 'Bassevelde, Oosteeklo', '9970': 'Kaprijke', '9971': 'Lembeke', '9980': 'Sint-Laureins (Saint-Laurent), Sint-Margriete (Sainte-Marguerite), Saint-Jean-in-Eremo', '9988': 'Waterland-Oudeman, Watervliet', '9990': 'Maldeghem, Adegem, Middelbourg',
};

// Fonction pour vérifier si le code postal est valide
const isValidPostalCode = (commune) => {
    return Object.keys(postalCodeMap).includes(commune);
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
            {translate({ id: 'search.title', message: 'Recherchez un Électricien par Code Postal' })} <br />
            (Beta Version)
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
                                            {translate({ id: 'search.tva', message: '🔍 n° TVA' })} : {electrician.tva} ✅ <br />
                                            {translate({ id: 'search.registeredSince', message: '📅 Agréé depuis' })} : {electrician.registeredSince}
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
                            {!isValidPostalCode(query) ? (
                                <div className={styles.warningContainer}>
                                <span className={styles.warningIcon}>⚠️</span>
                                {translate({
                                    id: 'search.invalidPostalCode',
                                    message: `Le code postal introduit n'est pas reconnu. Veuillez vérifier le code postal saisi.`,
                                })}
                                </div>
                                ) : (
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
                            )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default ElectricianSearch;
