import type { LoginForm } from "@/types/UserTypes";

const runtimeConfig = useRuntimeConfig()
const API_LINK = runtimeConfig.public.apiBase;

export const login = async (form: LoginForm) =>
  $fetch<{ token: string }>(API_LINK + "/login", {
    method: "POST",
    body: form
  });


