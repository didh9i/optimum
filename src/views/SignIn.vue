<template>
  <form class="card sign-in" id="login" @submit.prevent>
    <h2 class="t-title">
      Sign In
    </h2>
    <input-text
      placeholder="E-Mail"
      v-model="email"
      type="email"
      max="64"
      autocomplete="email"
      :status="emailStatus"
      :icon="inputEmailIcon"
    />
    <transition name="append-between">
      <div class="sign-in__caption t-caption" v-if="emailNotFound || (emailFocused && emailStatus !== 'success')">
        <span
          class="t-caption"
          :style="{ color: email.length === 0 ? 'var(--system-attention)' :
            emailRegExp.test(email) ? 'var(--system-success)' :'var(--system-caution)' }"
        >
          User with {{ email }} address is not found!
        </span>
      </div>
    </transition>
    <input-text
      placeholder="Password"
      v-model="password"
      type="password"
      id="password"
      max="32"
      autocomplete="password"
      :status="passwordStatus"
      :icon="inputPasswordIcon"
      @input-focus="passwordFocused = true"
      @input-blur="passwordFocused = false"
    />
    <button
      class="primary submit"
      type="submit"
      :disabled="emailStatus !== 'success' || passwordStatus !== 'success'"
      @click="submit"
    >
      Sign In
    </button>
    <button @click="local.select(Math.random() < 0.5 ? 'ru_ru' : 'en_us')">
      Change lang
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputText from '@/components/InputText.vue'
import emailRegExp from '@/libraries/regexps/emailRegExp'
import passwordRegExp from '@/libraries/regexps/passwordRegExp'
import UIStatus from '@/models/status'
import inputEmailIcon from '~@/icons/input/email.svg'
import inputPasswordIcon from '~@/icons/input/password.svg'
import { POST } from '@/services/net'
import useLocal from '@/store/local'

const local = useLocal()

const email = ref('')
const emailNotFound = ref<boolean>(false)
const emailStatus = computed<UIStatus>((): UIStatus =>
  email.value.length === 0 ? 'neutral' :
  emailRegExp.test(email.value) ? 'success' : 'caution'
)
const emailFocused = ref(false)

const password = ref('')
const passwordStatus = computed<UIStatus>((): UIStatus =>
  password.value.length === 0 ? 'neutral' :
  passwordRegExp.test(password.value) ? 'success' : 'caution'
)
const passwordFocused = ref(false)

const submit = () => {
  console.log(email, password)
  POST('http://localhost:5000/api/login', 'name', {
    silent: false,
    type: 'json',
    log: console.log,
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })
}
</script>

<style lang="scss" scoped>
.sign-in {
  position:  relative;
  display:   flex;
  flex-flow: column;
  gap:       16px;
  max-width: calc(100vw - 16px);

  &__caption {
    display: flex;
    flex-flow: column;
    gap: 2px;
    margin: -8px 0;
    padding: 4px 8px;
    max-width: 240px;
    height: fit-content;
    background-color: var(--control-text-background);
    border-radius: 4px;
    border: 1px solid var(--control-text-border);

    span {
      transition: 333ms
    }
  }
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
