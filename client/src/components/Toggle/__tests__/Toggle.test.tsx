import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

import { Toggle } from "../Toggle";
import { render, screen } from "../../../utils/testUtils";

const LABEL_1 = "first label";
const LABEL_2 = "second label";
const VALUE_1 = "first value";
const VALUE_2 = "second value";

const OPTIONS = [
  { label: LABEL_1, value: VALUE_1 },
  { label: LABEL_2, value: VALUE_2 },
];

const mockedOnToggleClick = vi.fn();

const props = {
  options: OPTIONS,
  onToggleClick: mockedOnToggleClick,
};

describe("Toggle", () => {
  it("should render properly", () => {
    render(<Toggle {...props} />);

    OPTIONS.forEach((option) => expect(screen.getByText(option.label)).toBeInTheDocument());
  });

  it("should call onToggleClick with the correct id", async () => {
    const user = userEvent.setup();

    render(<Toggle {...props} />);

    const firstToggle = screen.getByRole("button", { name: LABEL_1 });

    const secondToggle = screen.getByRole("button", { name: LABEL_2 });

    await user.click(firstToggle);

    expect(mockedOnToggleClick).not.toHaveBeenCalled();

    await user.click(secondToggle);

    expect(mockedOnToggleClick).toHaveBeenCalledWith(VALUE_2);
  });
});
