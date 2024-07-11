export type TicketType = {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: number;
    progress: number;
    status: string;
    active: boolean;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
  };