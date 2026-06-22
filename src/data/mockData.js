// ─── SERVICES ────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    slug: 'branding',
    nav: 'Branding',
    title: 'Branding',
    pole: 'Image de Marque',
    tagline: 'Créer l\'attachement émotionnel.',
    description: 'Votre marque est votre actif le plus précieux. Nous la construisons pour qu\'elle inspire confiance, crée de l\'attachement et se distingue durablement dans l\'esprit de vos clients.',
    icon: '◈',
    color: '#0A0A0A',
    prestations: [
      'Logo design',
      'Identité visuelle complète',
      'Charte graphique',
      'Naming & baseline',
      'Territoire de marque',
      'Brand book',
      'Motion identity',
      'Déclinaisons supports',
    ],
    pricingSubtitle: 'Deux offres claires, sans superflu — pour avancer vite ou aller loin.',
    pricing: [
      {
        name: 'Efficace',
        price: '1 000 €',
        frequency: 'projet',
        deadline: '2 semaines',
        profile: 'Entrepreneurs, créateurs & indépendants qui ont besoin d\'une DA opérationnelle rapidement.',
        description: 'Une direction artistique prête à l\'emploi, livrée en 2 semaines.',
        features: [
          'Logo principal (2 propositions)',
          'Palette couleurs + typographie',
          'Charte graphique simple',
          'Formats livrés : print + web (PNG, SVG, PDF)',
          '2 révisions incluses',
        ],
        excluded: ['Stratégie de marque', 'Brand book', 'Templates réseaux sociaux'],
        cta: 'Démarrer le projet',
        highlight: false,
      },
      {
        name: 'Complète',
        price: '2 000 €',
        frequency: 'projet',
        deadline: '1 mois',
        profile: 'Marques en création ou refonte qui veulent une identité forte et une stratégie solide.',
        description: 'Stratégie de marque + direction artistique complète, pour s\'imposer durablement.',
        features: [
          'Audit & positionnement de marque',
          'Naming & baseline (si besoin)',
          'Logo + déclinaisons (horizontal, icône, dark/light)',
          'Identité visuelle complète',
          'Charte graphique détaillée',
          'Brand book (20+ pages)',
          'Templates réseaux sociaux',
          '3 révisions incluses',
          'Accompagnement 30 jours',
        ],
        excluded: [],
        cta: 'Demander un devis',
        highlight: true,
        badge: 'La plus complète',
      },
    ],
    process: [
      { step: '01', title: 'Brief & Immersion', desc: 'Analyse approfondie de votre marché, vos concurrents, vos valeurs et vos ambitions. Workshop de positionnement.' },
      { step: '02', title: 'Stratégie de marque', desc: 'Définition du positionnement, de la personnalité, du territoire visuel et des axes créatifs.' },
      { step: '03', title: 'Création', desc: 'Conception des propositions visuelles : logo, couleurs, typographie, univers graphique.' },
      { step: '04', title: 'Finalisation & Livraison', desc: 'Affinement selon vos retours, production du Brand Book et livraison de tous les fichiers sources.' },
    ],
  },
  {
    slug: 'com-360',
    nav: 'COM 360',
    title: 'Communication 360',
    pole: 'Communication Globale',
    tagline: 'Amplifier votre présence partout.',
    description: 'Du print au digital, du packaging aux campagnes publicitaires : nous orchestrons votre communication pour qu\'elle soit cohérente, impactante et mémorable sur tous les points de contact.',
    icon: '◉',
    color: '#0A0A0A',
    prestations: [
      'Stratégie de communication',
      'Supports print (brochures, flyers, affiches)',
      'Packaging & étiquetage',
      'Campagnes publicitaires',
      'Contenu réseaux sociaux',
      'Direction artistique photo/vidéo',
      'PLV & signalétique',
      'Relations presse (visuels)',
    ],
    pricing: [
      {
        name: 'Starter',
        price: '800 €',
        frequency: 'mois',
        description: 'Pour maintenir une présence visuelle cohérente.',
        features: [
          '4 visuels réseaux sociaux / mois',
          '1 support print / trimestre',
          'Cohérence charte graphique',
          'Rapport mensuel',
        ],
        excluded: ['Campagnes pub', 'Direction artistique', 'Packaging'],
        cta: 'Démarrer',
        highlight: false,
      },
      {
        name: 'Agence',
        price: '2 200 €',
        frequency: 'mois',
        description: 'La communication complète pour booster votre visibilité.',
        features: [
          '12 visuels réseaux sociaux / mois',
          '2 supports print / mois',
          '1 campagne publicitaire / trimestre',
          'Direction artistique incluse',
          'Reporting + stratégie mensuelle',
        ],
        excluded: ['Packaging', 'PLV grands formats'],
        cta: 'Demander un devis',
        highlight: true,
        badge: 'Le plus populaire',
      },
      {
        name: 'Full 360',
        price: 'Sur mesure',
        frequency: 'projet',
        description: 'Une agence dédiée à votre marque, à temps complet.',
        features: [
          'Tout du plan Agence',
          'Packaging & PLV',
          'Direction artistique photo',
          'Campagnes multi-supports',
          'Stratégie annuelle',
          'Account manager dédié',
        ],
        excluded: [],
        cta: 'Nous contacter',
        highlight: false,
      },
    ],
    process: [
      { step: '01', title: 'Audit & Diagnostic', desc: 'Analyse de votre communication existante, benchmark concurrentiel et identification des axes d\'amélioration.' },
      { step: '02', title: 'Plan de communication', desc: 'Définition des objectifs, des canaux, des messages clés et du calendrier éditorial.' },
      { step: '03', title: 'Production créative', desc: 'Création de l\'ensemble des supports visuels selon le plan défini, dans le respect de la charte.' },
      { step: '04', title: 'Diffusion & Suivi', desc: 'Mise en place, suivi des performances et ajustements pour maximiser l\'impact.' },
    ],
  },
  {
    slug: 'solutions-digitales',
    nav: 'Solutions Digitales',
    title: 'Solutions Digitales',
    pole: 'Présence Digitale',
    tagline: 'Convertir et fidéliser en ligne.',
    description: 'Sites web, interfaces applicatives, design systems et expériences digitales conçus pour performer : chaque pixel est pensé pour guider l\'utilisateur et atteindre vos objectifs business.',
    icon: '◎',
    color: '#0A0A0A',
    prestations: [
      'Site web vitrine',
      'Landing page optimisée',
      'UI/UX Design',
      'Design system',
      'E-commerce (UI)',
      'Motion design & micro-interactions',
      'Contenus digitaux',
      'Audit UX & refonte',
    ],
    pricing: [
      {
        name: 'Landing',
        price: '1 200 €',
        frequency: 'projet',
        description: 'Une page percutante pour convertir vos visiteurs.',
        features: [
          'Landing page 1 page (design uniquement)',
          'Maquette desktop + mobile',
          'Prototype interactif Figma',
          '2 révisions incluses',
          'Livraison assets optimisés',
        ],
        excluded: ['Design system', 'Développement', 'Suivi post-livraison'],
        cta: 'Démarrer',
        highlight: false,
      },
      {
        name: 'Studio Web',
        price: '4 500 €',
        frequency: 'projet',
        description: 'Un site complet, pensé pour l\'expérience utilisateur.',
        features: [
          'Site vitrine 5-8 pages',
          'UI/UX complet desktop + mobile',
          'Design system livré',
          'Prototype Figma interactif',
          'Handoff développeur inclus',
          '4 révisions incluses',
        ],
        excluded: ['Développement front-end'],
        cta: 'Demander un devis',
        highlight: true,
        badge: 'Recommandé',
      },
      {
        name: 'Digital Premium',
        price: 'Sur mesure',
        frequency: 'projet',
        description: 'Pour les projets digitaux ambitieux et complexes.',
        features: [
          'Tout du plan Studio Web',
          'Audit UX + recherche utilisateurs',
          'Application web / SaaS UI',
          'E-commerce complet',
          'Motion design & animations',
          'Accompagnement développement',
          'Suivi 60 jours post-livraison',
        ],
        excluded: [],
        cta: 'Nous contacter',
        highlight: false,
      },
    ],
    process: [
      { step: '01', title: 'Research & UX', desc: 'Analyse des usages, création de personas, cartographie des parcours utilisateurs et définition de l\'architecture de l\'information.' },
      { step: '02', title: 'Wireframes', desc: 'Maquettes basse fidélité de toutes les pages, validation de la structure et des interactions avant la phase créative.' },
      { step: '03', title: 'Design UI', desc: 'Conception haute fidélité de l\'interface, design system, micro-interactions et prototypage interactif.' },
      { step: '04', title: 'Handoff & Suivi', desc: 'Livraison des specs développeur, des assets optimisés et accompagnement durant l\'intégration.' },
    ],
  },
]

