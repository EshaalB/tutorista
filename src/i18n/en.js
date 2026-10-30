export default {
  meta: {
    home: { title: null, desc: 'Tutorista finds you a tested, verified one-to-one tutor in Lahore for O and A Levels, Matric, FSc and entry tests. Fees shown upfront, pay per lesson.' },
    how: { title: 'How it works', desc: 'How Tutorista works: sending a request, the five checks every tutor passes, subjects, fees and common questions.' },
    about: { title: 'About us', desc: 'Why Tutorista exists: tutors chosen on merit, quality teaching at a fair price, and the team behind it.' },
    contact: { title: 'Request a tutor', tutorTitle: 'Apply to teach', desc: 'Tell us what you need and we will reply with tested tutors who fit your subject, level and schedule.' },
    privacy: { title: 'Privacy policy', desc: 'What Tutorista collects, why, and how to ask us to delete it.' },
    terms: { title: 'Terms of service', desc: 'The terms for using Tutorista as a student, parent or tutor.' },
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
    entry: { label: 'Entry tests', blurb: 'MDCAT, ECAT, NET, SAT and more' },
    language: { label: 'Language & skills', blurb: 'IELTS, speaking and writing' },
    university: 'University',
    other: 'Other',
  },

  dock: { find: 'Find a tutor', top: 'Back to top' },
  video: { pause: 'Pause video', play: 'Play video' },

  a11y: {
    open: 'Reading and accessibility options',
    title: 'Make reading easier',
    text: 'Text size',
    sizes: { base: 'Normal', lg: 'Large', xl: 'Larger' },
    contrast: 'Stronger contrast', contrastHint: 'Easier to read outdoors or on a dim screen',
    readable: 'Simpler font', readableHint: 'Plain letters with more spacing',
    links: 'Underline links', linksHint: 'Makes every link easy to spot',
    motion: 'Lite mode', motionHint: 'Stops animation and video, and saves mobile data',
    read: 'Read this page aloud', stop: 'Stop reading', readHint: 'Uses your device’s own voice',
    noVoice: 'Your device has no voice for this language',
    reset: 'Reset', close: 'Close',
  },

  home: {
    hero: {
      titleA: 'Every tutor tested.',
      titleB: 'Every fee upfront.',
      lead: 'Tutorista finds you a one-to-one tutor in Lahore for O and A Levels, Matric, FSc and entry tests. Online or at home, and you only pay for the lessons you take.',
      picker: { need: 'I need help with', for: 'for', subject: 'Subject', level: 'Level', anySubject: 'any subject', anyLevel: 'any level', go: 'Find a tutor' },
      secondary: 'How we choose tutors',
      note: 'acha ustaad, munasib fees',
      caption: 'Online, or at home anywhere in Lahore',
      videoAlt: 'A student studying on her laptop',
      photoAlt: 'A teacher with students in a classroom',
    },
    statement: {
      kicker: 'Merit before marketing',
      before: 'We don’t take tutors on trust. Each one passes a subject test, an interview and a trial lesson before meeting a student. Then you see their fee before you book, with',
      em: 'nothing added',
      after: '.',
    },
    checks: {
      kicker: 'How a tutor gets on Tutorista',
      title: 'Five checks. No shortcuts, no',
      titleEm: 'sifarish',
      videoAlt: 'A teacher taking a class in a Pakistani college',
      link: 'Read the full process',
    },
    compare: {
      kicker: 'Why a tutor',
      title: 'Recorded lectures help. A teacher who knows you helps more',
      cols: { situation: 'Situation', recorded: 'Recorded course', tutor: 'Your Tutorista tutor' },
      rows: [
        ['When you get stuck', 'Post in a forum and wait', 'Ask right then'],
        ['The pace', 'The same video for everyone', 'Set by you and your tutor'],
        ['Your weak spots', 'You find them yourself', 'Your tutor finds them with you'],
        ['Falling behind', 'Nobody notices', 'Someone notices, and says so'],
      ],
      cta: 'Find your tutor',
    },
    marquee: 'Boards and entry tests our students prepare for',
    marqueeNote: 'Tutorista is not affiliated with these institutions.',
    fees: {
      kicker: 'Fees',
      title: 'Fair for families, fair for tutors',
      items: [
        { num: 'Rs 0', label: 'to send a request or book a tutor' },
        { num: '1 lesson', label: 'is the most you ever commit to' },
        { num: '85%', label: 'of every fee goes to the tutor' },
      ],
      link: 'See how fees work',
    },
    paths: {
      learn: { kicker: 'For parents and students', title: 'Tell us the subject, the board and the exam date', body: 'We send tutors who teach exactly that, with their rates. You pick one, book a lesson, and carry on only if it works.', cta: 'Request a tutor', alt: 'A young student writing in his notebook' },
      teach: { kicker: 'For tutors', title: 'Good at explaining? Get paid fairly for it', body: 'Set your own rate and hours, keep 85%, and get students who need your subject. You will pass our checks first.', cta: 'Apply to teach', alt: 'A tutor writing notes' },
    },
    cta: { aside: 'Chalein, shuru karein?', title: 'Tell us what you’re studying', body: 'Two minutes now. We reply by email with tutors who fit.', button: 'Start a request' },
  },

  how: {
    hero: {
      kicker: 'How it works',
      titleA: 'Simple to start,',
      titleB: 'easy to stop',
      lead: 'No sign-up fee, no package, no contract. Tell us what you need, we find tutors who fit, and you pay only for the lessons you take.',
      toc: { process: 'Process', checks: 'Tutor checks', subjects: 'Subjects', pricing: 'Fees', faq: 'Questions' },
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
        { title: 'Keep going at your pace', desc: 'A few lessons before an exam or a weekly slot all year. You pay for the lessons you take.' },
      ],
    },
    formats: {
      title: 'Online, or at your kitchen table',
      online: { title: 'Online', desc: 'Live video lessons from home or a hostel room. Good for late evenings, and when the right tutor lives across town.' },
      home: { title: 'At home', desc: 'The tutor comes to you, anywhere in Lahore our tutors cover. Good for younger students and parents who like to be close.' },
      onlineAlt: 'A student taking notes during an online lesson',
      homeAlt: 'A young student writing in his notebook',
    },
    checks: {
      kicker: 'Tutor checks',
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
      lead: 'Koi aur sawal?',
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
      kicker: 'About Tutorista',
      titleA: 'A good teacher shouldn’t depend on',
      titleB: 'who you know',
      p1: 'Most families find tutors through a cousin, a neighbour or an agency. Word of mouth is hit and miss, and agencies often take a large cut while telling parents little about who is teaching.',
      p2: 'Tutorista puts merit first. Every tutor is tested and verified, fees are shown upfront, and a tutor’s reputation is built on how well they teach.',
    },
    story: {
      kicker: 'What we want',
      title: 'Quality teaching at a price families can manage',
      body: 'Good teaching in Lahore is often priced for a few. A student in Johar Town deserves the same quality of teacher as one in DHA, without paying for an agency in between.',
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
      kicker: 'The team',
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
    kicker: { learner: 'Request a tutor', tutor: 'Apply to teach', other: 'Contact us' },
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
    follow: 'Follow us',
    sent: { title: 'Shukriya! Your email is ready to send', body: 'Your email app should have opened with everything filled in. Press send there and we’ll take it from here.', fallback: 'If nothing opened, copy this and email it to', edit: 'Edit my details' },
  },

  privacy: {
    title: 'Privacy policy',
    updated: 'Last updated 30 October 2026',
    sections: [
      { h: 'What we collect', p: 'When you send our form, your own email app sends us what you typed: your name and email, and if you add them, your phone number, area, subject and message. This website does not store those details, does not use tracking cookies and does not run analytics.' },
      { h: 'Why we use it', p: 'Only to reply to you, find suitable tutors and arrange lessons. We never sell your details. We share them only with the tutor you choose, and only what they need to teach you.' },
      { h: 'How long we keep it', p: 'We keep your emails while we are helping you, and delete them when you ask.' },
      { h: 'Your choices', p: 'You can ask to see, correct or delete your details at any time. Email us at the address below.' },
      { h: 'Settings on this device', p: 'Your language and reading preferences are saved in your own browser. They are never sent to us.' },
    ],
    contact: 'Questions about privacy:',
  },

  terms: {
    title: 'Terms of service',
    updated: 'Last updated 30 October 2026',
    sections: [
      { h: 'What Tutorista does', p: 'Tutorista introduces students and parents to independent tutors who have passed our checks. Lessons are given by the tutor, not by Tutorista.' },
      { h: 'Requests and bookings', p: 'Sending a request is free and does not commit you to anything. A booking is made only when you confirm a lesson with a tutor.' },
      { h: 'Fees', p: 'Students pay the tutor’s listed rate per lesson, with nothing added by Tutorista. Tutors pay Tutorista a 15% service fee on each lesson.' },
      { h: 'Cancelling', p: 'You can stop at any time. There is no contract and no minimum number of lessons.' },
      { h: 'Tutor conduct', p: 'Tutors agree to teach honestly, arrive on time and treat students with respect. Tell us about any problem and we will act on it.' },
      { h: 'Changes', p: 'We may update these terms. The date at the top shows the latest version.' },
    ],
    contact: 'Questions about these terms:',
  },

  footer: {
    tagline: 'Tested tutors, fair fees. One-to-one tutoring in Lahore.',
    menu: 'Menu',
    contact: 'Contact us',
    social: 'Follow us',
    links: { home: 'Home', how: 'How it works', subjects: 'Subjects', pricing: 'Fees', faq: 'Questions', about: 'About us', request: 'Request a tutor', teach: 'Apply to teach', privacy: 'Privacy policy', terms: 'Terms of service' },
    place: 'Lahore, Pakistan',
    rights: 'All rights reserved. Exam board and university names and logos belong to their owners.',
  },

  notFound: { title: 'Oho, we couldn’t find that page', body: 'It may have moved. Try the home page or start a tutor request.', home: 'Go home' },
}
