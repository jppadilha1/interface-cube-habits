import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Main } from "@/components/Main";

// Mock  next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

// Mock do makeHabitUseCases
const mockHabits: any[] = [];
const mockCreate = jest.fn((habit) => {
  mockHabits.push(habit);
  return Promise.resolve();
});
const mockReadAll = jest.fn(() => Promise.resolve(mockHabits));
const mockUpdate = jest.fn().mockResolvedValue(undefined);
const mockDelete = jest.fn().mockResolvedValue(undefined);

jest.mock("@/core/factories/makeHabitUseCases", () => ({
  makeHabitUseCases: jest.fn(() => ({
    create: { execute: mockCreate },
    readAll: { execute: mockReadAll },
    update: { execute: mockUpdate },
    delet: { execute: mockDelete },
  })),
}));

// Mock do localStorage
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

const mockFetchHabits = jest.fn();

// mock Hook useUserHabits
jest.mock("@/hooks/useUserHabits", () => ({
  useUserHabits: () => ({
    habits: mockHabits,
    fetchHabits: mockFetchHabits,
    userId: { id: "test-user-id", username: "Test User" },
    setHabits: jest.fn(),
    user: '{"id":"test-user-id","username":"Test User"}',
    setUser: jest.fn(),
  }),
}));

describe("CRUD Habits", () => {
  beforeEach(() => {
    mockLocalStorage.clear();
    mockLocalStorage.setItem(
      "user",
      JSON.stringify({
        id: "test-user-id",
        username: "Test User",
      })
    );
  });

  it("Add a Habit (Create)", async () => {
    render(<Main />);

    expect(screen.getByRole("list")).toBeInTheDocument();

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Ler 5 páginas de um livro todos os dias" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Add" }));
    });

    expect(screen.getByRole("listitem")).toBeInTheDocument();
  });

  it("fetch User Habits (Read)", async () => {
    render(<Main />);

    await waitFor(() => {
      expect(mockFetchHabits).toHaveBeenCalled();
    });
  });

  it("Change a habit (Update)", async () => {
    render(<Main />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Ler 5 páginas de um livro todos os dias" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Add" }));
    });

    const updatebtn = screen.getByTestId("update-habit");
    fireEvent.click(updatebtn);

    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  });

  it("delete a habit (Delete)", async () => {
    render(<Main />);

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Ler 5 páginas de um livro todos os dias" },
    });
    await waitFor(() => {
      fireEvent.click(screen.getByRole("button", { name: "Add" }));
    });

    const deletebtn = screen.getAllByTestId("delete-habit");
    fireEvent.click(deletebtn[0]);

    const confirmBtn = screen.getByText("Deletar");
    expect(confirmBtn).toBeInTheDocument();

    fireEvent.click(confirmBtn);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
