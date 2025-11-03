// --- Company Model ---
// We define Company first since Product references it
export interface ICompany {
  _id: string;
  name: string;
  description: string;
  logo?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// --- User Model ---
export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin";
  isEmailVerified: boolean;
  dob?: Date;
  phone?: string;
  isPhoneVerified: boolean;
  nidNumber?: string;
  address?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  emiStatus: "not_applied" | "pending_review" | "approved" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

// --- Product Model ---
export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  imageUrl: string;
  brand: string;
  rating: number; // This is the average rating
  numReviews: number; // Total number of reviews
  isFeatured: boolean;
  company?: ICompany | string; // Can be a full object or just an ID
  createdAt: Date;
  updatedAt: Date;
}

// --- Review Model ---
export interface IReview {
  _id: string;
  user: IUser | string; // Can be a full user object or just an ID
  product: string; // Product ID
  rating: number;
  comment: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Order Sub-Models ---
export interface IOrderItem {
  _id?: string;
  product: string; // Product ID
  name: string;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IEmiInstallment {
  _id?: string;
  amount: number;
  dueDate: Date;
  status: "pending" | "paid";
  paidAt?: Date;
}

// --- Order Model ---
export interface IOrder {
  _id:string;
  user: string; // User ID
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  totalPrice: number;
  paymentMethod: "cod" | "online" | "emi";
  paymentStatus: "pending" | "paid" | "failed";
  paidAt?: Date;
  deliveryStatus: "pending" | "shipped" | "delivered";
  deliveredAt?: Date;
  emiDetails?: {
    totalPaid: number;
    installmentsRemaining: number;
    installments: IEmiInstallment[];
  };
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// --- Cart Model ---
export interface ICart {
  _id: string;
  user: string; // User ID
  items: {
    product: IProduct; // Populated product object
    quantity: number;
  }[];
}

// --- Wishlist Model ---
export interface IWishlist {
  _id: string;
  user: string; // User ID
  products: IProduct[]; // Array of populated product objects
}