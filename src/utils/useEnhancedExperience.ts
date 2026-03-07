import { useEffect } from "react";

const supportsReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const useEnhancedExperience = () => {
    useEffect(() => {
        if (typeof window === "undefined" || supportsReducedMotion()) {
            return;
        }

        const revealElements = Array.from(
            document.querySelectorAll<HTMLElement>("[data-reveal]")
        );

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-in-view");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -5% 0px",
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));

        const tiltElements = Array.from(
            document.querySelectorAll<HTMLElement>("[data-tilt]")
        );

        const handleTiltMove = (event: Event) => {
            const pointerEvent = event as PointerEvent;
            const currentTarget = pointerEvent.currentTarget as HTMLElement;
            const bounds = currentTarget.getBoundingClientRect();

            const relativeX = (pointerEvent.clientX - bounds.left) / bounds.width;
            const relativeY = (pointerEvent.clientY - bounds.top) / bounds.height;

            const rotateX = (0.5 - relativeY) * 10;
            const rotateY = (relativeX - 0.5) * 12;

            currentTarget.style.setProperty("--tilt-rotate-x", `${rotateX.toFixed(2)}deg`);
            currentTarget.style.setProperty("--tilt-rotate-y", `${rotateY.toFixed(2)}deg`);
            currentTarget.style.setProperty("--tilt-glow-x", `${(relativeX * 100).toFixed(2)}%`);
            currentTarget.style.setProperty("--tilt-glow-y", `${(relativeY * 100).toFixed(2)}%`);
        };

        const resetTilt = (event: Event) => {
            const currentTarget = event.currentTarget as HTMLElement;
            currentTarget.style.setProperty("--tilt-rotate-x", "0deg");
            currentTarget.style.setProperty("--tilt-rotate-y", "0deg");
            currentTarget.style.setProperty("--tilt-glow-x", "50%");
            currentTarget.style.setProperty("--tilt-glow-y", "50%");
        };

        tiltElements.forEach((element) => {
            element.addEventListener("pointermove", handleTiltMove);
            element.addEventListener("pointerleave", resetTilt);
        });

        const rippleElements = Array.from(
            document.querySelectorAll<HTMLElement>("[data-ripple]")
        );

        const handleRipple = (event: Event) => {
            const pointerEvent = event as PointerEvent;
            const currentTarget = pointerEvent.currentTarget as HTMLElement;
            const bounds = currentTarget.getBoundingClientRect();
            const ripple = document.createElement("span");

            ripple.className = "interaction-ripple";
            ripple.style.left = `${pointerEvent.clientX - bounds.left}px`;
            ripple.style.top = `${pointerEvent.clientY - bounds.top}px`;

            currentTarget.appendChild(ripple);

            window.setTimeout(() => {
                ripple.remove();
            }, 650);
        };

        rippleElements.forEach((element) => {
            element.addEventListener("pointerdown", handleRipple);
        });

        return () => {
            revealObserver.disconnect();

            tiltElements.forEach((element) => {
                element.removeEventListener("pointermove", handleTiltMove);
                element.removeEventListener("pointerleave", resetTilt);
            });

            rippleElements.forEach((element) => {
                element.removeEventListener("pointerdown", handleRipple);
            });
        };
    }, []);
};
