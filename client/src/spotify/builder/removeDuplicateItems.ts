type Params<T, U> = {
  sourceList: T[],
  additionalLists?: T[][],
  getUniqueAttribute?: (item: T) => U;
}

export default function removeDuplicateItems<T, U> (params: Params<T, U>): T[] {
  const getUniqueAttribute = params.getUniqueAttribute ?? (item => item);
  const additionalLists = params.additionalLists ?? [];

  const set = new Set();
  const result: T[] = [];

  for (const list of additionalLists) {
    for (const item of list) {
      const uniqueAttribute = getUniqueAttribute(item);
      set.add(uniqueAttribute);
    }
  }
 
  for (const item of params.sourceList) {
    const uniqueAttribute = getUniqueAttribute(item);
    if (!set.has(uniqueAttribute)) {
      set.add(uniqueAttribute);
      result.push(item);
    }
  }

  return result;
}