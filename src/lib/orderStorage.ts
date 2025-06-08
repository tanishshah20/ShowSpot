import { Event } from './data';

interface Order {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketQty: number;
  ticketType: string;
  purchaseDate: string;
  total: number;
  status: 'upcoming' | 'past' | 'cancelled';
}

// Get all orders from localStorage
export const getAllOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const ordersJson = localStorage.getItem('userOrders');
    return ordersJson ? JSON.parse(ordersJson) : [];
  } catch (error) {
    console.error('Error getting orders from localStorage:', error);
    return [];
  }
};

// Add a new order to localStorage
export const addOrder = (order: Order): void => {
  if (typeof window === 'undefined') return;
  
  try {
    const orders = getAllOrders();
    orders.push(order);
    localStorage.setItem('userOrders', JSON.stringify(orders));
  } catch (error) {
    console.error('Error adding order to localStorage:', error);
  }
};

// Generate a unique order ID
export const generateOrderId = (): string => {
  return `ORD${Math.floor(Math.random() * 100000)}`;
};

// Create a new order from checkout data
export const createOrderFromCheckout = (
  eventId: string,
  eventName: string,
  eventDate: string,
  quantity: number,
  section: string,
  total: number
): Order => {
  return {
    id: generateOrderId(),
    eventId,
    eventName,
    eventDate,
    ticketQty: quantity,
    ticketType: section,
    purchaseDate: new Date().toISOString(),
    total,
    status: 'upcoming'
  };
};