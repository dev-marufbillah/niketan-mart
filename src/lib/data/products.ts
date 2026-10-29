export type Category = "fresh" | "fruits" | "meat" | "dairy" | "grocery";
export type Diet = "organic" | "halal" | "desi" | "direct" | "sugarfree";

export type Product = {
  id: string;
  name: string;
  bn: string;
  unit: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: string;
  stockTone: "green" | "red" | "gold";
  badge?: string;
  category: Category;
  brand: string;
  diet: Diet[];
  offers: string[];
  image: string | null; // pore "/images/xxx.jpg" dien
  bg: string;
};

export const departments: Record<
  string,
  { title: string; bn: string; desc: string; crumb: string }
> = {
  "fresh-market": {
    title: "Shop Fresh Groceries & Everyday Essentials",
    bn: "(ফ্রেশ মার্কেট কাঁচাবাজার ও নৈমন্দিন মুদি সদাই)",
    desc: "Over 3,500+ curated farm-fresh harvests, morning bazaar staples, cold-chained river fishes, premium halal meats, artisanal dates, and Gulshan neighborhood restaurant favorites delivered direct to your kitchen door.",
    crumb: "Dhaka Fresh Market",
  },
  all: {
    title: "Shop Everything Fresh",
    bn: "(সব পণ্য এক জায়গায়)",
    desc: "Browse the full Niketan Mart catalog: vegetables, fruits, fish, meat, dairy and pantry staples delivered across Gulshan, Banani and Baridhara.",
    crumb: "All Products",
  },
  grocery: {
    title: "Grocery, Spices & Pantry",
    bn: "(মুদির বাজার)",
    desc: "Rice, oil, spices and pantry staples sourced from trusted brands and cooperatives.",
    crumb: "Grocery & Pantry",
  },
  "fish-meat": {
    title: "River Fish & Halal Meat",
    bn: "(মাছ-মাংস)",
    desc: "Fresh Padma river fish and certified halal meat, cleaned and cold-chained.",
    crumb: "Fish & Meat",
  },
  "dairy-bakery": {
    title: "Dairy, Eggs & Bakery",
    bn: "(ডেইরি ও বেকারি)",
    desc: "Farm-fresh milk, eggs, bakes and breads delivered chilled.",
    crumb: "Dairy & Bakery",
  },
  "restaurant-meals": {
    title: "Restaurant Meals",
    bn: "(পার্টনার রেস্টুরেন্ট)",
    desc: "Chef-crafted meals from trusted Gulshan and Banani restaurant partners.",
    crumb: "Restaurant Meals",
  },
};

