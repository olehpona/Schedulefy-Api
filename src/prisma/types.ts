export type User = {
  name: string;
  id: number;
  email: string;
  createDate: Date;
  password: string;
  Schedules?: Schedule[];
};

export type Schedule = {
  name: string;
  id: number;
  price: string;
  daysAfter: number;
  lastPayDate: Date;
  user?: number;
};
