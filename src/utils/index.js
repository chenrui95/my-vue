import './clickoutside.js';
import './footer-top.js';

const formatTime = (v) => {
  if (v < 10) {
    return `0${v}`;
  }
  return v;
};
export function getDate(origin) {
  const date = origin || new Date();
  const year = date.getFullYear();
  const month = formatTime(date.getMonth() + 1);
  const day = formatTime(date.getDate());
  const hour = formatTime(date.getHours());
  const minute = formatTime(date.getMinutes());
  const second = formatTime(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function sameDay(date1, date2) {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();
  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();
  return year1 === year2 && month1 === month2 && day1 === day2;
}
