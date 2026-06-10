export interface ApiResponse<T> {
  data: T;
  total?: number;
  isSuccessful?: boolean;
  message?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  openingTime: string;
  closingTime: string;
  isActive: boolean;
}

export interface SpaceType {
  id: number;
  name: string;
  capacity: number;
  hourlyAllowed: boolean;
  isActive: boolean;
}

export interface Space {
  id: number;
  name: string;
  code: string;
  locationId: number;
  spaceTypeId: number;
  locationName: string;
  spaceTypeName: string;
  pricePerDay: number;
  pricePerHour: number;
  floor: string;
  description: string;
  imageUrl: string;
  amenities: string;
  status: string;
}

export interface Booking {
  id: number;
  userEmail: string;
  spaceName: string;
  startDateTime: string;
  endDateTime: string;
  totalAmount: number;
  bookingStatus: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  price: number;
  billingCycle: string;
  includesHours: number;
  isActive: boolean;
}

export interface Membership {
  id: number;
  userEmail: string;
  planName: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface Payment {
  id: number;
  userEmail: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  paidAt: string;
}

export interface Contact {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface GalleryImage {
  id: number;
  title: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}
