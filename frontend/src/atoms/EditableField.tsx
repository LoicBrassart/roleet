import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/shadcn/generated/ui/form";
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { Input } from "./Input";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Prettify<
  Pick<ControllerProps<TFieldValues, TName>, "control" | "name"> & {
    label: string;
  } & {
    className?: string;
  }
>;

export function EditableField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ label, name, control, className }: Props<TFieldValues, TName>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input {...field} className={className} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
