import axios from "axios";
import React, { ComponentProps, ComponentType, Suspense } from "react";
import { RotatingLines } from "react-loader-spinner";

export function isNullOrUndefined(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

export function removeArrayItemAtIndex<T>(arr: T[], indexToRemove: number) {
  return [...arr.slice(0, indexToRemove), ...arr.slice(indexToRemove + 1)];
}

export function extractErrorMessage(error: unknown) {
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  )
    return error.message;
  return null;
}

export function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function lazyModal<T extends ComponentType<any>>(
  impFn: () => Promise<{ default: T }>,
  LoadingComponent?: (props: any) => JSX.Element
) {
  const C = React.lazy(
    () =>
      new Promise((res) =>
        setTimeout(() => {
          res(impFn() as any);
        }, 0)
      )
  ); // This promise wrapping is just for testing purposes
  const preload = impFn;
  const LazyComponent = ({ direction, ...props }: ComponentProps<T>) => (
    <Suspense
      fallback={
        LoadingComponent ? (
          <LoadingComponent direction={direction} {...props} />
        ) : (
          <RotatingLines strokeColor="#ffffff" width="64" />
        )
      }
    >
      <C direction={!LoadingComponent && direction} {...props} />
    </Suspense>
  );

  return { LazyComponent, preload };
}

export async function lightningAddressToPR(
  address: string,
  amount_in_sat: number
) {
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
    return axios
      .get(lightningAddressToLnurl(lightning_address))
      .then((response) => {
        return response.data.callback;
      });
  }

  const amount = amount_in_sat * 1000; // msats
  let lnurlCallbackUrl = await getLnurlCallbackUrl(address);
  return axios
    .get(lnurlCallbackUrl, { params: { amount } })
    .then((prResponse) => {
      return prResponse.data.pr as string;
    });
}

export function toSort<T>(arr: T[], sortFn: (a: T, b: T) => number) {
  return [...arr].sort(sortFn);
}

export function overrideErrorMessage(msg: string, errorToOverride: any) {
  let err = new Error(msg);
  for (let prop in errorToOverride) {
    if (prop !== "message") {
      (err as any)[prop] = errorToOverride[prop];
    }
  }
  return err;
}

export function addOpacityToHexColor(color: string, opacity: number) {
  if (color.startsWith("#")) color = color.substring(1);

  //if it has an alpha, remove it
  if (color.length > 6) color = color.substring(0, color.length - 2);

  //if it is a 3 digit hex, convert to 6
  if (color.length === 3)
    color = color
      .split("")
      .map((h) => h + h)
      .join("");

  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  let opacityHex = _opacity.toString(16).toUpperCase();

  // opacities near 0 need a trailing 0
  if (opacityHex.length === 1) opacityHex = "0" + opacityHex;

  return "#" + color + opacityHex;
}
