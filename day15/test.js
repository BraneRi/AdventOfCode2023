function hash(input) {
    var sum = 0;
    input.split("").forEach(function (char) {
        sum = ((sum + char.charCodeAt(0)) * 17) % 256;
    });
    return sum;
}
console.log(hash("rn"));
