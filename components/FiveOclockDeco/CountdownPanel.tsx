import type { RefObject } from "react"
import { DigitColumn } from "./DigitColumn"
import type { DigitRefs } from "./types"

type CountdownPanelProps = {
  cityName: string
  digitRefs: DigitRefs
  timerRef: RefObject<HTMLDivElement | null>
}

export function CountdownPanel({ cityName, digitRefs, timerRef }: CountdownPanelProps) {
  return (
    <div className="deco-panel panel-countdown" aria-label={`Countdown to 5 o'clock in ${cityName}`}>
      <div className="panel-label">COUNTDOWN</div>
      <div className="countdown-time solid-gold-text" id="timer" ref={timerRef} aria-hidden="true">
        <DigitColumn digitRef={digitRefs.m1} />
        <DigitColumn digitRef={digitRefs.m2} />
        <span className="colon">:</span>
        <DigitColumn digitRef={digitRefs.s1} />
        <DigitColumn digitRef={digitRefs.s2} />
      </div>
      <div className="countdown-divider" />
      <div className="countdown-caption">until 5 o&apos;clock in {cityName}</div>
    </div>
  )
}
