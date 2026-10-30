export default {
  meta: {
    home: { title: null, desc: 'Tutorista matches students in Lahore with tested, verified one-to-one tutors for O and A Levels, Matric, FSc and entry tests, at fair fees.' },
    how: { title: 'How it works', desc: 'How Tutorista works: the request process, the five checks every tutor passes, subjects, fees and FAQs.' },
    about: { title: 'About us', desc: 'Why Tutorista exists: merit-first tutoring in Lahore, quality teaching at a fair price, and the team behind it.' },
    contact: { title: 'Request a tutor', tutorTitle: 'Apply to teach', desc: 'Tell us what you need and we will reply with tested tutors who fit your subject, level and schedule.' },
    privacy: { title: 'Privacy policy', desc: 'What Tutorista collects, why, and how to ask us to delete it.' },
    notFound: { title: 'Page not found' },
  },

  nav: {
    main: 'Main', subjects: 'Subjects', how: 'How it works', about: 'About', teach: 'Teach with us', find: 'Find a tutor',
    search: 'Search subjects', searchLabel: 'Search subjects and pages', searchHint: 'Try “physics”, “MDCAT” or “fees”',
    noResults: 'Nothing matched. Ask us anyway, we may still have a tutor.', groupSubjects: 'Subjects', groupPages: 'Pages',
    openMenu: 'Open menu', closeMenu: 'Close menu', language: 'Language', seeAll: 'See every subject', close: 'Close',
  },

  levels: {
    cambridge: { label: 'O & A Levels', blurb: 'Cambridge, paper by paper' },
    board: { label: 'Matric & FSc', blurb: 'Punjab and Federal Board' },
    entry: { label: 'Entry tests', blurb: 'MDCAT, ECAT, NET and SAT' },
    language: { label: 'Language & skills', blurb: 'IELTS, speaking and writing' },
    university: 'University',
    other: 'Other',
  },

  dock: { find: 'Find a tutor', top: 'Back to top' },
  video: { pause: 'Pause video', play: 'Play video' },

  home: {
    hero: {
      eyebrow: 'One-to-one tutoring in Lahore',
      titleStart: 'Great teachers,',
      titleMark: 'fair fees',
      lead: 'Every Tutorista tutor is tested in their subject and verified before they teach. You pay for their skill, not an agency’s cut.',
      notes: ['Free to request', 'Pay per lesson', 'No contract'],
      badge: 'Tested and verified',
      card: { label: 'New request', subject: 'O Level Physics', detail: 'Online · Tue & Thu evenings' },
      videoAlt: 'A student studying on her laptop',
    },
    marquee: 'We prepare students for',
    promise: {
      eyebrow: 'Merit first',
      title: 'Who teaches you should depend on how well they teach',
      body: 'Not on who they know, and not on what an agency charges. That is the whole idea.',
      points: [
        { title: 'Tested, then trusted', desc: 'A subject test, an interview and a trial lesson come before any student.' },
        { title: 'Fees you can see', desc: 'The tutor’s rate is shown before you book. Nothing is added for students.' },
        { title: 'Good teaching rises', desc: 'Tutors are recommended for how well and how reliably they teach, never for paying more.' },
      ],
      videoAlt: 'A teacher taking a class in a Pakistani college',
      link: 'How we check tutors',
    },
    finder: { title: 'What are you studying?', sub: 'Pick a subject and we’ll start your request with it filled in.', other: 'Something else' },
    steps: {
      eyebrow: 'How it works',
      title: 'From request to first lesson',
      items: [
        { title: 'Tell us what you need', desc: 'Subject, level, goals and the times that suit you.' },
        { title: 'Choose your tutor', desc: 'We send tested tutors who teach your syllabus, with their rates.' },
        { title: 'Start learning', desc: 'Book one lesson or a weekly slot. You pay per lesson.' },
      ],
      link: 'See the full process',
    },
    compare: {
      eyebrow: 'Why a tutor',
      title: 'Recorded lectures are a start. A teacher who knows you is better',
      recorded: { title: 'Recorded course', points: ['The same video for every student', 'Questions wait for a forum reply', 'You keep yourself on track'] },
      tutor: { title: 'Your Tutorista tutor', points: ['Lessons built around your syllabus and weak spots', 'Ask the moment you are stuck', 'Someone notices when you fall behind'] },
      cta: 'Find your tutor',
    },
    paths: {
      eyebrow: 'Two ways in',
      title: 'Looking for a tutor, or are you one?',
      learn: { title: 'Students and parents', points: ['Tutors matched to your board and syllabus', 'See the rate before you book', 'Online, or at home in Lahore'], cta: 'Request a tutor' },
      teach: { title: 'Tutors', points: ['Keep 85% of what you charge', 'Set your own rate and hours', 'Students come to you, no chasing'], cta: 'Apply to teach' },
    },
    cta: { title: 'Tell us what you’re studying', body: 'It takes two minutes. We reply by email with tutors who fit.', button: 'Start a request' },
  },

  how: {
    hero: {
      eyebrow: 'How it works',
      titleStart: 'Simple to start,',
      titleMark: 'easy to stop',
      lead: 'No sign-up fee, no package, no contract. Tell us what you need, we find tutors who fit, and you pay only for the lessons you take.',
      toc: { process: 'Process', checks: 'Tutor checks', subjects: 'Subjects', pricing: 'Fees', faq: 'FAQs' },
      tocLabel: 'On this page',
    },
    process: {
      title: 'The process',
      lead: 'Most of it happens over email. You never pay before you have chosen a tutor.',
      cta: 'Start a request',
      steps: [
        { title: 'Send a request', desc: 'Subject, level, board, goals and when you are free. Parents can request for a child, students for themselves.' },
        { title: 'Get a shortlist', desc: 'We reply with tested tutors who teach that syllabus and have time for you, each with their rate.' },
        { title: 'Book a first lesson', desc: 'Pick one and book a single lesson. If it clicks, set up a regular slot. If not, we suggest someone else.' },
        { title: 'Keep going at your pace', desc: 'Single lessons before an exam or a weekly slot all year. You pay for the lessons you take.' },
      ],
    },
    formats: {
      title: 'Two ways to learn',
      online: { title: 'Online', desc: 'Live video lessons from home or a hostel room. Good for late evenings, and when the best tutor lives across town.' },
      home: { title: 'At home', desc: 'The tutor comes to you, anywhere in Lahore our tutors cover. Good for younger students and parents who like to be close.' },
      onlineAlt: 'A student in a video lesson on his laptop',
      homeAlt: 'A young student writing in his notebook',
    },
    checks: {
      eyebrow: 'Tutor checks',
      title: 'Five checks before anyone teaches',
      lead: 'The same steps for every tutor, whatever their degree or who they know.',
      items: [
        { title: 'Identity', desc: 'CNIC checked against the person who turns up to teach.' },
        { title: 'Qualifications', desc: 'Degrees and certificates verified, not taken on trust.' },
        { title: 'Subject test', desc: 'A written test in every subject and level they want to teach.' },
        { title: 'Interview', desc: 'We look at how clearly they explain, not only what they know.' },
        { title: 'Trial lesson', desc: 'A supervised lesson with a real student before they go live.' },
      ],
      cta: 'Apply to teach',
    },
    subjects: { title: 'Subjects', lead: 'Pick one to start a request. Don’t see yours? Ask anyway.' },
    pricing: {
      title: 'What it costs',
      lead: 'One rule: the rate you see is the rate you pay.',
      students: { who: 'Students and parents', amount: 'Free', unit: 'to request and to book', points: ['Pay the tutor’s listed lesson rate', 'No booking fee, no markup', 'EasyPaisa, JazzCash, card or bank transfer'], cta: 'Request a tutor' },
      tutors: { who: 'Tutors', amount: '15%', unit: 'service fee per lesson', points: ['Keep 85% of your rate', 'Set your own rate and hours', 'No fee to apply'], cta: 'Apply to teach' },
    },
    faq: {
      title: 'Questions parents ask',
      lead: 'Something else on your mind?',
      link: 'Ask us directly',
      items: [
        { q: 'How much does a tutor cost?', a: 'Tutors set their own rates based on experience, subject and level. You see the rate before you book and nothing is added on top. Tutors pay a 15% service fee from their earnings.' },
        { q: 'Do I have to commit to a number of lessons?', a: 'No. Book one lesson before an exam, a weekly slot for the year, or anything in between. Stop whenever you like.' },
        { q: 'Are lessons online or at home?', a: 'Both. Online works anywhere with a stable connection. Home lessons are available across Lahore, depending on which tutors cover your area.' },
        { q: 'How do I pay?', a: 'EasyPaisa, JazzCash, debit or credit card, or bank transfer. You pay per lesson.' },
        { q: 'What if the tutor isn’t the right fit?', a: 'Tell us after any lesson and we will suggest another tutor. Finding the right person sometimes takes a second try.' },
        { q: 'Can I teach with Tutorista?', a: 'Yes, if you pass the five checks. Apply through the form and choose “I want to teach”.' },
      ],
    },
  },

  about: {
    hero: {
      eyebrow: 'About Tutorista',
      titleStart: 'A good teacher shouldn’t depend on',
      titleMark: 'who you know',
      p1: 'Most families find tutors through a cousin, a neighbour or an agency. Word of mouth is hit and miss, and agencies often take a large cut while telling parents little about who is teaching.',
      p2: 'Tutorista puts merit first. Every tutor is tested and verified, fees are shown up front, and a tutor’s reputation is built on how well they teach.',
    },
    story: {
      eyebrow: 'What we want',
      title: 'Quality teaching at a price families can manage',
      body: 'Good teaching in Lahore is often priced for a few. We think a student in Johar Town deserves the same quality of teacher as one in DHA, without paying for an agency in between.',
      alt: 'Students listening in a classroom',
    },
    principles: {
      title: 'What we hold ourselves to',
      items: [
        { title: 'Merit decides who rises', desc: 'Tutors are recommended for how well they teach and how reliably they show up.' },
        { title: 'Checked, every time', desc: 'The same five checks for every tutor, whoever they are.' },
        { title: 'Made for Pakistani syllabuses', desc: 'Cambridge, Punjab and Federal Board, and the entry tests that come after.' },
        { title: 'Prices in the open', desc: 'Families see the tutor’s rate. Tutors know exactly what we keep.' },
      ],
    },
    team: {
      eyebrow: 'The team',
      title: 'The people building Tutorista',
      members: {
        eshaal: { role: 'Chief Executive Officer', focus: 'Keeps the focus on families and tutors.' },
        asad: { role: 'Chief Technology Officer', focus: 'Builds matching, booking and payments.' },
        ali: { role: 'Head of Growth', focus: 'Works with schools and communities across Punjab.' },
        eesha: { role: 'Head of Operations', focus: 'Runs the tutor checks and keeps them consistent.' },
      },
    },
    cta: { title: 'Teach with us, or work with us', lead: 'Tutors can apply through our form. For partnerships or anything else, write to us and a founder will reply.', teach: 'Apply to teach', touch: 'Get in touch' },
  },

  contact: {
    eyebrow: { learner: 'Request a tutor', tutor: 'Apply to teach', other: 'Contact us' },
    title: { learner: 'Tell us what you need', tutor: 'Tell us what you teach', other: 'Write to us' },
    lead: { learner: 'A few details now saves a lot of back and forth later.', tutor: 'We will reply with the next step in our checks.', other: 'We read every message and reply by email.' },
    roles: { parent: 'I’m a parent', student: 'I’m a student', tutor: 'I want to teach', other: 'Something else' },
    who: 'Who is this for?',
    labels: {
      nameParent: 'Your name', name: 'Name', email: 'Email', level: 'Level', levelPlaceholder: 'Choose a level', subject: 'Subject',
      format: 'Where should lessons happen?', formats: { online: 'Online', home: 'At home', either: 'Either' },
      area: 'Area in Lahore', areaPh: 'e.g. Johar Town', phone: 'Phone or WhatsApp', optional: 'optional',
      teaches: 'Subjects and levels you teach', teachesPh: 'e.g. A Level Chemistry, FSc Biology', qualifications: 'Highest qualification',
      message: 'Message', anything: 'Anything else?', messagePh: 'Exam date, topics you are stuck on, days and times that suit you',
    },
    submit: { learner: 'Send request', tutor: 'Send application', other: 'Send message' },
    next: {
      one: ['You send this form.', 'It opens as an email from your own address.'],
      twoLearner: ['We reply by email', 'with tutors who fit, and their rates.'],
      twoTutor: ['We reply by email', 'to arrange your subject test and interview.'],
      three: ['You decide.', 'Nothing is booked or charged until you say so.'],
    },
    preferEmail: 'Prefer plain email?',
    privacy: 'How we use your details',
    sent: { title: 'Your email is ready to send', body: 'Your email app should have opened with everything filled in. Press send there and we’ll take it from here.', fallback: 'If nothing opened, copy this and email it to', edit: 'Edit my details' },
  },

  privacy: {
    title: 'Privacy policy',
    updated: 'Last updated 30 October 2026',
    sections: [
      { h: 'What we collect', p: 'When you send our form, your own email app sends us what you typed: your name and email, and if you add them, your phone number, area, subject and message. This website does not store those details, does not use tracking cookies and does not run analytics.' },
      { h: 'Why we use it', p: 'Only to reply to you, find suitable tutors and arrange lessons. We never sell your details. We share them only with the tutor you choose, and only what they need to teach you.' },
      { h: 'How long we keep it', p: 'We keep your emails while we are helping you, and delete them when you ask.' },
      { h: 'Your choices', p: 'You can ask to see, correct or delete your details at any time. Email us at the address below.' },
      { h: 'Your language setting', p: 'If you change the site language, we remember it in your own browser. It is never sent to us.' },
    ],
    contact: 'Questions about privacy:',
  },

  footer: {
    tagline: 'Tested tutors, fair fees. One-to-one tutoring in Lahore.',
    menu: 'Menu',
    contact: 'Contact us',
    social: 'Follow us',
    links: { home: 'Home', how: 'How it works', subjects: 'Subjects', pricing: 'Fees', faq: 'FAQs', about: 'About us', request: 'Request a tutor', teach: 'Apply to teach', privacy: 'Privacy policy' },
    email: 'Email',
    place: 'Lahore, Pakistan',
    rights: 'All rights reserved. Exam board names and logos belong to their owners.',
  },

  notFound: { title: 'We couldn’t find that page', body: 'It may have moved. Try the home page or start a tutor request.', home: 'Go home' },
}
