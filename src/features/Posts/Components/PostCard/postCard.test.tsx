import { MOCK_DATA } from "src/mocks/data";
import PostCard from "./";
import { getPublicKey, nip19 } from "nostr-tools";
import ConnectNostrAccountModal from "../Comments/CommentsWidget/components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { render } from "src/utils/testing";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
const Comp = () => <div>Test</div>;

jest.mock("nostr-tools", () => ({
  getPublicKey: (str: string) => str,
  nip19: {},
}));

test("renders the landing page", () => {
  const routes = [
    {
      path: "/events/:id",
      element: <ConnectNostrAccountModal callbackAction={null as any} />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/", "/events/123"],
    initialIndex: 1,
  });

  render(<RouterProvider router={router} />);
});
