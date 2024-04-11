export interface User {
  id: number;
  name: string;
  avatar?: string;
  status?: string;
}

export interface Message {
  fromId: number;
  toId: number;
  text: string;
  timestamp: Date;
}
