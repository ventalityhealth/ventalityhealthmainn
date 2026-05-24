"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/shopify";

export default function AccountPage() {
  const { customer, isLoading, error, login, register, logout } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (mode === "login") {
      const ok = await login(email, password);
      if (!ok) setMessage(error ?? "Login failed");
    } else {
      const res = await register(email, password, firstName, lastName);
      if (res.requiresVerification) {
        setMessage("Account created. Check your email to verify your account.");
      } else if (!res.success) {
        setMessage(error ?? "Registration failed");
      }
    }
  };

  if (customer) {
    const orders = (customer as {
      orders?: { edges: { node: {
        id: string; name: string; orderNumber: number;
        totalPrice: { amount: string; currencyCode: string };
        processedAt: string; fulfillmentStatus: string;
        lineItems: { edges: { node: { title: string; quantity: number } }[] };
      } }[] };
    }).orders;

    return (
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-start justify-between mb-10">
            <div>
              <p className="label-sm text-white/30 mb-2">Account</p>
              <h1 className="text-3xl font-semibold text-white tracking-tight">
                Welcome, {customer.firstName || customer.email}
              </h1>
              <p className="text-white/40 text-sm mt-1">{customer.email}</p>
            </div>
            <button
              onClick={logout}
              className="text-white/30 hover:text-white text-sm transition-colors border border-white/10 px-4 py-2 rounded-sm hover:border-white/20"
            >
              Sign Out
            </button>
          </div>

          {/* Order History */}
          <div>
            <p className="label-sm text-white/30 mb-6">Order History</p>
            {!orders || orders.edges.length === 0 ? (
              <div className="border border-white/8 rounded-sm p-10 text-center">
                <p className="text-white/30 text-sm mb-4">No orders yet.</p>
                <Link
                  href="/shop"
                  className="text-white/50 hover:text-white text-sm underline transition-colors"
                >
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.edges.map(({ node: order }) => (
                  <div
                    key={order.id}
                    className="p-5 border border-white/8 rounded-sm bg-white/[0.01] hover:border-white/15 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-white font-medium text-sm">
                          Order {order.name}
                        </p>
                        <p className="text-white/35 text-xs mt-1">
                          {new Date(order.processedAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )}
                        </p>
                        <p className="text-white/30 text-xs mt-2">
                          {order.lineItems.edges
                            .map(
                              (e) =>
                                `${e.node.title} × ${e.node.quantity}`
                            )
                            .join(", ")}
                          {order.lineItems.edges.length >= 3 && "…"}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white text-sm font-medium">
                          {formatPrice(
                            order.totalPrice.amount,
                            order.totalPrice.currencyCode
                          )}
                        </p>
                        <span
                          className={`inline-block mt-1 label-xs px-2 py-0.5 rounded-full border ${
                            order.fulfillmentStatus === "FULFILLED"
                              ? "border-white/20 text-white/50"
                              : "border-white/10 text-white/30"
                          }`}
                        >
                          {order.fulfillmentStatus?.toLowerCase() ?? "processing"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="max-w-md mx-auto px-4 py-16">
        <p className="label-sm text-white/30 mb-3 text-center">Account</p>
        <h1 className="text-3xl font-semibold text-white tracking-tight text-center mb-8">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block label-xs text-white/35 mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jane"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                />
              </div>
              <div>
                <label className="block label-xs text-white/35 mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block label-xs text-white/35 mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
            />
          </div>

          <div>
            <label className="block label-xs text-white/35 mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/25"
            />
          </div>

          {message && (
            <p className="text-white/50 text-sm text-center py-2 border border-white/10 rounded-sm px-3">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black text-sm font-medium py-3 rounded-sm hover:bg-white/90 transition-colors tracking-wide disabled:opacity-50"
          >
            {isLoading
              ? "..."
              : mode === "login"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-center text-white/35 text-sm mt-6">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => { setMode("register"); setMessage(""); }}
                className="text-white/60 hover:text-white underline transition-colors"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("login"); setMessage(""); }}
                className="text-white/60 hover:text-white underline transition-colors"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
