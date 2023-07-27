import { MOCK_DATA } from "src/mocks/data";

export const getMockUser = (override?: Partial<typeof MOCK_DATA["user"]>) => {
  return { ...MOCK_DATA["user"], ...override };
};
