// Bundled fallback content for Poseidon Academy.
// Used only when the app has never successfully fetched from the Academy
// content API and has no cached copy in localStorage (e.g. first launch
// with no connectivity). Once a fetch succeeds, ContentContext caches the
// live content and this module is no longer read.

import type { Category, ChecklistSection, GlossaryTerm, Lesson, QAItem } from './content'

export const categories: Category[] = [
  {
    id: 'artist-development',
    name: 'Artist Development',
    blurb: 'Grow from bedroom project to real career.',
    icon: 'TrendingUp',
  },
  {
    id: 'music-marketing',
    name: 'Music Marketing',
    blurb: 'Get your music in front of the right people.',
    icon: 'Megaphone',
  },
  {
    id: 'playlist-promotion',
    name: 'Playlist Promotion',
    blurb: 'Land on playlists that actually move numbers.',
    icon: 'ListMusic',
  },
  {
    id: 'spotify-for-artists',
    name: 'Spotify for Artists',
    blurb: 'Work the pitch tools and read your data.',
    icon: 'AudioLines',
  },
  {
    id: 'youtube-growth',
    name: 'YouTube Growth',
    blurb: 'Build a channel that finds new listeners.',
    icon: 'MonitorPlay',
  },
  {
    id: 'tiktok-marketing',
    name: 'TikTok Marketing',
    blurb: 'Turn short-form video into streams.',
    icon: 'Music2',
  },
  {
    id: 'branding',
    name: 'Branding & Visual Identity',
    blurb: 'Look like the same artist everywhere.',
    icon: 'Sparkles',
  },
  {
    id: 'copyright-publishing',
    name: 'Copyright & Publishing',
    blurb: 'Own your work and register it right.',
    icon: 'Copyright',
  },
  {
    id: 'sample-clearance',
    name: 'Sample Clearance',
    blurb: 'Use samples without getting sued.',
    icon: 'Scissors',
  },
  {
    id: 'music-distribution',
    name: 'Music Distribution',
    blurb: 'Get your music onto every platform.',
    icon: 'Send',
  },
  {
    id: 'sync-licensing',
    name: 'Sync Licensing',
    blurb: 'Place your music in film, TV, and ads.',
    icon: 'Film',
  },
  {
    id: 'royalties-pros',
    name: 'Royalties & PROs',
    blurb: 'Collect every dollar your music earns.',
    icon: 'Coins',
  },
  {
    id: 'trademark-protection',
    name: 'Trademark Protection',
    blurb: 'Protect your artist name and marks.',
    icon: 'BadgeCheck',
  },
  {
    id: 'legal-resources',
    name: 'Legal Resources',
    blurb: 'Know your rights before you sign.',
    icon: 'Scale',
  },
  {
    id: 'contracts-agreements',
    name: 'Contracts & Agreements',
    blurb: 'Read the deal before you sign it.',
    icon: 'Signature',
  },
  {
    id: 'business-formation',
    name: 'Business Formation',
    blurb: 'Set up the entity behind your music.',
    icon: 'Building2',
  },
  {
    id: 'touring-live',
    name: 'Touring & Live Performance',
    blurb: 'Book, plan, and profit from live shows.',
    icon: 'Mic',
  },
  {
    id: 'merchandising',
    name: 'Merchandising',
    blurb: 'Turn fans into a merch revenue stream.',
    icon: 'ShoppingBag',
  },
  {
    id: 'fan-community',
    name: 'Fan Community Building',
    blurb: 'Build a base that shows up for you.',
    icon: 'Users',
  },
  {
    id: 'press-pr',
    name: 'Press & PR',
    blurb: 'Get written about by the right outlets.',
    icon: 'Newspaper',
  },
  {
    id: 'ai-tools',
    name: 'AI Tools for Musicians',
    blurb: 'Use AI to work faster, not cheaper.',
    icon: 'Bot',
  },
  {
    id: 'music-production',
    name: 'Music Production',
    blurb: 'Make tracks that are ready to release.',
    icon: 'SlidersVertical',
  },
  {
    id: 'mixing-mastering',
    name: 'Mixing & Mastering',
    blurb: 'Get your tracks release-ready and loud.',
    icon: 'AudioWaveform',
  },
  {
    id: 'mental-health',
    name: 'Mental Health for Artists',
    blurb: 'Sustain a career without burning out.',
    icon: 'HeartPulse',
  },
  {
    id: 'funding-grants',
    name: 'Funding & Grants',
    blurb: 'Find money to fund your music.',
    icon: 'HandCoins',
  },
  {
    id: 'data-privacy',
    name: 'Data Privacy Rights',
    blurb: 'Protect your data and your fans.',
    icon: 'Shield',
  },
]

