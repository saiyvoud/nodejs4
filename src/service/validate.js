export const ValidateData = (data) => {
  return Object.keys(data).filter((key) => !data[key]); 
};
