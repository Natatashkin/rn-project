export const compareUserData = (incomingData, storegeData) => {
  const dataKeys = Object.values(incomingData);
  const userKeys = Object.values(storegeData);
  return dataKeys.every((item) => userKeys.includes(item));
};
