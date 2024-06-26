import * as readline from "readline";
import * as fs from "fs";

enum Condition {
  SMALLER,
  BIGGGER,
}

type Rule = {
  category: string;
  condition: Condition;
  conditionValue: number;
  conditionOkWorkflow: string;
  conditionNotOkWorkflow: string | undefined;
};

type Input = {
  x: number;
  m: number;
  a: number;
  s: number;
};

async function processFile(filePath: string): Promise<void> {
  // Create a readable stream from the file
  const fileStream = fs.createReadStream(filePath);

  // Create an interface to read lines from the stream
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // Treats each line as a separate data event
  });

  const workflows = new Map<string, Rule[]>();
  const inputs: Input[] = [];
  const ruleRegex = /([^{}]+){([^}]+)}/;
  const inputsRegex = /x=(\d+),m=(\d+),a=(\d+),s=(\d+)/;
  for await (const line of rl) {
    const match = line.match(ruleRegex);

    if (match) {
      const workflow = match[1];
      const rulesString = match[2];
      workflows.set(workflow, parseRules(rulesString));
    } else {
      const match = line.match(inputsRegex);
      if (match) {
        const x = Number(match[1]);
        const m = Number(match[2]);
        const a = Number(match[3]);
        const s = Number(match[4]);
        inputs.push({ x: x, m: m, a: a, s: s });
      }
    }
  }

  // console.log(sumOfAccepted(workflows, inputs));
  const solutions = Array.from(totalCombinations(workflows));
  console.log(
    solutions.reduce(
      (acc, solution) =>
        acc +
        (solution.x.to - solution.x.from + 1) *
          (solution.m.to - solution.m.from + 1) *
          (solution.a.to - solution.a.from + 1) *
          (solution.s.to - solution.s.from + 1),
      0
    )
  );
  console.log(solutions);
}

interface Range {
  from: number;
  to: number;
}

interface Solution {
  x: Range;
  m: Range;
  a: Range;
  s: Range;
}

// Part two
function totalCombinations(
  workflows: Map<string, Rule[]>,
  currentWorkflow: string = "in",
  x: Range = { from: 1, to: 4000 },
  m: Range = { from: 1, to: 4000 },
  a: Range = { from: 1, to: 4000 },
  s: Range = { from: 1, to: 4000 },
  solutions: Set<Solution> = new Set()
): Set<Solution> {
  if (currentWorkflow === "R") return solutions;
  if (currentWorkflow === "A") {
    // console.log("Ok ranges for: " + currentWorkflow);
    // console.log(x);
    // console.log(m);
    // console.log(a);
    // console.log(s);
    // console.log("---------");
    return solutions.add({ x: x, m: m, a: a, s: s });
  }

  const currentRules = workflows.get(currentWorkflow) || [];

  for (const rule of currentRules) {
    const isLastRule = rule === currentRules[currentRules.length - 1];

    const conditionOk: Range = { from: 0, to: 0 };
    const conditionNotOk: Range = { from: 0, to: 0 };

    switch (rule.category) {
      case "x":
        conditionOk.from =
          rule.condition === Condition.SMALLER
            ? x.from
            : rule.conditionValue + 1;
        conditionOk.to =
          rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : x.to;
        conditionNotOk.from =
          rule.condition === Condition.SMALLER ? rule.conditionValue : x.from;
        conditionNotOk.to =
          rule.condition === Condition.SMALLER ? x.to : rule.conditionValue;
        if (conditionOk.to - conditionOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionOkWorkflow,
            conditionOk,
            m,
            a,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        }

        if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionNotOkWorkflow,
            conditionNotOk,
            m,
            a,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        } else if (isLastRule) {
          return solutions;
        }

        x = { from: conditionNotOk.from, to: conditionNotOk.to };
        break;
      case "m":
        conditionOk.from =
          rule.condition === Condition.SMALLER
            ? m.from
            : rule.conditionValue + 1;
        conditionOk.to =
          rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : m.to;
        conditionNotOk.from =
          rule.condition === Condition.SMALLER ? rule.conditionValue : m.from;
        conditionNotOk.to =
          rule.condition === Condition.SMALLER ? m.to : rule.conditionValue;
        if (conditionOk.to - conditionOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionOkWorkflow,
            x,
            conditionOk,
            a,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        }

        if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionNotOkWorkflow,
            x,
            conditionNotOk,
            a,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        } else if (isLastRule) {
          return solutions;
        }
        m = { from: conditionNotOk.from, to: conditionNotOk.to };
        break;
      case "a":
        conditionOk.from =
          rule.condition === Condition.SMALLER
            ? a.from
            : rule.conditionValue + 1;
        conditionOk.to =
          rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : a.to;
        conditionNotOk.from =
          rule.condition === Condition.SMALLER ? rule.conditionValue : a.from;
        conditionNotOk.to =
          rule.condition === Condition.SMALLER ? a.to : rule.conditionValue;
        if (conditionOk.to - conditionOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionOkWorkflow,
            x,
            m,
            conditionOk,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        }

        if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionNotOkWorkflow,
            x,
            m,
            conditionNotOk,
            s,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        } else if (isLastRule) {
          return solutions;
        }
        a = { from: conditionNotOk.from, to: conditionNotOk.to };
        break;
      default:
        conditionOk.from =
          rule.condition === Condition.SMALLER
            ? s.from
            : rule.conditionValue + 1;
        conditionOk.to =
          rule.condition === Condition.SMALLER ? rule.conditionValue - 1 : s.to;
        conditionNotOk.from =
          rule.condition === Condition.SMALLER ? rule.conditionValue : s.from;
        conditionNotOk.to =
          rule.condition === Condition.SMALLER ? s.to : rule.conditionValue;
        if (conditionOk.to - conditionOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionOkWorkflow,
            x,
            m,
            a,
            conditionOk,
            solutions
          ).forEach((element) => {
            solutions.add(element);
          });
        }

        if (isLastRule && conditionNotOk.to - conditionNotOk.from > 0) {
          totalCombinations(
            workflows,
            rule.conditionNotOkWorkflow,
            x,
            m,
            a,
            conditionNotOk,
            solutions
          );
        } else if (isLastRule) {
          return solutions;
        }
        s = { from: conditionNotOk.from, to: conditionNotOk.to };
        break;
    }
  }

  return solutions;
}

