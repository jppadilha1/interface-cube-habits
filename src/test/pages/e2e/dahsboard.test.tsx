import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Dashboard from "@/app/dashboard/page";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/dashboard"),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

const mockRegister = jest.fn().mockResolvedValue(undefined);
const mockFindAll = jest.fn().mockResolvedValue([]);

jest.mock("@/core/factories/makeHabitLogsUseCases", () => ({
  makeHabitLogUseCase: jest.fn(() => ({
    register: { execute: mockRegister },
    findAll: { execute: mockFindAll },
  })),
}));

jest.mock("@/components/AllHabitsChart", () => ({
  __esModule: true,
  default: ({ logsByHabit }: any) => (
    <div data-testid="all-habits-chart">
      All Habits Chart - {logsByHabit.length} habits
    </div>
  ),
}));

jest.mock("@/components/Streak", () => ({
  __esModule: true,
  default: ({ streak }: any) => (
    <div data-testid="streak-chart">Streak: {streak}</div>
  ),
}));

jest.mock("@/context/AuthContext", () => ({
  AuthGuard: ({ children }: any) => <>{children}</>,
}));

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

const mockHabits = [
  {
    id: "1",
    userId: "test-user-id",
    description: { value: "Ler 10 páginas" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    userId: "test-user-id",
    description: { value: "Fazer exercícios" },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

jest.mock("@/hooks/useUserHabits", () => ({
  useUserHabits: () => ({
    habits: mockHabits,
    fetchHabits: jest.fn(),
    userId: { id: "test-user-id", username: "Test User" },
  }),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    mockLocalStorage.setItem(
      "user",
      JSON.stringify({
        id: "test-user-id",
        username: "Test User",
      })
    );
    jest.clearAllMocks();
  });

  it("should render the dashboard with user habits", () => {
    render(<Dashboard />);

    expect(screen.getByText("Check your 1% better!")).toBeInTheDocument();
    expect(screen.getByText("Ler 10 páginas")).toBeInTheDocument();
    expect(screen.getByText("Fazer exercícios")).toBeInTheDocument();

    const doneButtons = screen.getAllByRole("button", { name: "Done" });
    expect(doneButtons).toHaveLength(2);
  });

  it("should render empty state when no habits", () => {
    jest
      .spyOn(require("@/hooks/useUserHabits"), "useUserHabits")
      .mockReturnValue({
        habits: [],
        fetchHabits: jest.fn(),
        userId: { id: "test-user-id", username: "Test User" },
      });

    render(<Dashboard />);

    expect(screen.getByText("Nenhum hábito cadastrado")).toBeInTheDocument();
  });

  it("should mark habit as done and update streak", async () => {
    mockFindAll.mockResolvedValue([{ id: "log1" }, { id: "log2" }]);

    render(<Dashboard />);

    expect(screen.getByText("Streak: 0")).toBeInTheDocument();

    const doneButtons = screen.getAllByRole("button", { name: "Done" });
    fireEvent.click(doneButtons[0]);

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(
        expect.objectContaining({
          habitId: "1",
        })
      );
    });

    await waitFor(() => {
      expect(screen.getByText("Streak: 1")).toBeInTheDocument();
    });

    await waitFor(() => {
      const visibleDoneButtons = screen.getAllByRole("button", {
        name: "Done",
      });
      expect(visibleDoneButtons).toHaveLength(1);
    });
  });

  it("should render charts components", () => {
    render(<Dashboard />);

    expect(screen.getByTestId("all-habits-chart")).toBeInTheDocument();
    expect(screen.getByTestId("streak-chart")).toBeInTheDocument();
  });

  it("should render link to Habit Manager", () => {
    render(<Dashboard />);

    const link = screen.getByRole("link", { name: "Habit Manager" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
