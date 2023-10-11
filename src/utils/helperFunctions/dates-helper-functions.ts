import dayjs from "dayjs";

export function getDateDifference(
  date: string,
  { dense }: { dense?: boolean } = {}
) {
  const now = dayjs();
  const mins = now.diff(date, "minute");
  if (mins < 60) return mins + (dense ? "m" : " minutes");

  const hrs = now.diff(date, "hour");
  if (hrs < 24) return hrs + (dense ? "h" : " hours");

  const days = now.diff(date, "day");
  if (days < 30) return days + (dense ? "d" : " days");

  const months = now.diff(date, "month");
  return months + (dense ? "mo" : " months");
}

export const getSpanDate = (_date1: string, _date2: string) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const isSameMonth = date1.getMonth() === date2.getMonth();
  if (!isSameMonth)
    return `${dayjs(_date1).format("Do MMM")} - ${dayjs(_date2).format(
      "Do MMM"
    )}`;

  const isSameDay = date1.getDate() === date2.getDate();
  if (!isSameDay)
    return `${dayjs(_date1).format("Do")} - ${dayjs(_date2).format("Do MMM")}`;
  // Same Day
  return `${dayjs(_date1).format("H:mm")} - ${dayjs(_date2).format(
    "H:mm, Do MMM"
  )}`;
};
