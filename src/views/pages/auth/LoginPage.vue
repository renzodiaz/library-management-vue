<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form @submit="onSubmit" :validation-schema="loginSchema">
        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="block text-sm font-medium text-gray-600">Email address</label>
          <Field name="email" v-slot="{ field, errors }">
            <input v-bind="field" type="email" id="email" autocomplete="email" placeholder="Enter your email" :class="[
              'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
              'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
              errors.length
                ? 'border border-red-500 outline-red-500'
                : 'outline-gray-300 focus:outline-indigo-600',
            ]" />
          </Field>
          <ErrorMessage name="email" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <Field name="password" v-slot="{ field, errors }">
            <input v-bind="field" type="password" id="password" autocomplete="current-password"
              placeholder="Enter your password" :class="[
                'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
                'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
                errors.length
                  ? 'border border-red-500 outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600',
              ]" />
          </Field>
          <ErrorMessage name="password" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Submit -->
        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Sign in
          </button>
        </div>
      </Form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <RouterLink :to="{ name: 'Register' }" class="font-semibold text-indigo-600 hover:text-indigo-500">
          Sign up now!
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from "@/stores/auth";
import { popAlert } from '@/utils/alerts';
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const router = useRouter()
const auth = useAuthStore()

const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
})

const onSubmit = async (values) => {
  try {
    await auth.login({ data: { ...values } })
    popAlert("Logged successfully!", "success", 3000);
    router.push({ name: "Dashboard" })
  } catch (error) {
    if (error.response) {
      // Server responded with 4xx/5xx
      if (error.response.status === 404) {
        popAlert(error.response.data?.error || "Rosource not found!");
      } else if (error.response.status === 401) {
        popAlert(error.response.data?.error || "Invalid credentials.");
      }  else if (error.response.status === 422) {
        popAlert(error.response.data?.error.message || "Invalid credentials.");
      } else {
        popAlert("Server error:", error.response.status);
      }
    } else {
      // Network or config error
      popAlert("Network/other error:", error);
    }
  }

}
</script>
