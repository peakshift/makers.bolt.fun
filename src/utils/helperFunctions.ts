export function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomItem(...args: any[]) {
  return args[Math.floor(Math.random() * args.length)];
}

export function isMobileScreen() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}