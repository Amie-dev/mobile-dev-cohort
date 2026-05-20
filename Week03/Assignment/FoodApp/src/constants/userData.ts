export type UserSchema = {
  id: string;
  name: string;
  email: string;
  phone: string;

  avatar: string;

  location: string;
  address: string;

  totalOrders: number;
  totalSavedItems: number;
  totalCartItems: number;

  favoriteFood: string;
  lastOrderFood: string;

  savedFoodIds: string[];
  cartFoodIds: string[];
  orderFoodIds: string[];

  isPremiumUser: boolean;
};

export const USER_DATA: UserSchema[] = [
  {
    id: "u1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    avatar: "https://i.pravatar.cc/150?img=11",
    location: "Delhi, India",
    address: "Connaught Place, New Delhi",
    totalOrders: 28,
    totalSavedItems: 6,
    totalCartItems: 3,
    favoriteFood: "Chicken Burger",
    lastOrderFood: "Pepperoni Pizza",
    savedFoodIds: ["1", "3", "8", "10", "15", "23"],
    cartFoodIds: ["1", "4", "10"],
    orderFoodIds: ["1", "2", "3", "6", "10"],
    isPremiumUser: true,
  },
  {
    id: "u2",
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 91234 56789",
    avatar: "https://i.pravatar.cc/150?img=32",
    location: "Mumbai, India",
    address: "Bandra West, Mumbai",
    totalOrders: 15,
    totalSavedItems: 4,
    totalCartItems: 2,
    favoriteFood: "Paneer Tikka",
    lastOrderFood: "Cold Coffee",
    savedFoodIds: ["4", "8", "17", "25"],
    cartFoodIds: ["8", "25"],
    orderFoodIds: ["4", "8", "13", "17"],
    isPremiumUser: false,
  },
  {
    id: "u3",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+91 99887 76655",
    avatar: "https://i.pravatar.cc/150?img=12",
    location: "Kolkata, India",
    address: "Salt Lake Sector V, Kolkata",
    totalOrders: 42,
    totalSavedItems: 9,
    totalCartItems: 5,
    favoriteFood: "Hyderabadi Biryani",
    lastOrderFood: "Chicken Shawarma",
    savedFoodIds: ["3", "12", "19", "22", "28", "30"],
    cartFoodIds: ["3", "16", "19", "22", "28"],
    orderFoodIds: ["3", "11", "16", "19", "22", "28"],
    isPremiumUser: true,
  },
  {
    id: "u4",
    name: "Sneha Das",
    email: "sneha.das@example.com",
    phone: "+91 90123 45678",
    avatar: "https://i.pravatar.cc/150?img=47",
    location: "Bengaluru, India",
    address: "Indiranagar, Bengaluru",
    totalOrders: 21,
    totalSavedItems: 7,
    totalCartItems: 1,
    favoriteFood: "Healthy Salad Bowl",
    lastOrderFood: "Veggie Sandwich",
    savedFoodIds: ["9", "18", "21", "23", "25", "29", "30"],
    cartFoodIds: ["18"],
    orderFoodIds: ["9", "18", "21", "23", "29"],
    isPremiumUser: false,
  },
  {
    id: "u5",
    name: "Imran Khan",
    email: "imran.khan@example.com",
    phone: "+91 93456 78901",
    avatar: "https://i.pravatar.cc/150?img=52",
    location: "Hyderabad, India",
    address: "Hitech City, Hyderabad",
    totalOrders: 36,
    totalSavedItems: 5,
    totalCartItems: 4,
    favoriteFood: "Tandoori Chicken",
    lastOrderFood: "Chicken Pizza",
    savedFoodIds: ["2", "3", "16", "19", "26"],
    cartFoodIds: ["2", "19", "26", "28"],
    orderFoodIds: ["2", "3", "16", "19", "26", "28"],
    isPremiumUser: true,
  },
];