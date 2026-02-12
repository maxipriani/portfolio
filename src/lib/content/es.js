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
      '> Soy Software Engineer con más de 2 años de experiencia trabajando en backend. En paralelo, estudio Ingeniería en Sistemas en la UTN FRBA.',
      '> Mi stack principal es: Rust, Go y Java en backend; ocasionalmente frontend con Svelte o React.',
      '> Trabajé en Web3 infrastructure, server-side services y sistemas distribuidos, desarrollando features end-to-end, desde diseño hasta producción.',
    ],
  },
  work: {
    title: 'EXPERIENCIA',
    items: [
      {
        role: 'Rust Engineer',
        company: 'Fermah',
        companyUrl: 'https://fermah.xyz',
        period: 'dic. 2025 – actualidad',
        description:
          'Trabajo en Fermah como Rust Engineer, desarrollando un oracle server que ejecuta workflows off-chain de forma sandboxed (OCI/gVisor), a partir de eventos on-chain, y devuelve los resultados a smart contracts en EVM.',
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
        name: 'Peernet',
        url: 'https://github.com/maxipriani/peernet',
        description:
          'Nodo peer-to-peer modular construido sobre libp2p. Los nodos se descubren entre sí vía mDNS, almacenan datos distribuidos key-value mediante una Kademlia DHT y difunden mensajes usando Gossipsub (pub/sub). La capa de red corre como un async actor y se expone a través de typed command/event channels.',
        tags: ['Rust'],
      },
      {
        name: 'rs-market',
        url: 'https://github.com/maxipriani/rs-market',
        description: 'Marketplace de gift cards 100% en Rust.',
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
