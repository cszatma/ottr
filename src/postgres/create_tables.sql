CREATE TABLE ottr_user (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  points INTEGER DEFAULT 0
);

CREATE TABLE contact (
  user1_id UUID REFERENCES ottr_user (id),
  user2_id UUID REFERENCES ottr_user (id),
  PRIMARY KEY (user1_id, user2_id),
  CHECK (user1_id <> user2_id)
);

CREATE TABLE ottr_group (
  id UUID PRIMARY KEY,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  points_earned INTEGER
);

CREATE TABLE participates_in (
  user_id UUID REFERENCES ottr_user (id),
  group_id UUID REFERENCES ottr_group (id),
  PRIMARY KEY (user_id, group_id)
);
