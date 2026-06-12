import type { ReactNode } from 'react';

export function DocHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-12 border-b border-surface-border pb-8">
      <p className="mb-2 text-sm font-medium text-primary">@uikit/react</p>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-3 max-w-2xl text-text-muted">{description}</p>
    </header>
  );
}

export function DocSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-text-muted">{description}</p>
      )}
      <div className="mt-4 rounded-lg border border-surface-border bg-surface p-6">
        {children}
      </div>
    </section>
  );
}

export function DocApiSection({
  id,
  componentName,
  children,
  note,
}: {
  id: string;
  componentName: string;
  children: ReactNode;
  note?: string;
}) {
  return (
    <section id={id} className="mb-12 scroll-mt-24">
      <h2 className="text-2xl font-semibold">API</h2>
      <h3 className="mt-6 text-base font-semibold">{componentName}</h3>
      {note && <p className="mt-2 text-sm text-text-muted">{note}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function DocRow({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
          {label}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function DocDivider() {
  return <div className="my-5 border-t border-surface-border" />;
}
