// Illustrative data only. Every person, recommendation, deal and requirement is fictional.
// London member agencies use real firm names at Elliot's request (September 2026);
// the viewer's agency is a generic 'London Agency' and all overseas agencies are fictional.

export const VIEWER_ID = 'm0';

// London LonRes members
export const MEMBERS = [
  { id: 'm0', name: 'Georgia Hart', agency: 'London Agency', initials: 'GH' },
  { id: 'm1', name: 'Harriet Cole', agency: 'Knight Frank LLP', initials: 'HC' },
  { id: 'm2', name: 'Tom Okafor', agency: 'Savills UK', initials: 'TO' },
  { id: 'm3', name: 'Priya Nair', agency: 'DDRE Global', initials: 'PN' },
  { id: 'm4', name: 'Oliver Brandt', agency: 'Beauchamp Estates', initials: 'OB' },
  { id: 'm5', name: 'Sofia Lindqvist', agency: 'Domvs Nova', initials: 'SL' },
  { id: 'm6', name: 'Marcus Ade', agency: 'Arete & Co', initials: 'MA' },
];

export const CITIES = [
  { name: 'Marbella', country: 'Spain', areas: ['Golden Mile', 'Nueva Andalucía', 'Sierra Blanca', 'Benahavís'] },
  { name: 'Dubai', country: 'UAE', areas: ['Palm Jumeirah', 'Emirates Hills', 'Downtown', 'Dubai Marina'] },
  { name: 'Paris', country: 'France', areas: ['Saint-Germain', '7th arrondissement', '16th arrondissement', 'Le Marais'] },
  { name: 'Lisbon', country: 'Portugal', areas: ['Chiado', 'Príncipe Real', 'Cascais', 'Comporta'] },
  { name: 'Mallorca', country: 'Spain', areas: ['Palma', 'Port d’Andratx', 'Deià', 'Sóller'] },
];

// A recommendation is { by: memberId, deal?: string, year?: number }.
// Track record is derived from recommendations that carry a deal.
export const AGENTS = [
  // Marbella
  {
    id: 'a1', name: 'Lucía Ferrán', agency: 'Ferrán & Vidal Propiedades', city: 'Marbella',
    areas: ['Golden Mile', 'Sierra Blanca'], initials: 'LF',
    recommendations: [
      { by: 'm1', deal: 'Referred a buyer for a villa in Sierra Blanca', year: 2025 },
      { by: 'm3', deal: 'Sold a London client’s apartment on the Golden Mile', year: 2024 },
      { by: 'm4' },
      { by: 'm6', deal: 'Referred a buyer for a penthouse in Puerto Banús', year: 2023 },
    ],
  },
  {
    id: 'a2', name: 'Daniel Morcillo', agency: 'Serra Alta Homes', city: 'Marbella',
    areas: ['Nueva Andalucía', 'Benahavís'], initials: 'DM',
    recommendations: [
      { by: 'm2', deal: 'Referred a buyer for a villa in Nueva Andalucía', year: 2025 },
      { by: 'm5' },
    ],
  },
  {
    id: 'a3', name: 'Inés Calvo', agency: 'Blanquilla Estates', city: 'Marbella',
    areas: ['Benahavís', 'Golden Mile'], initials: 'IC',
    recommendations: [{ by: 'm4' }],
  },
  // Dubai
  {
    id: 'a4', name: 'Omar Haddad', agency: 'Dunewell Realty', city: 'Dubai',
    areas: ['Palm Jumeirah', 'Emirates Hills'], initials: 'OH',
    recommendations: [
      { by: 'm1', deal: 'Referred a buyer for a signature villa on Palm Jumeirah', year: 2025 },
      { by: 'm2' },
      { by: 'm5', deal: 'Sold a London client’s apartment in Emirates Hills', year: 2024 },
    ],
  },
  {
    id: 'a5', name: 'Rachel Kerr', agency: 'Saffron Key Properties', city: 'Dubai',
    areas: ['Downtown', 'Dubai Marina'], initials: 'RK',
    recommendations: [
      { by: 'm3', deal: 'Referred an investor buying off-plan in Downtown', year: 2025 },
      { by: 'm6' },
    ],
  },
  {
    id: 'a6', name: 'Vikram Sethi', agency: 'Alzara Homes', city: 'Dubai',
    areas: ['Dubai Marina', 'Palm Jumeirah'], initials: 'VS',
    recommendations: [{ by: 'm4' }],
  },
  // Paris
  {
    id: 'a7', name: 'Camille Aubrac', agency: 'Maison Aubrac Immobilier', city: 'Paris',
    areas: ['Saint-Germain', '7th arrondissement'], initials: 'CA',
    recommendations: [
      { by: 'm5', deal: 'Referred a relocating family to an apartment in the 7th', year: 2025 },
      { by: 'm1' },
      { by: 'm2', deal: 'Referred a buyer for a pied-à-terre in Saint-Germain', year: 2024 },
    ],
  },
  {
    id: 'a8', name: 'Hugo Lemaire', agency: 'Quai Lemaire Immobilier', city: 'Paris',
    areas: ['16th arrondissement'], initials: 'HL',
    recommendations: [
      { by: 'm3', deal: 'Referred a buyer for a family apartment in the 16th', year: 2024 },
      { by: 'm6' },
    ],
  },
  {
    id: 'a9', name: 'Élodie Marchand', agency: 'Atelier Rive Droite', city: 'Paris',
    areas: ['Le Marais'], initials: 'EM',
    recommendations: [{ by: 'm4' }],
  },
  // Lisbon
  {
    id: 'a10', name: 'Beatriz Tavares', agency: 'Tejo Norte Imobiliária', city: 'Lisbon',
    areas: ['Chiado', 'Príncipe Real'], initials: 'BT',
    recommendations: [
      { by: 'm2', deal: 'Referred a buyer for a townhouse in Príncipe Real', year: 2025 },
      { by: 'm6' },
    ],
  },
  {
    id: 'a11', name: 'Rui Salgueiro', agency: 'Casa Alfama Partners', city: 'Lisbon',
    areas: ['Cascais', 'Comporta'], initials: 'RS',
    recommendations: [{ by: 'm1' }],
  },
  // Mallorca
  {
    id: 'a12', name: 'Tobias Richter', agency: 'Tramuntana Coast Estates', city: 'Mallorca',
    areas: ['Port d’Andratx', 'Palma'], initials: 'TR',
    recommendations: [
      { by: 'm5', deal: 'Referred a buyer for a sea-view villa in Port d’Andratx', year: 2024 },
      { by: 'm3' },
    ],
  },
  {
    id: 'a13', name: 'Marta Pons', agency: 'Illa Blava Homes', city: 'Mallorca',
    areas: ['Deià', 'Sóller'], initials: 'MP',
    recommendations: [{ by: 'm2' }],
  },
];

