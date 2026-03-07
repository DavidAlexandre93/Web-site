import { useEffect } from "react";

type ScriptProps = {
    src: string;
    strategy?: string;
};

export default function Script({ src }: ScriptProps) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);

    return null;
}
