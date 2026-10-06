import { Section, type Tone } from '../components/Section'
import type { SectionConfig } from '../data/types'

type Props = Extract<SectionConfig, { kind: 'schedule' }> & { tone: Tone }

/** Class timetables, vaccination schedules, batches. A table from 640 px up, stacked cards on phones. */
export function Schedule({ id, title, intro, columns, rows, footnote, tone }: Props) {
  return (
    <Section id={id} tone={tone} title={title} intro={intro}>
      <ul className="grid gap-3 sm:hidden">
        {rows.map((r, i) => (
          <li key={i} className="card p-4" data-reveal>
            <p className="font-display text-lg text-ink">{r[0]}</p>
            <dl className="mt-2 grid gap-1.5">
              {r.slice(1).map((cell, j) => (
                <div key={j} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 text-[15px]">
                  <dt className="text-muted">{columns[j + 1]}</dt>
                  <dd className="text-ink">{cell}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div className="card hidden overflow-x-auto sm:block" data-reveal>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              {columns.map((c) => (
                <th key={c} scope="col" className="px-6 py-3 text-sm font-semibold text-muted">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-0">
                {r.map((cell, j) =>
                  j === 0 ? (
                    <th key={j} scope="row" className="px-6 py-3.5 font-semibold text-ink">
                      {cell}
                    </th>
                  ) : (
                    <td key={j} className="px-6 py-3.5 text-ink">
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && <p className="mt-4 text-sm text-muted">{footnote}</p>}
    </Section>
  )
}
