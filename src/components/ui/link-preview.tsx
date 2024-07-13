"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { encode } from "qss";
import React from "react";

import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  className?: string;
  height?: number;
  layout?: string;
  quality?: number;
  url: string;
  width?: number;
} & ({ imageSrc: string; isStatic: true } | { imageSrc?: never; isStatic?: false });

export const LinkPreview = ({
  children,
  className,
  height = 125,
  imageSrc = "",
  isStatic = false,
  layout = "fixed",
  quality = 50,
  url,
  width = 200,
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      colorScheme: "dark",
      embed: "screenshot.url",
      meta: false,
      screenshot: true,
      url,
      "viewport.deviceScaleFactor": 1,
      "viewport.height": height * 3,
      "viewport.isMobile": true,
      "viewport.width": width * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { damping: 15, stiffness: 100 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target) {
      const targetRect = target.getBoundingClientRect();
      const eventOffsetX = event.clientX - targetRect.left;
      const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
      x.set(offsetFromCenter);
    }
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <Image
            src={src}
            width={width}
            height={height}
            quality={quality}
            layout={layout}
            priority={true}
            alt="hidden image"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    damping: 20,
                    stiffness: 260,
                    type: "spring",
                  },
                  y: 0,
                }}
                exit={{ opacity: 0, scale: 0.6, y: 20 }}
                className="rounded-xl shadow-xl"
                style={{
                  x: translateX,
                }}
              >
                <Link
                  href={url}
                  className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <Image
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    quality={quality}
                    layout={layout}
                    priority={true}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Root>
    </>
  );
};
