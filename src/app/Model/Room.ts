export interface Room {
    id: string;
    roomName: string;
    users: User[];
    votes: Vote[];
    createdBy: User;
    adminId: string;
  }
  
  export interface User {
    id: string;
    name: string;
    roomId: string;
    vote?: string;
  }
  
  export interface Vote {
    id: string;
    value: string;
    userId: string;
    roomId: string;
  }
  