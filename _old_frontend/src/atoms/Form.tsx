import { zodResolver } from "@hookform/resolvers/zod";
import {
  type DefaultValues,
  type FieldValues,
  type UseFormRegister,
  useForm,
} from "react-hook-form";
import type { z } from "zod";
import { Form as ShadForm } from "@/lib/shadcn/generated/ui/form";

type Props<TFieldValues extends FieldValues> = {
  schema: z.ZodType<TFieldValues, TFieldValues>;
  defaultValues?: DefaultValues<TFieldValues>;
  onSubmit: (data: z.output<z.ZodType<TFieldValues>>) => void;
  className?: string;
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
  className,
}: Props<TFieldValues>): React.ReactNode {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const { register, handleSubmit } = form;

  return (
    <ShadForm {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className={className}>
        {children({ register })}
      </form>
    </ShadForm>
  );
}
