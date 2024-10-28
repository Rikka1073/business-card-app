import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { User } from "../domain/User";
import Home from "../components/Home";
import Card from "../components/Card";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";

const mockData = jest
  .fn()
  .mockResolvedValue([
    new User(
      "Masafumi",
      "よろしくお願いします",
      "test_id",
      "test_id",
      "test_id",
      "user_id",
      "TypeScript"
    ),
  ]);

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllUsersData: () => mockData(),
  };
});

describe("Component", () => {
  it("タイトルがあること", async () => {
    render(<Home />);
    const title = screen.getByTestId("titleId");
    expect(title).toBeInTheDocument();
  });

  it("名前があること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userName = screen.getByTestId("userName");
    expect(userName).toBeInTheDocument();
    screen.debug();
  });
});
