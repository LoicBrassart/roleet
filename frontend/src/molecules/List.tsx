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
      <ul className="space-y-4">
        {data.map((item, index) => {
          // TODO: trouver une meilleure solution pour la key. Hint: message de Forth le 28/07/25 à 22:11
          // biome-ignore lint/suspicious/noArrayIndexKey: Not optimal, but since this component is not meant to be used with rapidly-updated lists it shouldn't be a problem
          return <li key={index}>{render(item)}</li>;
        })}
      </ul>
    </>
  );
}
