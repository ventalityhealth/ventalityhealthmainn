"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  customerAccessTokenCreate,
  customerCreate,
  customerAccessTokenDelete,
  getCustomer,
} from "@/lib/shopify";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders?: unknown;
}

interface AuthContextValue {
  customer: Customer | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
  ) => Promise<{ success: boolean; requiresVerification?: boolean }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const TOKEN_KEY = "vnt_customer_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      getCustomer(token).then((data: unknown) => {
        const d = data as { customer?: Customer };
        if (d?.customer) setCustomer(d.customer);
      });
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await customerAccessTokenCreate({ email, password });
        const d = data as {
          customerAccessTokenCreate?: {
            customerAccessToken?: { accessToken: string };
            customerUserErrors?: { message: string }[];
          };
        };
        const token = d?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
          const customerData = await getCustomer(token);
          const cd = customerData as { customer?: Customer };
          if (cd?.customer) setCustomer(cd.customer);
          return true;
        } else {
          const err = d?.customerAccessTokenCreate?.customerUserErrors?.[0]?.message;
          setError(err ?? "Invalid email or password");
          return false;
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
      firstName?: string,
      lastName?: string
    ) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await customerCreate({ email, password, firstName, lastName });
        const d = data as {
          customerCreate?: {
            customer?: Customer;
            customerUserErrors?: { code: string; message: string }[];
          };
        };
        const errors = d?.customerCreate?.customerUserErrors;
        if (errors && errors.length > 0) {
          setError(errors[0].message);
          return { success: false };
        }
        const autoLogin = await login(email, password);
        return { success: true, requiresVerification: !autoLogin };
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      await customerAccessTokenDelete(token);
      localStorage.removeItem(TOKEN_KEY);
    }
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ customer, isLoading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
