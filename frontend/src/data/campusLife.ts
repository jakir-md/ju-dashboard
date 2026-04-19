/** Demo content & stock imagery for JU-Dashboard — replace with CMS or official assets in production. */

export type DormitoryHall = {
  id: string
  name: string
  subtitle: string
  description: string
  highlights: string[]
  imageSrc: string
  imageAlt: string
}

export type ExtracurricularSpotlight = {
  id: string
  title: string
  category: string
  description: string
  imageSrc: string
  imageAlt: string
}

export type UniversityActivityPillar = {
  id: string
  title: string
  summary: string
  examples: string[]
  imageSrc?: string
  imageAlt?: string
}

export const dormitoryHalls: DormitoryHall[] = [
  {
    id: 'shaheed-tajuddin',
    name: 'Shaheed Tajuddin Ahmed Hall',
    subtitle: 'Undergraduate residence · Savar campus',
    description:
      'Representative hall layout with shared reading rooms, common pantries, and supervised visitor hours. Allocation follows the central hall office calendar each semester.',
    highlights: ['24-hour reading room', 'High-speed campus LAN', 'Counsellor office on site'],
    imageSrc:
      'https://images.unsplash.com/photo-1555854877-abbcd044c867?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Bright shared student residence corridor with plants',
  },
  {
    id: 'mir-mosharraf',
    name: 'Mir Mosharraf Hossain Hall',
    subtitle: 'Mixed floors · post-graduate blocks nearby',
    description:
      'Quiet floors for thesis writers plus recreation courts within walking distance. Hall committees organise fire drills and orientation week jointly with proctorial staff.',
    highlights: ['Thesis discussion corners', 'Indoor games room', 'Solar-assisted water heating'],
    imageSrc:
      'https://images.unsplash.com/photo-1522708323390-304addc373de?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Minimal furnished living room with sofa and window light',
  },
  {
    id: 'preetilata',
    name: 'Preetilata Hall',
    subtitle: 'Dedicated women’s residence complex',
    description:
      'Secured perimeter, on-call medical room, and direct shuttle timing to central academic buildings. Cultural evenings and literacy drives are hosted in the multipurpose hall.',
    highlights: ['Night security desk', 'Guest registration kiosk', 'Rooftop laundry solarium'],
    imageSrc:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Comfortable dormitory-style bedroom with desk and bed',
  },
  {
    id: 'international-guest',
    name: 'International Guest House',
    subtitle: 'Short-stay researchers & visiting faculty',
    description:
      'Furnished suites with housekeeping, airport pick-up coordination, and billing through the registrar’s finance window. Ideal for exchange semesters and conference delegations.',
    highlights: ['Air-conditioned suites', 'Conference shuttle slots', 'Meal coupons at central cafeteria'],
    imageSrc:
      'https://images.unsplash.com/photo-1631049307264-da0cfb9a7388?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern hotel-style room with crisp white bedding',
  },
]

export const extracurricularSpots: ExtracurricularSpotlight[] = [
  {
    id: 'debating',
    title: 'Debating & public speaking society',
    category: 'Literary',
    description:
      'Weekly practice at the seminar library annex, national tournament prep, and bilingual policy dialogues streamed for alumni.',
    imageSrc:
      'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Microphone on stage in front of audience seating',
  },
  {
    id: 'robotics',
    title: 'IEEE & robotics labs open house',
    category: 'STEM outreach',
    description:
      'Student chapters host soldering workshops, drone safety clinics, and hack nights co-sponsored with ICT divisions.',
    imageSrc:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Students collaborating around laptops and electronics',
  },
  {
    id: 'theatre',
    title: 'Drama circle & campus film nights',
    category: 'Performing arts',
    description:
      'Open-air amphitheatre beside the botanic trail—screenings alternate with student-written productions each trimester.',
    imageSrc:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Theatre stage curtains and dramatic lighting',
  },
  {
    id: 'marathon',
    title: 'Inter-hall athletics & mini-marathon',
    category: 'Sports',
    description:
      'Track events, cricket nets, and the annual “green campus run” that raises funds for literacy clubs in surrounding unions.',
    imageSrc:
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Runners on a tree-lined path during a race',
  },
  {
    id: 'volunteering',
    title: 'Blood donation & disaster relief cells',
    category: 'Volunteering',
    description:
      'Coordinated with medical centres and district administration; rapid-response teams train each rainy season.',
    imageSrc:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Healthcare professional with volunteer at donation event',
  },
  {
    id: 'photography',
    title: 'Wildlife & photography walks',
    category: 'Campus heritage',
    description:
      'Guided sunrise walks through the reserved forest patch—perfect for shutterbugs documenting migratory birds and spotted deer.',
    imageSrc:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Hiker with camera looking at forest vista',
  },
]

