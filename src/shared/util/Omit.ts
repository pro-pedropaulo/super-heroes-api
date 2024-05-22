export const omit = <O, T extends keyof O>(
  object: {
    [k in keyof O]: O[k];
  },
  keys: T[],
) => {
  const omittedEntries = Object.entries(object).filter(
    ([k]) => !keys.includes(k as T),
  );
  return Object.fromEntries(omittedEntries) as Omit<O, T>;
};
