/* ==========================================================================
   Bazillin Realtors - listing data
   --------------------------------------------------------------------------
   All listings below are SAMPLE entries. Edit, delete or add objects to
   BZ_PROPERTIES and the whole site (home, properties, categories, detail
   pages) updates automatically.

   photos : array of image paths. Leave it empty ([]) and a drawn elevation
            is shown instead, so a listing never has a broken image.
   art    : settings for the drawn elevation { seed, tone }.
   ========================================================================== */

window.BZ_CONTACT = {
  name: 'Bazillin Realtors',
  phoneDisplay: '0701 434 5122',
  phoneTel: '+2347014345122',
  whatsapp: '2347014345122'
};

window.BZ_CATEGORIES = [
  {
    id: 'duplex',
    name: 'Detached duplex',
    short: 'Two floors, private compound',
    typical: '4 to 6 bedrooms',
    blurb: 'A stand-alone two-storey home with its own gate, parking and boys\u2019 quarters in many cases. The usual choice for growing families who want space and privacy.',
    suits: ['Large families', 'Buyers who want a private compound', 'Home offices and guest rooms'],
    check: ['Confirm the building approval and survey', 'Ask about borehole, power backup and drainage', 'Check the road access in rainy season']
  },
  {
    id: 'villa',
    name: 'Mansions & villas',
    short: 'Six bedrooms and above',
    typical: '6+ bedrooms',
    blurb: 'Large, high-specification homes on generous plots, often with a pool, cinema room, staff quarters and landscaped grounds.',
    suits: ['Executive living', 'Multi-generational households', 'Entertaining and events'],
    check: ['Confirm title and plot size on the survey', 'Ask for service and maintenance costs', 'Inspect finishes, roofing and electrical load']
  },
  {
    id: 'bungalow',
    name: 'Bungalow',
    short: 'Single storey, easy living',
    typical: '2 to 4 bedrooms',
    blurb: 'Everything on one level with a veranda and a garden. Lower build cost, simple maintenance and well suited to older family members.',
    suits: ['Small families', 'Retirees', 'First-time buyers'],
    check: ['Check the roof and ceiling condition', 'Confirm room for future extension', 'Look at drainage around the building']
  },
  {
    id: 'terrace',
    name: 'Terrace & semi-detached',
    short: 'Shared walls, lower cost',
    typical: '3 to 4 bedrooms',
    blurb: 'Houses built in a row or in pairs inside a gated estate. You get estate security and shared facilities at a lower price than a detached home.',
    suits: ['Young families', 'Professionals', 'Investors renting out'],
    check: ['Ask about estate dues and what they cover', 'Confirm who owns the shared road and drainage', 'Check the plot depth for a backyard']
  },
  {
    id: 'apartment',
    name: 'Apartments & flats',
    short: 'Low-maintenance city living',
    typical: '1 to 3 bedrooms',
    blurb: 'Self-contained units in a block or tower. Often with security, lifts and backup power, and usually close to work and shopping.',
    suits: ['Singles and couples', 'Relocating professionals', 'Short and long lets'],
    check: ['Ask what the service charge covers', 'Confirm parking spaces per unit', 'Check water supply and generator hours']
  },
  {
    id: 'penthouse',
    name: 'Penthouses',
    short: 'Top-floor, skyline views',
    typical: '3 to 4 bedrooms',
    blurb: 'The top floors of a tower: bigger terraces, higher ceilings and the best views in the building.',
    suits: ['Executive buyers', 'Second homes in the city', 'Premium rental investment'],
    check: ['Confirm lift access and backup power', 'Ask about terrace usage rules', 'Review the building service charge']
  },
  {
    id: 'land',
    name: 'Land & plots',
    short: 'Build on your own terms',
    typical: '300 to 1,000 sqm',
    blurb: 'Residential and mixed-use plots in growing areas. Buy now, build when you are ready, and choose your own design.',
    suits: ['Self-builders', 'Long-term investors', 'Developers'],
    check: ['Verify the survey at the state land registry', 'Confirm there is no government acquisition or dispute', 'Walk the boundary with the seller before paying']
  },
  {
    id: 'commercial',
    name: 'Commercial',
    short: 'Shops, offices and warehouses',
    typical: '30 to 400 sqm',
    blurb: 'Shopfronts, offices and open floor space in busy trading or business areas, let on yearly terms.',
    suits: ['Retail and service businesses', 'Start-ups and offices', 'Storage and distribution'],
    check: ['Confirm permitted use for the space', 'Ask about signage and power rules', 'Check footfall at different times of day']
  }
];

