export const en = {
  sectionKeys: ['ABOUT', 'WORK', 'PROJECTS', 'CONTACT', 'CV'],
  sectionLabels: {
    ABOUT: 'ABOUT',
    WORK: 'WORK',
    PROJECTS: 'PROJECTS',
    CONTACT: 'CONTACT',
    CV: 'CV',
  },
  commands: {
    about: 'About me',
    projects: 'My side-projects',
    work: 'Work experience',
    contact: 'Contact info',
    cv: 'Download CV',
    hide: 'Hide terminal',
  },
  about: {
    title: "Hi there, i'm Maxi!",
    lines: [
      '> This is my personal website, where you can find information about my professional work, side-projects, and how to get in touch with me.',
      "> I'm a Software Engineer based in Argentina with 2+ years of experience building and maintaining software systems.",
      '> I specialize in backend development using Rust, Go, and Java, and I also have frontend experience with Svelte and React.',
      "> I've worked on Web3 infrastructure, server-side platforms, and distributed systems, contributing to system design and taking features from idea to implementation, as well as participating in planning and code reviews.",
    ],
  },
  work: {
    title: 'WORK',
    items: [
      {
        role: 'Rust Engineer',
        company: 'Fermah',
        companyUrl: 'https://fermah.xyz',
        period: 'dec. 2025 – present',
        description:
          'Working on a Rust-based blockchain oracle system, contributing to off-chain workflow execution, OCI/gVisor-based sandboxed containers, and integration with EVM smart contracts.',
      },
      {
        role: 'Co-Founder & Software Engineer',
        company: 'Caelum',
        companyUrl: 'https://caelum.dev',
        period: 'nov. 2025 – present',
        description:
          'Co-founded a software development company delivering tailored SaaS solutions for businesses by designing and building backend systems, multi-tenant architectures, and production deployments.',
      },
    ],
  },
  projects: {
    title: 'PROJECTS',
    items: [
      {
        name: 'Peernet',
        url: 'https://github.com/maxipriani/peernet',
        description:
          'Modular peer-to-peer network node built on libp2p. Nodes discover each other via mDNS, store distributed key-value data through Kademlia DHT, and broadcast messages using Gossipsub. The network layer runs as an async actor behind typed command/event channels.',
        tags: ['Rust'],
      },
      {
        name: 'rs-market',
        url: 'https://github.com/maxipriani/rs-market',
        description: 'Rust-based gift card marketplace.',
        tags: ['Rust'],
      },
      {
        name: 'Volcano',
        url: 'https://github.com/maxipriani/volcano',
        description:
          'External ESP for CS2 leveraging the WinAPI and Steam handle hijacking to perform cross-process memory reads, with offsets fetched at runtime, API-based authentication, and an ImGui overlay.',
        tags: ['C++', 'Go'],
      },
    ],
  },
  contact: {
    title: 'CONTACT',
  },
  cv: {
    title: 'CV',
    downloadText: '[ DOWNLOAD CV ]',
  },
  errorNotFound: 'Command not found:',
  errorHint: "Type 'help' for available commands",
  inputPlaceholder: "'help' for commands...",
  clickToShow: '[ SHOW TERMINAL ]',
};
