import { expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { ErrorSection } from "../ErrorSection";

describe("ErrorSection", () => {
  it("should render properly", () => {
    render(<ErrorSection />);

    screen.debug();
    expect(screen.getByText(/Ooops!, something went wrong!/i)).toBeInTheDocument();
  });
});
