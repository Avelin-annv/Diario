export const handleError = (e) => {
  throw new Error(e?.response?.statusText || e?.message);
};