export const lessons: Lesson[] = [
  {
    id: 'release-timeline',
    categoryId: 'music-distribution',
    title: 'The 8-Week Release Timeline',
    summary: 'Work backwards from your release date so nothing slips.',
    readMins: 6,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'A great release is mostly logistics. Lock the date first, then schedule everything backwards from it. This is the timeline most independent artists use.',
      },
      { type: 'heading', text: 'Why 8 weeks?' },
      {
        type: 'paragraph',
        text: 'Editorial playlist pitches on Spotify need to be submitted at least 7 days before release, and most curators want 2-4 weeks. Eight weeks gives you room to build a story before the song is even live.',
      },
      { type: 'heading', text: 'The schedule' },
      {
        type: 'steps',
        items: [
          'Week 8: Finalize master + artwork. Lock metadata (title, features, credits).',
          'Week 6: Upload to your distributor. Set the release date.',
          'Week 4: Submit to Spotify for Artists editorial. Start teasing on socials.',
          'Week 2: Pitch curators and press. Schedule pre-save campaign.',
          'Week 1: Final reminders, story content, behind-the-scenes.',
          'Release day: Post everywhere, thank early supporters, watch the data.',
        ],
      },
      {
        type: 'callout',
        text: 'Submit your editorial pitch the moment your release is uploaded. Earlier is always better — it signals confidence to the algorithm.',
      },
    ],
  },
  {
    id: 'pre-save',
    categoryId: 'music-marketing',
    title: 'Pre-Save Campaigns That Convert',
    summary: 'Turn anticipation into day-one streams.',
    readMins: 4,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'A pre-save tells the streaming platforms that people care about your release before it drops. Day-one engagement is the single biggest signal for algorithmic playlists.',
      },
      { type: 'heading', text: 'How it works' },
      {
        type: 'list',
        items: [
          'Fans authorize the song to be added to their library automatically on release.',
          'The release lands in their New Music feed on day one.',
          'Concentrated first-day streams push you toward Release Radar and Discover Weekly.',
        ],
      },
      {
        type: 'callout',
        text: 'Run the pre-save for 2-3 weeks max. Longer and the urgency fades.',
      },
    ],
  },
  {
    id: 'copyright-basics',
    categoryId: 'copyright-publishing',
    title: 'Copyright: What You Actually Own',
    summary: 'Two copyrights live in every song. Know both.',
    readMins: 5,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'Every recorded song contains two separate copyrights. Confusing them is the most expensive mistake new artists make.',
      },
      { type: 'heading', text: 'The composition' },
      {
        type: 'paragraph',
        text: 'The underlying song — melody, lyrics, chords. Owned by the songwriter(s) and publisher. This generates performance and mechanical royalties.',
      },
      { type: 'heading', text: 'The master' },
      {
        type: 'paragraph',
        text: 'The specific recording of that song. Owned by whoever paid for the session (often a label, or you, if you self-funded). This generates sound-recording royalties.',
      },
      {
        type: 'callout',
        text: 'You own a copyright the moment you fix the work in a tangible form. Registration just gives you stronger legal standing and the right to statutory damages.',
      },
    ],
  },
  {
    id: 'pro-registration',
    categoryId: 'royalties-pros',
    title: 'Registering With a PRO',
    summary: 'ASCAP, BMI, or SESAC — and why you need one.',
    readMins: 4,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'A Performing Rights Organization collects performance royalties whenever your song is played publicly — on radio, in venues, on streaming, on TV. If you are not registered, that money goes uncollected.',
      },
      { type: 'heading', text: 'Pick one' },
      {
        type: 'list',
        items: [
          'ASCAP — free to join as a writer, member-owned.',
          'BMI — free for writers, the largest US PRO by catalog.',
          'SESAC / GMR — invitation only, more selective.',
        ],
      },
      {
        type: 'steps',
        items: [
          'Register as a writer with one PRO (never two).',
          'Register your songs in their catalog system.',
          'Add your splits with any co-writers before the song goes anywhere.',
        ],
      },
    ],
  },
  {
    id: 'spotify-pitch',
    categoryId: 'spotify-for-artists',
    title: 'Pitching Spotify Editorial',
    summary: 'The Spotify for Artists pitch, line by line.',
    readMins: 5,
    level: 'Intermediate',
    body: [
      {
        type: 'paragraph',
        text: 'Spotify gives you one editorial pitch per release. Editors read thousands. Specificity wins.',
      },
      { type: 'heading', text: 'What editors want' },
      {
        type: 'list',
        items: [
          'Genre and mood, tagged accurately — do not overreach.',
          'The story: what is this song about and why now?',
          'Any momentum: prior playlist adds, press, tour dates, a growing audience.',
        ],
      },
      {
        type: 'callout',
        text: 'Lead with the single most interesting fact about the song in the first sentence. Editors skim.',
      },
    ],
  },
  {
    id: 'curator-outreach',
    categoryId: 'playlist-promotion',
    title: 'Reaching Independent Curators',
    summary: 'Get on user playlists without spamming.',
    readMins: 4,
    level: 'Intermediate',
    body: [
      {
        type: 'paragraph',
        text: 'Independent playlist curators can drive real, sticky listeners — but only if your song actually fits. A targeted pitch beats a hundred blasts.',
      },
      {
        type: 'steps',
        items: [
          'Find playlists where your exact subgenre already lives.',
          'Personalize: name a track on their list yours sits next to.',
          'Send a private link, not a public one. Make it easy to say yes.',
          'Follow up once, politely, then move on.',
        ],
      },
    ],
  },
  {
    id: 'splits',
    categoryId: 'royalties-pros',
    title: 'Songwriter Splits Done Right',
    summary: 'Agree on splits before the session ends.',
    readMins: 4,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'The worst time to discuss who owns what is after a song is doing well. Settle splits in the room, in writing, the day you create it.',
      },
      {
        type: 'callout',
        text: 'A split sheet listing each contributor, their role, and their percentage — signed by everyone — prevents almost every publishing dispute.',
      },
      { type: 'heading', text: 'What counts' },
      {
        type: 'list',
        items: [
          'Melody and lyrics are the composition — that is what splits divide.',
          'Production can earn a share of the composition if it shaped the song.',
          'Master splits are separate and often negotiated differently.',
        ],
      },
    ],
  },
  {
    id: 'distribution',
    categoryId: 'music-distribution',
    title: 'Choosing a Distributor',
    summary: 'How your music actually gets onto Spotify.',
    readMins: 5,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'A distributor delivers your master to streaming platforms and collects your sound-recording royalties. They do not own your music — they take a fee or a cut.',
      },
      { type: 'heading', text: 'What to compare' },
      {
        type: 'list',
        items: [
          'Pricing: flat annual fee vs. percentage of royalties.',
          'Payout speed and minimum thresholds.',
          'Whether you keep 100% of your rights (you should).',
          'Extra tools: pre-saves, splits payment, publishing admin.',
        ],
      },
    ],
  },
  {
    id: 'mixing-checklist',
    categoryId: 'mixing-mastering',
    title: 'Pre-Master Mix Checklist',
    summary: 'Catch the issues mastering can not fix.',
    readMins: 4,
    level: 'Intermediate',
    body: [
      {
        type: 'paragraph',
        text: 'Mastering polishes a mix; it can not rescue a broken one. Run this checklist before you send anything off.',
      },
      {
        type: 'list',
        items: [
          'Leave headroom: peak around -6 dB, no clipping on the master bus.',
          'Check mono compatibility — most phone speakers are mono.',
          'Reference against two commercial tracks in your genre.',
          'Listen on at least three systems: headphones, monitors, phone.',
          'Mute everything and bring elements back in to check balance.',
        ],
      },
    ],
  },
  {
    id: 'loudness',
    categoryId: 'mixing-mastering',
    title: 'Loudness & Streaming Normalization',
    summary: 'Why louder is not better anymore.',
    readMins: 3,
    level: 'Advanced',
    body: [
      {
        type: 'paragraph',
        text: 'Streaming platforms normalize playback to a target loudness. Crushing your master to be as loud as possible just removes dynamics with no volume benefit.',
      },
      {
        type: 'callout',
        text: 'Spotify normalizes to roughly -14 LUFS. Aim there and let the dynamics breathe.',
      },
    ],
  },
  {
    id: 'visual-identity',
    categoryId: 'branding',
    title: 'Building a Visual Identity',
    summary: 'Look like the same artist everywhere.',
    readMins: 4,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'Consistency is what turns a name into a brand. Pick a small set of choices and repeat them everywhere until people recognize you on sight.',
      },
      {
        type: 'list',
        items: [
          'A two or three color palette you use on every cover.',
          'One or two fonts, used the same way every time.',
          'A consistent photo treatment or filter.',
          'A recognizable logo or wordmark.',
        ],
      },
    ],
  },
  {
    id: 'artist-bio',
    categoryId: 'branding',
    title: 'Writing an Artist Bio',
    summary: 'A bio that editors and fans both want to read.',
    readMins: 3,
    level: 'Beginner',
    body: [
      {
        type: 'paragraph',
        text: 'Your bio appears on Spotify, press kits, and playlist pitches. Write three versions: one line, one paragraph, and one page.',
      },
      {
        type: 'steps',
        items: [
          'Open with what makes you distinct, not where you were born.',
          'Include one concrete proof point: a number, a placement, a co-sign.',
          'Write in third person for press, first person for socials.',
          'End with what is next — the current release.',
        ],
      },
    ],
  },
]

