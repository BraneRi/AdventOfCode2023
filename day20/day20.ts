import * as readline from "readline";
import * as fs from "fs";

enum Pulse {
  HIGH = 1,
  LOW = 0,
}

abstract class Module {
  abstract getKey(): string;
  abstract getDestinations(): string[];
  abstract calculateOutput(key: string, pulse: Pulse): void;
  abstract getOutput(): Pulse | undefined;
  abstract addParentModule(connectedModuleKey: string): void;
  abstract getParents(): string[];
}

class FlipFLop extends Module {
  isOn: boolean;
  key: string;
  destinationKeys: string[];
  output: Pulse | undefined;
  parentModules: string[];

  constructor(key: string, destinationKeys: string[]) {
    super();
    this.isOn = false;
    this.key = key;
    this.destinationKeys = destinationKeys;
    this.parentModules = [];
  }

  override getParents(): string[] {
    return this.parentModules;
  }

  override addParentModule(connectedModuleKey: string) {
    this.parentModules.push(connectedModuleKey);
  }

  override getDestinations(): string[] {
    return this.destinationKeys;
  }

  override getKey(): string {
    return this.key;
  }

  override getOutput(): Pulse | undefined {
    return this.output;
  }

  override calculateOutput(key: string, input: Pulse) {
    switch (input) {
      case Pulse.HIGH: {
        this.output = undefined;
        break;
      }
      case Pulse.LOW: {
        switch (this.isOn) {
          case true: {
            this.isOn = false;
            this.output = Pulse.LOW;
            break;
          }

          case false: {
            this.isOn = true;
            this.output = Pulse.HIGH;
            break;
          }
        }
      }
    }
  }
}

class Conjunction extends Module {
  connectedModuleKeys: string[];
  destinatonModuleKeys: string[];
  mostRecentPulseForModule: Map<string, Pulse>;
  key: string;
  output: Pulse;

  constructor(key: string, destinatonModuleKeys: string[]) {
    super();
    this.key = key;
    this.connectedModuleKeys = [];
    this.destinatonModuleKeys = destinatonModuleKeys;
    this.mostRecentPulseForModule = new Map();
  }

  override getParents(): string[] {
    return this.connectedModuleKeys;
  }

  override getDestinations(): string[] {
    return this.destinatonModuleKeys;
  }

  override addParentModule(connectedModuleKey: string) {
    this.connectedModuleKeys.push(connectedModuleKey);
    this.mostRecentPulseForModule.set(connectedModuleKey, Pulse.LOW);
  }

  override getKey(): string {
    return this.key;
  }

  override getOutput(): Pulse | undefined {
    return this.output;
  }

  override calculateOutput(moduleKey: string, input: Pulse) {
    this.mostRecentPulseForModule.set(moduleKey, input);
    if (input == Pulse.LOW) {
      this.output = Pulse.HIGH;
      return;
    }

    if (
      Array.from(this.mostRecentPulseForModule.values()).find(
        (pulse) => pulse == Pulse.LOW
      ) != undefined
    ) {
      this.output = Pulse.HIGH;
    } else {
      this.output = Pulse.LOW;
    }
  }
}

class Broadcast extends Module {
  destinationKeys: string[];
  key: string;
  output: Pulse;

  constructor(key: string, destinationKeys: string[]) {
    super();
    this.destinationKeys = destinationKeys;
    this.key = key;
  }

  override getParents(): string[] {
    return [];
  }

  override addParentModule(connectedModuleKey: string): void {
    // button
  }

  override getDestinations(): string[] {
    return this.destinationKeys;
  }

  override getKey(): string {
    return this.key;
  }

  override getOutput(): Pulse | undefined {
    return this.output;
  }

  override calculateOutput(key: string, input: Pulse) {
    this.output = input;
  }
}

