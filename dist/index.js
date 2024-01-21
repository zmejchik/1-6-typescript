"use strict";
// 1.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
console.log(getFirstWord("abc +dc +e"));
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0],
    };
}
console.log(getUserNamings({ name: "Тарас", surname: "Шевченко" }));
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map((prod) => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
console.log(getAllProductNames({ products: [{ name: "Тарас" }, { name: "Макар" }] }));
// 4.1
// easy way is using 'as' keyword
// hard way is ?...
var Animal;
(function (Animal) {
    Animal["CAT"] = "cat";
    Animal["DOG"] = "dog";
})(Animal || (Animal = {}));
class Organizm {
    constructor(name, secondParameter, type, cuteness, coolness) {
        this.organizmName = name;
        if (typeof secondParameter === "number") {
            this.weight = secondParameter;
        }
        else {
            this.isBig = secondParameter;
        }
        this.cuteness = cuteness;
        this.coolness = coolness;
        if (type !== undefined) {
            this.type = type;
        }
    }
    name() {
        return this.organizmName || "";
    }
}
console.log(hey({ name: () => "roman", cuteness: 100 }));
console.log(hey({ name: () => "vasyl", coolness: 100 }));
// 4.2
class Cat extends Organizm {
    constructor() {
        super(...arguments);
        this.type = Animal.CAT;
    }
}
class Dog extends Organizm {
    constructor() {
        super(...arguments);
        this.type = Animal.DOG;
    }
}
let a = new Cat("snizhok", true);
let b = new Dog("sirko", 333);
console.log(hey(a));
console.log(hey(b));
// 4.3
function hey(a) {
    return ("hey! i'm " +
        a.name() +
        (a.type !== undefined &&
            (a.cuteness !== undefined || a.coolness !== undefined)
            ? a.type === "cat"
                ? " cuteness: " + a.cuteness
                : " coolness: " + a.coolness
            : ""));
}
console.log(hey({ name: () => "snizhok", type: "cat", cuteness: 100 }));
console.log(hey({ name: () => "sirko", type: "dog", coolness: 100 }));
// 5.
// google for Record type
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it
function world(a) {
    return __awaiter(this, void 0, void 0, function* () {
        return "*".repeat(a);
    });
}
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield world(10);
});
hello()
    .then((r) => console.log(r))
    .catch((e) => console.log("fail"));
