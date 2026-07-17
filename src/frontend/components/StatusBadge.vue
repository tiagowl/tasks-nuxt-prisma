<template>
  <span
    class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
    :class="badgeClasses"
  >
    {{ badgeLabel }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  status: string | null
}>()

const badgeConfig: Record<string, { label: string; classes: string }> = {
  todo: {
    label: 'A Fazer',
    classes: 'bg-neutral-100 text-neutral-600',
  },
  doing: {
    label: 'Fazendo',
    classes: 'bg-yellow-50 text-yellow-700',
  },
  done: {
    label: 'Feito',
    classes: 'bg-green-50 text-green-700',
  },
  none: {
    label: 'Sem status',
    classes: 'bg-neutral-50 text-neutral-400 border border-neutral-200',
  },
}

const badgeKey = computed(() => props.status ?? 'none')
const badgeLabel = computed(() => badgeConfig[badgeKey.value]?.label ?? 'Sem status')
const badgeClasses = computed(() => badgeConfig[badgeKey.value]?.classes ?? badgeConfig.none.classes)
</script>
