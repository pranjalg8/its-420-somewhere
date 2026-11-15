export type LegalStatus = 'legal' | 'decriminalised' | 'medical' | 'illegal' | 'strict';

export interface Place {
  id: string;
  city: string;
  region: string; // country or state/country
  cc: string; // ISO country code, used for the flag emoji
  lat: number;
  lng: number;
  tz: string; // IANA time zone
  status: LegalStatus;
  legal: string;
  culture: string;
  wiki: string; // Wikipedia article slug for further reading
}

export const STATUS_META: Record<LegalStatus, { label: string; color: string; blurb: string }> = {
  legal: { label: 'Legal for adults', color: '#4ade80', blurb: 'Adult use is legal under local rules.' },
  decriminalised: { label: 'Decriminalised / tolerated', color: '#d9f04a', blurb: 'Personal use is not punished like a crime, but sale is usually not legal.' },
  medical: { label: 'Medical only', color: '#38bdf8', blurb: 'Legal with a prescription or licence; recreational use is not.' },
  illegal: { label: 'Illegal', color: '#fb923c', blurb: 'Possession and use are offences.' },
  strict: { label: 'Severe penalties', color: '#f43f5e', blurb: 'Very harsh enforcement. Do not carry cannabis here.' },
};

// Summaries are written from general knowledge and simplified. Laws change often:
// treat them as a starting point and check official sources before you travel or act.
export const PLACES: Place[] = [
  {
    id: 'honolulu', city: 'Honolulu', region: 'Hawaii, USA', cc: 'US', lat: 21.31, lng: -157.86, tz: 'Pacific/Honolulu', status: 'medical',
    legal: 'Medical cannabis has been legal since 2000, with dispensaries since 2017. Adult recreational sale is not legal; small amounts (up to 3 g) are decriminalised. Still illegal under US federal law.',
    culture: 'Island strains like Maui Wowie and Kona Gold became counterculture legends in the 1970s.',
    wiki: 'Cannabis_in_Hawaii',
  },
  {
    id: 'anchorage', city: 'Anchorage', region: 'Alaska, USA', cc: 'US', lat: 61.22, lng: -149.9, tz: 'America/Anchorage', status: 'legal',
    legal: 'Adult use legal since 2015 after a 2014 ballot measure, with licensed shops and on-site consumption. Illegal under US federal law.',
    culture: 'A 1975 state court ruling (Ravin v. State) protected home possession decades before legalisation.',
    wiki: 'Cannabis_in_Alaska',
  },
  {
    id: 'la', city: 'Los Angeles', region: 'California, USA', cc: 'US', lat: 34.05, lng: -118.24, tz: 'America/Los_Angeles', status: 'legal',
    legal: 'Adult use legal since Prop 64 (2016); licensed retail opened in 2018. 21+ only. Still illegal under US federal law.',
    culture: 'California is home to the "420" origin story: a group of San Rafael High students, the Waldos, in 1971.',
    wiki: 'Cannabis_in_California',
  },
  {
    id: 'denver', city: 'Denver', region: 'Colorado, USA', cc: 'US', lat: 39.74, lng: -104.99, tz: 'America/Denver', status: 'legal',
    legal: 'Adult use legal since Amendment 64 (2012); the first US retail sales began in January 2014. Public consumption is not allowed.',
    culture: 'Denver has hosted huge 4/20 gatherings and helped define the modern regulated-market era.',
    wiki: 'Cannabis_in_Colorado',
  },
  {
    id: 'mexico-city', city: 'Mexico City', region: 'Mexico', cc: 'MX', lat: 19.43, lng: -99.13, tz: 'America/Mexico_City', status: 'decriminalised',
    legal: 'Small amounts have been decriminalised since 2009, and Supreme Court rulings (2018, 2021) say adults cannot be punished for personal use. There is no working commercial retail system yet.',
    culture: 'Cannabis ("mariguana") is baked into folk culture, from corridos to the verses of "La Cucaracha".',
    wiki: 'Cannabis_in_Mexico',
  },
  {
    id: 'chicago', city: 'Chicago', region: 'Illinois, USA', cc: 'US', lat: 41.88, lng: -87.63, tz: 'America/Chicago', status: 'legal',
    legal: 'Adult use legal since January 2020; 21+. Illinois was the first state to legalise through the legislature rather than a ballot measure.',
    culture: 'One of the largest regulated markets in the Midwest.',
    wiki: 'Cannabis_in_Illinois',
  },
  {
    id: 'bogota', city: 'Bogotá', region: 'Colombia', cc: 'CO', lat: 4.71, lng: -74.07, tz: 'America/Bogota', status: 'decriminalised',
    legal: 'Personal dose (about 20 g) decriminalised by the Constitutional Court; medical cannabis legal since 2016. Adult-use legalisation bills have repeatedly failed.',
    culture: 'A fast-growing licensed medical cannabis export industry.',
    wiki: 'Cannabis_in_Colombia',
  },
  {
    id: 'lima', city: 'Lima', region: 'Peru', cc: 'PE', lat: -12.05, lng: -77.04, tz: 'America/Lima', status: 'decriminalised',
    legal: 'Small personal amounts (up to about 8 g) are not punished; medical cannabis legal since 2017. Sale is illegal.',
    culture: 'Coca leaf, not cannabis, is Peru\'s iconic traditional plant.',
    wiki: 'Cannabis_in_Peru',
  },
  {
    id: 'new-york', city: 'New York', region: 'New York, USA', cc: 'US', lat: 40.71, lng: -74.0, tz: 'America/New_York', status: 'legal',
    legal: 'Adult use legal since March 2021; the first licensed shops opened in December 2022. 21+. Still illegal under US federal law.',
    culture: 'The state prioritised licences for people harmed by past enforcement. Washington Square Park is a classic 4/20 meet-up spot.',
    wiki: 'Cannabis_in_New_York_(state)',
  },
  {
    id: 'toronto', city: 'Toronto', region: 'Canada', cc: 'CA', lat: 43.65, lng: -79.38, tz: 'America/Toronto', status: 'legal',
    legal: 'Federally legal since 17 October 2018. Provinces set the rules for sale and public use; the minimum age in Ontario is 19.',
    culture: 'Canada was the second country, and first G7 nation, to legalise nationwide.',
    wiki: 'Cannabis_in_Canada',
  },
  {
    id: 'kingston', city: 'Kingston', region: 'Jamaica', cc: 'JM', lat: 17.97, lng: -76.79, tz: 'America/Jamaica', status: 'decriminalised',
    legal: 'Up to 2 oz (56 g) decriminalised since 2015; households may grow up to 5 plants. Rastafari may use ganja sacramentally, and there is a licensed medical industry.',
    culture: 'Ganja is central to Rastafari faith and to reggae, the music Bob Marley took worldwide.',
    wiki: 'Cannabis_in_Jamaica',
  },
  {
    id: 'santiago', city: 'Santiago', region: 'Chile', cc: 'CL', lat: -33.45, lng: -70.67, tz: 'America/Santiago', status: 'decriminalised',
    legal: 'Private personal use and small-scale cultivation are not punished; use in public and sale are offences. Medical cannabis is legal.',
    culture: 'An active activism scene with annual cannabis marches and Fundación Daya\'s well-known medical programme.',
    wiki: 'Cannabis_in_Chile',
  },
  {
    id: 'st-johns', city: "St. John's", region: 'Newfoundland, Canada', cc: 'CA', lat: 47.56, lng: -52.71, tz: 'America/St_Johns', status: 'legal',
    legal: 'Federally legal since 2018; the province regulates sales and public use. Minimum age is 19.',
    culture: 'Newfoundland runs on its own half-hour time zone (UTC−3:30), so its 4:20 comes at an odd moment.',
    wiki: 'Cannabis_in_Canada',
  },
  {
    id: 'sao-paulo', city: 'São Paulo', region: 'Brazil', cc: 'BR', lat: -23.55, lng: -46.63, tz: 'America/Sao_Paulo', status: 'decriminalised',
    legal: 'In 2024 the Supreme Court ruled personal possession (up to 40 g) is not a crime, though it remains an offence handled administratively; sale is illegal. Medical use is allowed with ANVISA approval.',
    culture: 'The "Marcha da Maconha" (Marijuana March) takes place each year in Brazilian cities.',
    wiki: 'Cannabis_in_Brazil',
  },
  {
    id: 'buenos-aires', city: 'Buenos Aires', region: 'Argentina', cc: 'AR', lat: -34.6, lng: -58.38, tz: 'America/Argentina/Buenos_Aires', status: 'decriminalised',
    legal: 'A 2009 Supreme Court ruling decriminalised private personal use. Medical cannabis legal since 2017, with a patient home-grow registry (REPROCANN).',
    culture: 'Big annual cannabis marches and the Expo Cannabis fair.',
    wiki: 'Cannabis_in_Argentina',
  },
  {
    id: 'montevideo', city: 'Montevideo', region: 'Uruguay', cc: 'UY', lat: -34.9, lng: -56.16, tz: 'America/Montevideo', status: 'legal',
    legal: 'First country to fully legalise cannabis (2013). Registered Uruguayan residents can buy at pharmacies, grow up to six plants or join a club. Visitors cannot buy.',
    culture: 'Championed by former president José "Pepe" Mujica.',
    wiki: 'Cannabis_in_Uruguay',
  },
  {
    id: 'london', city: 'London', region: 'United Kingdom', cc: 'GB', lat: 51.51, lng: -0.13, tz: 'Europe/London', status: 'illegal',
    legal: 'Class B drug: possession can bring up to 5 years in prison, though police often use warnings or fines for small amounts. Medical cannabis is available on specialist prescription since November 2018.',
    culture: 'Hyde Park has hosted 4/20 gatherings, usually under police watch.',
    wiki: 'Cannabis_in_the_United_Kingdom',
  },
  {
    id: 'lisbon', city: 'Lisbon', region: 'Portugal', cc: 'PT', lat: 38.72, lng: -9.14, tz: 'Europe/Lisbon', status: 'decriminalised',
    legal: 'All drugs were decriminalised in 2001: personal possession (up to a 10-day supply, about 25 g of cannabis) is an administrative matter, not a crime. No legal retail. Medical cannabis legal since 2018.',
    culture: 'Portugal\'s approach is studied worldwide as a health-first model.',
    wiki: 'Cannabis_in_Portugal',
  },
  {
    id: 'casablanca', city: 'Casablanca', region: 'Morocco', cc: 'MA', lat: 33.57, lng: -7.59, tz: 'Africa/Casablanca', status: 'illegal',
    legal: 'Recreational use and sale are illegal, but a 2021 law allows licensed cultivation for medical and industrial use in the northern Rif region.',
    culture: 'The Rif mountains have grown "kif" for centuries and Morocco is among the world\'s largest hashish producers.',
    wiki: 'Cannabis_in_Morocco',
  },
  {
    id: 'amsterdam', city: 'Amsterdam', region: 'Netherlands', cc: 'NL', lat: 52.37, lng: 4.9, tz: 'Europe/Amsterdam', status: 'decriminalised',
    legal: 'Technically illegal but tolerated: licensed coffeeshops may sell up to 5 g per person per day. Supply to shops is still illegal; a regulated-supply trial runs in several other towns. Some cities limit sales to residents.',
    culture: 'Coffeeshops date from the 1970s, and the first Cannabis Cup was held here in 1988.',
    wiki: 'Cannabis_in_the_Netherlands',
  },
  {
    id: 'berlin', city: 'Berlin', region: 'Germany', cc: 'DE', lat: 52.52, lng: 13.4, tz: 'Europe/Berlin', status: 'legal',
    legal: 'Since April 2024, adults 18+ may carry 25 g in public, keep 50 g at home and grow 3 plants; non-profit cannabis clubs are allowed. No commercial shops, and politicians keep debating changes.',
    culture: 'The Hanfparade (Hemp Parade) has marched through Berlin since 1997.',
    wiki: 'Cannabis_in_Germany',
  },
  {
    id: 'barcelona', city: 'Barcelona', region: 'Spain', cc: 'ES', lat: 41.39, lng: 2.17, tz: 'Europe/Madrid', status: 'decriminalised',
    legal: 'Private use and home growing are not crimes, but use or possession in public is fined. Private "cannabis social clubs" operate in a legal grey area. Sale is illegal.',
    culture: 'Barcelona is Europe\'s cannabis-club capital and hosts the Spannabis trade fair.',
    wiki: 'Cannabis_in_Spain',
  },
  {
    id: 'paris', city: 'Paris', region: 'France', cc: 'FR', lat: 48.86, lng: 2.35, tz: 'Europe/Paris', status: 'illegal',
    legal: 'Illegal. Since 2020 police can issue an on-the-spot fine of €200 for use; the law allows far heavier penalties. A medical pilot programme ran from 2021 and has ended.',
    culture: 'In the 1840s Paris\'s Club des Hashischins gathered writers like Baudelaire, Gautier and Dumas.',
    wiki: 'Cannabis_in_France',
  },
  {
    id: 'prague', city: 'Prague', region: 'Czechia', cc: 'CZ', lat: 50.08, lng: 14.44, tz: 'Europe/Prague', status: 'decriminalised',
    legal: 'Small amounts (up to about 15 g) and a few plants are a misdemeanour, not a crime. Medical cannabis legal since 2013. Wider legalisation has been under discussion.',
    culture: 'Prague stages a Million Marijuana March.',
    wiki: 'Cannabis_in_the_Czech_Republic',
  },
  {
    id: 'valletta', city: 'Valletta', region: 'Malta', cc: 'MT', lat: 35.9, lng: 14.51, tz: 'Europe/Malta', status: 'legal',
    legal: 'First EU country to legalise (2021): adults 18+ may carry 7 g, grow 4 plants at home or join non-profit cannabis associations. Public use is banned.',
    culture: 'A small island that moved first, with a dedicated regulator, ARUC.',
    wiki: 'Cannabis_in_Malta',
  },
  {
    id: 'lagos', city: 'Lagos', region: 'Nigeria', cc: 'NG', lat: 6.52, lng: 3.38, tz: 'Africa/Lagos', status: 'illegal',
    legal: 'Illegal under the NDLEA, with heavy penalties for possession and trafficking. Cannabis is widely grown informally.',
    culture: 'Afrobeat pioneer Fela Kuti clashed famously with the authorities over cannabis.',
    wiki: 'Cannabis_in_Nigeria',
  },
  {
    id: 'athens', city: 'Athens', region: 'Greece', cc: 'GR', lat: 37.98, lng: 23.73, tz: 'Europe/Athens', status: 'medical',
    legal: 'Recreational possession is illegal. Medical cannabis is legal and licensed cultivation for medical use and export has been allowed since 2018.',
    culture: 'Herodotus described Scythians inhaling cannabis smoke in tents.',
    wiki: 'Cannabis_in_Greece',
  },
  {
    id: 'johannesburg', city: 'Johannesburg', region: 'South Africa', cc: 'ZA', lat: -26.2, lng: 28.05, tz: 'Africa/Johannesburg', status: 'legal',
    legal: 'Since a 2018 Constitutional Court ruling, adults may use, possess and grow cannabis in private. Public sale remains illegal and use in public is prohibited.',
    culture: 'The "dagga" case was brought by Julian Stobbs and Myrtle Clarke, the "Dagga Couple".',
    wiki: 'Cannabis_in_South_Africa',
  },
  {
    id: 'cairo', city: 'Cairo', region: 'Egypt', cc: 'EG', lat: 30.04, lng: 31.24, tz: 'Africa/Cairo', status: 'strict',
    legal: 'Illegal, with possession and dealing carrying long prison terms.',
    culture: 'Hashish has a long documented history in Egypt, despite today\'s strict law.',
    wiki: 'Cannabis_in_Egypt',
  },
  {
    id: 'tel-aviv', city: 'Tel Aviv', region: 'Israel', cc: 'IL', lat: 32.09, lng: 34.78, tz: 'Asia/Jerusalem', status: 'decriminalised',
    legal: 'Medical cannabis is established and widely prescribed. Personal use is treated mostly with fines rather than prosecution; sale is illegal.',
    culture: 'Raphael Mechoulam isolated THC in Israel in 1964, making the country a research hub.',
    wiki: 'Cannabis_in_Israel',
  },
  {
    id: 'istanbul', city: 'Istanbul', region: 'Türkiye', cc: 'TR', lat: 41.01, lng: 28.98, tz: 'Europe/Istanbul', status: 'illegal',
    legal: 'Illegal; personal possession can bring prison time. Controlled cultivation for medical and industrial use is allowed in a few provinces.',
    culture: 'Cannabis ("esrar") and hashish dens appear in the urban music tradition shared with Greece.',
    wiki: 'Cannabis_in_Turkey',
  },
  {
    id: 'moscow', city: 'Moscow', region: 'Russia', cc: 'RU', lat: 55.76, lng: 37.62, tz: 'Europe/Moscow', status: 'illegal',
    legal: 'Illegal. Small amounts (up to 6 g) are an administrative offence with a fine or up to 15 days in jail; larger amounts are criminal.',
    culture: 'Hemp was once one of Russia\'s biggest exports, used for rope and cloth.',
    wiki: 'Cannabis_in_Russia',
  },
  {
    id: 'nairobi', city: 'Nairobi', region: 'Kenya', cc: 'KE', lat: -1.29, lng: 36.82, tz: 'Africa/Nairobi', status: 'illegal',
    legal: 'Illegal. Possession can bring prison time; proposals for medical research and reform have been debated.',
    culture: 'Known locally as "bangi" and shaped by the region\'s reggae and Rastafari scenes.',
    wiki: 'Cannabis_in_Kenya',
  },
  {
    id: 'tehran', city: 'Tehran', region: 'Iran', cc: 'IR', lat: 35.69, lng: 51.39, tz: 'Asia/Tehran', status: 'strict',
    legal: 'Illegal, with severe penalties for possession and trafficking.',
    culture: 'Cannabis ("bang") is mentioned in classical Persian poetry.',
    wiki: 'Cannabis_in_Iran',
  },
  {
    id: 'dubai', city: 'Dubai', region: 'UAE', cc: 'AE', lat: 25.2, lng: 55.27, tz: 'Asia/Dubai', status: 'strict',
    legal: 'Zero tolerance. Even trace amounts, or some medicines containing cannabis compounds, can lead to prison and deportation.',
    culture: 'There is no public cannabis culture. Travellers have been detained over residue.',
    wiki: 'Cannabis_in_the_United_Arab_Emirates',
  },
  {
    id: 'delhi', city: 'New Delhi', region: 'India', cc: 'IN', lat: 28.61, lng: 77.21, tz: 'Asia/Kolkata', status: 'illegal',
    legal: 'Under the NDPS Act, charas and ganja (flowers/resin) are illegal. Bhang, made from leaves, is permitted in some states and is sold legally in places.',
    culture: 'Bhang lassi is traditional at Holi and Maha Shivaratri; cannabis is sacred to Shiva and appears in Ayurveda.',
    wiki: 'Cannabis_in_India',
  },
  {
    id: 'kathmandu', city: 'Kathmandu', region: 'Nepal', cc: 'NP', lat: 27.72, lng: 85.32, tz: 'Asia/Kathmandu', status: 'illegal',
    legal: 'Sale was banned in 1973 and the 1976 narcotics law keeps cannabis illegal, though enforcement is lighter around Shivaratri. Periodic bills propose legalisation.',
    culture: 'Freak Street was a stop on the 1960s–70s hippie trail; sadhus smoke at Pashupatinath on Maha Shivaratri.',
    wiki: 'Cannabis_in_Nepal',
  },
  {
    id: 'bangkok', city: 'Bangkok', region: 'Thailand', cc: 'TH', lat: 13.76, lng: 100.5, tz: 'Asia/Bangkok', status: 'decriminalised',
    legal: 'Removed from the narcotics list in 2022, a first for Asia. Since mid-2025 buying flower requires a prescription, and public smoking can bring fines.',
    culture: 'A traditional Thai medicine ingredient, and the 1960s–70s "Thai stick" legacy.',
    wiki: 'Cannabis_in_Thailand',
  },
  {
    id: 'singapore', city: 'Singapore', region: 'Singapore', cc: 'SG', lat: 1.35, lng: 103.82, tz: 'Asia/Singapore', status: 'strict',
    legal: 'Among the strictest laws in the world: trafficking carries the death penalty, use and possession bring jail or caning. Citizens can be prosecuted for use abroad.',
    culture: 'Strict zero-tolerance policy backed by random testing.',
    wiki: 'Cannabis_in_Singapore',
  },
  {
    id: 'hong-kong', city: 'Hong Kong', region: 'Hong Kong', cc: 'HK', lat: 22.32, lng: 114.17, tz: 'Asia/Hong_Kong', status: 'strict',
    legal: 'Illegal; possession can bring years of prison. Since February 2023 even CBD is classed as a dangerous drug.',
    culture: 'Strong enforcement, and CBD shops closed after the 2023 ban.',
    wiki: 'Cannabis_in_Hong_Kong',
  },
  {
    id: 'beijing', city: 'Beijing', region: 'China', cc: 'CN', lat: 39.9, lng: 116.4, tz: 'Asia/Shanghai', status: 'strict',
    legal: 'Illegal for recreational use, with strict enforcement. Licensed industrial hemp is grown at scale.',
    culture: 'Ancient texts like the Shennong Bencao Jing list hemp ("ma") as a medicine.',
    wiki: 'Cannabis_in_China',
  },
  {
    id: 'seoul', city: 'Seoul', region: 'South Korea', cc: 'KR', lat: 37.57, lng: 126.98, tz: 'Asia/Seoul', status: 'strict',
    legal: 'Illegal, and citizens can be prosecuted for using cannabis even in countries where it is legal. Limited medical products are allowed.',
    culture: 'Strictly enforced.',
    wiki: 'Cannabis_in_South_Korea',
  },
  {
    id: 'tokyo', city: 'Tokyo', region: 'Japan', cc: 'JP', lat: 35.68, lng: 139.69, tz: 'Asia/Tokyo', status: 'illegal',
    legal: 'Illegal: possession can bring up to 5 years in prison, and a 2024 reform made use itself an offence. Some CBD products are allowed.',
    culture: 'Hemp ("asa") is sacred in Shinto, used in shimenawa ropes and priests\' wands.',
    wiki: 'Cannabis_in_Japan',
  },
  {
    id: 'sydney', city: 'Sydney', region: 'Australia', cc: 'AU', lat: -33.87, lng: 151.21, tz: 'Australia/Sydney', status: 'medical',
    legal: 'Medical cannabis with a prescription since 2016. Recreational use is illegal in NSW, though the ACT (Canberra) legalised small personal amounts in 2020.',
    culture: 'The town of Nimbin has held the MardiGrass cannabis festival since 1993.',
    wiki: 'Cannabis_in_Australia',
  },
  {
    id: 'auckland', city: 'Auckland', region: 'New Zealand', cc: 'NZ', lat: -36.85, lng: 174.76, tz: 'Pacific/Auckland', status: 'medical',
    legal: 'Recreational use is illegal. A medical cannabis scheme has operated since 2020. A 2020 referendum on legalising adult use narrowly failed.',
    culture: 'Reform advocates keep pushing for decriminalisation after the 2020 vote.',
    wiki: 'Cannabis_in_New_Zealand',
  },
];
