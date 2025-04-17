export const generateUniqueId = (data: any[]): number => {
  const ids = data.map((item) => item.id);
  const maxId = Math.max(...ids, 0);
  return maxId + 1;
};
