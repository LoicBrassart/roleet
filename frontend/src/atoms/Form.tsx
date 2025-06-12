import { Form as ShadForm } from "@/lib/shadcn/generated/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldValues,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import type { z } from "zod";

type Props<TFieldValues extends FieldValues> = {
  schema: z.ZodType<TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  onSubmit: (data: z.output<z.ZodType<TFieldValues>>) => void;
  children: ({
    register,
  }: {
    register: UseFormRegister<TFieldValues>;
  }) => React.ReactNode;
};

export function Form<TFieldValues extends FieldValues>({
  children,
  schema,
  defaultValues,
  onSubmit,
}: Props<TFieldValues>): React.ReactNode {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { register, handleSubmit } = form;

  return (
    <ShadForm {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {children({ register })}
      </form>
    </ShadForm>
  );
}
