import { useLanguage } from '../hooks/useLanguage';
import translations from '../translations';
import ProjectPreview from './ProjectPreview';

const projects = [
  {
    id: 'cultivator',
    name: 'Cultivatortech.com',
    url: 'https://cultivatortech.com/',
    previewKey: 'previewAlt',
  },
  {
    id: 'okky-portfolio',
    name: 'Okkysr.me',
    url: 'https://www.okkysr.me/',
    previewKey: 'portfolioPreviewAlt',
  },
];

const Projects = () => {
  const { language } = useLanguage();
  const t = translations.projects[language];

  return (
    <section id="projects" className="py-20 px-5 sm:px-6 lg:px-8" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto">
        <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-center mb-16 text-electric-blue fade-in-up">
          {t.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="min-w-0 fade-in-up">
              <a
                href={project.url}
                aria-labelledby={`${project.id}-project-name`}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electric-blue motion-reduce:transform-none motion-reduce:transition-none"
              >
                <ProjectPreview project={project} title={t[project.previewKey]} t={t} />
                <div className="flex items-center justify-center px-4 py-4">
                  <h3 id={`${project.id}-project-name`} className="text-xl lg:text-2xl font-semibold text-white">
                    {project.name}
                  </h3>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