function pushTheButton(modules: Map<string, Module>): {
  low: number;
  high: number;
  rxIsLow: boolean;
} {
  var destinations: {
    key: string;
    input: Pulse | undefined;
    parentKey: string;
  }[] = [];
  const broadcast = modules.get("broadcaster")!;
  broadcast.calculateOutput("broadcaster", Pulse.LOW);
  broadcast.getDestinations().forEach((d) =>
    destinations.push({
      key: d,
      input: broadcast.getOutput(),
      parentKey: broadcast.getKey(),
    })
  );

  // we count initial low
  var lowCount = 1;
  var highCount = 0;
  while (destinations.length > 0) {
    const newDestinations: {
      key: string;
      input: Pulse | undefined;
      parentKey: string;
    }[] = [];
    // console.log(destinations);
    for (const destination of destinations) {
      if (destination.input != undefined) {
        destination.input == Pulse.LOW ? lowCount++ : highCount++;
      }

      // console.log(destination);
      const module = modules.get(destination.key);
      if (destination.input != undefined && module != undefined) {
        // console.log("SIG");
        // console.log(destination.key);
        // console.log(destination.input);
        module.calculateOutput(destination.parentKey, destination.input);
        // console.log(module.getDestinations());
        // console.log("--------");
        if (module.getOutput() != undefined) {
          module.getDestinations().forEach((d) =>
            newDestinations.push({
              key: d,
              input: module.getOutput(),
              parentKey: destination.key,
            })
          );
        }
      }
    }
    destinations = newDestinations;
    // console.log("end batch");
  }
  // console.log(lowCount);
  // console.log(highCount);
  return {
    low: lowCount,
    high: highCount,
    rxIsLow: modules.get("mf")?.getOutput() == Pulse.LOW,
  };
}

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const modules: Map<string, Module> = new Map();

  for await (const line of rl) {
    const destinationsLinePart = line.substring(line.indexOf(">") + 1).trim();
    const destinations = destinationsLinePart
      .split(",")
      .map((destination) => destination.trim());
    if (line.startsWith("broadcaster")) {
      modules.set("broadcaster", new Broadcast("broadcaster", destinations));
    } else if (line.startsWith("%")) {
      const key = line.substring(1, line.indexOf("-")).trim();
      modules.set(key, new FlipFLop(key, destinations));
    } else if (line.startsWith("&")) {
      const key = line.substring(1, line.indexOf("-")).trim();
      modules.set(key, new Conjunction(key, destinations));
    }
  }

  // fill conjunction modules connections
  Array.from(modules.values()).forEach((module) => {
    module.getDestinations().forEach((destination) => {
      const destinationModule = modules.get(destination)!;
      destinationModule?.addParentModule(module.getKey());
    });
  });

  // console.log(modules);
  // console.log();
  // console.log();
  // console.log();
  // console.log();

  // PART 1

  // var countLow = 0;
  // var countHigh = 0;
  // var result: { low: number; high: number };
  // for (let i = 0; i < 1000; i++) {
  //   result = pushTheButton(modules);
  //   countLow += result.low;
  //   countHigh += result.high;
  // }
  // console.log(countLow * countHigh);

  // PART 2
  // Mathematically easier to understand than in code
  const frequencies: Map<string, number> = new Map();
  pulseEveryNthTime("broadcaster", modules, 1, frequencies);
  console.log(frequencies.get("rx"));
}

function pulseEveryNthTime(
  moduleKey: string,
  modules: Map<string, Module>,
  frequency: number,
  frequencies: Map<string, number>
) {
  const currentModule = modules.get(moduleKey);
  if (currentModule == undefined) {
    console.log("reached RX");
    frequencies.set(moduleKey, frequency);
    return;
  }

  const destinations = currentModule.getDestinations();
  if (currentModule instanceof Broadcast) {
    frequencies.set(moduleKey, frequency);
    for (var dest of destinations) {
      pulseEveryNthTime(dest, modules, 1 * frequency, frequencies);
    }
  } else if (currentModule instanceof FlipFLop) {
    frequencies.set(moduleKey, frequency);
    for (var dest of destinations) {
      pulseEveryNthTime(dest, modules, 2 * frequency, frequencies);
    }
  } else if (currentModule instanceof Conjunction) {
    var conjunctionParentsProduct = 1;
    var flipFlopParentsSum = 0;

    for (const parent of currentModule.getParents()) {
      if (!frequencies.has(parent)) {
        // we have to cover all connected modules first
        return frequency;
      }
      if (modules.get(parent) instanceof FlipFLop)
        flipFlopParentsSum += frequencies.get(parent)!;
      if (modules.get(parent) instanceof Conjunction)
        conjunctionParentsProduct *= frequencies.get(parent)!;
    }

    const f = Math.max(flipFlopParentsSum, 1) * conjunctionParentsProduct;
    frequencies.set(moduleKey, f);
    for (const dest of destinations) {
      if (!frequencies.has(dest)) {
        // avoid going back to loop
        pulseEveryNthTime(dest, modules, f, frequencies);
      }
    }
  }
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
