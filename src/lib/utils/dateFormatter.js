export function convertDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("id-ID", options);
}

export function convertTime(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };

  return date.toLocaleDateString("id-ID", options);
}

export function dateNow() {
  const date = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };

  return date.toLocaleDateString("id-ID", options);
}

export function timeNow() {
  const date = new Date();
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };

  return date.toLocaleString("id-ID", options);
}