export const BUDGET_BANDS = ['Under €1m', '€1m to €3m', '€3m to €5m', '€5m+'];
export const TIMINGS = ['within three months', 'within six months', 'within twelve months'];
export const PROPERTY_TYPES = ['Apartment', 'Townhouse', 'Villa', 'Penthouse'];

// Older requirements not shown in the feed, so the headline counts read like a network
// rather than ten cards. Buyers per country.
export const EARLIER_BUYERS = { Spain: 37, UAE: 22, France: 16, Portugal: 11 };

// International requirement register. Registrants are hidden in the UI.
export const REQUIREMENTS = [
  { id: 'r1', city: 'Marbella', country: 'Spain', side: 'Buying', beds: 2, type: 'Townhouse', budget: '€1m to €3m', timing: 'within six months', by: 'm3', age: '2h ago' },
  { id: 'r2', city: 'Dubai', country: 'UAE', side: 'Buying', beds: 4, type: 'Villa', budget: '€5m+', timing: 'within three months', by: 'm1', age: '5h ago' },
  { id: 'r3', city: 'Paris', country: 'France', side: 'Buying', beds: 3, type: 'Apartment', budget: '€3m to €5m', timing: 'within twelve months', by: 'm5', age: 'Yesterday' },
  { id: 'r4', city: 'Mallorca', country: 'Spain', side: 'Buying', beds: 5, type: 'Villa', budget: '€5m+', timing: 'within six months', by: 'm2', age: 'Yesterday' },
  { id: 'r5', city: 'Lisbon', country: 'Portugal', side: 'Buying', beds: 2, type: 'Apartment', budget: 'Under €1m', timing: 'within six months', by: 'm6', age: '2 days ago' },
  { id: 'r6', city: 'Marbella', country: 'Spain', side: 'Selling', beds: 4, type: 'Villa', budget: '€3m to €5m', timing: 'within twelve months', by: 'm4', age: '3 days ago' },
  { id: 'r7', city: 'Dubai', country: 'UAE', side: 'Buying', beds: 2, type: 'Apartment', budget: '€1m to €3m', timing: 'within six months', by: 'm2', age: '3 days ago' },
  { id: 'r8', city: 'Marbella', country: 'Spain', side: 'Buying', beds: 3, type: 'Penthouse', budget: '€1m to €3m', timing: 'within three months', by: 'm5', age: '4 days ago' },
  { id: 'r9', city: 'Paris', country: 'France', side: 'Selling', beds: 3, type: 'Apartment', budget: '€1m to €3m', timing: 'within six months', by: 'm1', age: '5 days ago' },
  { id: 'r10', city: 'Mallorca', country: 'Spain', side: 'Buying', beds: 3, type: 'Townhouse', budget: '€1m to €3m', timing: 'within twelve months', by: 'm6', age: '6 days ago' },
];
