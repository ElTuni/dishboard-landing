"use server"

import { kv } from "@vercel/kv"
import type { FormData } from "formdata-node"

export async function addToWaitlist(prevState: any, formData: FormData) {
  const email = formData.get("email") as string

  // Basic email validation
  if (!email || !email.includes("@")) {
    return {
      message: "Por favor, ingresá un email válido.",
      success: false,
    }
  }

  try {
    // Add the email to a KV list. lpush adds it to the beginning of the list.
    await kv.lpush("waitlist_emails", email)

    return {
      message: "¡Gracias! Ya estás en la lista de espera.",
      success: true,
    }
  } catch (error) {
    console.error(error)
    return {
      message: "Hubo un error al registrarte. Por favor, intentá de nuevo.",
      success: false,
    }
  }
}
