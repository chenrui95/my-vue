import './clickoutside.js';
import './footer-top.js';

const formatTime = (v) => {
  if (v < 10) {
    return `0${v}`;
  }
  return v;
};
export function getDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = formatTime(date.getMonth() + 1);
  const day = formatTime(date.getDate());
  const hour = formatTime(date.getHours());
  const minute = formatTime(date.getMinutes());
  const second = formatTime(date.getSeconds());
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
