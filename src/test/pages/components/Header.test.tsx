import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "@/components/Header";

describe("Header component", () => {
  it("Should Render the correct h1 title", () => {
    render(<Header />);
    expect(screen.getByText(/CubeHabits/i)).toBeInTheDocument();
  });
});
