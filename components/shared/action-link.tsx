import Link from "next/link";

type ActionLinkProps = {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  openInNewTab?: boolean;
};

export default function ActionLink({ href, children, className, style, openInNewTab = false }: ActionLinkProps) {
  const isExternal = /^(https?:\/\/|mailto:|tel:)/.test(href);

  if (isExternal || openInNewTab) {
    return (
      <a href={href} className={className} style={style} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}
