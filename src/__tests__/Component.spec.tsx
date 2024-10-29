import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { User } from "../domain/User";
import Card from "../components/Card";
import Register from "../components/Register";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { act } from "react";
import Home from "../components/Home";
import { s } from "vite/dist/node/types.d-aGj9QkWt";

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

  // it("IDがないときにエラーメッセージがでる", async () => {
  //   mockData.mockResolvedValue([new User("", "", "", "", "", "", "")]);

  //   await waitFor(() => expect(screen.getByTestId("inputId")).toBeInTheDocument());

  //   const inputId = screen.getByTestId("inputId");

  //   fireEvent.change(inputId, { target: { value: "" } });
  //   fireEvent.blur(inputId);

  //   await waitFor(() => {
  //     const errorMessage = screen.getByTestId("errorMessageId");
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  //   screen.debug();
  // });

  // it("名前がないときにエラーメッセージがでる", async () => {
  //   mockData.mockResolvedValue([new User("", "", "", "", "", "", "")]);

  //   await waitFor(() => expect(screen.getByTestId("inputName")).toBeInTheDocument());

  //   const inputName = screen.getByTestId("inputName");

  //   fireEvent.change(inputName, { target: { value: "" } });
  //   fireEvent.blur(inputName);

  //   await waitFor(() => {
  //     const errorMessage = screen.getByTestId("errorMessageName");
  //     expect(errorMessage).toBeInTheDocument();
  //   });

  //   screen.debug();
  // });
});
