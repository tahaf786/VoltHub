import { Section, SectionHeading } from "@/components/shared/section";

/**
 * Temporary section stub so nav anchors resolve during feat/shell. Each of
 * these is replaced by its real implementation on its own feature branch
 * (catalog, skin-designer, reservation). See HANDOFF.md.
 */
export function PlaceholderSection({
  id,
  eyebrow,
  title,
  description,
  branch,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  branch: string;
}) {
  return (
    <Section id={id}>
      <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      <div className="mt-8 rounded-2xl border border-dashed border-line-strong bg-surface/40 p-8 text-sm text-muted">
        Coming next in{" "}
        <code className="rounded bg-surface-2 px-1.5 py-0.5 text-foreground">
          {branch}
        </code>
        .
      </div>
    </Section>
  );
}
