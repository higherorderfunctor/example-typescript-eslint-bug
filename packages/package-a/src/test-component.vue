<script setup lang="ts">
import icon from './test.png';

const shouldPass = icon;

const shouldFailTsc: string = icon as number;

const shouldFailEslint = icon as any;

</script>

<template>
  <v-img
    :src="shouldPass"
  />
  <v-img
    :src="shouldFailTsc"
  />
  <v-img
    :src="shouldFailEslint"
  />
</template>
