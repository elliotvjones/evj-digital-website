// All proposal copy, taken from docs/LonRes_International_Proposal_Draft.docx.
// Light web edits are marked `// edit:` so they can be reviewed against the doc.

export const META = {
  title: 'LonRes International Network',
  // edit: hero one-liner lifted from the Summary, second paragraph
  // edit: "trusted" added by Elliot; the hero sets it in pink italics
  idea: 'A trusted international agent directory where every agent is recommended by an existing LonRes member, paired with a register of live international buyer and seller requirements.',
  preparedFor: 'Anthony, Emma and James, LonRes',
  // edit: doc says "Elliot, EVJ Digital Ltd"; brief asks for this byline
  preparedBy: 'Elliot Jones, EVJ Digital',
  version: 'Draft v0.1',
  status: 'For discussion',
  email: 'elliot@evjdigital.com',
  // Shown under the email button in the closing contact block
  links: [
    { label: 'Phone', value: '+44 7717 307680', href: 'tel:+447717307680' },
    { label: 'WhatsApp', value: '+44 7717 307680', href: 'https://wa.me/447717307680' },
    { label: 'LinkedIn', value: 'in/elliotjonesmarketing', href: 'https://www.linkedin.com/in/elliotjonesmarketing/' },
    { label: 'Instagram', value: '@elliot.evj', href: 'https://www.instagram.com/elliot.evj' },
  ],
};

export const NAV = [
  { id: 'summary', num: '01', label: 'Summary' },
  { id: 'problem', num: '02', label: 'The problem' },
  { id: 'principle', num: '03', label: 'The principle' },
  { id: 'model', num: '04', label: 'The model' },
  { id: 'commercial', num: '05', label: 'Commercial model' },
  { id: 'launch', num: '06', label: 'Launch and integrity' },
  { id: 'phase-2', num: '07', label: 'Phase 2' },
];

export const SUMMARY = {
  heading: 'Summary',
  paragraphs: [
    'London agents are handling international enquiries every week, and most of them are finding overseas partners the same way: asking around in WhatsApp groups and hoping someone knows someone.',
    // edit: rewritten by Elliot (September 2026) with the two parts as a numbered list
    'This proposal sets out a simple way for LonRes to capitalise on that moment:',
    {
      list: [
        'An international agent directory where every agent is recommended by an existing LonRes member',
        'A live register of international buyer and seller requirements',
      ],
    },
    'International agents pay to be part of it. For London members, it comes as an extension to their existing LonRes subscription.',
    // edit: rewritten by Elliot (September 2026)
    'The simplicity of Phase 1 is the big value extension for existing London members, providing them with a route to service their international client requirements, and also the opportunity to receive inbound referrals from the LonRes International Network.',
    'Replicating LonRes across overseas territories is a bigger challenge, and more importantly, a significantly greater expense.',
  ],
};

export const PROBLEM = {
  heading: 'The problem',
  paragraphs: [
    // edit: rewritten by Elliot (September 2026)
    'A London agent’s client wants to buy in Marbella, sell in Dubai or relocate to Paris. The agent needs someone good on the ground, and today that usually means posting the requirement in a WhatsApp group.',
    'The agent has no control over that group and doesn’t know everyone in it. They post and hope the right person sees it at the right moment. Often nobody does, because the groups are busy and so are the agents in them. When someone does reply, the process is then manual to validate their experience, and subsequently refer the client. The relationship agents build in that moment is fundamental to the success of the referral.',
  ],
  examplesHeading: 'What members are already asking',
  // edit: rewritten by Elliot (September 2026)
  examplesIntro: [
    'I spent ten minutes scrolling through the international WhatsApp groups I’m part of. These are just some of the messages posted since the start of the summer.',
    'There’s a huge amount of business being passed around, and very few globally trusted tools or resources for it to live.',
  ],
  // edit: the screenshot slots are replaced by a recreated WhatsApp thread.
  // Message text is verbatim from Elliot's screenshots. Real names, numbers and photos
  // are left out entirely: `alias` is an unrelated invented name that is only ever shown blurred.
  threadCaption: 'Real messages from international agent WhatsApp groups. Names, numbers and photos removed.',
  thread: [
    { alias: 'Lena Morris', color: '#7c5cd6', time: '1:00 PM', lines: ['Hi, does anyone cover Barcelona?'], reactions: '👍🙋‍♀️ 2' },
    { alias: 'Aurel', color: '#a0682a', time: '1:20 PM', lines: ['Hi everybody I’m looking for a high end agent suburbs Rome? Please send me a message on this nr {hidden}. Thanx!'] },
    { alias: 'Pia Hartmann', color: '#7c5cd6', time: '12:08 PM', lines: ['Anyone in Madrid to help with a rental? (Good budget)'] },
    {
      alias: 'Nadia Ferro', color: '#a0682a', time: '7:58 AM',
      lines: ['Guys\nA client of mine is moving to Malta and is looking for a villa or a penthouse for rent for 1y contract\n\nWho do I call?', 'Simple modern style, 4 beds.', 'Send me your listings'],
    },
    { alias: 'Sofie Andrade', color: '#1d6fd1', time: '9:22 PM', lines: ['Hey all! Do I know anyone directly selling new dev in Porto Montenegro, or a local agent on the ground there?'] },
    { alias: 'Mira Klein', color: '#a0682a', time: '12:26 PM', lines: ['Guys, anyone dealing with rent in USA? Need rental for a student houng to Yale. New Haven area.'], reactions: '❤️' },
    { alias: 'Tanya Reis', color: '#1f9d55', time: '5:18 AM', lines: ['Hi everyone\nI have buyer for small medium hotels in Europe\nTicket 10 to 50 mil'] },
    { alias: 'Marco Velli', color: '#1d6fd1', time: '9:05 PM', lines: ['Anyone direct with hôtel manager or owner of hôtels in Union European ?'] },
    { alias: 'J', color: '#0f8a7e', time: '6:42 AM', lines: ['Hi all\n\nA client is looking for a 250 + keys hotel in Italy. Freehold, well located.\n\nPlease send if you have applicable assets'] },
    { alias: 'Ostara Homes', color: '#1d6fd1', time: '5:52 AM', lines: ['Hello\nAnyone deal in RAVANDA ?'] },
  ],
  // Optional line of context from Elliot's experience at ADVSR. Omitted while null.
  context: null,
};