// ─── PORTFOLIO ───────────────────────────────────────────────────────────────
export const PORTFOLIO_ITEMS = [
  { id: 1, title: 'Airpeak', category: 'Branding', tags: ['Logo', 'Identité visuelle', 'Brand Book'], year: '2024', client: 'Airpeak Technologies', description: 'Refonte complète de l\'identité visuelle d\'une startup tech. Logo minimaliste, typographie audacieuse, univers bleu profond.', result: '+180% de reconnaissance de marque', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80' },
  { id: 2, title: 'Nordica', category: 'Branding', tags: ['Logo', 'Packaging', 'Identité'], year: '2024', client: 'Nordica Foods', description: 'Création d\'une marque premium pour une gamme alimentaire nordique. Esthétique épurée, typographie scandinave.', result: 'Référencé dans 45 boutiques premium', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { id: 3, title: 'Maison Leroy', category: 'COM 360', tags: ['Campagne', 'Print', 'Social'], year: '2023', client: 'Maison Leroy', description: 'Campagne de communication multi-supports pour une maison de décoration haut de gamme.', result: '+320% d\'engagement Instagram', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80' },
  { id: 4, title: 'Nexus App', category: 'Solutions Digitales', tags: ['UI/UX', 'Mobile', 'Design System'], year: '2024', client: 'Nexus Software', description: 'Design complet d\'une application SaaS B2B. Interface intuitive, design system cohérent.', result: '94% de satisfaction utilisateur', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80' },
  { id: 5, title: 'Atlas Studio', category: 'COM 360', tags: ['Brochure', 'Catalogue', 'Web'], year: '2023', client: 'Atlas Architecture', description: 'Support de communication premium pour un cabinet d\'architecture. Photos, mise en page éditorial.', result: '3 prix de design décernés', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80' },
  { id: 6, title: 'Green Pulse', category: 'Solutions Digitales', tags: ['Landing Page', 'UI Design'], year: '2024', client: 'Green Pulse', description: 'Site web et identité digitale pour une startup cleantech. Design moderne, animations engageantes.', result: '12% de taux de conversion', image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&q=80', thumb: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&q=80' },
]

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  { id: 1, name: 'Sophie Marchand', role: 'CEO', company: 'Airpeak Technologies', text: 'Laforet Designer a transformé notre image de marque. L\'équipe a saisi l\'essence de notre vision et l\'a traduite en une identité visuelle percutante. Nos prospects nous reconnaissent immédiatement.', initials: 'SM' },
  { id: 2, name: 'Thomas Renard', role: 'Directeur Marketing', company: 'Maison Leroy', text: 'Un travail exceptionnel sur notre campagne. Créativité, rigueur et réactivité : Laforet incarne les valeurs que nous cherchions pour notre marque premium. Résultats au-delà de nos attentes.', initials: 'TR' },
  { id: 3, name: 'Camille Dufort', role: 'Fondatrice', company: 'Nordica Foods', text: 'Notre identité de marque est maintenant à la hauteur de notre ambition. Laforet a créé quelque chose d\'intemporel. Le packaging nous ouvre des portes que nous n\'aurions pas pu franchir seuls.', initials: 'CD' },
]

// ─── STATS ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: 5, suffix: '/5', label: 'Satisfaction client', prefix: '' },
  { value: 100, suffix: '+', label: 'Projets réalisés', prefix: '' },
  { value: 12, suffix: ' ans', label: 'D\'expérience', prefix: '' },
  { value: 800, suffix: 'h+', label: 'De création', prefix: '' },
]

// ─── CLIENT LOGOS (text-based pour placeholder) ───────────────────────────────
export const CLIENT_LOGOS = [
  'Airpeak', 'Nordica', 'Maison Leroy', 'Atlas Studio',
  'Green Pulse', 'Nexus', 'Volta', 'Lumiera',
  'Meridian', 'Solaris', 'Forma', 'Kento',
]

// ─── RESSOURCES ───────────────────────────────────────────────────────────────
export const RESSOURCES = [
  { id: 1, title: 'Airpeak — Refonte d\'identité : de startup à référence tech', type: 'Étude de cas', category: 'Branding', date: '2024-11-15', readTime: '8 min', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80', excerpt: 'Comment nous avons transformé l\'image d\'une startup tech en 6 semaines. Méthodologie, défis et résultats.' },
  { id: 2, title: '5 erreurs fatales de branding que font les PME françaises', type: 'Article', category: 'Branding', date: '2024-10-28', readTime: '5 min', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', excerpt: 'Logo trop complexe, typographie incohérente, absence de charte... Les erreurs les plus coûteuses et comment les éviter.' },
  { id: 3, title: 'Design system : comment multiplier la vitesse de production par 3', type: 'Tuto', category: 'Solutions Digitales', date: '2024-10-10', readTime: '10 min', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80', excerpt: 'Guide pratique pour créer un design system scalable sous Figma. Composants, tokens, documentation.' },
  { id: 4, title: 'Tendances branding 2025 : ce qui va marquer les esprits', type: 'Actualité', category: 'Branding', date: '2024-09-20', readTime: '4 min', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', excerpt: 'Typographie variable, identités liquides, retour au craft : les tendances qui façonneront les marques l\'an prochain.' },
  { id: 5, title: 'Maison Leroy — COM 360 qui multiplie l\'engagement par 4', type: 'Étude de cas', category: 'COM 360', date: '2024-09-05', readTime: '7 min', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', excerpt: 'Stratégie, production et diffusion d\'une campagne multi-supports pour une marque de décoration premium.' },
  { id: 6, title: 'Formation : maîtriser Figma en 30 jours (programme complet)', type: 'Formation', category: 'Solutions Digitales', date: '2024-08-15', readTime: '2 min', image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80', excerpt: 'Notre programme de formation intensif Figma, du niveau débutant à l\'autonomie professionnelle.' },
]

export const RESSOURCE_TYPES = ['Tous', 'Étude de cas', 'Article', 'Actualité', 'Tuto', 'Formation']

// ─── COACHING ─────────────────────────────────────────────────────────────────
export const COACHING = [
  {
    title: 'Accompagnement sur mesure',
    duration: 'Séances individuelles',
    price: '60 €/h',
    cta: 'Réserver une séance',
    description: 'Accompagnement personnalisé adapté à vos besoins : branding, communication, stratégie digitale. Disponible en présentiel ou distanciel, sans engagement.',
    tags: ['Branding', 'COM 360', 'Digital', 'Stratégie'],
  },
  {
    title: 'Création de marque de A à Z',
    duration: 'Module complet — Écoles & Organismes de formation',
    price: 'À partir de 5 000 €',
    cta: 'Demander un devis',
    description: 'Programme clé en main pour écoles et organismes de formation : de l\'idée aux premières ventes. Supports pédagogiques inclus, accompagnement de projet et suivi personnalisé des apprenants.',
    tags: ['Écoles', 'Organismes de formation', 'Marque complète', 'Supports inclus'],
  },
]
