export interface User {
  _id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  balanceNum?: number; // extended property from json to help format the digits
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tags: string[];
  friends: Friend[];
  greeting: string;
  favoriteFruit: string;
}

export interface Friend {
  id: number;
  name: string;
}
