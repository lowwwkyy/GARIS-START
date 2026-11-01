import { useEffect, useState } from 'react';
import { useViewportActivity } from '../hooks/useViewportActivity';
import './ProjectPreview.css';

function PreviewPlaceholder({ name, message, loading = false }) {
  return (
    <div className={`preview-placeholder ${loading ? 'is-loading' : ''}`} aria-hidden="true">
      <div className="preview-skeleton">
        <div className="preview-skeleton-bar" />
        <div className="preview-skeleton-title" />
        <div className="preview-skeleton-line" />
        <div className="preview-skeleton-line short" />
        <div className="preview-skeleton-button" />
      </div>
      <div className="relative text-center px-6">
        <p className="font-semibold text-white/80">{name}</p>
        <p className="mt-2 text-sm text-white/60">{message}</p>
      </div>
    </div>
  );
}

function LivePreview({ project, title, t }) {
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (status !== 'loading') return;
    // Cross-origin frames cannot expose their app's rendering state. Keep a
    // useful fallback and the card link available if loading takes too long.
    const timer = window.setTimeout(() => setStatus('slow'), 20000);
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <>
      {status !== 'ready' && (
        <PreviewPlaceholder
          name={project.name}
          message={status === 'loading' ? t.loadingPreview : t.previewUnavailable}
          loading={status === 'loading'}
        />
      )}
      <iframe
        src={project.url}
        title={title}
        sandbox="allow-scripts allow-same-origin"
        referrerPolicy="no-referrer"
        tabIndex={-1}
        aria-hidden="true"
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        className={`project-live-frame ${status === 'ready' ? 'is-ready' : ''}`}
      />
    </>
  );
}

export default function ProjectPreview({ project, title, t }) {
  const { ref, isActive } = useViewportActivity({ rootMargin: '160px', releaseDelay: 10000 });

  return (
    <div ref={ref} className="project-preview relative aspect-square overflow-hidden border-b border-white/10">
      {isActive ? (
        <LivePreview project={project} title={title} t={t} />
      ) : (
        <PreviewPlaceholder name={project.name} message={t.previewPending} />
      )}
    </div>
  );
}
