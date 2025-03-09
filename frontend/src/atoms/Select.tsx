import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import ReactSelect, { type Props as SelectProps } from "react-select";

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
