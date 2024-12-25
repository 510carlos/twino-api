// Connect to the admin database
db = connect("mongodb://root:password@localhost:27017/admin");

// Switch to the specified database
const databaseName = "twino";
const userName = "user";
const userPassword = "password";

db = db.getSiblingDB(databaseName);

// Check if the user already exists
const existingUser = db.getUser(userName);
if (!existingUser) {
  db.createUser({
    user: userName,
    pwd: userPassword,
    roles: [{ role: "readWrite", db: databaseName }],
  });
  print(`User "${userName}" created.`);
} else {
  print(`User "${userName}" already exists. Skipping user creation.`);
}

// Check if the "drinks" collection already exists
const collectionName = "drinks";
if (db.getCollectionNames().indexOf(collectionName) === -1) {
  db.createCollection(collectionName);
  print(`Collection "${collectionName}" created.`);
} else {
  print(`Collection "${collectionName}" already exists. Skipping collection creation.`);
}

// Insert menu items into the "drinks" collection
const drinks = [
  {
    id: "green-tea",
    name: "Green Tea",
    description: "A soothing green tea.",
    ingredients: ["Green tea leaves", "Water"],
    recipe: "Boil water, steep green tea leaves for 3-5 minutes, and serve.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "black-coffee",
    name: "Black Coffee",
    description: "A strong black coffee.",
    ingredients: ["Coffee beans", "Hot water"],
    recipe: "Brew coffee beans with hot water using a coffee maker or French press.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "latte",
    name: "Latte",
    description: "A creamy latte with steamed milk.",
    ingredients: ["Espresso", "Steamed milk"],
    recipe: "Brew espresso, steam milk until frothy, and pour milk over espresso.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "smoothie",
    name: "Smoothie",
    description: "A refreshing fruit smoothie.",
    ingredients: ["Banana", "Strawberry", "Yogurt", "Honey"],
    recipe: "Blend banana, strawberries, yogurt, and honey until smooth.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "chai-latte",
    name: "Chai Latte",
    description: "A spicy chai latte with milk.",
    ingredients: ["Black tea", "Milk", "Spices", "Sugar"],
    recipe: "Boil black tea with spices and sugar, add milk, and simmer for 5 minutes.",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Insert drinks, ignoring duplicates
drinks.forEach((drink) => {
  if (!db[collectionName].findOne({ id: drink.id })) {
    db[collectionName].insertOne(drink);
    print(`Inserted drink: ${drink.name}`);
  } else {
    print(`Drink "${drink.name}" already exists. Skipping insertion.`);
  }
});

print("Initialization complete.");
