import { CONSTS } from "src/utils";

type PreferencesType = {
  showNostrCommentsTooltip: boolean;
  themeMode: "light" | "dark";
  nostr_relays_to_connect_to: string[];
};

const defaultPrefernces: PreferencesType = {
  showNostrCommentsTooltip: true,
  themeMode: "light",
  nostr_relays_to_connect_to: CONSTS.DEFAULT_RELAYS,
};

export default class Preferences {
  private static preferencesObject: PreferencesType;

  static init() {
    const str = localStorage.getItem("preferences");
    if (!str) this.preferencesObject = defaultPrefernces;
    else this.preferencesObject = { ...defaultPrefernces, ...JSON.parse(str) };
  }

  static update<T extends keyof PreferencesType>(
    key: T,
    value: PreferencesType[T]
  ) {
    if (!this.preferencesObject) this.init();
    this.preferencesObject[key] = value;
    localStorage.setItem("preferences", JSON.stringify(this.preferencesObject));
  }

  static get<T extends keyof PreferencesType>(key: T): PreferencesType[T] {
    if (!this.preferencesObject) this.init();
    return this.preferencesObject[key];
  }
}
