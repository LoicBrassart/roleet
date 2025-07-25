import type React from "react";

type Props<T> = {
  title: string;
  data: T[];
  render: (item: T) => React.JSX.Element;
};

export function List<T>({ title, data, render }: Props<T>) {
  return (
    <>
      <h1 className="font-title text-white">{title}</h1>
      <ul className="space-y-4">{data.map(render)}</ul>
    </>
  );
}
