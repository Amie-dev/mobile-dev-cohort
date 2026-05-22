export type foodCategorySchema="Pizza"
    | "Burger"
    | "Biryani"
    | "Dessert"
    | "Drinks"
    | "Pasta"
    | "Healthy"
    | "Indian"
    | "Chinese"
    | "Fast Food";
export type FoodSchema = {
  id: string;

  // Food
  foodName: string;
  foodDescription: string;

  foodCategory:foodCategorySchema,

  foodImage: string;

  // Price
  price: number;
  discountPrice?: number;

  // Ratings
  foodRating: number; // 1 - 5

  // Delivery
  deliveryTime: string;
  deliveryFee?: number;

  // Restaurant
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string;
  restaurantRating: number;

  // Flags
  isVeg?: boolean;
  isFavorite?: boolean;
  isPopular?: boolean;
  isAvailable?: boolean;

  // Cart
  quantity?: number;

  // Location
  location?: string;
};

export const FOOD_DATA: FoodSchema[] = [
  {
    id: "1",
    foodName: "Chicken Burger",
    foodDescription:
      "Juicy grilled chicken burger with cheese and crispy lettuce.",

    foodCategory: "Burger",

    foodImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",

    price: 249,
    discountPrice: 199,

    foodRating: 4.5,

    deliveryTime: "25-30 min",
    deliveryFee: 40,

    restaurantId: "r1",
    restaurantName: "Burger King",

    restaurantLogo: "https://logo.clearbit.com/burgerking.com",

    restaurantRating: 4.4,

    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "2",
    foodName: "Pepperoni Pizza",

    foodDescription: "Classic pepperoni pizza with extra mozzarella cheese.",

    foodCategory: "Pizza",

    foodImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591",

    price: 499,
    discountPrice: 429,

    foodRating: 4.8,

    deliveryTime: "30-40 min",
    deliveryFee: 60,

    restaurantId: "r2",
    restaurantName: "Domino's Pizza",

    restaurantLogo: "https://logo.clearbit.com/dominos.com",

    restaurantRating: 4.6,

    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "3",
    foodName: "Hyderabadi Biryani",

    foodDescription: "Authentic spicy Hyderabadi chicken biryani with raita.",

    foodCategory: "Biryani",

    foodImage: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",

    price: 349,

    foodRating: 4.7,

    deliveryTime: "35-45 min",
    deliveryFee: 45,

    restaurantId: "r3",
    restaurantName: "Biryani Blues",

    restaurantLogo: "https://logo.clearbit.com/biryaniblues.com",

    restaurantRating: 4.5,

    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "4",
    foodName: "Cold Coffee",

    foodDescription: "Refreshing creamy cold coffee with chocolate topping.",

    foodCategory: "Drinks",

    foodImage: "https://images.unsplash.com/photo-1517701604599-bb29b565090c",

    price: 149,

    foodRating: 4.3,

    deliveryTime: "15-20 min",
    deliveryFee: 20,

    restaurantId: "r4",
    restaurantName: "Starbucks",

    restaurantLogo: "https://logo.clearbit.com/starbucks.com",

    restaurantRating: 4.7,

    isVeg: true,
    isAvailable: true,
  },

  {
    id: "5",
    foodName: "Chocolate Donut",

    foodDescription: "Soft donut topped with dark chocolate glaze.",

    foodCategory: "Dessert",

    foodImage: "https://images.unsplash.com/photo-1551024601-bec78aea704b",

    price: 99,

    foodRating: 4.2,

    deliveryTime: "15-20 min",
    deliveryFee: 15,

    restaurantId: "r5",
    restaurantName: "Dunkin Donuts",

    restaurantLogo: "https://logo.clearbit.com/dunkindonuts.com",

    restaurantRating: 4.4,

    isVeg: true,
    isAvailable: true,
  },

  {
    id: "6",
    foodName: "White Sauce Pasta",

    foodDescription: "Creamy white sauce pasta loaded with cheese.",

    foodCategory: "Pasta",

    foodImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9",

    price: 299,

    foodRating: 4.4,

    deliveryTime: "25-35 min",
    deliveryFee: 35,

    restaurantId: "r6",
    restaurantName: "Pizza Hut",

    restaurantLogo: "https://logo.clearbit.com/pizzahut.com",

    restaurantRating: 4.3,

    isVeg: true,
    isAvailable: true,
  },

  {
    id: "7",
    foodName: "Veg Momos",

    foodDescription: "Steamed momos served with spicy red chutney.",

    foodCategory: "Chinese",

    foodImage: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46",

    price: 179,

    foodRating: 4.1,

    deliveryTime: "20-25 min",
    deliveryFee: 20,

    restaurantId: "r7",
    restaurantName: "Wow Momo",

    restaurantLogo: "https://logo.clearbit.com/wowmomo.com",

    restaurantRating: 4.2,

    isVeg: true,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "8",
    foodName: "Paneer Tikka",

    foodDescription: "Smoky paneer tikka served with mint chutney.",

    foodCategory: "Indian",

    foodImage: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8",

    price: 329,

    foodRating: 4.6,

    deliveryTime: "30-35 min",
    deliveryFee: 40,

    restaurantId: "r8",
    restaurantName: "Barbeque Nation",

    restaurantLogo: "https://logo.clearbit.com/barbequenation.com",

    restaurantRating: 4.5,

    isVeg: true,
    isAvailable: true,
  },

  {
    id: "9",
    foodName: "Healthy Salad Bowl",

    foodDescription: "Fresh vegetable salad with avocado and dressing.",

    foodCategory: "Healthy",

    foodImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",

    price: 259,

    foodRating: 4.0,

    deliveryTime: "20-25 min",
    deliveryFee: 25,

    restaurantId: "r9",
    restaurantName: "Subway",

    restaurantLogo: "https://logo.clearbit.com/subway.com",

    restaurantRating: 4.1,

    isVeg: true,
    isAvailable: true,
  },

  {
    id: "10",
    foodName: "French Fries",

    foodDescription: "Crispy salted french fries with ketchup.",

    foodCategory: "Fast Food",

    foodImage: "https://images.unsplash.com/photo-1576107232684-1279f390859f",

    price: 129,

    foodRating: 4.3,

    deliveryTime: "15-20 min",
    deliveryFee: 20,

    restaurantId: "r10",
    restaurantName: "McDonald's",

    restaurantLogo: "https://logo.clearbit.com/mcdonalds.com",

    restaurantRating: 4.5,

    isVeg: true,
    isPopular: true,
    isAvailable: true,
  },
  {
    id: "11",
    foodName: "Margherita Pizza",
    foodDescription: "Classic cheese pizza with fresh basil and tomato sauce.",
    foodCategory: "Pizza",
    foodImage: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
    price: 399,
    discountPrice: 349,
    foodRating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 40,
    restaurantId: "r11",
    restaurantName: "Pizza Hut",
    restaurantLogo: "https://logo.clearbit.com/pizzahut.com",
    restaurantRating: 4.4,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "12",
    foodName: "Cheese Burst Burger",
    foodDescription: "Loaded burger with extra cheese burst filling.",
    foodCategory: "Burger",
    foodImage: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    price: 279,
    foodRating: 4.6,
    deliveryTime: "20-30 min",
    deliveryFee: 30,
    restaurantId: "r12",
    restaurantName: "Burger Singh",
    restaurantLogo: "https://logo.clearbit.com/burgersinghonline.com",
    restaurantRating: 4.3,
    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "13",
    foodName: "Masala Dosa",
    foodDescription: "Crispy dosa stuffed with spicy potato masala.",
    foodCategory: "Indian",
    foodImage: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976",
    price: 189,
    foodRating: 4.7,
    deliveryTime: "20-25 min",
    deliveryFee: 20,
    restaurantId: "r13",
    restaurantName: "Sagar Ratna",
    restaurantLogo: "https://logo.clearbit.com/sagarratna.in",
    restaurantRating: 4.6,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "14",
    foodName: "Veg Hakka Noodles",
    foodDescription: "Chinese style noodles tossed with vegetables.",
    foodCategory: "Chinese",
    foodImage: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841",
    price: 229,
    foodRating: 4.2,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    restaurantId: "r14",
    restaurantName: "Mainland China",
    restaurantLogo: "https://logo.clearbit.com/mainlandchina.in",
    restaurantRating: 4.4,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "15",
    foodName: "Chocolate Shake",
    foodDescription: "Thick chocolate milkshake topped with cream.",
    foodCategory: "Drinks",
    foodImage: "https://images.unsplash.com/photo-1577805947697-89e18249d767",
    price: 159,
    foodRating: 4.4,
    deliveryTime: "10-15 min",
    deliveryFee: 15,
    restaurantId: "r15",
    restaurantName: "Keventers",
    restaurantLogo: "https://logo.clearbit.com/keventers.com",
    restaurantRating: 4.3,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "16",
    foodName: "Chicken Wrap",
    foodDescription: "Soft tortilla wrap filled with grilled chicken.",
    foodCategory: "Fast Food",
    foodImage: "https://images.unsplash.com/photo-1565299507177-b0ac66763828",
    price: 249,
    foodRating: 4.5,
    deliveryTime: "20-25 min",
    deliveryFee: 25,
    restaurantId: "r16",
    restaurantName: "KFC",
    restaurantLogo: "https://logo.clearbit.com/kfc.com",
    restaurantRating: 4.5,
    isVeg: false,
    isAvailable: true,
  },

  {
    id: "17",
    foodName: "Ice Cream Sundae",
    foodDescription: "Vanilla sundae topped with chocolate syrup.",
    foodCategory: "Dessert",
    foodImage: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
    price: 149,
    foodRating: 4.3,
    deliveryTime: "10-15 min",
    deliveryFee: 10,
    restaurantId: "r17",
    restaurantName: "Baskin Robbins",
    restaurantLogo: "https://logo.clearbit.com/baskinrobbins.com",
    restaurantRating: 4.4,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "18",
    foodName: "Veggie Sandwich",
    foodDescription: "Healthy grilled sandwich with fresh vegetables.",
    foodCategory: "Healthy",
    foodImage: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    price: 199,
    foodRating: 4.1,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    restaurantId: "r18",
    restaurantName: "Subway",
    restaurantLogo: "https://logo.clearbit.com/subway.com",
    restaurantRating: 4.2,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "19",
    foodName: "Tandoori Chicken",
    foodDescription: "Smoky roasted chicken with Indian spices.",
    foodCategory: "Indian",
    foodImage: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    price: 449,
    foodRating: 4.8,
    deliveryTime: "35-45 min",
    deliveryFee: 50,
    restaurantId: "r19",
    restaurantName: "Barbeque Nation",
    restaurantLogo: "https://logo.clearbit.com/barbequenation.com",
    restaurantRating: 4.7,
    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "20",
    foodName: "Paneer Roll",
    foodDescription: "Soft roll stuffed with spicy paneer filling.",
    foodCategory: "Fast Food",
    foodImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    price: 179,
    foodRating: 4.2,
    deliveryTime: "15-20 min",
    deliveryFee: 20,
    restaurantId: "r20",
    restaurantName: "Faasos",
    restaurantLogo: "https://logo.clearbit.com/faasos.com",
    restaurantRating: 4.3,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "21",
    foodName: "Veg Fried Rice",
    foodDescription: "Chinese style fried rice with fresh vegetables.",
    foodCategory: "Chinese",
    foodImage: "https://images.unsplash.com/photo-1512058564366-18510be2db19",
    price: 219,
    foodRating: 4.1,
    deliveryTime: "20-30 min",
    deliveryFee: 25,
    restaurantId: "r21",
    restaurantName: "Wow China",
    restaurantLogo: "https://logo.clearbit.com/wowchina.in",
    restaurantRating: 4.2,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "22",
    foodName: "Chicken Nuggets",
    foodDescription: "Crunchy chicken nuggets served with dip.",
    foodCategory: "Fast Food",
    foodImage: "https://images.unsplash.com/photo-1562967914-608f82629710",
    price: 199,
    foodRating: 4.5,
    deliveryTime: "15-20 min",
    deliveryFee: 20,
    restaurantId: "r22",
    restaurantName: "McDonald's",
    restaurantLogo: "https://logo.clearbit.com/mcdonalds.com",
    restaurantRating: 4.4,
    isVeg: false,
    isAvailable: true,
  },

  {
    id: "23",
    foodName: "Cheese Cake",
    foodDescription: "Creamy baked cheesecake with berry topping.",
    foodCategory: "Dessert",
    foodImage: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
    price: 249,
    foodRating: 4.7,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    restaurantId: "r23",
    restaurantName: "Theobroma",
    restaurantLogo: "https://logo.clearbit.com/theobroma.in",
    restaurantRating: 4.6,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "24",
    foodName: "Veggie Pasta",
    foodDescription: "Italian pasta tossed with creamy sauce.",
    foodCategory: "Pasta",
    foodImage: "https://images.unsplash.com/photo-1622973536968-3ead9e780960",
    price: 289,
    foodRating: 4.4,
    deliveryTime: "25-35 min",
    deliveryFee: 30,
    restaurantId: "r24",
    restaurantName: "La Pino'z Pizza",
    restaurantLogo: "https://logo.clearbit.com/lapinozpizza.in",
    restaurantRating: 4.3,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "25",
    foodName: "Mango Smoothie",
    foodDescription: "Refreshing mango smoothie with fresh fruits.",
    foodCategory: "Drinks",
    foodImage: "https://images.unsplash.com/photo-1623065422902-30a2d299bbe4",
    price: 139,
    foodRating: 4.2,
    deliveryTime: "10-15 min",
    deliveryFee: 10,
    restaurantId: "r25",
    restaurantName: "Juice Junction",
    restaurantLogo: "https://logo.clearbit.com/juicejunction.in",
    restaurantRating: 4.1,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "26",
    foodName: "Chicken Pizza",
    foodDescription: "Loaded chicken pizza with spicy toppings.",
    foodCategory: "Pizza",
    foodImage: "https://images.unsplash.com/photo-1594007654729-407eedc4be65",
    price: 549,
    foodRating: 4.8,
    deliveryTime: "30-40 min",
    deliveryFee: 45,
    restaurantId: "r26",
    restaurantName: "Domino's Pizza",
    restaurantLogo: "https://logo.clearbit.com/dominos.com",
    restaurantRating: 4.7,
    isVeg: false,
    isPopular: true,
    isAvailable: true,
  },

  {
    id: "27",
    foodName: "Veg Taco",
    foodDescription: "Mexican taco filled with fresh veggies.",
    foodCategory: "Fast Food",
    foodImage: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85",
    price: 189,
    foodRating: 4.1,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    restaurantId: "r27",
    restaurantName: "Taco Bell",
    restaurantLogo: "https://logo.clearbit.com/tacobell.com",
    restaurantRating: 4.2,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "28",
    foodName: "Chicken Shawarma",
    foodDescription: "Arabic style shawarma wrap with garlic sauce.",
    foodCategory: "Fast Food",
    foodImage: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783",
    price: 229,
    foodRating: 4.6,
    deliveryTime: "20-25 min",
    deliveryFee: 20,
    restaurantId: "r28",
    restaurantName: "Arabian Nights",
    restaurantLogo: "https://logo.clearbit.com/arabiannights.in",
    restaurantRating: 4.5,
    isVeg: false,
    isAvailable: true,
  },

  {
    id: "29",
    foodName: "Veg Soup",
    foodDescription: "Hot healthy vegetable soup with herbs.",
    foodCategory: "Healthy",
    foodImage: "https://images.unsplash.com/photo-1547592180-85f173990554",
    price: 149,
    foodRating: 4.0,
    deliveryTime: "15-20 min",
    deliveryFee: 15,
    restaurantId: "r29",
    restaurantName: "FreshMenu",
    restaurantLogo: "https://logo.clearbit.com/freshmenu.com",
    restaurantRating: 4.1,
    isVeg: true,
    isAvailable: true,
  },

  {
    id: "30",
    foodName: "Brownie Sundae",
    foodDescription: "Warm brownie served with vanilla ice cream.",
    foodCategory: "Dessert",
    foodImage: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    price: 199,
    foodRating: 4.7,
    deliveryTime: "10-15 min",
    deliveryFee: 10,
    restaurantId: "r30",
    restaurantName: "Belgian Waffle",
    restaurantLogo: "https://logo.clearbit.com/belgianwaffle.co",
    restaurantRating: 4.6,
    isVeg: true,
    isPopular: true,
    isAvailable: true,
  },
];
