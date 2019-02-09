export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
  points: number;
}

export interface Contact {
  user1_id: string;
  user2_id: string;
}

export interface Group {
  id: string;
  start_date: Date;
  end_date: Date;
  points_earned: number;
}

export interface ParticipatesIn {
  user_id: string;
  group_id: string;
}
