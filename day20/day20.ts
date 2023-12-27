import * as readline from "readline";
import * as fs from "fs";

enum Pulse {
  HIGH,
  LOW,
}

abstract class Module {
  abstract getKey(): string;
  abstract getDestinations(): string[];
  abstract releaseOutput(modules: Map<string, Module>): void;
  abstract calculateOutput(key: string, pulse: Pulse): void;
}

class FlipFLop extends Module {
  isOn: boolean;
  key: string;
  destinationKeys: string[];
  output: Pulse | undefined;

  constructor(key: string, destinationKeys: string[]) {
    super();
    this.isOn = false;
    this.key = key;
    this.destinationKeys = destinationKeys;
  }

  override getDestinations(): string[] {
    return this.destinationKeys;
  }

  override getKey(): string {
    return this.key;
  }

  override releaseOutput(modules: Map<string, Module>): void {
    if (this.output) {
      Array.from(modules.entries()).forEach((moduleEntry) => {
        if (this.destinationKeys.includes(moduleEntry[0])) {
          moduleEntry[1].calculateOutput(moduleEntry[0], this.output!);
        }
      });
    }
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

  override getDestinations(): string[] {
    return this.destinatonModuleKeys;
  }

  addConnectedModule(connectedModuleKey: string) {
    this.connectedModuleKeys.push(connectedModuleKey);
    this.mostRecentPulseForModule.set(connectedModuleKey, Pulse.LOW);
  }

  override getKey(): string {
    return this.key;
  }

  override releaseOutput(modules: Map<string, Module>): void {
    this.destinatonModuleKeys.forEach((moduleKey) => {
      const module = modules.get(moduleKey)!;
      module.calculateOutput(moduleKey, this.output, modules);
    });
  }

  override calculateOutput(moduleKey: string, input: Pulse) {
    this.mostRecentPulseForModule.set(moduleKey, input);

    if (
      Array.from(this.mostRecentPulseForModule.values()).every(
        (pulse) => pulse == Pulse.HIGH
      )
    ) {
      this.output = Pulse.LOW;
    } else {
      this.output = Pulse.HIGH;
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

  override getDestinations(): string[] {
    return this.destinationKeys;
  }

  override getKey(): string {
    return this.key;
  }

  override releaseOutput(modules: Map<string, Module>): void {
    this.destinationKeys.forEach((moduleKey) => {
      const module = modules.get(moduleKey)!;
      module.calculateOutput(moduleKey, this.output);
    });
  }

  override calculateOutput(key: string, input: Pulse) {
    this.output = input;
  }
}

function pushTheButton(modules: Map<string, Module>) {
  var destinations: Module[];
  destinations = modules
    .get("broadcaster")!
    .calculateOutput("broadcaster", Pulse.LOW);

  while (destinations.length > 0) {
    const newDestinations: Module[] = [];
    destinations.forEach((destination) => {
      newDestinations.pushAll(destination.calculateOutput());
      destination.releaseOutput(modules);
    });
    destinations = newDestinations;
  }
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
      modules.set("broadcast", new Broadcast("broadcast", destinations));
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
      if (destinationModule instanceof Conjunction) {
        (destinationModule as Conjunction).addConnectedModule(module.getKey());
      }
    });
  });

  console.log(modules);
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
