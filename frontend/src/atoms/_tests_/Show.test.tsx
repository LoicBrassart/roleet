import { cleanup, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import { Show } from "../Show";

afterEach(() => {
  cleanup();
})

describe("Show", () => {
  it("should render children when condition is true", () => {
    render(
      <Show when={true}>
        <div>Content</div>
      </Show>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render fallback when condition is false", () => {
    render(
      <Show when={false} fallback={<div>Fallback</div>}>
        <div>Content</div>
      </Show>
    );

    expect(screen.getByText("Fallback")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should render children when condition is truthy", () => {
    render(
      <Show when="truthy">
        <div>Content</div>
      </Show>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should render fallback when condition is falsy", () => {
    render(
      <Show when={null} fallback={<div>Fallback</div>}>
        <div>Content</div>
      </Show>
    );

    expect(screen.getByText("Fallback")).toBeInTheDocument();
    expect(screen.queryByText("Content")).not.toBeInTheDocument();
  });

  it("should call children function with condition value", () => {
    const mockChildren = jest.fn();
    render(
      <Show when="test">
        {(whenValue) => mockChildren(whenValue)}
      </Show>
    );

    expect(mockChildren).toHaveBeenCalledWith("test");
  });

  it("should not call children function when condition is falsy", () => {
    const mockChildren = jest.fn();
    render(
      <Show when={false}>
        {(whenValue) => mockChildren(whenValue)}
      </Show>
    );

    expect(mockChildren).not.toHaveBeenCalled();
  });
});

