"use client";

import React from "react";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export function ToastProvider({ children }: Props) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        offset={16}
        gap={12}
        toastOptions={{
          duration: 6000,
          closeButton: true,
          classNames: {
            toast: "!flex !items-start !gap-3 !p-4",
            icon: "!m-0 !flex-shrink-0 !text-xl !mt-[2.5px]",
            closeButton:
              "!relative !transform-none !order-2 !p-0 " +
              "!bg-inherit hover:!bg-inherit !border-none [&>svg]:!w-4 [&>svg]:!h-4",
            content: "!flex-1 !w-full",
            info:
              "!bg-primary !text-white !border-primary " +
              "[&_[data-close-button]]:!text-white",
            success:
              "!bg-green-600 !text-white !border-green-600 " +
              "[&_[data-close-button]]:!text-white",
            warning:
              "!bg-amber-600 !text-white !border-amber-600 " +
              "[&_[data-close-button]]:!text-white",
            error:
              "!bg-destructive !text-white !border-destructive " +
              "[&_[data-close-button]]:!text-white",
          },
        }}
      />
    </>
  );
}
