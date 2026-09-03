import { Button, Surface } from "@/components/ui";

type FoundationPageProps = {
  ariaLabel: string;
  title: string;
  body: string;
  localeLabel: string;
  actionLabel: string;
};

export function FoundationPage({
  ariaLabel,
  title,
  body,
  localeLabel,
  actionLabel,
}: FoundationPageProps) {
  return (
    <main className="atlazora-foundation" aria-label={ariaLabel}>
      <Surface className="atlazora-foundation__content">
        <p className="atlazora-eyebrow">{localeLabel}</p>
        <h1>{title}</h1>
        <p>{body}</p>
        <div className="atlazora-foundation__actions">
          <Button>{actionLabel}</Button>
        </div>
      </Surface>
    </main>
  );
}
