<template>
  <VContainer class="flex justify-center pt-16">
    <Form
      @submit="onSubmit"
      :validation-schema="validationSchema"
      class="md:basis-2/5 xl:basis-1/5"
    >
      <VAlert variant="error" v-show="errorMessage" class="mb-6">
        {{ errorMessage }}
      </VAlert>
      <ValidatedInput
        v-for="{ name, label } in fields"
        :key="name"
        :name="name"
        :label="label"
        :placeholder="label"
        class="mb-10"
        :type="name.toLocaleLowerCase().includes('password') ? 'password' : 'text'"
      />
      <VButton type="submit" size="lg" block>Register</VButton>
    </Form>
  </VContainer>
</template>
<script lang="ts" setup>
import axios from 'axios'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useValidationSchema } from '@/composables/useValidationSchema'

const router = useRouter()
const errorMessage = ref<string>()
const { validationSchema } = useValidationSchema([
  'firstName',
  'lastName',
  'email',
  'password',
  'confirmPassword'
])

const onSubmit = async (values: { [key: string]: string | null }) => {
  try {
    await axios.post('/api/auth/signup', {
      ...values
    })

    router.push({ name: 'login' })
  } catch (err) {
    if (axios.isAxiosError(err)) {
      errorMessage.value = err.response?.data.message
    }
  }
}

interface Field {
  name: string
  label: string
}

const fields: Field[] = [
  {
    name: 'firstName',
    label: 'First Name'
  },
  {
    name: 'lastName',
    label: 'Last Name'
  },
  {
    name: 'email',
    label: 'Email'
  },
  {
    name: 'password',
    label: 'Password'
  },
  {
    name: 'confirmPassword',
    label: 'Confirm Password'
  }
]
</script>
