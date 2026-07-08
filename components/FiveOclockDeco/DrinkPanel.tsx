import type { LocationDetails } from "./types"

type DrinkPanelProps = {
  location: LocationDetails
}

export function DrinkPanel({ location }: DrinkPanelProps) {
  return (
    <div className="deco-panel panel-drink">
      <div className="panel-label">LOCAL DRINK OF CHOICE</div>
      <div className="drink-info">
        <div className="drink-subtitle">Now pouring:</div>
        <div className="drink-title metallic-text">{location.drink.toUpperCase()}</div>
        <p className="drink-recipe">{location.recipe}</p>
      </div>
      <div className="drink-image-wrapper">
        <img src={location.image} alt={location.drink} />
      </div>
    </div>
  )
}
