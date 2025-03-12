import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import ReactSelect, { type Props as SelectProps } from "react-select";

// TODO Refactor this, it's unsufferable
type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = SelectProps &
  Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
    label: string;
  };

export const Select = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Props<TFieldValues, TName>,
) => <ReactSelect {...props} />;

// export type Option<TValue = string, TLabel extends string = string> = {
//   value: TValue;
//   label: TLabel;
// };
