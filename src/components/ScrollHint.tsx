export function ScrollHint({
  children,
  className = "text-center",
}: {
  children: string;
  className?: string;
}) {
  return (
    <p className={`text-[10px] tracking-[0.38em] text-ivory/35 uppercase ${className}`}>
      {children}
    </p>
  );
}
