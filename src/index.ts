// 1.

function getFirstWord(a: string): number {
  return a.split(/ +/)[0].length;
}
console.log(getFirstWord("abc +dc +e"));

// 2.
interface UserName {
  name: string;
  surname: string;
}
interface UserNaming {
  fullname: string;
  initials: string;
}
function getUserNamings(a: UserName): UserNaming {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}
console.log(getUserNamings({ name: "Тарас", surname: "Шевченко" }));

// 3.
interface Products {
  products?: Product[];
}
interface Product {
  name: string;
}
// <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining>
function getAllProductNames(a?: Products) {
  return a?.products?.map((prod) => prod?.name) || [];
}
console.log(
  getAllProductNames({ products: [{ name: "Тарас" }, { name: "Макар" }] })
);

// 4.1

// easy way is using 'as' keyword
// hard way is ?...
enum Animal {
  CAT = "cat",
  DOG = "dog",
}

class Organizm {
  organizmName?: string;
  cuteness?: number;
  coolness?: number;
  type?: string;
  weight?: number;
  isBig?: boolean;

  constructor(
    name: string,
    secondParameter: number | boolean,
    type?: string,
    cuteness?: number,
    coolness?: number
  ) {
    this.organizmName = name;
    if (typeof secondParameter === "number") {
      this.weight = secondParameter;
    } else {
      this.isBig = secondParameter;
    }
    this.cuteness = cuteness;
    this.coolness = coolness;
    if (type !== undefined) {
      this.type = type;
    }
  }
  name(): string {
    return this.organizmName || "";
  }
}

console.log(hey({ name: () => "roman", cuteness: 100 }));
console.log(hey({ name: () => "vasyl", coolness: 100 }));

// 4.2
class Cat extends Organizm {
  type = Animal.CAT;
}
class Dog extends Organizm {
  type = Animal.DOG;
}

let a = new Cat("snizhok", true);
let b = new Dog("sirko", 333);
console.log(hey(a));
console.log(hey(b));

// 4.3

function hey(a: Organizm): string {
  return (
    "hey! i'm " +
    a.name() +
    (a.type !== undefined &&
    (a.cuteness !== undefined || a.coolness !== undefined)
      ? a.type === "cat"
        ? " cuteness: " + (a as Cat).cuteness
        : " coolness: " + (a as Dog).coolness
      : "")
  );
}
console.log(hey({ name: () => "snizhok", type: "cat", cuteness: 100 }));
console.log(hey({ name: () => "sirko", type: "dog", coolness: 100 }));

/* // 5.

// google for Record type
function stringEntries(a) {
  return Array.isArray(a) ? a : Object.keys(a);
}

// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a) {
  return "*".repeat(a);
}
const hello = async () => {
  return await world(10);
};
hello()
  .then((r) => console.log(r))
  .catch((e) => console.log("fail"));
 */
