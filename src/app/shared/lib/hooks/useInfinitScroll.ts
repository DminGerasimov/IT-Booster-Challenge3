import { RefObject, useEffect, useRef } from "react"

interface UseInfinitScrollProps {
    callback: () => void
    triggerRef: RefObject<HTMLElement>
    wrapperRef: RefObject<HTMLElement>
}

export function useInfinitScroll({callback, triggerRef, wrapperRef}: UseInfinitScrollProps){

    useEffect(() => {
        const options = {
            root: wrapperRef.current,
            rootMargin: '0px',
            threshold: 1.0
        }
        const observer = new IntersectionObserver(([entry]) => {
            console.log('intersected');
        }, options);
        observer.observe(triggerRef.current);

        return () => {
            if (observer) {
                observer.unobserve(triggerRef.current);
            }
        }
    }, [callback, wrapperRef]);
}