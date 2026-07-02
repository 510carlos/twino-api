export function Atmosphere() {
  return (
    <>
      <div className="film-grain" />
      <div className="vignette" />
      <div className="bg-sunburst-container" id="parallax-bg">
        <div className="bg-sunburst-parallax">
          <div className="bg-sunburst" aria-hidden="true" />
        </div>
      </div>
      <div className="bg-texture" aria-hidden="true" />
      <div className="side-fans" aria-hidden="true">
        {["fan-left", "fan-right"].map((className) => (
          <svg
            key={className}
            className={`fan ${className}`}
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="var(--gold-deep)" strokeWidth="1" fill="none" opacity="0.4">
              {[10, 30, 50, 70, 90].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="1000" />
              ))}
              {[100, 300, 500, 700, 900].map((y) => (
                <path key={y} d={`M0,${y} L50,${y + 50} L100,${y}`} />
              ))}
            </g>
          </svg>
        ))}
      </div>
    </>
  )
}
