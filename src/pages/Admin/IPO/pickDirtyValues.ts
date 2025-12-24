/* eslint-disable @typescript-eslint/no-explicit-any */
export const pickDirtyValues = <T extends Record<string, any>>(
  dirty: any,
  data: T
): Partial<T> => {
  const result: Partial<T> = {};

  Object.keys(dirty).forEach((key) => {
    const dirtyValue = dirty[key];
    const dataValue = data[key as keyof T];

    if (dirtyValue === true) {
      (result as any)[key] = dataValue;
      return;
    }

    if (
      typeof dirtyValue === "object" &&
      dirtyValue !== null &&
      !Array.isArray(dirtyValue)
    ) {
      (result as any)[key] = dataValue;
      return;
    }

    if (Array.isArray(dataValue)) {
      (result as any)[key] = dataValue;
    }
  });

  return result;
};
