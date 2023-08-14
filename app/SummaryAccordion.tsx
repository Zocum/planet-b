import { useRef, useEffect, useState } from 'react';
import { AccordionComponentProps } from '@/types';

export default function Accordion({ children }: AccordionComponentProps) {
  const detailsRef = useRef<HTMLDetailsElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!detailsRef.current) return;

    const el = detailsRef.current;
    const summary = el.querySelector('summary') as HTMLElement;
    const content = el.querySelector('.content') as HTMLElement;

    let animation: Animation | null = null;
    let isClosing = false;
    let isExpanding = false;

    const onClick = (e: MouseEvent) => {
        // Stop default behaviour from the browser
        e.preventDefault();
        // Add an overflow on the <details> to avoid content overflowing
        el.style.overflow = 'hidden';
        // Check if the element is being closed or is already closed
        if (isClosing || !el.open) {
            open();
            setIsOpen(true);
        // Check if the element is being openned or is already open
        } else if (isExpanding || el.open) {
            shrink();
            setIsOpen(false);
        }
    };

    const shrink = () => {
       // Set the element as "being closed"
        isClosing = true;

        // Store the current height of the element
        const startHeight = `${el.offsetHeight}px`;
        // Calculate the height of the summary
        const endHeight = `${summary.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        animation = el.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            // If the duration is too slow or fast, you can change it here
            duration: 400,
            // You can also change the ease of the animation
            easing: 'ease-out'
        });

        // When the animation is complete, call onAnimationFinish()
        animation.onfinish = () => onAnimationFinish(false);
        // If the animation is cancelled, isClosing variable is set to false
        animation.oncancel = () => isClosing = false;
    };

    const open = () => {
      // Apply a fixed height on the element
        el.style.height = `${el.offsetHeight}px`;
        // Force the [open] attribute on the details element
        el.open = true;
        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => expand());
    };

    const expand = () => {
       // Set the element as "being expanding"
        isExpanding = true;
        // Get the current fixed height of the element
        const startHeight = `${el.offsetHeight}px`;
        // Calculate the open height of the element (summary height + content height)
        const endHeight = `${summary.offsetHeight + content.offsetHeight}px`;

        // If there is already an animation running
        if (animation) {
            // Cancel the current animation
            animation.cancel();
        }

        // Start a WAAPI animation
        animation = el.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            // If the duration is too slow of fast, you can change it here
            duration: 400,
            // You can also change the ease of the animation
            easing: 'ease-out'
        });
        // When the animation is complete, call onAnimationFinish()
        animation.onfinish = () => onAnimationFinish(true);
        // If the animation is cancelled, isExpanding variable is set to false
        animation.oncancel = () => isExpanding = false;
    };

    const onAnimationFinish = (open: boolean) => {
       // Set the open attribute based on the parameter
       el.open = open;
        // Clear the stored animation
       animation = null;
        // Reset isClosing & isExpanding
       isClosing = false;
       isExpanding = false;
        // Remove the overflow hidden and the fixed height
       el.style.height = el.style.overflow = '';
    };

    const onClickOutside = (event: MouseEvent) => {
        if (el.open && !el.contains(event.target as Node)) {
            el.style.overflow = 'hidden';
            shrink();
            setIsOpen(false);
        }
    };

    // Add event listener for the summary click
    summary.addEventListener('click', onClick);

    // Add event listener for clicks outside of the accordion
    document.addEventListener('click', onClickOutside);

    // Cleanup the event listener when the component unmounts
    return () => {
      summary.removeEventListener('click', onClick);
      document.removeEventListener('click', onClickOutside);
    };

  }, []);

  return (
    <details ref={detailsRef} className={`${isOpen ? '-open' : ''}`}>
      {children}
    </details>
  );
};

