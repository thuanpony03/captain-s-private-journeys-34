import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      gsap.to([cursor, follower], {
        scale: 2,
        duration: 0.3,
        ease: "power2.out"
      });

      // Magnetic pull effect
      const handleMagneticMove = (moveEvent: MouseEvent) => {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (moveEvent.clientX - centerX) * 0.3;
        const deltaY = (moveEvent.clientY - centerY) * 0.3;
        
        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out"
        });
      };

      target.addEventListener('mousemove', handleMagneticMove);
      (target as any).__magneticMove = handleMagneticMove;
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      
      gsap.to([cursor, follower], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      });

      if ((target as any).__magneticMove) {
        target.removeEventListener('mousemove', (target as any).__magneticMove);
      }
    };

    // Magnetic effect for buttons and links
    const magneticElements = document.querySelectorAll('button, a[href], .magnetic');
    
    magneticElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter as EventListener);
      el.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      magneticElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter as EventListener);
        el.removeEventListener('mouseleave', handleMouseLeave as EventListener);
        if ((el as any).__magneticMove) {
          el.removeEventListener('mousemove', (el as any).__magneticMove);
        }
      });
    };
  }, []);

  return (
    <>
      {/* Inner cursor dot */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-3 h-3 bg-secondary rounded-full pointer-events-none z-[9999] mix-blend-difference shadow-glow"
        style={{ left: '-6px', top: '-6px' }}
      />
      {/* Outer cursor ring */}
      <div
        ref={followerRef}
        className="hidden md:block fixed w-12 h-12 border-2 border-secondary/60 rounded-full pointer-events-none z-[9999] mix-blend-difference transition-all duration-100"
        style={{ left: '-24px', top: '-24px' }}
      />
    </>
  );
};

export default CustomCursor;
