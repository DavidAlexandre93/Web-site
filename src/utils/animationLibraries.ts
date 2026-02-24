export type MotionAnimation = (
    target: Element | string | Element[] | NodeList,
    keyframes: Record<string, number | string | Array<number | string>>,
    options?: Record<string, unknown>
) => { stop?: () => void } | void;

type GsapInstance = {
    registerPlugin?: (plugin: unknown) => void;
    timeline: (config?: Record<string, unknown>) => any;
    context: (callback: () => void, scope?: Element) => { revert: () => void };
    fromTo: (target: unknown, from: Record<string, unknown>, to: Record<string, unknown>) => void;
};

export const getGsap = (): GsapInstance | null => {
    if (typeof window === "undefined") {
        return null;
    }

    const customWindow = window as typeof window & {
        gsap?: GsapInstance;
        ScrollTrigger?: unknown;
    };

    if (customWindow.gsap?.registerPlugin && customWindow.ScrollTrigger) {
        customWindow.gsap.registerPlugin(customWindow.ScrollTrigger);
    }

    return customWindow.gsap ?? null;
};

export const getMotionAnimate = (): MotionAnimation | null => {
    if (typeof window === "undefined") {
        return null;
    }

    const motion = (window as typeof window & {
        Motion?: { animate?: MotionAnimation };
    }).Motion;

    return motion?.animate ?? null;
};