export const products: Product[] = [
  { id: "p1", name: "Fresh Sweet Country Carrots", bn: "দেশি মিষ্টি গাজর", unit: "1 kg", price: 75, oldPrice: 95, rating: 4.8, reviews: 94, stock: "In Stock", stockTone: "green", badge: "20% OFF", category: "fresh", brand: "Karwan Bazar Farms", diet: ["organic", "desi"], offers: ["On Sale", "Morning Harvest"], image: null, bg: "from-orange-200 to-orange-500" },
  { id: "p2", name: "Local Deshi Ripe Tomatoes", bn: "দেশি পাকা টমেটো", unit: "1 kg", price: 69, rating: 4.9, reviews: 128, stock: "Fresh Pluck", stockTone: "red", badge: "Top Rated", category: "fresh", brand: "Savar Growers", diet: ["organic", "desi", "direct"], offers: ["Morning Harvest"], image: null, bg: "from-red-300 to-red-600" },
  { id: "p3", name: "Champa Sagor Local Bananas", bn: "চাঁপা সাগর কলা", unit: "12 Dozen", price: 89, rating: 4.7, reviews: 76, stock: "Natural Ripe", stockTone: "gold", category: "fruits", brand: "Savar Growers", diet: ["organic", "desi"], offers: ["Morning Harvest"], image: null, bg: "from-yellow-200 to-yellow-500" },
  { id: "p4", name: "Aarong Pasteurized Full Cream Milk", bn: "আড়ং পাস্তুরিত দুধ", unit: "1 Litre", price: 95, oldPrice: 110, rating: 4.9, reviews: 340, stock: "Cold Chained", stockTone: "green", category: "dairy", brand: "Aarong Dairy", diet: ["halal"], offers: ["On Sale", "Buy 1 Get 1"], image: null, bg: "from-sky-100 to-sky-300" },
  { id: "p5", name: "Cold Pressed Pure Mustard Oil", bn: "সরিষার তেল", unit: "1 Litre", price: 380, oldPrice: 480, rating: 4.9, reviews: 189, stock: "In Stock", stockTone: "green", badge: "৳100 OFF", category: "grocery", brand: "Pran Premium", diet: ["organic", "direct"], offers: ["On Sale"], image: null, bg: "from-yellow-200 to-amber-500" },
  { id: "p6", name: "Premium Chiniguta Rice", bn: "চিনিগুঁড়া চাল", unit: "1 kg", price: 165, rating: 4.8, reviews: 63, stock: "Aged 1 Year", stockTone: "gold", category: "grocery", brand: "Teer Pure", diet: ["desi"], offers: [], image: null, bg: "from-stone-200 to-stone-400" },
  { id: "p7", name: "Fresh Farm Layer Eggs", bn: "ফার্মের তাজা ডিম", unit: "12 Pieces", price: 145, rating: 4.7, reviews: 420, stock: "Cleaned & Graded", stockTone: "green", category: "dairy", brand: "Kazi Farms", diet: ["halal"], offers: ["Family Bundle"], image: null, bg: "from-amber-100 to-amber-300" },
  { id: "p8", name: "Padma River Fresh Hilsa", bn: "পদ্মার তাজা ইলিশ", unit: "1 - 1.2 kg", price: 1650, rating: 5.0, reviews: 52, stock: "Only 4 left", stockTone: "red", category: "meat", brand: "Nakhlah Fisheries", diet: ["halal", "direct"], offers: ["Morning Harvest"], image: null, bg: "from-slate-200 to-slate-500" },
  { id: "p9", name: "Fresh Skinless Chicken Breast", bn: "স্কিনলেস মুরগির বুকের মাংস", unit: "1 kg", price: 320, rating: 4.8, reviews: 118, stock: "Antibiotic Free", stockTone: "green", category: "meat", brand: "Kazi Farms", diet: ["halal"], offers: ["Family Bundle"], image: null, bg: "from-rose-200 to-rose-400" },
  { id: "p10", name: "Jumbo Medjool Dates", bn: "জাম্বো মেডজুল খেজুর", unit: "500 g", price: 850, oldPrice: 990, rating: 4.9, reviews: 84, stock: "Sugar-Free Diet", stockTone: "gold", badge: "Festive", category: "fruits", brand: "Nakhlah Dates", diet: ["sugarfree", "halal"], offers: ["On Sale"], image: null, bg: "from-amber-600 to-stone-700" },
  { id: "p11", name: "Deshi Palong Shak", bn: "দেশি পালং শাক", unit: "1 Bunch", price: 35, rating: 4.8, reviews: 110, stock: "Pesticide Free", stockTone: "green", category: "fresh", brand: "Savar Growers", diet: ["organic", "desi", "direct"], offers: ["Morning Harvest"], image: null, bg: "from-green-300 to-green-700" },
  { id: "p12", name: "Shahi Mutton Kacchi Biryani", bn: "শাহী মাটন কাচ্চি", unit: "1 Plate", price: 380, rating: 4.8, reviews: 250, stock: "Cooked Fresh", stockTone: "red", category: "grocery", brand: "Partner Kitchen", diet: ["halal"], offers: [], image: null, bg: "from-orange-300 to-amber-700" },
];