import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";

import { User } from "../domain/User";
import Card from "../components/Card";
import Register from "../components/Register";
import Home from "../components/Home";

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
  });
});

describe("Register", () => {
  beforeEach(() => {
    render(<Register />);
  });

  it("タイトルがあること", async () => {
    const title = screen.getByTestId("registerTitleId");
    expect(title).toBeInTheDocument();
  });

  it("登録ができること", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      );
    });
    const button = screen.getByTestId("entryButton");
    fireEvent.click(button);

    expect(mockeNavigator).toHaveBeenCalledWith("/");
  });

  it("IDがないときにエラーメッセージがでる", async () => {
    mockData.mockResolvedValue([new User("", "", "", "", "", "", "")]);

    await waitFor(() => expect(screen.getByTestId("inputId")).toBeInTheDocument());

    const inputId = screen.getByTestId("inputId");

    fireEvent.change(inputId, { target: { value: "" } });
    fireEvent.blur(inputId);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("errorMessageId");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("名前がないときにエラーメッセージがでる", async () => {
    mockData.mockResolvedValue([new User("", "", "", "", "", "", "")]);

    await waitFor(() => expect(screen.getByTestId("inputName")).toBeInTheDocument());

    const inputName = screen.getByTestId("inputName");

    fireEvent.change(inputName, { target: { value: "" } });
    fireEvent.blur(inputName);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("errorMessageName");
      expect(errorMessage).toBeInTheDocument();
    });
  });
});

describe("Home", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("タイトルがあること", async () => {
    const title = screen.getByTestId("homeTitleId");
    expect(title).toBeInTheDocument();
  });

  it("IDを入力してボタンを押すと街灯のものに遷移する", async () => {
    mockData.mockResolvedValue([
      new User(
        "Masafumi",
        "よろしくお願いします",
        "test_id",
        "test_id",
        "test_id",
        "sample-id",
        "TypeScript"
      ),
    ]);

    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/sample-id"]}>
          <Routes>
            <Route path="/cards/:id" element={<Card />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const searchId = screen.getByTestId("searchId");
    const button = screen.getByTestId("searchButton");
    expect(searchId).toBeInTheDocument();
    fireEvent.change(searchId, { target: { value: "sample-id" } });
    fireEvent.click(button);
  });

  it("IDを入力しないでボタンを押すとエラーメッセージが表示される", async () => {
    mockData.mockResolvedValue([new User("", "", "", "", "", "", "")]);

    await waitFor(() => expect(screen.getByTestId("searchId")).toBeInTheDocument());

    const searchId = screen.getByTestId("searchId");

    fireEvent.change(searchId, { target: { value: "" } });
    fireEvent.blur(searchId);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("errorMessageId");
      expect(errorMessage).toBeInTheDocument();
    });
    screen.debug();
  });

  it("新規登録はこちらを押すと/cards/registerに遷移する", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/cards/register"]}>
          <Routes>
            <Route path="/cards/register" element={<Register />} />
          </Routes>
        </MemoryRouter>
      );
    });

    const button = screen.getByTestId("newButton");
    fireEvent.click(button);
    screen.debug();
  });
});
