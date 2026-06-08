// Bundled, offline-first content for Poseidon Academy.
// V1 ships placeholder lessons modeled on the website's resource topics.
// The team will replace `lessons` / `glossary` with their curated material —
// the shapes below are the contract the UI renders against.

export type Block =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string }
  | { type: 'steps'; items: string[] }

export interface Lesson {
  id: string
  categoryId: string
  title: string
  summary: string
  readMins: number
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  body: Block[]
}

export interface Category {
  id: string
  name: string
  blurb: string
  // lucide-react icon name, resolved in the UI
  icon: string
}

export interface GlossaryTerm {
  term: string
  definition: string
  category: string
}

export const categories: Category[] = [
  {
    id: 'release',
    name: 'Releasing Music',
    blurb: 'Plan a release that actually gets heard.',
    icon: 'Rocket',
  },
  {
    id: 'rights',
    name: 'Rights & Royalties',
    blurb: 'Own your work and collect every dollar.',
    icon: 'Scale',
  },
  {
    id: 'promotion',
    name: 'Promotion',
    blurb: 'Playlists, press, and building an audience.',
    icon: 'Megaphone',
  },
  {
    id: 'money',
    name: 'The Business',
    blurb: 'Deals, splits, and getting paid.',
    icon: 'DollarSign',
  },
  {
    id: 'production',
    name: 'Production & Mixing',
    blurb: 'Get your tracks release-ready.',
    icon: 'SlidersVertical',
  },
  {
    id: 'brand',
    name: 'Brand & Identity',
    blurb: 'Stand out and stay consistent.',
    icon: 'Sparkles',
  },
]

export const lessons: Lesson[] = [
  {
    id: 'release-timeline',
    categoryId: 'release',
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
    categoryId: 'release',
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
    categoryId: 'rights',
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
    categoryId: 'rights',
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
    categoryId: 'promotion',
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
    categoryId: 'promotion',
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
    categoryId: 'money',
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
    categoryId: 'money',
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
    categoryId: 'production',
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
    categoryId: 'production',
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
    categoryId: 'brand',
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
    categoryId: 'brand',
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
