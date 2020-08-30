export const hasNoPersistance = (obj) => {
  return !Boolean(Object.keys(obj).length);
}