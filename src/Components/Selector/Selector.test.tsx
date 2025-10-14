import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { Selector } from "./Selector";

describe("Selector component", () => {
  it("render small size", () => {
    const mock = vi.fn();
    const { container } = render(
      <Selector value="cvcb" onChange={mock} placeholder="asd" />
    );
    const selectorEl = container.querySelector(".selector");
    expect(selectorEl).toBeInTheDocument();
    expect(selectorEl).not.toHaveClass("selector--large");
  });
  it("render large size", () => {
    const mock = vi.fn();
    const { container } = render(
      <Selector value="cvcb" onChange={mock} placeholder="asd" size="large" />
    );
    const selectorEl = container.querySelector(".selector");
    expect(selectorEl).toBeInTheDocument();
    expect(selectorEl).toHaveClass("selector--large");
  });
  it("placeholder text", () => {
    const mock = vi.fn();
    render(
      <Selector
        value={null}
        onChange={mock}
        placeholder="Test text"
        size="large"
      />
    );
    const placeholderText = screen.getByText("Test text");
    expect(placeholderText).toBeInTheDocument();
    expect(placeholderText).toHaveTextContent("Test text");
  });
});
