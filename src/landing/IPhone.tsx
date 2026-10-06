import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  /** Colour behind the status bar: Safari tints it with the top of the page. */
  top: string
  topDark: boolean
  /** Colour of the minimised Safari address bar: taken from the bottom of the page. */
  bottom: string
  bottomDark: boolean
  domain: string
}

function Signal() {
  return (
    <svg viewBox="0 0 18 12" aria-hidden="true">
      <rect x="0" y="8" width="3" height="4" rx="1" fill="currentColor" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" fill="currentColor" />
      <rect x="10" y="3" width="3" height="9" rx="1" fill="currentColor" />
      <rect x="15" y="0" width="3" height="12" rx="1" fill="currentColor" />
    </svg>
  )
}

function Wifi() {
  return (
    <svg viewBox="0 0 16 12" aria-hidden="true">
      <path fill="currentColor" d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.2A10.2 10.2 0 0 0 8 .5C5.2.5 2.6 1.6.8 3.4L2 4.6a8.5 8.5 0 0 1 6-2.4Z" />
      <path fill="currentColor" d="M8 5.6c1.4 0 2.6.5 3.6 1.4l1.2-1.2A6.8 6.8 0 0 0 8 3.9c-1.8 0-3.5.7-4.8 1.9L4.4 7c1-.9 2.2-1.4 3.6-1.4Z" />
      <path fill="currentColor" d="M8 9a1.6 1.6 0 0 1 1.2.5L8 11.6 6.8 9.5A1.6 1.6 0 0 1 8 9Z" />
    </svg>
  )
}

function Battery() {
  return (
    <svg viewBox="0 0 27 13" aria-hidden="true">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.8" fill="none" stroke="currentColor" strokeOpacity="0.4" />
      <rect x="2" y="2" width="16" height="9" rx="2.5" fill="currentColor" />
      <path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2Z" fill="currentColor" fillOpacity="0.45" />
    </svg>
  )
}

/**
 * An iPhone 15 Pro drawn in CSS (sizes in iPhone points, scaled with container units: see .iphone in app.css).
 * The website sits in Safari's visible area, between the status bar and the minimised address bar,
 * exactly where it would be on a real phone, so nothing is clipped by the rounded corners.
 */
export function IPhone({ children, top, topDark, bottom, bottomDark, domain }: Props) {
  return (
    <div className="iphone">
      <div className="iphone-device">
        <span aria-hidden="true" className="iphone-btn iphone-btn-action" />
        <span aria-hidden="true" className="iphone-btn iphone-btn-vol-up" />
        <span aria-hidden="true" className="iphone-btn iphone-btn-vol-down" />
        <span aria-hidden="true" className="iphone-btn iphone-btn-power" />
        <div className="iphone-bezel" aria-hidden="true" />
        <div className="iphone-screen">
          <div aria-hidden="true" className="iphone-status" style={{ backgroundColor: top, color: topDark ? '#fff' : '#000' }}>
            <span className="iphone-time">9:41</span>
            <span className="iphone-status-icons">
              <Signal />
              <Wifi />
              <Battery />
            </span>
          </div>
          <div aria-hidden="true" className="iphone-island" />
          <div className="iphone-content">{children}</div>
          <div
            aria-hidden="true"
            className="iphone-safari"
            style={{ backgroundColor: bottom, color: bottomDark ? 'rgb(255 255 255 / 0.85)' : 'rgb(0 0 0 / 0.8)' }}
          >
            <svg viewBox="0 0 10 12" className="iphone-lock">
              <path
                fill="currentColor"
                d="M2 5V3.6a3 3 0 0 1 6 0V5h.3c.9 0 1.7.8 1.7 1.7v3.6c0 .9-.8 1.7-1.7 1.7H1.7C.8 12 0 11.2 0 10.3V6.7C0 5.8.8 5 1.7 5H2Zm1.4 0h3.2V3.6a1.6 1.6 0 0 0-3.2 0V5Z"
              />
            </svg>
            {domain}
          </div>
          <div aria-hidden="true" className="iphone-home" style={{ backgroundColor: bottomDark ? '#fff' : '#000' }} />
          <div aria-hidden="true" className="iphone-glare" />
        </div>
      </div>
    </div>
  )
}
