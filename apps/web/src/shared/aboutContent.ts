export type BrandItem = {
  name: string;
  slug?: string;
  color?: string;
  iconUrl?: string;
};

export const ABOUT = {
  eyebrow: 'Sobre mí',
  title: 'Ingeniero de sistemas y builder de software',
  introLead: 'Cuento con experiencia',
  introRest:
    'como desarrollador web y con una base sólida en análisis de datos. Diseño y construyo productos reales mientras avanzo hacia una consultoría de software, con foco en inteligencia artificial aplicada.',
  blocks: [
    {
      id: '01',
      title: 'Como profesional',
      body: 'He desarrollado con PHP, Flutter, Python (Flask), HTML y CSS. Uso Bizagi y UML (Rational Rose) para modelado de diagramas, Power BI para análisis, y PostgreSQL / MySQL (Workbench) para datos. También tengo experiencia en hardware, redes y servidores con SSH.',
    },
    {
      id: '02',
      title: 'Agentes e IA',
      body: 'Creo agentes con LangGraph y entornos propios de generación de código. En el día a día trabajo con Cursor, Windsurf, Copilot, OpenCode y Claude para acelerar el desarrollo con calidad.',
    },
    {
      id: '03',
      title: 'Como persona',
      body: 'Me apasionan los viajes, los animales y los autos: manejar es uno de mis pasatiempos favoritos. Practico fútbol y natación, disfruto los videojuegos y siempre estoy aprendiendo nuevas tecnologías de IA.',
    },
  ],
  stack: [
    { name: 'PHP', slug: 'php', color: '777BB4' },
    { name: 'Flutter', slug: 'flutter', color: '02569B' },
    { name: 'Python', slug: 'python', color: '3776AB' },
    { name: 'Flask', slug: 'flask', color: '94A3B8' },
    { name: 'HTML5', slug: 'html5', color: 'E34F26' },
    { name: 'CSS3', iconUrl: '/icons/css3.svg' },
    { name: 'JavaScript', slug: 'javascript', color: 'F7DF1E' },
    { name: 'TypeScript', slug: 'typescript', color: '3178C6' },
    { name: 'PostgreSQL', slug: 'postgresql', color: '4169E1' },
    { name: 'MySQL', slug: 'mysql', color: '4479A1' },
    { name: 'Power BI', iconUrl: '/icons/powerbi.svg' },
    { name: 'Bizagi', color: '38BDF8' },
    { name: 'UML / Rose', color: '38BDF8' },
    { name: 'SSH', slug: 'gnometerminal', color: '38BDF8' },
    { name: 'Redes', slug: 'cisco', color: '1BA0D7' },
    { name: 'Hardware', slug: 'intel', color: '0071C5' },
  ] satisfies BrandItem[],
  aiTools: [
    { name: 'LangGraph', slug: 'langchain', color: '1C3C3C' },
    { name: 'Cursor', slug: 'cursor', color: 'FFFFFF' },
    { name: 'Windsurf', color: '38BDF8' },
    { name: 'Copilot', slug: 'githubcopilot', color: 'FFFFFF' },
    { name: 'Claude', slug: 'anthropic', color: 'D4A27F' },
    { name: 'OpenCode', color: '38BDF8' },
  ] satisfies BrandItem[],
  interests: [
    { name: 'Viajes', detail: 'Explorar lugares nuevos', icon: 'travel' },
    { name: 'Animales', detail: 'Respeto y compañía', icon: 'paw' },
    { name: 'Autos', detail: 'Manejar como hobby', icon: 'car' },
    { name: 'Fútbol', detail: 'Deporte en equipo', icon: 'ball' },
    { name: 'Natación', detail: 'Constancia y energía', icon: 'swim' },
    { name: 'Videojuegos', detail: 'Estrategia y diversión', icon: 'game' },
    { name: 'Inteligencia Artificial', detail: 'Aprender sin parar', icon: 'ai' },
  ] as const,
} as const;
