import { fireEvent, render, screen } from "@testing-library/react";
import { User } from "../domain/User";
import Home from "../components/Home";
import Card from "../components/Card";
import Register from "../components/Register";
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

const mockeNavigator = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockeNavigator,
}));

describe("Card", () => {
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
  });

  it("自己紹介があること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userDescription = screen.getByTestId("userDescription");
    expect(userDescription).toBeInTheDocument();
    screen.debug();
  });

  it("スキルがあること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userSkill = screen.getByTestId("userSkill");
    expect(userSkill).toBeInTheDocument();
    screen.debug();
  });

  it("Githubアイコンがあること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userGithub = screen.getByTestId("userGithub");
    expect(userGithub).toBeInTheDocument();
    screen.debug();
  });

  it("Qiitaアイコンがあること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userQiita = screen.getByTestId("userQiita");
    expect(userQiita).toBeInTheDocument();
    screen.debug();
  });

  it("Xアイコンがあること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const userX = screen.getByTestId("userX");
    expect(userX).toBeInTheDocument();
    screen.debug();
  });

  it("戻るボタンが押せて遷移できること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/user_id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const backButton = screen.getByTestId("backButton");
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockeNavigator).toHaveBeenCalledWith("/");

    screen.debug();
  });
});

describe("Register", () => {
  it("タイトルがあること", async () => {
    render(<Register />);
    const title = screen.getByTestId("registerTitleId");
    expect(title).toBeInTheDocument();
  });
});
