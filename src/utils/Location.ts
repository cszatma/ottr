import { User } from '../types/models';

export default class Location {
  public latitude: number;
  public longitude: number;

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  public static ofUser(user: User): Location {
    return new Location(user.latitude, user.longitude);
  }
}
