import {
  FormControl,
  FormDescription,
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
    description?: string;
    className?: string;
  }
>;

export function EditableField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  label,
  description,
  name,
  control,
  className,
}: Props<TFieldValues, TName>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} className={className} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