// Part one
function sumOfAccepted(
  workflows: Map<string, Rule[]>,
  inputs: Input[]
): number {
  var sum = 0;
  inputs.forEach((input) => {
    var currentWorkflow = "in";
    var currentRules: Rule[];
    while (currentWorkflow != "A" && currentWorkflow != "R") {
      currentRules = workflows.get(currentWorkflow)!;
      var isLastRule = false;
      var rule: Rule;
      for (let i = 0; i < currentRules.length; i++) {
        rule = currentRules[i];
        // console.log(rule);
        isLastRule = i == currentRules.length - 1;
        var inputNumber: number;
        switch (rule.category) {
          case "x": {
            inputNumber = input.x;
            break;
          }
          case "m": {
            inputNumber = input.m;
            break;
          }
          case "a": {
            inputNumber = input.a;
            break;
          }
          default: {
            inputNumber = input.s;
            break;
          }
        }
        // console.log(inputNumber);
        if (rule.condition == Condition.SMALLER) {
          if (inputNumber < rule.conditionValue) {
            currentWorkflow = rule.conditionOkWorkflow;
            // console.log("SMALLER: " + currentWorkflow);
            break;
          } else if (isLastRule) {
            currentWorkflow = rule.conditionNotOkWorkflow!;
            // console.log("NOT SMALLER: " + currentWorkflow);
            break;
          }
        } else {
          if (inputNumber > rule.conditionValue) {
            currentWorkflow = rule.conditionOkWorkflow;
            // console.log("BIGGER: " + currentWorkflow);
            break;
          } else if (isLastRule) {
            currentWorkflow = rule.conditionNotOkWorkflow!;
            // console.log("NOT BIGGER: " + currentWorkflow);
            break;
          }
        }
      }
    }

    if (currentWorkflow == "A") {
      // console.log(input);
      sum += input.x + input.m + input.a + input.s;
    }
  });

  return sum;
}

function parseRules(rulesString: string): Rule[] {
  const rules: Rule[] = [];

  const ruleParts = rulesString.split(",");
  const finalConditionNotOkWorkflow = ruleParts[ruleParts.length - 1];

  const conditionRegex = /([a-zA-Z]+)([<>])(\d+):([a-zA-Z]+)/;
  ruleParts.slice(0, -1).forEach((rule) => {
    const match = rule.match(conditionRegex);
    if (match) {
      const category = match[1];
      const condition = match[2] == "<" ? Condition.SMALLER : Condition.BIGGGER;
      const conditionValue = Number(match[3]);
      const conditionOkWorkflow = match[4];

      rules.push({
        category: category,
        condition: condition,
        conditionValue: conditionValue,
        conditionOkWorkflow: conditionOkWorkflow,
        conditionNotOkWorkflow: undefined,
      });
    }
  });

  const lastRule = rules[rules.length - 1];
  lastRule.conditionNotOkWorkflow = finalConditionNotOkWorkflow;

  return rules;
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
