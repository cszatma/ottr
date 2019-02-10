import Location from './Location';

export default (
  checkLocation: Location,
  centerLocation: Location,
  km: number,
) => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerLocation.latitude) / 180.0) * ky;
  const dx = Math.abs(centerLocation.longitude - checkLocation.longitude) * kx;
  const dy = Math.abs(centerLocation.latitude - checkLocation.latitude) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};
