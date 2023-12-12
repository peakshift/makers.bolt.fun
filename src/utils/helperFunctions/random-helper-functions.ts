import React from "react";
import { nanoid } from "nanoid";

export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomItem<T>(...args: T[]): T {
  return args[Math.floor(Math.random() * args.length)];
}

export function randomItems(cnt: number, ...args: any[]) {
  return shuffle(args).slice(0, cnt);
}

export function shuffle<T>(_array: Array<T>) {
  let array = [..._array];
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function generateId() {
  // TODO: Change to proper generator
  return nanoid(6);
}

export function generateList(component: React.ReactElement, cnt: number) {
  return Array(cnt)
    .fill(0)
    .map((_, idx) => React.cloneElement(component, { key: idx }));
}

export function getPropertyFromUnknown<Value = string>(
  obj: unknown,
  prop: string | number | symbol
): Value | null {
  if (typeof obj === "object" && obj !== null && prop in obj)
    return (obj as any)[prop as any] as Value;
  return null;
}