export const glossary: GlossaryTerm[] = [
  { term: 'Master', definition: 'The specific recorded version of a song. Whoever owns the master controls and earns from that recording.', category: 'Rights' },
  { term: 'Composition', definition: 'The underlying song itself — melody and lyrics — separate from any one recording of it.', category: 'Rights' },
  { term: 'Mechanical Royalty', definition: 'Money owed to songwriters and publishers each time a composition is reproduced or streamed.', category: 'Royalties' },
  { term: 'Performance Royalty', definition: 'Money earned when a composition is performed or broadcast publicly, collected by a PRO.', category: 'Royalties' },
  { term: 'PRO', definition: 'Performing Rights Organization (ASCAP, BMI, SESAC) that collects performance royalties for songwriters.', category: 'Rights' },
  { term: 'Publishing', definition: 'The business of managing and monetizing the composition side of a song.', category: 'Rights' },
  { term: 'Split Sheet', definition: 'A signed document recording each contributor’s ownership percentage in a song.', category: 'Rights' },
  { term: 'Sync License', definition: 'Permission to pair a song with visual media — film, TV, ads, games.', category: 'Royalties' },
  { term: 'Distributor', definition: 'A service that delivers your recordings to streaming platforms and collects sound-recording royalties.', category: 'Distribution' },
  { term: 'DSP', definition: 'Digital Service Provider — a streaming platform such as Spotify, Apple Music, or Amazon Music.', category: 'Distribution' },
  { term: 'Pre-Save', definition: 'A campaign letting fans automatically add an upcoming release to their library on launch day.', category: 'Promotion' },
  { term: 'Editorial Playlist', definition: 'A playlist curated by a streaming platform’s own staff, like Spotify’s RapCaviar.', category: 'Promotion' },
  { term: 'Algorithmic Playlist', definition: 'A personalized playlist generated automatically, such as Discover Weekly or Release Radar.', category: 'Promotion' },
  { term: 'Metadata', definition: 'The text data attached to a release — title, credits, ISRC, genre — used to identify and route royalties.', category: 'Distribution' },
  { term: 'ISRC', definition: 'International Standard Recording Code — a unique ID for a specific recording.', category: 'Distribution' },
  { term: 'UPC', definition: 'Universal Product Code — a unique ID for a release (single, EP, or album) as a product.', category: 'Distribution' },
  { term: 'LUFS', definition: 'Loudness Units Full Scale — the standard measure of perceived loudness used by streaming normalization.', category: 'Production' },
  { term: 'Headroom', definition: 'The gap between your loudest peak and 0 dB, left so mastering has room to work.', category: 'Production' },
  { term: 'Advance', definition: 'Money paid upfront against future royalties, recouped before you earn further.', category: 'Business' },
  { term: 'Recoupment', definition: 'The process of a label earning back advances and costs from your royalties before paying you.', category: 'Business' },
  { term: '360 Deal', definition: 'A contract where a label takes a cut of multiple revenue streams — touring, merch, sync — not just recordings.', category: 'Business' },
  { term: 'Neighbouring Rights', definition: 'Royalties for performers and master owners when a recording is played publicly or broadcast.', category: 'Royalties' },
]

