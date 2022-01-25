<script setup lang="ts">
import { data as classicData } from './index'
</script>
<template>
  <div class="search">
    <com-search :schema="classicData" />
  </div>
</template>
