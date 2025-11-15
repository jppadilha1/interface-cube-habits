import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";
import { AuthGuard } from "@/context/AuthContext";
import { AuthProvider } from "@/context/AuthContext";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegisterForm";

jest.mock("next/navigation", () => ({ useRouter: jest.fn() }));

describe("Auth Guard", () => {
  it("Should redirect to /register if not logged", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(
      <AuthProvider>
        <AuthGuard>
          <div>Teste sem o state isLoggedIn</div>
        </AuthGuard>
      </AuthProvider>
    );

    expect(push).toHaveBeenCalledWith("/register");
  });
});

describe("Login Page", () => {
  it("should register a user and then log in", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { rerender } = render(
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/login");
    });

    rerender(
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Password@123" },
    });

    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Sign In" }));
    });

    await waitFor(
      () => {
        expect(push).toHaveBeenCalledWith("/");
      },
      { timeout: 2000 }
    );
  });
});
