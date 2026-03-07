import { AnchorHTMLAttributes, ReactElement, cloneElement } from "react";

type LinkProps = {
    href: string;
    children: ReactElement;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Link({ href, children, ...props }: LinkProps) {
    if (children.type === "a") {
        return cloneElement(children, {
            href,
            ...props,
        });
    }

    return (
        <a href={href} {...props}>
            {children}
        </a>
    );
}
