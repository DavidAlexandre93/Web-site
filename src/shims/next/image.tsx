import { CSSProperties, ImgHTMLAttributes } from "react";

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    layout?: "fill" | "fixed" | "intrinsic" | "responsive";
    objectFit?: CSSProperties["objectFit"];
    objectPosition?: CSSProperties["objectPosition"];
    priority?: boolean;
};

export default function Image({
    layout,
    objectFit,
    objectPosition,
    style,
    width,
    height,
    ...props
}: ImageProps) {
    const mergedStyle: CSSProperties = {
        objectFit,
        objectPosition,
        ...style,
    };

    if (layout === "fill") {
        Object.assign(mergedStyle, {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
        });
    }

    return <img {...props} width={width as number | string | undefined} height={height as number | string | undefined} style={mergedStyle} />;
}
