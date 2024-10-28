import { render, screen, waitFor } from "@testing-library/react";
import Card from "../components/Card";

describe("Component", () => {
  it("Home", () => {
    render(<Card />);
    waitFor(() => {
      const title = screen.getByTestId("userName");
      expect(title).toBeInTheDocument();
    });
  });
});
