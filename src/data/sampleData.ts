export interface Seller {
  id: string;
  name: string;
  businessName: string;
  email: string;
  phone: string;
  location: string;
  productType: string;
  description: string;
  profileImage: string;
  rating: number;
  totalSales: number;
  followers: number;
  verified: boolean;
  joinedDate: string;
  socialMedia: {
    telegram?: string;
    tiktok?: string;
  };
  specialties: string[];
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const sampleSellers: Seller[] = [
  {
    id: "seller-1",
    name: "Sara Alemayehu",
    businessName: "Sara's Coffee House",
    email: "sara@example.com",
    phone: "+251 9X XXX XXXX",
    location: "Addis Ababa",
    productType: "Food & Beverages",
    description: "Premium Ethiopian coffee beans from Sidamo region. Family business with 20+ years of experience in coffee cultivation and roasting.",
    profileImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop",
    rating: 4.9,
    totalSales: 1247,
    followers: 2340,
    verified: true,
    joinedDate: "2023-01-15",
    socialMedia: {
      telegram: "@sarascoffee",
      tiktok: "tiktok.com/@sarascoffee"
    },
    specialties: ["Coffee", "Traditional Beverages", "Organic Products"],
    products: [
      {
        id: "prod-1",
        name: "Sidamo Coffee Beans",
        price: 1200,
        image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&h=300&fit=crop",
        description: "Premium Ethiopian coffee beans from Sidamo region",
        category: "Coffee",
        inStock: true,
        rating: 4.9,
        reviews: 156
      },
      {
        id: "prod-2",
        name: "Traditional Coffee Set",
        price: 850,
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop",
        description: "Complete traditional coffee ceremony set",
        category: "Coffee Accessories",
        inStock: true,
        rating: 4.8,
        reviews: 89
      }
    ]
  },
  {
    id: "seller-2",
    name: "Marta Tesfaye",
    businessName: "Marta's Crafts",
    email: "marta@example.com",
    phone: "+251 9X XXX XXXX",
    location: "Bahir Dar",
    productType: "Handmade Crafts",
    description: "Traditional Ethiopian handwoven baskets, scarves, and home decor items. Supporting local artisans and preserving cultural heritage.",
    profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    rating: 4.8,
    totalSales: 892,
    followers: 1890,
    verified: true,
    joinedDate: "2023-03-20",
    socialMedia: {
      telegram: "@martascrafts",
      tiktok: "tiktok.com/@martascrafts"
    },
    specialties: ["Handwoven Baskets", "Traditional Textiles", "Home Decor"],
    products: [
      {
        id: "prod-3",
        name: "Handwoven Basket",
        price: 450,
        image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=300&h=300&fit=crop",
        description: "Traditional handwoven basket made from natural materials",
        category: "Baskets",
        inStock: true,
        rating: 4.8,
        reviews: 67
      },
      {
        id: "prod-4",
        name: "Ethiopian Scarf",
        price: 320,
        image: "https://images.unsplash.com/photo-1601925260369-0a2b0a4a8a8a?w=300&h=300&fit=crop",
        description: "Beautiful traditional Ethiopian scarf",
        category: "Textiles",
        inStock: true,
        rating: 4.7,
        reviews: 43
      }
    ]
  },
  {
    id: "seller-3",
    name: "Rahel Worku",
    businessName: "Rahel's Fashion",
    email: "rahel@example.com",
    phone: "+251 9X XXX XXXX",
    location: "Dire Dawa",
    productType: "Fashion & Clothing",
    description: "Modern Ethiopian fashion with traditional influences. Creating contemporary clothing that celebrates Ethiopian culture.",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop",
    rating: 4.7,
    totalSales: 634,
    followers: 1456,
    verified: true,
    joinedDate: "2023-05-10",
    socialMedia: {
      telegram: "@rahelsfashion",
      tiktok: "tiktok.com/@rahelsfashion"
    },
    specialties: ["Traditional Dresses", "Modern Fashion", "Accessories"],
    products: [
      {
        id: "prod-5",
        name: "Ethiopian Traditional Dress",
        price: 3500,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
        description: "Beautiful traditional Ethiopian dress for special occasions",
        category: "Traditional Clothing",
        inStock: true,
        rating: 4.7,
        reviews: 23
      },
      {
        id: "prod-6",
        name: "Modern Ethiopian Blouse",
        price: 1200,
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=300&fit=crop",
        description: "Contemporary blouse with traditional Ethiopian patterns",
        category: "Modern Clothing",
        inStock: true,
        rating: 4.6,
        reviews: 18
      }
    ]
  },
  {
    id: "seller-4",
    name: "Tigist Haile",
    businessName: "Tigist's Beauty",
    email: "tigist@example.com",
    phone: "+251 9X XXX XXXX",
    location: "Hawassa",
    productType: "Beauty & Cosmetics",
    description: "Natural Ethiopian beauty products using traditional ingredients. Organic skincare and cosmetics for modern women.",
    profileImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop",
    rating: 4.6,
    totalSales: 456,
    followers: 1234,
    verified: true,
    joinedDate: "2023-07-08",
    socialMedia: {
      telegram: "@tigistsbeauty",
      tiktok: "tiktok.com/@tigistsbeauty"
    },
    specialties: ["Natural Skincare", "Traditional Cosmetics", "Organic Products"],
    products: [
      {
        id: "prod-7",
        name: "Natural Face Cream",
        price: 680,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop",
        description: "Organic face cream with traditional Ethiopian ingredients",
        category: "Skincare",
        inStock: true,
        rating: 4.6,
        reviews: 34
      }
    ]
  },
  {
    id: "seller-5",
    name: "Almaz Bekele",
    businessName: "Almaz's Kitchen",
    email: "almaz@example.com",
    phone: "+251 9X XXX XXXX",
    location: "Gondar",
    productType: "Food & Beverages",
    description: "Traditional Ethiopian spices, herbs, and cooking ingredients. Preserving authentic Ethiopian culinary traditions.",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    rating: 4.8,
    totalSales: 789,
    followers: 1678,
    verified: true,
    joinedDate: "2023-02-28",
    socialMedia: {
      telegram: "@almazskitchen",
      tiktok: "tiktok.com/@almazskitchen"
    },
    specialties: ["Spices", "Traditional Herbs", "Cooking Ingredients"],
    products: [
      {
        id: "prod-8",
        name: "Berbere Spice Mix",
        price: 250,
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
        description: "Authentic Ethiopian berbere spice mix",
        category: "Spices",
        inStock: true,
        rating: 4.8,
        reviews: 45
      }
    ]
  }
];

export const productCategories = [
  "All",
  "Food & Beverages", 
  "Handmade Crafts",
  "Fashion & Clothing",
  "Beauty & Cosmetics",
  "Home & Garden",
  "Electronics",
  "Books & Education",
  "Health & Wellness"
];

export const getSellerById = (id: string): Seller | undefined => {
  return sampleSellers.find(seller => seller.id === id);
};

export const getSellersByCategory = (category: string): Seller[] => {
  if (category === "All") return sampleSellers;
  return sampleSellers.filter(seller => seller.productType === category);
};
