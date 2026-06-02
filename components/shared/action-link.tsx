import Link from "next/link";

type ActionLinkProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
};

export default function ActionLink({ href, className, children, openInNewTab = false }: ActionLinkProps) {
  const isExternal = /^https?:\/\//.test(href);

  if (isExternal || openInNewTab) {
    return (
      <a href={href} className={className} target={openInNewTab ? "_blank" : undefined} rel={openInNewTab ? "noopener noreferrer" : undefined}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
