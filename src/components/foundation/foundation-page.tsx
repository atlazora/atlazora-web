type FoundationPageProps = {
  ariaLabel: string;
  title: string;
  body: string;
  localeLabel: string;
};

export function FoundationPage({ ariaLabel, title, body, localeLabel }: FoundationPageProps) {
  return (
    <main aria-label={ariaLabel}>
      <div className="shell">
        <p className="eyebrow">{localeLabel}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </main>
  );
}
