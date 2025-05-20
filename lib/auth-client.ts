"use client"

export const runtime = 'nodejs';

// Client-side authentication functions
export async function signIn(email: string, password: string) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  return response.json()
}

export async function signUp(email: string, password: string, firstName: string, lastName: string) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  })

  return response.json()
}

export async function signOut() {
  await fetch("/api/auth/logout", {
    method: "POST",
  })
}

