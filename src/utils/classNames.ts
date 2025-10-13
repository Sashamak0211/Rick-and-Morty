type TClassesValue = string | undefined | null | false;

export function classNames(...classes: TClassesValue[]): string {
  return classes
    .filter(
      (className): className is string =>
        typeof className === "string" && className.trim() !== ""
    )
    .join(" ");
}
