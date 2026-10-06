import { Link } from 'react-router'
import { BUSINESS_KEYS } from '../data/types'
import { hasPreset } from '../data/businesses'

/** Temporary index while the redesign is in progress. Replaced by the agency landing page. */
export default function Home() {
  return (
    <main className="min-h-svh bg-[#14121f] p-6 text-white sm:p-12">
      <h1 className="font-['Outfit',sans-serif] text-4xl font-bold">Kalvio Build: redesign preview</h1>
      <p className="mt-2 text-white/75">Sample sites built so far. The landing page comes last.</p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {BUSINESS_KEYS.filter(hasPreset).map((k) => (
          <li key={k}>
            <Link to={`/demo/${k}`} className="flex min-h-14 items-center rounded-xl bg-white/10 px-5 font-semibold hover:bg-white/15">
              /demo/{k}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
