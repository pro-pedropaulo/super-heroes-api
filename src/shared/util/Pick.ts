export const pick = <T extends string, O extends Record<T, unknown>>(
  object: O,
  keys: T[],
) => {
  return keys.reduce<Pick<O, T>>(
    (obj, key) => {
      if (object && object.hasOwnProperty(key)) {
        obj[key] = object[key];
      }
      return obj;
    },
    {} as Pick<O, T>,
  );
};