export const universityActivityPillars: UniversityActivityPillar[] = [
  {
    id: 'teaching',
    title: 'Teaching & continuous assessment',
    summary:
      'Semester plans, blended classrooms, lab rotations, and fieldwork tied to national qualification frameworks.',
    examples: ['Mid-term quality boards', 'Mentoring hours', 'Digital assignment lockers'],
  },
  {
    id: 'research',
    title: 'Research, innovation & PhD training',
    summary:
      'Grant administration, ethics clearance, instrumentation sharing, and industry linkage cells for translational projects.',
    examples: ['Central research office', 'Lab safety audits', 'Patent clinic sessions'],
  },
  {
    id: 'exams',
    title: 'Examination & academic records',
    summary:
      'Secure script handling, digitised gradebooks, convocation lists, and transcript verification for employers worldwide.',
    examples: ['Controller office counters', 'Online appeals', 'Duplicate certificate workflow'],
  },
  {
    id: 'extension',
    title: 'Extension services & community outreach',
    summary:
      'Farmer field schools, legal aid booths, public health camps, and continuing education for professionals.',
    examples: ['Winter schools', 'UN agency collaborations', 'Union digital literacy hubs'],
  },
  {
    id: 'ceremonies',
    title: 'Convocation, orientation & national days',
    summary:
      'Large-format ceremonies in the central auditorium plus simultaneous livestreams for guardians abroad.',
    examples: ['Robing rehearsals', 'Guardian seating plans', 'Flag-hoisting drills'],
    imageSrc:
      'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Graduates throwing caps in celebration outdoors',
  },
  {
    id: 'facilities',
    title: 'Facilities, estates & sustainability',
    summary:
      'Shuttle routing, waste segregation, lake conservation, and renewable pilots tracked through estates dashboards.',
    examples: ['Solar audit dashboards', 'Rainwater recharge wells', 'Night bus tracking'],
    imageSrc:
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern university building with glass facade and greenery',
  },
  {
    id: 'international',
    title: 'International relations & mobility',
    summary:
      'MoUs, visiting professorships, credit transfer, and orientation for inbound students in multiple languages.',
    examples: ['Embassy liaison desk', 'Buddy programmes', 'Joint degree committees'],
  },
  {
    id: 'culture',
    title: 'Culture, arts & interfaith dialogue',
    summary:
      'Folk festivals, sculpture biennales, multilingual theatre, and chaplaincy hours across faith societies.',
    examples: ['Open mic nights', 'Calligraphy residencies', 'Peace café roundtables'],
    imageSrc:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Crowd enjoying outdoor music festival lights',
  },
]

export const dormitoryGallery = [
  {
    src: 'https://images.unsplash.com/photo-1560185007-cde436e6d53a?auto=format&fit=crop&w=1400&q=80',
    alt: 'Students studying together at a shared table',
  },
  {
    src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80',
    alt: 'Group of diverse students walking on campus lawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1400&q=80',
    alt: 'University library interior with tall bookshelves',
  },
  {
    src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf13?auto=format&fit=crop&w=1400&q=80',
    alt: 'Campus courtyard with bicycles and trees',
  },
] as const
