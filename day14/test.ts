function detectCycle(cycleCandidates: number[]): {
  length: number;
  values: number[];
} {
  var biggestCycle = 0;
  var cycleFirst = cycleCandidates[0];
  var cycleStart = 0;
  var current: number;
  for (let i = 1; i < cycleCandidates.length; i++) {
    current = cycleCandidates[i];
    if (current == cycleFirst) {
      biggestCycle = Math.max(i - cycleStart, biggestCycle);
      cycleStart = i;
    }
  }

  return {
    length: biggestCycle,
    values: cycleCandidates.slice(0, biggestCycle),
  };
}

console.log(
  detectCycle([
    64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69,
    69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63,
    68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64,
    65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69,
    65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68, 69, 69, 65, 64, 65, 63, 68,
    69, 69, 65, 64, 65,
  ])
);
