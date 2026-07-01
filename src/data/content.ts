export const site = {
  name: 'TransCure bioServices',
  tagline: 'Humanized Research',
}

export type NavItem = {
  label: string
  href?: string
  children?: { label: string; href: string; items?: { label: string; href: string }[] }[]
}

export const navItems: NavItem[] = [
  {
    label: 'Disease Models',
    children: [
      {
        label: 'Oncology',
        href: '#',
        items: [
          { label: 'Human CDX', href: '#' },
          { label: 'Human PDX', href: '#' },
          { label: 'Syngeneic Tumor Mouse Models', href: '#' },
        ],
      },
      {
        label: 'Inflammatory disease',
        href: '#',
        items: [
          { label: 'IBD', href: '#' },
          { label: 'MASH', href: '#' },
          { label: 'GvHD', href: '#' },
          { label: 'Lung Inflammation', href: '#' },
        ],
      },
      {
        label: 'Infectious disease and toxicity',
        href: '#',
        items: [
          { label: 'HIV', href: '#' },
          { label: 'HBV', href: '#' },
          { label: 'Hepatotoxicity', href: '#' },
          { label: 'Immunotoxicity', href: '#' },
        ],
      },
    ],
  },
  {
    label: 'Mouse Models',
    children: [
      { label: 'CD34+ Humanized Mouse', href: '#mouse-models' },
      { label: 'Humanized Liver Mouse', href: '#mouse-models' },
      { label: 'Double Humanized Mouse', href: '#mouse-models' },
      { label: 'Conventional Mouse Model', href: '#mouse-models' },
    ],
  },
  {
    label: 'About',
    children: [
      { label: 'Preclinical CRO services', href: '#' },
      { label: 'Ethics and quality', href: '#mission' },
      { label: 'Technologies', href: '#' },
    ],
  },
  { label: 'Publications', href: '#publications' },
  { label: 'News', href: '#' },
]

export const mouseModels = [
  {
    title: 'Human Immune System Mouse Model (CD34+)',
    description:
      'Predict the efficacy and immunotoxicity of your lead candidate using a fully reconstituted human immune system.',
    href: '#',
    accent: '#6C35D1',
  },
  {
    title: 'Humanized Liver Mouse Model',
    description:
      'Evaluate the efficacy and hepatotoxicity of your lead candidate in a human liver setting.',
    href: '#',
    accent: '#8B5CF6',
  },
  {
    title: 'Double Humanized Mouse Model',
    description:
      'Combining, in the same animal, a full human immune system and a humanized liver',
    href: '#',
    accent: '#A78BFA',
  },
  {
    title: 'Conventional Mouse Model',
    description:
      'Your standard immunodeficient and immunocompetent mouse model with our unrivaled expertise.',
    href: '#',
    accent: '#C4B5FD',
  },
]

export const diseaseAreas = [
  {
    title: 'Oncology',
    description:
      'Assess your lead candidate efficacy targeting cancer cells and or the immune system. We provide a large range of validated mouse and human tumor models.',
    links: ['Human CDX', 'Human PDX', 'Syngeneic Tumor Mouse Models'],
  },
  {
    title: 'Inflammation',
    description:
      'Assess your lead candidate efficacy in validated inflammatory disease models involving either the mouse or the human immune system.',
    links: ['IBD', 'MASH', 'GvHD', 'Lung inflammation'],
  },
  {
    title: 'Infectious Disease and Toxicity',
    description:
      'Assess your lead candidate efficacy in validated infectious disease models triggered by human tropic viruses or screen for Immuno/hepato toxicity.',
    links: ['HIV', 'HBV', 'Hepatotoxicity', 'Immunotoxicity'],
  },
]

export const values = [
  {
    title: 'Expertise',
    description:
      'With our 12 years of experience in preclinical studies on various advanced mouse models, we have the perspective, knowledge, and technical expertise necessary to provide high-quality support tailored to your expectations.',
    image: '/assets/expertise.svg',
  },
  {
    title: 'Flexibility',
    description:
      'To maximize the output of your preclinical studies, we offer unparalleled flexibility in adapting your study protocol based on real-time data insights.',
    image: '/assets/flexibility.svg',
  },
  {
    title: 'Transparency',
    description:
      'Transparency is at the core of our approach, ensuring open communication, clear processes, and trust at every step of your project.',
    image: '/assets/transparency.webp',
  },
]

export const missionBadges = [
  'Animal welfare excellence',
  'AAALAC accredited',
  'Quality driven',
]

export const publications = [
  {
    type: 'Scientific publication',
    date: '',
    title:
      'PI3K/mTOR inhibition induces tumour microenvironment remodelling and sensitises pS6high uterine leiomyosarcoma to PD-1 blockade',
    image: '/assets/pub-1.webp',
    href: '#',
  },
  {
    type: 'Poster',
    date: '03/11/2024',
    title:
      'POSTER: An efficient pre-clinical mouse model to evaluate immune targeted therapies in cancer research',
    image: '/assets/team.webp',
    href: '#',
  },
  {
    type: 'Poster',
    date: '03/01/2025',
    title:
      'POSTER: Characterizing Growth and Tissue Infiltration of Luciferase-Expressing AML Cell Lines',
    image: '/assets/scientist.webp',
    href: '#',
  },
]
