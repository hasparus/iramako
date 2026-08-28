/**
 * Polish typography: a one-letter word (a, i, o, u, w, z) must not be left
 * hanging at the end of a line — glue it to the word that follows with a
 * non-breaking space.
 */
export const noOrphans = (text: string) =>
  // lookbehind, not a capture: the delimiter must stay unconsumed so runs of
  // one-letter words ("a i o czymś") all get glued, not every other one
  text.replace(/(?<=^|[\s(„"])([aiouwzAIOUWZ]) /g, "$1\u00A0");
