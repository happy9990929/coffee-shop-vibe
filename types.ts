
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Coffee' | 'Tea' | 'Bakery' | 'Seasonal';
  imageUrl: string;
  calories: number;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppView {
  Home = 'HOME',
  Menu = 'MENU',
  Checkout = 'CHECKOUT'
}
