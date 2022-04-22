<template>
  <form class="card sign-up" id="registration">
    <h2 class="t-title">
      Sign Up
    </h2>
    <input-text
      v-model="username"
      placeholder="Username"
      type="username"
      max="16"
      :status="usernameStatus"
      :icon="userIcon"
      @input-focus="usernameFocused = true"
      @input-blur="usernameFocused = false"
    />
    <input-caption
      :visible="usernameFocused && usernameStatus !== 'success'"
      :list="[
        {
          status: username.length === 0 ? 'attention' :
            username.length >= 3 ? 'success' : 'caution',
          text: 'Username must be between 3 and 16 characters long'
        },
        {
          status: username.length === 0 ? 'attention' :
            /^[a-zA-ZА-Яа-я\d_]{0,16}$/.test(username) ? 'success' : 'caution',
          text: 'Username must consist of Latin letters, Cyrillic letters, digits or underscores'
        },
        {
          status: username.length === 0 ? 'attention' :
            /^(?!.*_{2})[^_].*[^_]$/.test(username) ? 'success' : 'caution',
          text: 'The username cannot start, end, or contain double underscores'
        },
        {
          status: username.length === 0 ? 'attention' : usernameUniqStatus,
          text: 'Username must be unique'
        }
      ]"
    />
    <input-text
      placeholder="E-Mail"
      v-model="email"
      type="email"
      max="64"
      autocomplete="email"
      :status="emailStatus"
      :icon="emailIcon"
      @input-focus="emailFocused = true"
      @input-blur="emailFocused = false"
    />
    <input-caption
      :visible="emailFocused && emailStatus !== 'success'"
      :list="[
        {
          status: email.length === 0 ? 'attention' :
            emailRegExp.test(email) ? 'success' : 'caution',
          text: 'Email should be valid'
        }
      ]"
    />
    <input-text
      placeholder="Password"
      v-model="password"
      type="password"
      id="password"
      max="32"
      autocomplete="password"
      :status="passwordStatus"
      :icon="passwordIcon"
      @input-focus="passwordFocused = true"
      @input-blur="passwordFocused = false"
    />
    <input-caption
      :visible="passwordFocused && passwordStatus !== 'success'"
      :list="[
        {
          status: password.length === 0 ? 'attention' :
            password.length >= 8 ? 'success' : 'caution',
          text: 'Password must be between 8 and 32 characters long'
        },
        {
          status: password.length === 0 ? 'attention' :
            /(^[a-zA-ZА-Яа-я\d.,#?!@$%^&*_-]{0,32}$)/.test(password) ? 'success' : 'caution',
          text: 'Password must consist of Latin letters, Cyrillic letters, digits or .,#?!@$%^&*_- symbols'
        }
      ]"
    />
    <input-text
      placeholder="Repeat Password"
      v-model="repeatPassword"
      type="password"
      max="32"
      autocomplete="current-password"
      :status="repeatPasswordStatus"
      :icon="passwordIcon"
      @input-focus="repeatPasswordFocused = true"
      @input-blur="repeatPasswordFocused = false"
    />
    <input-caption
      :visible="repeatPasswordFocused && repeatPasswordStatus !== 'success'"
      :list="[
        {
          status: repeatPassword.length === 0 ? 'attention' :
            password === repeatPassword ? 'success' : 'caution',
          text: 'Passwords must be the same'
        }
      ]"
    />
    <button
      class="primary submit"
      :disabled="usernameStatus !== 'success' ||
        emailStatus !== 'success' ||
        passwordStatus !== 'success' ||
        repeatPasswordStatus !== 'success'"
      @click="submit"
    >
      Submit
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputText from '@/components/InputText.vue'
import usernameRegExp from '@/libraries/regexps/usernameRegExp'
import emailRegExp from '@/libraries/regexps/emailRegExp'
import passwordRegExp from '@/libraries/regexps/passwordRegExp'
import UIStatus from '@/models/status'
import userIcon from '~@/icons/user.svg'
import emailIcon from '~@/icons/email.svg'
import passwordIcon from '~@/icons/password.svg'
import InputCaption from '@/components/InputCaption.vue'

/** Username block */
const username = ref('')
const usernameStatus = computed<UIStatus>((): UIStatus =>
  username.value.length === 0 ? 'neutral' :
  usernameRegExp.test(username.value) ? usernameUniqStatus.value : 'caution'
)
const usernameFocused = ref(false)
const usernameUniqStatus = ref<UIStatus>('attention')
let   usernameBackend = ''
const usernameIsUniq = () => {
  usernameUniqStatus.value = 'processing'
}

/** Email block */
const email = ref('')
const emailStatus = computed<UIStatus>((): UIStatus =>
  email.value.length === 0 ? 'neutral' :
  emailRegExp.test(email.value) ? 'success' : 'caution'
)
const emailFocused = ref(false)

/** Password block */
const password = ref('')
const passwordStatus = computed<UIStatus>((): UIStatus =>
  password.value.length === 0 ? 'neutral' :
  passwordRegExp.test(password.value) ? 'success' : 'caution'
)
const passwordFocused = ref(false)

/** Repeat Password block */
const repeatPassword = ref('')
const repeatPasswordStatus = computed<UIStatus>((): UIStatus =>
  repeatPassword.value.length === 0 ? 'neutral' :
  password.value === repeatPassword.value ? 'success' : 'caution'
)
const repeatPasswordFocused = ref(false)

const terms = ref(false)

const submit = () => {
  console.log('submit', {
    username,
    email,
    password,
    repeatPassword,
    terms
  })
}
</script>

<style lang="scss" scoped>
.sign-up {
  position:  relative;
  display:   flex;
  flex-flow: column;
  gap:       16px;
  max-width: calc(100vw - 16px);
}

@media (max-width: 480px) {
  .submit {
    align-self: flex-end;
  }
}

.append-between-enter-from,
.append-between-leave-to {
  transition:   ease-out 0.5s;
  max-height:   0;
  opacity:      0;
  margin:       -16px 0 0;
  border-width: 0 1px;
  padding:      0 8px;
  color:        transparent;
  overflow:     hidden;
}

.append-between-leave-from,
.append-between-enter-to {
  opacity: 1;
  max-height: 240px;
  overflow: hidden;
  transition: ease-in 0.5s;
  transition-delay: 0.5s;
}
</style>
