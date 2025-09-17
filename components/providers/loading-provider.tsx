"use client";

import React from "react";
import { AppProgressProvider } from "@bprogress/next";
import { ProgressProvider } from "./progress-provider";

interface Props {
  children: React.ReactNode;
}

export function LoadingProvider({ children }: Props) {
  return (
    <AppProgressProvider
      height="5px"
      color="#5b21b6"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <ProgressProvider>{children}</ProgressProvider>
    </AppProgressProvider>
  );
}
