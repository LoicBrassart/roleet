import type { FieldPath, FieldValues, RegisterOptions } from "react-hook-form";
import ReactSelect, {
  type GroupBase,
  type OptionsOrGroups,
} from "react-select";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/shadcn/generated/ui/form";

type Props<
  Option,
  Group extends GroupBase<Option>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<RegisterOptions<TFieldValues, TName>, "pattern"> & {
  label: string;
  description?: string;
  options: OptionsOrGroups<Option, Group>;
  isMulti?: boolean;
  name: TName;

  pattern?: string;
};

export function Select<
  Option,
  Group extends GroupBase<Option>,
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  options,
  isMulti = false,
  name,
  ...rest
}: Props<Option, Group, TFieldValues, TName>) {
  return (
    <FormField
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <ReactSelect {...field} isMulti={isMulti} options={options} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
      name={name}
      {...rest}
    />
  );
}
