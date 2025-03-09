export function Text({ variant = "body", children }) {
  const variants = {
    title: "text-2xl font-bold",
    subtitle: "text-lg font-semibold",
    body: "text-base",
  };
  return <p className={variants[variant]}>{children}</p>;
}
