/**
 * Fuzzy Menu Item Search Filter
 * Implements modified Smith-Waterman character match scoring
 * for responsive instant menu dish filtering.
 */

export function fuzzySearch(items, query, key = "title") {
  if (!query || query.trim() === "") return items;

  const q = query.toLowerCase().trim();

  return items
    .map((item) => {
      const target = String(item[key] || "").toLowerCase();
      let score = 0;
      let qIdx = 0;

      for (let i = 0; i < target.length && qIdx < q.length; i++) {
        if (target[i] === q[qIdx]) {
          score += 10;
          // Consecutive character bonus
          if (i > 0 && target[i - 1] === q[qIdx - 1]) {
            score += 15;
          }
          qIdx++;
        }
      }

      const matched = qIdx === q.length;
      return { item, score, matched };
    })
    .filter((res) => res.matched)
    .sort((a, b) => b.score - a.score)
    .map((res) => res.item);
}
