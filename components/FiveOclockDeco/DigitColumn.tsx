import type { RefObject } from "react"

type DigitColumnProps = {
  digitRef: RefObject<HTMLDivElement | null>
}

export function DigitColumn({ digitRef }: DigitColumnProps) {
  return (
    <div className="digit-window">
      <div className="digit-col" ref={digitRef}>
        {Array.from({ length: 10 }, (_, n) => (
          <div className="digit-num" key={n}>
            {n}
          </div>
        ))}
      </div>
    </div>
  )
}
