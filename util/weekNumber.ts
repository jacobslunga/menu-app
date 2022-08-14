export function weekNumber(date: any = new Date()) {
  var oneJan: any = new Date(date.getFullYear(), 0, 1);
  var numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  var result = Math.ceil((date.getDay() - 1 + numberOfDays) / 7);
  return result;
}
