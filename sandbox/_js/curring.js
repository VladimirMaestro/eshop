function sum(a) {
    // ....
}

const r1 = sum(1);
const r2 = r1(2);
const r3 = r2(3);
const result = sum(1)(2)(3); // 6