export const checklist: ChecklistSection[] = [
  {
    id: 1,
    title: '8 weeks out',
    items: [
      { id: 1, text: 'Final master approved and exported' },
      { id: 2, text: 'Cover artwork finalized (3000×3000, no logos)' },
      { id: 3, text: 'Metadata locked: title, features, credits, genre' },
    ],
  },
  {
    id: 2,
    title: '6 weeks out',
    items: [
      { id: 4, text: 'Uploaded to distributor' },
      { id: 5, text: 'Release date set' },
      { id: 6, text: 'Splits agreed and documented with collaborators' },
    ],
  },
  {
    id: 3,
    title: '4 weeks out',
    items: [
      { id: 7, text: 'Submitted to Spotify editorial via Spotify for Artists' },
      { id: 8, text: 'Registered the song with your PRO' },
      { id: 9, text: 'Started teasing on socials' },
    ],
  },
  {
    id: 4,
    title: '2 weeks out',
    items: [
      { id: 10, text: 'Pre-save campaign live' },
      { id: 11, text: 'Curators and press pitched' },
      { id: 12, text: 'Content scheduled for release week' },
    ],
  },
  {
    id: 5,
    title: 'Release week',
    items: [
      { id: 13, text: 'Final reminders posted' },
      { id: 14, text: 'Thanked early supporters and pre-savers' },
      { id: 15, text: 'Watching first-day data on Spotify for Artists' },
    ],
  },
]