window.BZ_PROPERTIES = [
  {
    id: 'aurelia-penthouse-lekki',
    title: 'Aurelia Penthouse',
    cat: 'penthouse', status: 'sale', price: 650000000,
    city: 'Lagos', area: 'Lekki Phase 1',
    beds: 4, baths: 4, toilets: 5, parking: 3, size: 380, plot: null,
    condition: 'New build', furnished: 'Fully furnished', docs: 'C of O, deed of assignment',
    featured: true, tag: 'Featured',
    summary: 'A four-bedroom top-floor residence with floor-to-ceiling glass and open skyline views.',
    description: [
      'The Aurelia Penthouse takes the top of the tower. The living room opens straight to the skyline, the kitchen has a stone island with seating for four, and the main suite has its own dressing area and a stone-walled bathroom.',
      'The unit comes fully furnished, with a private lift lobby, three covered parking spaces and round-the-clock power and security.'
    ],
    features: ['Private lift lobby', 'Floor-to-ceiling glazing', 'Stone kitchen island', 'Freestanding bath', 'Walk-in dressing room', '24-hour power', 'CCTV and manned gate', 'Three covered parking bays'],
    photos: ['living-room', 'kitchen', 'bedroom', 'bathroom', 'floor-plan', 'exterior'],
    art: { seed: 3, tone: 0 }
  },
  {
    id: 'aurelia-3-bed-lekki',
    title: 'Aurelia 3-Bedroom Apartment',
    cat: 'apartment', status: 'sale', price: 265000000,
    city: 'Lagos', area: 'Lekki Phase 1',
    beds: 3, baths: 3, toilets: 4, parking: 2, size: 220, plot: null,
    condition: 'New build', furnished: 'Semi-furnished', docs: 'C of O, deed of assignment',
    featured: true, tag: 'New',
    summary: 'Three bedrooms behind a solid walnut entrance door, with a long living room facing the city.',
    description: [
      'A well-planned three-bedroom unit with an entrance hall, a living and dining area that runs the width of the apartment, and a separate kitchen.',
      'Every bedroom is en-suite. Fitted wardrobes, built-in kitchen appliances and air-conditioning are included.'
    ],
    features: ['Walnut entrance door', 'Built-in appliances', 'Fitted wardrobes', 'Air-conditioning', 'Lift access', 'Backup power', 'Gated tower with CCTV', 'Two parking bays'],
    photos: ['arrival-door', 'living-room', 'kitchen', 'bathroom'],
    art: { seed: 5, tone: 1 }
  },
  {
    id: 'aurelia-2-bed-lekki',
    title: 'Aurelia 2-Bedroom Apartment',
    cat: 'apartment', status: 'sale', price: 185000000,
    city: 'Lagos', area: 'Lekki Phase 1',
    beds: 2, baths: 2, toilets: 3, parking: 1, size: 150, plot: null,
    condition: 'New build', furnished: 'Unfurnished', docs: 'C of O, deed of assignment',
    featured: true, tag: 'New',
    summary: 'A bright two-bedroom unit in the Aurelia tower, ready for you to furnish your way.',
    description: [
      'Two en-suite bedrooms, a guest toilet, a stone-topped kitchen and a living room with large sliding glass doors.',
      'Aurelia sits in a quiet part of Lekki Phase 1 with easy access to the main road, restaurants and offices.'
    ],
    features: ['En-suite bedrooms', 'Guest toilet', 'Stone worktops', 'Sliding glass doors', 'Lift access', 'Backup power', 'Gated tower with CCTV'],
    photos: ['exterior', 'foyer', 'living-room', 'kitchen', 'bedroom'],
    art: { seed: 8, tone: 2 }
  },
  {
    id: 'aurelia-serviced-2-bed',
    title: 'Aurelia Serviced 2-Bedroom',
    cat: 'apartment', status: 'rent', price: 9500000, per: 'year',
    city: 'Lagos', area: 'Lekki Phase 1',
    beds: 2, baths: 2, toilets: 3, parking: 1, size: 145, plot: null,
    condition: 'Serviced', furnished: 'Fully furnished', docs: 'Tenancy agreement',
    featured: true, tag: 'For rent',
    summary: 'A fully furnished, serviced two-bedroom in Lekki, ready to move into.',
    description: [
      'Furnished to a high standard with a king bed in the main suite, a dining table for four and a fitted kitchen.',
      'Service charge covers security, waste, common-area power and lift maintenance.'
    ],
    features: ['Fully furnished', 'Fitted kitchen', 'Air-conditioning', 'Wi-Fi ready', 'Lift access', 'Backup power', 'Waste and security included'],
    photos: ['bedroom', 'living-room', 'foyer', 'bathroom'],
    art: { seed: 11, tone: 0 }
  },
  {
    id: 'bodija-duplex',
    title: 'Five-Bedroom Detached Duplex',
    cat: 'duplex', status: 'sale', price: 135000000,
    city: 'Ibadan', area: 'Bodija',
    beds: 5, baths: 5, toilets: 6, parking: 4, size: 420, plot: 650,
    condition: 'Newly built', furnished: 'Unfurnished', docs: 'C of O, registered survey',
    featured: true, tag: 'Featured',
    summary: 'A modern five-bedroom duplex with a boys\u2019 quarters on a 650 sqm plot.',
    description: [
      'A well-finished detached duplex with a double-height entrance, a large family lounge downstairs and five en-suite bedrooms across both floors.',
      'The compound has a paved driveway for four cars, a borehole, an overhead water tank and a separate boys\u2019 quarters.'
    ],
    features: ['Double-height entrance', 'Boys\u2019 quarters', 'Borehole and tank', 'Paved compound', 'Fitted kitchen', 'POP ceilings', 'Perimeter fence and gate', 'Space for a garden'],
    photos: [],
    art: { seed: 21, tone: 0 }
  },
  {
    id: 'akobo-duplex',
    title: 'Four-Bedroom Duplex',
    cat: 'duplex', status: 'sale', price: 95000000,
    city: 'Ibadan', area: 'Akobo',
    beds: 4, baths: 4, toilets: 5, parking: 3, size: 330, plot: 500,
    condition: 'Newly built', furnished: 'Unfurnished', docs: 'Governor\u2019s consent, registered survey',
    featured: false, tag: '',
    summary: 'Four ensuite bedrooms in a calm, gated Akobo neighbourhood.',
    description: [
      'A tidy four-bedroom duplex in a gated street with good road access. The ground floor has a lounge, dining area, guest toilet and kitchen, with all four bedrooms upstairs.',
      'Good value for a family that wants a detached home close to the city.'
    ],
    features: ['Gated street', 'Guest toilet', 'Fitted kitchen', 'Tiled floors', 'Water tank', 'Parking for three cars'],
    photos: [],
    art: { seed: 34, tone: 1 }
  },
  {
    id: 'oluyole-villa',
    title: 'Six-Bedroom Executive Villa',
    cat: 'villa', status: 'sale', price: 320000000,
    city: 'Ibadan', area: 'Oluyole Estate',
    beds: 6, baths: 7, toilets: 8, parking: 6, size: 780, plot: 1200,
    condition: 'Newly built', furnished: 'Unfurnished', docs: 'C of O, deed of assignment',
    featured: true, tag: 'Featured',
    summary: 'A landscaped villa with a pool, cinema room and staff quarters in Oluyole Estate.',
    description: [
      'Set on 1,200 sqm in one of Ibadan\u2019s most established estates, the villa has two living rooms, a cinema room, a study and six en-suite bedrooms.',
      'Outside there is a swimming pool, a covered terrace, a two-room staff quarters and space for six cars.'
    ],
    features: ['Swimming pool', 'Cinema room', 'Study', 'Staff quarters', 'Landscaped garden', 'Solar-ready roof', 'Smart gate', 'Six-car parking'],
    photos: [],
    art: { seed: 47, tone: 2 }
  },
  {
    id: 'ring-road-bungalow',
    title: 'Three-Bedroom Bungalow',
    cat: 'bungalow', status: 'sale', price: 48000000,
    city: 'Ibadan', area: 'Ring Road',
    beds: 3, baths: 3, toilets: 4, parking: 2, size: 190, plot: 450,
    condition: 'Renovated', furnished: 'Unfurnished', docs: 'Governor\u2019s consent',
    featured: false, tag: '',
    summary: 'A renovated three-bedroom bungalow with a covered veranda and a front garden.',
    description: [
      'A comfortable single-storey home near the Ring Road corridor, freshly painted and re-roofed. The veranda catches the evening breeze and the plot leaves room to extend.'
    ],
    features: ['New roof', 'Covered veranda', 'Front garden', 'Tiled floors', 'Borehole', 'Room to extend'],
    photos: [],
    art: { seed: 12, tone: 0 }
  },
  {
    id: 'ologuneru-bungalow-rent',
    title: 'Three-Bedroom Bungalow to Let',
    cat: 'bungalow', status: 'rent', price: 1800000, per: 'year',
    city: 'Ibadan', area: 'Ologuneru',
    beds: 3, baths: 2, toilets: 3, parking: 2, size: 170, plot: 400,
    condition: 'Renovated', furnished: 'Unfurnished', docs: 'Tenancy agreement',
    featured: false, tag: 'For rent',
    summary: 'A clean, quiet bungalow with a private compound, available on a yearly lease.',
    description: [
      'Three bedrooms, a spacious living room and a private compound with parking for two cars. Water is available from a borehole.'
    ],
    features: ['Private compound', 'Borehole', 'Tiled floors', 'Parking for two cars', 'Fenced and gated'],
    photos: [],
    art: { seed: 27, tone: 1 }
  },
  {
    id: 'bodija-2-bed-flat-rent',
    title: 'Two-Bedroom Flat to Let',
    cat: 'apartment', status: 'rent', price: 1500000, per: 'year',
    city: 'Ibadan', area: 'Bodija',
    beds: 2, baths: 2, toilets: 3, parking: 1, size: 110, plot: null,
    condition: 'Renovated', furnished: 'Unfurnished', docs: 'Tenancy agreement',
    featured: false, tag: 'For rent',
    summary: 'A tidy second-floor flat in a small, secure block in Bodija.',
    description: [
      'Two bedrooms, a living and dining area and a fitted kitchen in a small block with a gate man and a shared borehole.'
    ],
    features: ['Fitted kitchen', 'Tiled floors', 'Shared borehole', 'Gate man', 'Parking space'],
    photos: [],
    art: { seed: 18, tone: 2 }
  },
  {
    id: 'ajah-terrace',
    title: 'Four-Bedroom Terrace',
    cat: 'terrace', status: 'sale', price: 110000000,
    city: 'Lagos', area: 'Ajah',
    beds: 4, baths: 4, toilets: 5, parking: 2, size: 260, plot: 220,
    condition: 'New build', furnished: 'Unfurnished', docs: 'Deed of assignment, registered survey',
    featured: true, tag: 'New',
    summary: 'A four-bedroom terrace with a boys\u2019 quarters in a gated estate off the Lekki-Epe corridor.',
    description: [
      'A modern terrace house in a gated estate with estate roads, drainage and 24-hour security. Four ensuite bedrooms, a family lounge and a boys\u2019 quarters at the back.'
    ],
    features: ['Gated estate', 'Boys\u2019 quarters', 'Estate roads and drainage', 'Fitted wardrobes', 'Water treatment', '24-hour security'],
    photos: [],
    art: { seed: 41, tone: 0 }
  },
  {
    id: 'ikeja-terrace-rent',
    title: 'Three-Bedroom Terrace to Let',
    cat: 'terrace', status: 'rent', price: 6500000, per: 'year',
    city: 'Lagos', area: 'Ikeja GRA',
    beds: 3, baths: 3, toilets: 4, parking: 2, size: 200, plot: 180,
    condition: 'Renovated', furnished: 'Semi-furnished', docs: 'Tenancy agreement',
    featured: false, tag: 'For rent',
    summary: 'A renovated three-bedroom terrace in Ikeja GRA, close to offices and the airport road.',
    description: [
      'A well-kept terrace in a quiet street within Ikeja GRA. The house has been repainted and the kitchen and bathrooms updated.'
    ],
    features: ['Updated kitchen', 'Air-conditioned bedrooms', 'Secure street', 'Two parking spaces', 'Close to the airport road'],
    photos: [],
    art: { seed: 29, tone: 2 }
  },
  {
    id: 'gwarinpa-duplex',
    title: 'Five-Bedroom Duplex',
    cat: 'duplex', status: 'sale', price: 210000000,
    city: 'Abuja', area: 'Gwarinpa',
    beds: 5, baths: 5, toilets: 6, parking: 4, size: 460, plot: 600,
    condition: 'Newly built', furnished: 'Unfurnished', docs: 'C of O, registered survey',
    featured: false, tag: '',
    summary: 'A spacious five-bedroom detached duplex on a corner plot in Gwarinpa.',
    description: [
      'A corner-plot duplex with a generous compound, two living rooms, a study and five bedrooms. Gwarinpa has good road links to the city centre and the airport.'
    ],
    features: ['Corner plot', 'Two living rooms', 'Study', 'Boys\u2019 quarters', 'Borehole', 'Paved compound'],
    photos: [],
    art: { seed: 52, tone: 1 }
  },
  {
    id: 'maitama-villa',
    title: 'Seven-Bedroom Villa',
    cat: 'villa', status: 'sale', price: 850000000,
    city: 'Abuja', area: 'Maitama',
    beds: 7, baths: 8, toilets: 9, parking: 8, size: 1100, plot: 2000,
    condition: 'New build', furnished: 'Unfurnished', docs: 'C of O, deed of assignment',
    featured: true, tag: 'Featured',
    summary: 'A landmark villa in Maitama with a pool, gym, cinema and full staff quarters.',
    description: [
      'A contemporary villa on a 2,000 sqm plot. Seven en-suite bedrooms, formal and informal living areas, a home gym, a cinema room and a pool with a covered lounge.',
      'The compound has a gatehouse, a six-room staff block and parking for eight cars.'
    ],
    features: ['Swimming pool', 'Home gym', 'Cinema room', 'Gatehouse', 'Staff block', 'Solar and backup power', 'Landscaped grounds', 'Eight-car parking'],
    photos: [],
    art: { seed: 63, tone: 2 }
  },
  {
    id: 'akobo-plots',
    title: 'Residential Plot, 600 sqm',
    cat: 'land', status: 'sale', price: 18000000,
    city: 'Ibadan', area: 'Akobo',
    beds: null, baths: null, toilets: null, parking: null, size: null, plot: 600,
    condition: 'Dry, cleared land', furnished: null, docs: 'Registered survey, deed of assignment',
    featured: false, tag: '',
    summary: 'A dry, cleared 600 sqm residential plot close to a tarred road.',
    description: [
      'A flat, well-drained plot in a developed neighbourhood. Neighbouring plots are already built, so electricity and water are within reach.',
      'Survey beacons are in place, and we walk the boundary with you before any payment.'
    ],
    features: ['Dry and cleared', 'Close to tarred road', 'Beacons in place', 'Developed neighbourhood', 'Flexible payment plan'],
    photos: [],
    art: { seed: 71, tone: 0 }
  },
  {
    id: 'epe-plots',
    title: 'Residential Plot, 600 sqm',
    cat: 'land', status: 'sale', price: 9500000,
    city: 'Lagos', area: 'Epe',
    beds: null, baths: null, toilets: null, parking: null, size: null, plot: 600,
    condition: 'Dry land', furnished: null, docs: 'Registered survey, deed of assignment',
    featured: false, tag: 'Hot',
    summary: 'An affordable plot in a fast-growing part of Epe, good for building or holding.',
    description: [
      'Plots in a mapped layout with access roads. A good entry point for buyers who want to build in stages or hold for growth.'
    ],
    features: ['Mapped layout', 'Access roads', 'Dry land', 'Installment option available'],
    photos: [],
    art: { seed: 77, tone: 2 }
  },
  {
    id: 'ring-road-shop-rent',
    title: 'Shop on the Ring Road',
    cat: 'commercial', status: 'rent', price: 2400000, per: 'year',
    city: 'Ibadan', area: 'Ring Road',
    beds: null, baths: 1, toilets: 1, parking: 3, size: 60, plot: null,
    condition: 'Renovated', furnished: null, docs: 'Tenancy agreement',
    featured: false, tag: 'For rent',
    summary: 'A 60 sqm ground-floor shop on a busy road with a wide glass frontage.',
    description: [
      'A well-placed shop with strong passing traffic, a wide glass frontage and its own toilet. Space for a storeroom at the back.'
    ],
    features: ['Busy road frontage', 'Glass shopfront', 'Storeroom', 'Own toilet', 'Customer parking'],
    photos: [],
    art: { seed: 83, tone: 1 }
  },
  {
    id: 'vi-office-rent',
    title: 'Open-Plan Office Floor',
    cat: 'commercial', status: 'rent', price: 28000000, per: 'year',
    city: 'Lagos', area: 'Victoria Island',
    beds: null, baths: 2, toilets: 3, parking: 6, size: 220, plot: null,
    condition: 'Fitted out', furnished: null, docs: 'Tenancy agreement',
    featured: false, tag: 'For rent',
    summary: 'A fitted-out 220 sqm floor in a managed office building on Victoria Island.',
    description: [
      'A full floor with an open plan layout, two meeting rooms and a small kitchenette. The building has 24-hour power, lifts and six allocated parking spaces.'
    ],
    features: ['Fitted out', 'Two meeting rooms', 'Kitchenette', '24-hour power', 'Lift access', 'Six parking spaces'],
    photos: [],
    art: { seed: 91, tone: 0 }
  }
];

window.BZ_CITIES = {
  Ibadan: ['Bodija', 'Akobo', 'Oluyole Estate', 'Ring Road', 'Ologuneru'],
  Lagos: ['Lekki Phase 1', 'Ajah', 'Ikeja GRA', 'Epe', 'Victoria Island'],
  Abuja: ['Gwarinpa', 'Maitama']
};
