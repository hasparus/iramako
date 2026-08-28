/**
 * Polish typography: a one-letter word (a, i, o, u, w, z) must not be left
 * hanging at the end of a line — glue it to the word that follows with a
 * non-breaking space.
 */
export const noOrphans = (text: string) =>
  text.replace(/(^|[\s(„"])([aiouwzAIOUWZ]) /g, "$1$2\u00A0");
