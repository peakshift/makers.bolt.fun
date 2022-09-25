import dayjs from "dayjs";
import React, { ComponentProps, ComponentType, Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";
import { isNullOrUndefined } from "remirror";
import axios from 'axios'

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomItem<T>(...args: T[]): T {
  return args[Math.floor(Math.random() * args.length)];
}

export function randomItems(cnt: number, ...args: any[]) {
  return shuffle(args).slice(0, cnt);
}

export function isMobileScreen() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function numberFormatter(num?: number, digits = 1) {
  if (isNullOrUndefined(num)) return;

  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function (item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}



export function lazyModal<T extends ComponentType<any>>
  (impFn: () => Promise<{ default: T; }>,
    LoadingComponent?: (props: any) => JSX.Element) {
  const C = React.lazy(() => new Promise(res => setTimeout(() => {
    res(impFn() as any)
  }, 0))) // This promise wrapping is just for testing purposes
  const preload = impFn;
  const LazyComponent = ({ direction, ...props }: ComponentProps<T>) => <Suspense
    fallback={
      LoadingComponent ?
        <LoadingComponent direction={direction} {...props} />
        :
        <RotatingLines strokeColor='#ffffff' width="64" />
    }>
    <C direction={!LoadingComponent && direction} {...props} />
  </Suspense>

  return { LazyComponent, preload };
}

export function trimText(text: string | undefined | null, length: number) {
  if (!text) return '';
  return text.slice(0, length) + (text.length > length ? "..." : "")
}

export function generateId() {
  // TODO: Change to proper generator
  return Math.random().toString();
}

export function shuffle<T>(_array: Array<T>) {
  let array = [..._array]
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


export function generateList(component: React.ReactElement, cnt: number) {
  return Array(cnt).fill(0).map((_, idx) => React.cloneElement(component, { key: idx }))
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  ;
}

export function capitalize(s?: string) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export const withHttp = (url: string) => !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export function getPropertyFromUnknown<Value = string>(obj: unknown, prop: string | number | symbol): Value | null {
  if (typeof obj === 'object' && obj !== null && prop in obj)
    return (obj as any)[prop as any] as Value;
  return null
}

export function getDateDifference(date: string, { dense }: { dense?: boolean } = {}) {
  const now = dayjs();
  const mins = now.diff(date, 'minute');
  if (mins < 60)
    return mins + (dense ? 'm' : " minutes");

  const hrs = now.diff(date, 'hour');
  if (hrs < 24)
    return hrs + (dense ? 'h' : " hours");

  const days = now.diff(date, 'day');
  if (days < 30)
    return days + (dense ? 'd' : " days");

  const months = now.diff(date, 'month');
  return months + (dense ? 'mo' : " months")
}


export async function lightningAddressToPR(address: string, amount_in_sat: number) {

  // parse lightning address and return a url that can be
  // used in a request
  function lightningAddressToLnurl(lightning_address: string) {
    const [name, domain] = lightning_address.split("@");
    return `https://${domain}/.well-known/lnurlp/${name}`;
  }

  // when pressing tip or selecting an amount.
  // this is used for caching so the frontend doesnt
  // have to make an additional http request to get
  // the callback url for future visits
  async function getLnurlCallbackUrl(lightning_address: string) {
    return axios.get(lightningAddressToLnurl(lightning_address)).then(
      (response) => {
        return response.data.callback;
      }
    );
  }


  const amount = amount_in_sat * 1000; // msats
  let lnurlCallbackUrl = await getLnurlCallbackUrl(address);
  return axios
    .get(lnurlCallbackUrl, { params: { amount } })
    .then((prResponse) => {
      return prResponse.data.pr as string;
    });
}

export const getSpanDate = (_date1: string, _date2: string) => {
  const date1 = new Date(_date1);
  const date2 = new Date(_date2);

  const isSameMonth = date1.getMonth() === date2.getMonth();
  if (!isSameMonth)
    return `${dayjs(_date1).format('Do MMM')} - ${dayjs(_date2).format('Do MMM')}`

  const isSameDay = date1.getDay() === date2.getDay();
  if (!isSameDay)
    return `${dayjs(_date1).format('Do')} - ${dayjs(_date2).format('Do MMM')}`
  // Same Day
  return `${dayjs(_date1).format('H:mm')} - ${dayjs(_date2).format('H:mm, Do MMM')}`

}
