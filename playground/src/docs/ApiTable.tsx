export type ApiTableRow = {
  property: string;
  description: string;
  type: string;
  default?: string;
};

export function ApiTable({ rows }: { rows: ApiTableRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-surface-border">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-muted">
            <th className="px-4 py-3 font-semibold text-text">Property</th>
            <th className="px-4 py-3 font-semibold text-text">Description</th>
            <th className="px-4 py-3 font-semibold text-text">Type</th>
            <th className="px-4 py-3 font-semibold text-text">Default</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.property}
              className="border-b border-surface-border last:border-b-0"
            >
              <td className="px-4 py-3 align-top">
                <code className="text-primary">{row.property}</code>
              </td>
              <td className="px-4 py-3 align-top text-text-muted">
                {row.description}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="whitespace-pre-wrap text-xs text-text">
                  {row.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top">
                {row.default ? (
                  <code className="text-xs text-text-muted">{row.default}</code>
                ) : (
                  <span className="text-text-muted">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
