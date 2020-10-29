function groupBy(list, keyGetter) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}
const pets = [
  { type: { test: "Dog" }, name: "Spot" },
  { type: { test: "Cat" }, name: "Tiger" },
  { type: { test: "Dog" }, name: "Rover" },
];

const grouped = groupBy(pets, (pet) => pet.type.test);

console.log(grouped.get("Dog"));
