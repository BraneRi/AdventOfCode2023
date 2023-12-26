import * as readline from "readline";
import * as fs from "fs";

enum Pulse {
  HIGH,
  LOW,
}

abstract class Module {
  abstract getKey(): string;
  abstract getDestinations(): string[];
  abstract process(
    key: string,
    pulse: Pulse,
    modules: Map<string, Module>
  ): void;
}

class FlipFLop extends Module {
  isOn: boolean;
  key: string;
  destinationKeys: string[];

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

  override process(key: string, input: Pulse, modules: Map<string, Module>) {
    switch (input) {
      case Pulse.HIGH: {
        // do nothing - this is where the loop eventually stops
        break;
      }
      case Pulse.LOW: {
        var result: Pulse;
        switch (this.isOn) {
          case true: {
            this.isOn = false;
            result = Pulse.LOW;
            break;
          }

          case false: {
            this.isOn = true;
            result = Pulse.HIGH;
            break;
          }
        }
        Array.from(modules.entries()).forEach((moduleEntry) => {
          if (this.destinationKeys.includes(moduleEntry[0])) {
            moduleEntry[1].process(moduleEntry[0], result, modules);
          }
        });
      }
    }
  }
}

class Conjunction extends Module {
  connectedModuleKeys: string[];
  destinatonModuleKeys: string[];
  mostRecentPulseForModule: Map<string, Pulse>;
  key: string;

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

  override process(
    moduleKey: string,
    input: Pulse,
    modules: Map<string, Module>
  ) {
    this.mostRecentPulseForModule.set(moduleKey, input);

    var result: Pulse;
    if (
      Array.from(this.mostRecentPulseForModule.values()).every(
        (pulse) => pulse == Pulse.HIGH
      )
    ) {
      result = Pulse.LOW;
    } else {
      result = Pulse.HIGH;
    }

    this.destinatonModuleKeys.forEach((moduleKey) => {
      const module = modules.get(moduleKey)!;
      module.process(moduleKey, result, modules);
    });
  }
}

class Broadcast extends Module {
  destinationKeys: string[];
  key: string;

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

  override process(key: string, input: Pulse, modules: Map<string, Module>) {
    this.destinationKeys.forEach((moduleKey) => {
      const module = modules.get(moduleKey)!;
      module.process(moduleKey, input, modules);
    });
  }
}

function pushTheButton(modules: Map<string, Module>) {
  // todo save result pulse and destinations so we can repeate steps following this rule ->
  // Pulses are always processed in the order they are sent.
  // So, if a pulse is sent to modules a, b, and c,
  // and then module a processes its pulse and sends more pulses,
  // the pulses sent to modules b and c would have to be handled first.
  modules.get("broadcaster")!.process("broadcaster", Pulse.LOW, modules);

  // while(!results.isEmpty) releaseResults(results, destinations)
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
