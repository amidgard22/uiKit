import type { ReactNode } from 'react';
import {
  DOC_COMPONENTS,
  type DocComponentId,
  type DocSectionLink,
} from './registry';

function SideNavLink({
  href,
  active,
  disabled,
  children,
  onClick,
}: {
  href?: string;
  active?: boolean;
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (disabled) {
    return (
      <span className="block cursor-not-allowed px-3 py-1.5 text-sm text-text-muted/50">
        {children}
      </span>
    );
  }

  const className = [
    'block rounded-md px-3 py-1.5 text-sm transition-colors',
    active
      ? 'bg-primary/10 font-medium text-primary'
      : 'text-text-muted hover:bg-surface-muted hover:text-text',
  ].join(' ');

  if (onClick) {
    return (
      <button type="button" className={`w-full text-left ${className}`} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

function SideNavGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </p>
      <nav className="space-y-0.5">{children}</nav>
    </div>
  );
}

function DocSidebar({
  activeComponent,
  sections,
  onComponentChange,
}: {
  activeComponent: DocComponentId;
  sections: DocSectionLink[];
  onComponentChange: (id: DocComponentId) => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 overflow-y-auto border-r border-surface-border bg-surface px-4 py-8 xl:block">
      <SideNavGroup title="Компоненты">
        {DOC_COMPONENTS.map((item) => (
          <SideNavLink
            key={item.id}
            active={item.id === activeComponent}
            disabled={!item.available}
            onClick={
              item.available ? () => onComponentChange(item.id) : undefined
            }
          >
            {item.label}
            {!item.available && (
              <span className="ml-1 text-xs text-text-muted/50">скоро</span>
            )}
          </SideNavLink>
        ))}
      </SideNavGroup>

      {sections.length > 0 && (
        <div className="mt-8">
          <SideNavGroup title="На этой странице">
            {sections.map((section) => (
              <SideNavLink
                key={section.id}
                href={`#${section.id}`}
              >
                {section.title}
              </SideNavLink>
            ))}
          </SideNavGroup>
        </div>
      )}
    </aside>
  );
}

export function DocLayout({
  activeComponent,
  onComponentChange,
  sections,
  children,
}: {
  activeComponent: DocComponentId;
  onComponentChange: (id: DocComponentId) => void;
  sections: DocSectionLink[];
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface-muted font-sans text-text">
      <div className="border-b border-surface-border bg-surface px-4 py-3 xl:hidden">
        <label className="sr-only" htmlFor="doc-component-select">
          Компонент
        </label>
        <select
          id="doc-component-select"
          value={activeComponent}
          onChange={(event) =>
            onComponentChange(event.target.value as DocComponentId)
          }
          className="w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm"
        >
          {DOC_COMPONENTS.filter((item) => item.available).map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
        {sections.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 text-sm">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="shrink-0 rounded-full border border-surface-border px-3 py-1 text-text-muted hover:text-text"
              >
                {section.title}
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto flex max-w-7xl">
        <DocSidebar
          activeComponent={activeComponent}
          sections={sections}
          onComponentChange={onComponentChange}
        />
        <main className="min-w-0 flex-1 px-6 py-12 lg:max-w-3xl lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
