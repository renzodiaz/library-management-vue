<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create new account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form @submit="onSubmit" :validation-schema="registerSchema">
        <!-- Full Name -->
        <div class="mb-3">
          <label for="full_name" class="block text-sm font-medium text-gray-600">Full name</label>
          <Field name="full_name" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="text"
              id="full_name"
              placeholder="Enter your name"
              :class="[
                'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
                'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
                errors.length
                  ? 'border border-red-500 outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600',
              ]"
            />
          </Field>
          <ErrorMessage name="full_name" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Email -->
        <div class="mb-3">
          <label for="email" class="block text-sm font-medium text-gray-600">Email address</label>
          <Field name="email" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="email"
              id="email"
              placeholder="Enter your email"
              :class="[
                'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
                'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
                errors.length
                  ? 'border border-red-500 outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600',
              ]"
            />
          </Field>
          <ErrorMessage name="email" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="block text-sm font-medium text-gray-600">Password</label>
          <Field name="password" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="password"
              id="password"
              placeholder="Enter password"
              :class="[
                'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
                'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
                errors.length
                  ? 'border border-red-500 outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600',
              ]"
            />
          </Field>
          <ErrorMessage name="password" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="password_confirmation" class="block text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <Field name="password_confirmation" v-slot="{ field, errors }">
            <input
              v-bind="field"
              type="password"
              id="password_confirmation"
              placeholder="Confirm password"
              :class="[
                'block w-full rounded-md px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400',
                'outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2',
                errors.length
                  ? 'border border-red-500 outline-red-500'
                  : 'outline-gray-300 focus:outline-indigo-600',
              ]"
            />
          </Field>
          <ErrorMessage name="password_confirmation" class="mt-1 text-sm text-red-600" />
        </div>

        <!-- Submit -->
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create account
          </button>
        </div>
      </Form>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Already have an account?
        {{ ' ' }}
        <RouterLink
          :to="{ name: 'Login' }"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign In!
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

const registerSchema = yup.object({
  full_name: yup.string().required('Full name is required').min(3, 'Name is too short'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
})

const onSubmit = (values) => {
  console.log('Register form ✅', values)
}
</script>
