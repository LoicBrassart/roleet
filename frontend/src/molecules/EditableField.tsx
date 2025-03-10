import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/shadcn/generated/ui/form";
import { Input } from "../atoms/Input";
// TODO type props
export function EditableField({ label, name, control }) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Input {...field} />
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
