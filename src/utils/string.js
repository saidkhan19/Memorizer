export function truncateText(text, maxLength) {
  return text.length > maxLength
    ? text.slice(0, maxLength).trim() + "..."
    : text;
}

export function formatTime(timeInMilliseconds) {
  const timeInSeconds = Math.floor(timeInMilliseconds / 1000);
  let minutes = Math.floor(timeInSeconds / 60);
  let seconds = timeInSeconds - minutes * 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return minutes + ":" + seconds;
}
