import React, { ComponentProps, ComponentType, Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomItem(...args: any[]) {
  return args[Math.floor(Math.random() * args.length)];
}

export function randomItems(cnt: number, ...args: any[]) {
  console.log(cnt);

  return shuffle(args).slice(0, cnt);
}

export function isMobileScreen() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export function numberFormatter(num?: number, digits = 1) {
  if (!num) return;

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

export function trimText(text: string, length: number) {
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
