<template>

</template>

<script setup lang="ts">
import neutralIcon from '~@/icons/status/neutral.svg'
import attentionIcon from '~@/icons/status/attention.svg'
import successIcon from '~@/icons/status/success.svg'
import cautionIcon from '~@/icons/status/caution.svg'
import criticalIcon from '~@/icons/status/critical.svg'
import UIStatus from '@/models/status'

const icons = {
  neutralIcon,
  attentionIcon,
  successIcon,
  cautionIcon,
  criticalIcon
}

interface Props {
  layout: 'icon' | 'beacon' | 'number'
  status: UIStatus
  number?: number
}
</script>

<style lang="scss" scoped>

</style>
