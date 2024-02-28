<template>
  <VContainer class="flex justify-center items-center h-full">
    <Form @submit="onSubmit" :validation-schema="validationSchema">
      <VAlert variant="success" v-show="success" class="mb-6"> Password has been changed. </VAlert>
      <ValidatedInput
        type="password"
        name="password"
        placeholder="New Password"
        label="New Password"
        class="mb-6"
      />
      <ValidatedInput
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        label="Confirm Password"
        class="mb-6"
      />
      <VButton size="lg" block>Change Password</VButton>
    </Form>
  </VContainer>
</template>
<script lang="ts" setup>
import { useValidationSchema } from '@/composables/useValidationSchema'
import axios from 'axios'
import { Form } from 'vee-validate'
import { ref } from 'vue'

const success = ref(false)
const { validationSchema } = useValidationSchema(['password', 'confirmPassword'])

const onSubmit = async (values: { [key: string]: string | null }) => {
  success.value = true
  try {
    const data = await axios.patch('/users/update-password', {
      ...values
    })

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}
</script>
