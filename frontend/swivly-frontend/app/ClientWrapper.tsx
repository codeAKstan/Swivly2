// app/ClientWrapper.tsx
"use client"; // Mark this as a Client Component

import { AuthProvider } from "./context/AuthContext";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}