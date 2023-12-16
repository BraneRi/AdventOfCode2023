function onlyUnknownsAndDots(str) {
    return /^[\?\.]+$/.test(str);
}
console.log(onlyUnknownsAndDots("#"));
console.log(onlyUnknownsAndDots(".."));
console.log(onlyUnknownsAndDots("?????"));
console.log(onlyUnknownsAndDots("???.....?"));
