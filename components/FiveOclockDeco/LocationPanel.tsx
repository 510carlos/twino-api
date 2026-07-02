import type { LocationDetails } from "./types"

type LocationPanelProps = {
  location: LocationDetails
}

export function LocationPanel({ location }: LocationPanelProps) {
  return (
    <div className="deco-panel panel-location">
      <div className="panel-label">LOCATION</div>
      <div className="pin-icon" aria-hidden="true">
        <svg className="pin-shape" viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M50,130 C50,130 0,80 0,50 C0,22.4 22.4,0 50,0 C77.6,0 100,22.4 100,50 C100,80 50,130 50,130 Z"
            fill="var(--green-darkest)"
            stroke="var(--gold)"
            strokeWidth="4"
          />
        </svg>
        <img className="pin-flag" src={`/flags/${location.iso}.svg`} alt="" />
      </div>
      <div className="location-text metallic-text">{location.city.toUpperCase()}</div>
    </div>
  )
}
