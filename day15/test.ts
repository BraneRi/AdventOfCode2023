function hash(input: string): number {
  var sum = 0;
  input.split("").forEach((char) => {
    sum = ((sum + char.charCodeAt(0)) * 17) % 256;
  });
  return sum;
}

console.log(hash("rn"));
