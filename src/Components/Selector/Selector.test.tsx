import { render } from "@testing-library/react";

import { Selector } from "./Selector";

describe("Selector component", () => {
  it("render small size", () => {
    const { container } = render(<Selector />);
    const selectorEl = container.querySelector(".selector");
    expect(selectorEl).toBeInTheDocument();
    expect(selectorEl).not.toHaveClass("selector--large");
  });
});
