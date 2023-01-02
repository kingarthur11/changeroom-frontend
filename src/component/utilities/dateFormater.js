export const dateFormatter = (props) => {
  const newDate = new Date(props);
  return newDate.toDateString();
};
