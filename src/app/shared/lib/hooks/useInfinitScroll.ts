import { RefObject, useEffect, useRef } from "react"

interface UseInfinitScrollProps {
    callback: () => void
    triggerRef: RefObject<HTMLDivElement | null>
    wrapperRef: RefObject<HTMLDivElement | null>
    offCallback?: boolean
}

export function useInfinitScroll(
    {callback, triggerRef, wrapperRef, offCallback = false}: UseInfinitScrollProps
){
    useEffect(() => {
        const options = {
            // root: null,
            root: wrapperRef.current,
            rootMargin: '0px',
            threshold: 1.0
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !offCallback) {
                callback();
            }
        }, options);

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current);
            }}
    }, [callback, wrapperRef]);
}