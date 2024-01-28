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
function getAllProductNames(a?: Products): string[] {
  return a?.products?.map((prod:Product) => prod?.name) || [];
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

let a:Cat = new Cat("snizhok", true);
let b:Dog = new Dog("sirko", 333);
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

// 5.

// google for Record type
function stringEntries<T>(a: Object | Array<T>): Array<T> {
  return Array.isArray(a) ? a : (Object.keys(a) as Array<T>);
}

// 6.
// ....can be hard, don't worry and SKIP if you do not know how to do it

async function world(a: number): Promise<string> {
  return "*".repeat(a);
}
const hello = async () => {
  return await world(10);
};
hello()
  .then((r:string) => console.log(r))
  .catch(() => console.log("fail"));

//TASK 3
//********************************************************************************************************** */
interface Types {
  [field: string]: ObjectWithCValue | undefined;
}
interface ObjectWithCValue {
  cvalue?: number | string | undefined | Types;
}
//власна функція
function sum(a: Types): number {
  let result: number = 0;
  for (const field in a) {
    const fieldValue:ObjectWithCValue|undefined = a[field];
    switch (typeof fieldValue) {
      case "undefined":
        result = result + 2021;
        break;
      case "number":
        result += fieldValue;
        break;
      case "string":
        const numberValue:number = Number(fieldValue);
        if (!isNaN(numberValue)) {
          result += numberValue;
        } else {
          result = result + 2021;
        }
        break;
      default:
        const recursiveResult:number = sum(fieldValue as Types);
          result += recursiveResult;
        break;
    }
  }
  return result;
}

let pryklad:Types = {
  hello: { cvalue: "k" },
  world: { cvalue: { yay: { cvalue: "2" } } },
};

let pryklad2: Types= {
  hello: { cvalue: 1 },
  world: { cvalue: { yay: { cvalue: "2" } } },
};

let pryklad3: Types = {
  hello: { cvalue: undefined },
  world: { cvalue: { yay: { cvalue: "4000" } } },
};

let pryklad4: Types = {
  field: undefined,
};

console.time('My Function');
console.log(sum(pryklad)); // Результат: 2023
console.log(sum(pryklad2)); // Результат: 3
console.log(sum(pryklad3)); // Результат: 6021
console.log(sum(pryklad4)); // Результат 2021
console.timeEnd('My Function');

//забагована функція
function summ(a: Types): number {
  const x:number[] = Object.keys(a).map((k) => {
    const elem:ObjectWithCValue|undefined = a[k];
    if (elem === undefined) return 2021;
    if (typeof elem.cvalue === 'string') return Number(elem.cvalue) || 2021;
    else if (typeof elem.cvalue === 'number') return elem.cvalue;
    else if (elem.cvalue !== undefined) return summ(elem.cvalue as Types);
    return 2021;
  });
  let sum:number = 0;
  for (let i = 0; i < x.length; i++) {
    sum += x[i];
  }

  return sum;
}
console.log('***************************************************')
console.time('Bug Function');
console.log(summ(pryklad)); // Результат: 2023
console.log(summ(pryklad2)); // Результат: 3
console.log(summ(pryklad3)); // Результат: 6021
console.log(summ(pryklad4)); // Результат 2021
console.timeEnd('Bug Function');


