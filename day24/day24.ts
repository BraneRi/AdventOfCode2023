import * as fs from "fs";
import * as readline from "readline";

const INPUT_REGEX =
  /(\d+),\s*(\d+),\s*(\d+)\s*@\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)/;

type Point = {
  x: number;
  y: number;
  z: number;
};

type Line = {
  point: Point;
  velocity: Point;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  // Hailstone position and velocity at time = 0
  const hailstones: Line[] = [];
  for await (const line of rl) {
    const match = line.match(INPUT_REGEX);

    if (match) {
      // velocities represent change in axis each NANOSECOND
      const [_, px, py, pz, vx, vy, vz] = match;
      hailstones.push({
        point: { x: parseInt(px), y: parseInt(py), z: parseInt(pz) },
        velocity: {
          x: parseInt(vx),
          y: parseInt(vy),
          z: parseInt(vz),
        },
      });
    }
  }

  solve(hailstones.slice(0, 3));
}

// Usage: node build/your-script.js your-text-file.txt
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error("Usage: node build/your-script.js your-text-file.txt");
  process.exit(1);
}

const filePath = args[0];

processFile(filePath)
  .then(() => console.log("File processing completed."))
  .catch((error) => console.error("Error:", error));

async function solve(hailstones: Line[]) {
  const { init, killThreads } = require("z3-solver");
  const api = await init();
  const { Solver, Real } = new api.Context("main");
  type R = typeof Real;

  const solver = new Solver();

  const px = Real.const("px");
  const py = Real.const("py");
  const pz = Real.const("pz");
  const vx = Real.const("vx");
  const vy = Real.const("vy");
  const vz = Real.const("vz");

  for (let i = 0; i < hailstones.length; i++) {
    const t = Real.const(`t${i + 1}`);

    const hp = hailstones[i].point;
    const hv = hailstones[i].velocity;

    const hpx = Real.val(hp.x);
    const hpy = Real.val(hp.y);
    const hpz = Real.val(hp.z);

    const hvx = Real.val(hv.x);
    const hvy = Real.val(hv.y);
    const hvz = Real.val(hv.z);
    solver.add(
      px.eq(hpx.add(hvx.mul(t)).sub(vx.mul(t))),
      py.eq(hpy.add(hvy.mul(t)).sub(vy.mul(t))),
      pz.eq(hpz.add(hvz.mul(t)).sub(vz.mul(t)))
    );
  }

  const result = await solver.check();
  if (result === "sat") {
    const model = solver.model();
    console.log(`px: ${model.get(px)}`);
    console.log(`py: ${model.get(py)}`);
    console.log(`pz: ${model.get(pz)}`);
    console.log(`vx: ${model.get(vx)}`);
    console.log(`vy: ${model.get(vy)}`);
    console.log(`vz: ${model.get(vz)}`);

    const sum =
      Number.parseInt(model.get(px)) +
      Number.parseInt(model.get(py)) +
      Number.parseInt(model.get(pz));

    console.log("Sum of coordinates: ", sum);
  } else {
    console.log("No solution found.");
  }

  api.em.PThread.terminateAllThreads();
}
