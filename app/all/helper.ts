import spacetime from "spacetime"

// Group time zones by whole-hour UTC offsets, excluding fractional offsets
export const groupTimeZonesByWholeHours = () => {
  const allTimeZones = spacetime().timezones
  const groupedTimeZones = {}

  Object.keys(allTimeZones).forEach((zone) => {
    const offset = allTimeZones[zone].offset

    // Ensure the offset is a whole number and only include one zone per offset
    if (Number.isInteger(offset) && !groupedTimeZones[offset]) {
      groupedTimeZones[offset] = zone
    }
  })

  return groupedTimeZones
}

// Select the most popular time zone for each whole-hour offset, limited to 24
export const selectPopularTimeZonesForWholeHours = (groupedTimeZones) => {
  const sortedOffsets = Object.keys(groupedTimeZones)
    .map((offset) => parseInt(offset, 10))
    .sort((a, b) => a - b)

  return sortedOffsets.slice(0, 24).map((offset) => ({
    zone: groupedTimeZones[offset],
    offset,
  }))
}
