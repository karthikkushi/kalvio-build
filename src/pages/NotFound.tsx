import { useEffect } from 'react'
import { Link } from 'react-router'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found | Kalvio Build'
  }, [])
  return (
    <main className="grid min-h-svh place-items-center bg-[#14121f] p-6 text-center text-white">
      <div>
        <p className="text-sm font-semibold tracking-[0.12em] text-[#c9c3ff] uppercase">Page not found</p>
        <h1 className="mt-3 font-['Outfit',sans-serif] text-4xl font-bold">This sample doesn’t exist yet.</h1>
        <Link to="/" className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-white px-6 font-semibold text-[#14121f]">
          See all samples
        </Link>
      </div>
    </main>
  )
}
