import moment from "moment";
export const convertToDateAndTime = (date) => {
  const a = moment(date).format("DD MMM - hh:mm");
  return a;
};
