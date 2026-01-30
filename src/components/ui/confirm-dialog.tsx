"use client";

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
}

interface ConfirmDialogContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export function useConfirmDialog() {
  const context = useContext(ConfirmDialogContext);
  if (!context) {
    throw new Error("useConfirmDialog must be used within a ConfirmDialogProvider");
  }
  return context;
}

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

export function ConfirmDialogProvider({ children }: ConfirmDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise((resolve) => {
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = () => {
    setIsOpen(false);
    resolvePromise?.(true);
    setResolvePromise(null);
    setOptions(null);
  };

  const handleCancel = () => {
    setIsOpen(false);
    resolvePromise?.(false);
    setResolvePromise(null);
    setOptions(null);
  };

  return (
    <ConfirmDialogContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleCancel}
          />
          <div className="relative z-50 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900">
              {options.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{options.message}</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={handleCancel}>
                {options.cancelText || "Cancel"}
              </Button>
              <Button
                className={cn(
                  options.variant === "danger"
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-[#C9A227] hover:bg-[#A88B1F] text-white"
                )}
                onClick={handleConfirm}
              >
                {options.confirmText || "Confirm"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ConfirmDialogContext.Provider>
  );
}
