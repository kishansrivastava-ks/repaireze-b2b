/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/ui/toast.jsx
import React, { createContext, useContext, useCallback, useState } from "react";
import { X } from "lucide-react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, description, duration = 3000 }) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, title, description }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastViewport>
        {toasts.map((toast) => (
          <Toast key={toast.id} onClose={() => removeToast(toast.id)}>
            <div className="flex justify-between items-start">
              <div>
                <ToastTitle>{toast.title}</ToastTitle>
                {toast.description && (
                  <ToastDescription>{toast.description}</ToastDescription>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </Toast>
        ))}
      </ToastViewport>
    </ToastContext.Provider>
  );
}

export function Toast({ children, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-4 min-w-[300px] transform transition-all duration-300 ease-in-out">
      {children}
    </div>
  );
}

export function ToastViewport({ children }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end">
      {children}
    </div>
  );
}

export function ToastTitle({ children }) {
  return <div className="font-medium text-gray-900">{children}</div>;
}

export function ToastDescription({ children }) {
  return <div className="text-sm text-gray-500 mt-1">{children}</div>;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return { toast: context.addToast };
}