export const PRINCIPLE = {
  heading: 'The principle: trust over volume',
  paragraphs: [
    'There is no shortage of international referral and collaboration groups. Platforms and networks such as LeadingRE, AgentWise and ADVSR.ai, alongside WhatsApp groups like Social Estates (International) and Alex Evagora’s group (prime central London, rental focused), all connect agents across borders.',
    'Some rely on open membership, others on busy group chats where a good recommendation scrolls out of view within hours. What none of them offer is a network and brand the LonRes community already trusts.',
    // edit: rewritten by Elliot (September 2026)
    'So, here’s where we get to the core of my vision. The LonRes International Network should be built on recommendation rather than self-registration. Every international agent comes in through an existing LonRes member who has worked with them and is prepared to put their name to the introduction. That makes quality the product, and it is something LonRes is uniquely placed to offer because the trust already exists within its membership.',
    'Initially the value sits with London members placing clients overseas. As the network grows, it naturally opens up to international agents referring to each other, and back into your London client base.',
  ],
  groups: ['LeadingRE', 'AgentWise', 'ADVSR.ai', 'Social Estates (International)', 'Alex Evagora’s group'],
};

export const MODEL = {
  heading: 'The model',
  eyebrow: 'Phase 1',
  directory: {
    // edit: "vouch" renamed to "recommend" throughout, at Elliot's request
    heading: 'A directory of recommended agents',
    paragraphs: [
      'International agents join the directory by being recommended by an existing LonRes member. A recommendation is more than an introduction: the member is putting their name to that agent, and it shows on the profile.',
      'Members search by city and, where it matters, by neighbourhood. The question the directory answers is simple: who is the best agent I can send this buyer or seller to, here?',
    ],
  },
  // edit: 4.2 "Stacking vouches and track record" removed at Elliot's request (September 2026)
  register: {
    heading: 'International requirement register',
    paragraphs: [
      // edit: "two bed" hyphenated
      'LonRes already lets members register UK client requirements. This extends the same idea internationally. A London agent sitting with a buyer can register “Marbella, two-bed townhouse, buying within six months”, and that requirement becomes visible across the network. International members can register requirements the other way too.',
      'This turns the directory from a listing into a live feed of demand, and it gives London members a reason to come back regularly.',
    ],
  },
  gated: {
    heading: 'Gated contact',
    paragraphs: [
      'Information is open, contact is paid. Anyone can see that a requirement exists, where and what it is. Only paying international members can see who registered it and get in touch. The same applies to the directory: profiles, recommendations and track record are visible, but reaching the agent requires membership.',
      // edit: "[X]" is filled live by the register prototype
      'The requirement feed becomes the advertisement. “[X] registered buyers looking in Spain right now” does most of the selling on its own.',
    ],
  },
  fit: {
    heading: 'How it fits together',
    columns: ['Feature', 'London members', 'International agents'],
    rows: [
      ['Agent Directory', 'Search and view agent profiles, including recommendations from other agents and referral track record', 'Listed once recommended and subscribed'],
      ['Track record', 'Builds automatically from recommendations, and is verified by both members for data accuracy', 'Builds automatically from recommendations, and is verified by both members for data accuracy'],
      ['Active Client Searches', 'Register and view mirroring the current London feature, included in subscription', 'View for free; agent details are only available on a paid plan'],
    ],
  },
};

