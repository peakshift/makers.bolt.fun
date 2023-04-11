import { fireEvent, render, screen } from "src/utils/testing";
import CreateStoryPage from "./CreateStoryPage";

describe("Write Story Page", () => {
  test("Shows error messages", async () => {
    render(<CreateStoryPage />);
    const title = screen.getByRole("textbox", { name: /Story title/i });
    const submitBtn = screen.getByRole("button", { name: /Publish/i });

    expect(title).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);

    expect(
      await screen.findByText(/Error: title is a required field/i)
    ).toBeInTheDocument();
  });
});