// Per-category Q&A. Each entry is tied to a category by its id (slug) and
// shown at the bottom of that category's screen. Placeholder content only —
// real Q&A is managed via the Academy admin.
export const qa: QAItem[] = [
  {
    id: 1,
    categoryId: 'music-distribution',
    question: 'How long before release should I upload to my distributor?',
    answer: 'Aim for at least 3-4 weeks. That leaves time to submit your Spotify editorial pitch (which wants 7+ days lead) and to fix any metadata or artwork rejections before the date locks.',
  },
  {
    id: 2,
    categoryId: 'music-distribution',
    question: 'Do distributors take my rights?',
    answer: 'A reputable distributor delivers your music and collects royalties for a fee or a cut — it does not own your masters. If a service asks for ownership of your recordings, walk away.',
  },
  {
    id: 3,
    categoryId: 'royalties-pros',
    question: 'Can I join more than one PRO?',
    answer: 'No — register as a writer with a single PRO (ASCAP, BMI, or SESAC/GMR). Splitting your catalog across two makes collection messy and can leave royalties uncollected.',
  },
  {
    id: 4,
    categoryId: 'royalties-pros',
    question: 'What is the difference between a PRO and a publisher?',
    answer: 'A PRO collects performance royalties for the songwriter. A publisher administers the composition more broadly — pitching for sync, registering works globally, and collecting mechanicals. You can start with just a PRO.',
  },
  {
    id: 5,
    categoryId: 'copyright-publishing',
    question: 'Do I need to register my copyright to own it?',
    answer: 'You own the copyright the moment the work is fixed in a tangible form. Registration is not required for ownership, but it gives you stronger legal standing and the right to statutory damages.',
  },
  {
    id: 6,
    categoryId: 'spotify-for-artists',
    question: 'How many editorial pitches do I get per release?',
    answer: 'One pitch per unreleased track, through Spotify for Artists. Submit it the moment the release is uploaded — earlier pitches signal confidence and give editors more time.',
  },
]
