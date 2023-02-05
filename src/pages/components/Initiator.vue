<script setup lang="ts">
import {onBeforeMount} from "vue";
import useInitiator from "../../assets/ts/useInitiator";

onBeforeMount(useInitiator().initialize);
</script>

<template/>

<style/>
