import { Fragment, type ReactNode } from "react";

export function renderRichText(text: string): ReactNode {
  const parts = text.split(/(\*\*.+?\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}
