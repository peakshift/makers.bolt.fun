import { marked } from "marked";
import { isNullOrUndefined } from "./misc-helper-functions";

export function markdownToText(markdown: string) {
  const html = marked.parse(markdown);
  return html.replace(/<[^>]*>/g, "");
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
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function trimText(text: string | undefined | null, length: number) {
  if (!text) return "";
  return text.slice(0, length) + (text.length > length ? "..." : "");
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function capitalize(s?: string) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export const withHttp = (url: string) =>
  !/^https?:\/\//i.test(url) ? `http://${url}` : url;

export function formatHashtag(tag: string) {
  if (tag.startsWith("#")) return tag;
  return "#" + tag;
}
