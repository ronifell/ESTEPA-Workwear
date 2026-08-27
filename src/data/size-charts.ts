import type { ProductCategoryId } from "@/types";

/**
 * Body-measurement chart for industrial workwear, in centimetres.
 *
 * These ranges describe the wearer, not the cut of an ESTEPA garment.
 * Cut tables stay blank until the manufacturer supplies them.
 */

export const bodySizeOrder = ["S", "M", "L", "XL", "XXL", "XXXL"] as const;
export type BodySize = (typeof bodySizeOrder)[number];

export type BodyMeasureId = "chest" | "waist" | "hip" | "arm";

export interface SizeRange {
  readonly size: BodySize;
  readonly chest: readonly [number, number];
  readonly waist: readonly [number, number];
  readonly hip: readonly [number, number];
  readonly arm: number;
}

export const bodySizeChart: readonly SizeRange[] = [
  { size: "S", chest: [86, 94], waist: [74, 82], hip: [90, 98], arm: 82 },
  { size: "M", chest: [94, 102], waist: [82, 90], hip: [98, 106], arm: 84 },
  { size: "L", chest: [102, 110], waist: [90, 98], hip: [106, 114], arm: 86 },
  { size: "XL", chest: [110, 118], waist: [98, 106], hip: [114, 122], arm: 88 },
  { size: "XXL", chest: [118, 128], waist: [106, 116], hip: [122, 132], arm: 90 },
  { size: "XXXL", chest: [128, 140], waist: [116, 128], hip: [132, 144], arm: 92 },
];

export function measuresForCategory(category: ProductCategoryId): readonly BodyMeasureId[] {
  switch (category) {
    case "trousers":
      return ["waist", "hip"];
    case "vests":
      return ["chest", "waist", "hip"];
    case "coveralls":
      return ["chest", "waist", "hip", "arm"];
    default:
      return ["chest", "hip", "arm"];
  }
}

export interface BodyMeasurements {
  readonly chest?: number;
  readonly waist?: number;
  readonly hip?: number;
  readonly arm?: number;
}

export interface SizeRecommendation {
  readonly size: string;
  readonly confidence: "high" | "mid" | "low";
  readonly kind: "exact" | "between" | "off";
  readonly neighbor?: string;
}

function rangePenalty(value: number | undefined, range: readonly [number, number]): number {
  if (value === undefined) return 0;
  if (value < range[0]) return range[0] - value;
  if (value > range[1]) return value - range[1];
  return 0;
}

function sizeIndex(size: string): number {
  const index = bodySizeOrder.indexOf(size as BodySize);
  return index === -1 ? bodySizeOrder.length : index;
}

function nearestAvailable(size: string, available: readonly string[]): string | null {
  if (available.includes(size)) return size;
  const target = sizeIndex(size);
  let best: string | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const candidate of available) {
    const distance = Math.abs(sizeIndex(candidate) - target);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

/**
 * Picks the workwear size whose body ranges cover the entered measurements.
 * When a value sits on a boundary, the larger size wins (ease for movement
 * and layers). Penalties prefer the larger neighbour when two sizes tie.
 */
export function recommendSize(
  measurements: BodyMeasurements,
  category: ProductCategoryId,
  availableSizes: readonly string[] = bodySizeOrder,
): SizeRecommendation | null {
  const usable = bodySizeChart.filter((row) => availableSizes.includes(row.size));
  if (usable.length === 0) return null;

  const keys = measuresForCategory(category);
  const hasPrimary = keys.some((key) => typeof measurements[key] === "number");
  if (!hasPrimary) return null;

  const scored = usable.map((row) => {
    let penalty = 0;
    let hits = 0;
    let misses = 0;

    for (const key of keys) {
      const value = measurements[key];
      if (value === undefined) continue;
      if (key === "arm") {
        const delta = Math.abs(value - row.arm);
        if (delta <= 3) hits += 1;
        else {
          misses += 1;
          penalty += Math.max(0, delta - 3) * 0.6;
        }
        continue;
      }
      const range = row[key];
      const cost = rangePenalty(value, range);
      if (cost === 0) hits += 1;
      else {
        misses += 1;
        penalty += cost;
      }
    }

    return { row, penalty, hits, misses };
  });

  scored.sort((a, b) => {
    if (a.penalty !== b.penalty) return a.penalty - b.penalty;
    return sizeIndex(b.row.size) - sizeIndex(a.row.size);
  });

  const winner = scored[0];
  if (!winner) return null;

  const size = nearestAvailable(winner.row.size, availableSizes);
  if (!size) return null;

  const runner = scored[1];
  const closeSecond =
    runner && Math.abs(runner.penalty - winner.penalty) <= 2 && runner.row.size !== winner.row.size;

  if (winner.penalty === 0 && winner.misses === 0) {
    return { size, confidence: "high", kind: "exact" };
  }

  if (closeSecond) {
    const larger =
      sizeIndex(winner.row.size) >= sizeIndex(runner.row.size) ? winner.row.size : runner.row.size;
    const applied = nearestAvailable(larger, availableSizes) ?? size;
    return {
      size: applied,
      confidence: winner.penalty <= 4 ? "mid" : "low",
      kind: "between",
      neighbor: winner.row.size === applied ? runner.row.size : winner.row.size,
    };
  }

  return {
    size,
    confidence: winner.penalty <= 6 ? "mid" : "low",
    kind: "off",
  };
}

export function formatRange(range: readonly [number, number]): string {
  return `${range[0]}–${range[1]}`;
}