export const COMMERCIAL = {
  heading: 'Commercial model',
  whoPays: {
    heading: 'Who pays',
    paragraphs: [
      'International agents pay to be listed, on a SaaS subscription similar to the existing LonRes membership, at a reduced fee to reflect the narrower functionality.',
      'London members are already on a monthly LonRes subscription. The international network is included in that, adding value to what they already pay for.',
      'Payment alone does not get anyone in. An agent needs a recommendation and a subscription.',
      // edit: section 5.2 pricing table removed at Elliot's request; its first line kept
      'A monthly subscription, priced below the existing LonRes membership.',
    ],
    // edit: bracketed choice from 5.2, shown as an option to discuss
    anchorOptions: ['The current UK membership fee', 'The supplier directory'],
  },
  pipeline: {
    heading: 'Recommendations drive the pipeline',
    paragraphs: [
      'Every recommendation is a warm lead. When a London member recommends an overseas agent, LonRes gains a pre-vetted prospect with a trusted introduction already attached, so the recommendation process organically drives part of the international sales pipeline.',
      'Members will need a reason to put names forward. Options include:',
    ],
    // edit: brackets removed; shown as options to discuss
    incentives: [
      'A discount or credit on their LonRes subscription for each recommended agent who subscribes',
      'Recognition as a founding or top referrer on their profile and in the directory',
      'Early or priority access to the international requirement register',
    ],
    alternative: 'Alternatively, LonRes may feel its relationships with members are strong enough to ask for recommendations directly, without an incentive.',
  },
  renew: {
    heading: 'Why members renew',
    paragraphs: [
      'The requirement feed is what justifies renewal. Each year an international agent can look back at the requirements they saw and the introductions they received. The directory gets them in; the demand keeps them.',
    ],
  },
};

export const LAUNCH = {
  heading: 'Launch and integrity',
  seeding: {
    heading: 'Seeding the network',
    paragraphs: [
      // edit: "[number]" removed until confirmed; see placeholder checklist
      'Launch with a founding group of London members who already have strong international relationships, each recommending their trusted partners. The aim is to go live with credible coverage in the core markets rather than an empty directory.',
      // edit: PIRI 100 reference replaced with a proposed city list at Elliot's request
      'Initial focus markets will be the core global wealth hubs, with priority on the markets where UK buyers are most active overseas, because that is where London members’ referrals will come from first. A proposed starting list:',
    ],
    // edit: "[Final market list to agree with LonRes]"
    markets: ['Marbella', 'Mallorca', 'Ibiza', 'Madrid', 'Barcelona', 'Lisbon', 'The Algarve', 'Paris', 'The French Riviera', 'Monaco', 'Dubai', 'New York'],
    marketsNote: 'Final market list to agree with LonRes.',
  },
  integrity: {
    heading: 'Keeping recommendations honest',
    rules: [
      'Recommendations are always member-initiated. LonRes never solicits a recommendation on behalf of an agent who has paid.',
      'A recommendation reflects on the member who gave it. If an agent is removed for poor conduct, the recommending members are notified.',
    ],
    // edit: bracketed items, shown as options to discuss
    options: [
      'A cap or cadence on recommendations per member to stop the directory being flooded',
      'Verification checks LonRes wants to run, for example licence, agency and identity',
    ],
  },
};

export const PHASE_2 = {
  heading: 'Where this goes next',
  eyebrow: 'Phase 2',
  intro: 'Phase 1 builds the trusted network. Phase 2 puts inventory on top of it.',
  items: [
    {
      heading: 'International listings',
      body: 'Member international agents upload their listings, which can be rebranded and exported as PDF brochures in exactly the way LonRes members already do with UK listings.',
    },
    {
      heading: 'Syndicated international feed',
      body: 'LonRes offers a feed of international listings that member agencies can drop into their own websites, giving every London agency an international section powered by LonRes. That is a second revenue line for LonRes, and it makes the network far more valuable to international agents, who gain distribution across hundreds of London agency sites.',
      note: 'To make this possible later, syndication permissions should be collected from international agents at sign-up in Phase 1.',
    },
    {
      // edit: added by Elliot (September 2026)
      heading: 'Referral management',
      body: 'This is a model adopted by LeadingRE, where a central referral department facilitates the referral, keeps parties updated, and ensures a smooth process for both agencies and the client.',
    },
    {
      heading: 'Later',
      // edit: "[other ideas]" removed until supplied; see placeholder checklist
      body: 'International to international referrals and in-platform messaging.',
    },
  ],
};

// edit: section 8 "Open questions and next steps" removed at Elliot's request (September 2026)
export const CONTACT = {
  cta: {
    heading: 'Let’s talk it through.',
  },
};
