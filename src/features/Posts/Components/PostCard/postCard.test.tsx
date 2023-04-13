import ConnectNostrAccountModal from "../Comments/CommentsWidget/components/ConnectNostrAccountModal/ConnectNostrAccountModal";
import { render } from "src/utils/testing";

test("renders the landing page", () => {
  render(<ConnectNostrAccountModal callbackAction={null as any} />);
});
