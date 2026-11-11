export type MenuProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  note?: string;
};

export const menuCategories = [
  "Starters",
  "Salads",
  "Pasta",
  "Wraps",
  "Burgers",
  "Grill Burgers",
  "Sandwiches",
  "Fries",
  "Wings",
  "Nuggets",
  "Desserts",
  "Dips",
  "Pizza",
  "Beverages",
  "Shakes",
  "Kids Meal",
  "Combos",
] as const;

export const menuProducts: MenuProduct[] = [
  { id: "cheese-roll", name: "Chicken Cheese Roll · 3 pcs", category: "Starters", price: 750 },
  { id: "chicken-strips", name: "Chicken Strips · 6 pcs", category: "Starters", price: 550 },
  { id: "apple-cocktail-salad", name: "Apple Cocktail Salad", category: "Salads", price: 450 },
  { id: "grilled-chicken-salad", name: "Grilled Chicken Salad", category: "Salads", price: 550 },
  { id: "alfredo-pasta", name: "Alfredo Pasta", category: "Pasta", price: 600 },
  { id: "mexican-pasta", name: "Mexican Pasta", category: "Pasta", price: 600 },
  { id: "crispy-wrap", name: "Crispy Wrap", category: "Wraps", price: 550 },
  { id: "grill-wrap", name: "Grill Wrap", category: "Wraps", price: 600 },
  { id: "crispy-burger", name: "Crispy Burger", category: "Burgers", price: 400 },
  { id: "potato-wedges", name: "Potato Wedges", category: "Fries", price: 450 },
  { id: "regular-fries", name: "Regular Fries", category: "Fries", price: 250 },
  { id: "rainbow-fries", name: "Rainbow Fries", category: "Fries", price: 450 },
  { id: "cheese-fries", name: "Cheese Fries", category: "Fries", price: 450 },
  { id: "fudge-brownie", name: "Fudge Brownie", category: "Desserts", price: 600 },
  { id: "bread-pudding", name: "Bread Pudding", category: "Desserts", price: 650 },
  { id: "dynamite-dip", name: "Dynamite Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "ranch-dip", name: "Ranch Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "tangy-masala-dip", name: "Tangy Masala Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "chipotle-dip", name: "Chipotle Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "garlic-mayo-dip", name: "Garlic Mayo Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "vietnam-dip", name: "Vietnam Dip", category: "Dips", price: 100, note: "Rs 100 each" },
  { id: "lemonade", name: "Lemonade", category: "Beverages", price: 300 },
  { id: "mint-margarita", name: "Mint Margarita", category: "Beverages", price: 350 },
  { id: "espresso", name: "Espresso", category: "Beverages", price: 150 },
  { id: "americano", name: "Americano", category: "Beverages", price: 200 },
  { id: "cappuccino", name: "Cappuccino", category: "Beverages", price: 250 },
];

export function formatPrice(price: number) {
  return `Rs ${price.toLocaleString("en-PK")}`;
}
