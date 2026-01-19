export const es = {
  sectionKeys: ['ABOUT', 'WORK', 'PROJECTS', 'CONTACT', 'CV'],
  sectionLabels: {
    ABOUT: 'SOBRE MÍ',
    WORK: 'EXPERIENCIA',
    PROJECTS: 'PROYECTOS',
    CONTACT: 'CONTACTO',
    CV: 'CV',
  },
  commands: {
    about: 'Sobre mí',
    projects: 'Mis proyectos personales',
    work: 'Experiencia laboral',
    contact: 'Datos de contacto',
    cv: 'Descargar CV',
    hide: 'Ocultar terminal',
  },
  about: {
    title: 'Hola, soy Maxi!',
    lines: [
      '> Esta es mi web personal: acá podés ver mi experiencia profesional, mis proyectos personales y cómo contactarme.',
      '> Soy software developer con más de 2 años de experiencia trabajando en backend. En paralelo, estudio Ingeniería en Sistemas en la UTN FRBA.',
      '> Mi stack principal es Rust | Go | Java para backend, y ocasionalmente frontend con Svelte y React.',
      '> Trabajé en sistemas relacionados con blockchain, servicios server-side y web platforms, desarrollando features end-to-end, desde diseño hasta producción.',
    ],
  },
  work: {
    title: 'EXPERIENCIA',
    items: [
      {
        role: 'Software Developer',
        company: 'Fermah',
        companyUrl: 'https://fermah.xyz',
        period: 'dic. 2025 – actualidad',
        description:
          'Trabajo en Fermah como software developer, desarrollando en Rust un oracle server que ejecuta workflows off-chain de forma sandboxed (OCI/gVisor), a partir de eventos on-chain, y devuelve los resultados a smart contracts en EVM.',
      },
      {
        role: 'Co-Founder & Software Engineer',
        company: 'Caelum',
        companyUrl: 'https://caelum.dev',
        period: 'nov. 2025 – actualidad',
        description:
          'Soy Co-Founder de una software factory enfocada en SaaS a medida para empresas,  donde desarrollo sistemas backend, arquitecturas multi-tenant y deployments a producción.',
      },
    ],
  },
  projects: {
    title: 'PROYECTOS',
    items: [
      {
        name: 'The Hive',
        url: 'https://github.com/maxipriani/the-hive',
        description:
          'Nodo modular P2P "Layer 0" hecho en Rust, basado en Tokio Actors y un IPC in-memory propio para coordinar networking async con libp2p; usa Gossipsub para message propagation y Kademlia DHT para peer discovery descentralizado.',
        tags: ['Rust'],
      },
      {
        name: 'Volcano',
        url: 'https://github.com/maxipriani/volcano',
        description:
          'External ESP para CS2: WinAPI + Steam handle hijacking para cross-process memory reads; offsets fetched en runtime, auth via API y un overlay con ImGui.',
        tags: ['C++', 'Go'],
      },
    ],
  },
  contact: {
    title: 'CONTACTO',
  },
  cv: {
    title: 'CV',
    downloadText: '[ DESCARGAR CV ]',
  },
  errorNotFound: 'Comando no encontrado:',
  errorHint: "Escribí 'help' para ver los comandos",
  inputPlaceholder: "'help' para comandos…",
  clickToShow: '[ MOSTRAR TERMINAL ]',
};
