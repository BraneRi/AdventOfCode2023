function onlyUnknownsAndDots(str: string): boolean {
  return /^[\?\.]+$/.test(str);
}

console.log(onlyUnknownsAndDots("#"));
console.log(onlyUnknownsAndDots(".."));
console.log(onlyUnknownsAndDots("?????"));
console.log(onlyUnknownsAndDots("???.....?"));
