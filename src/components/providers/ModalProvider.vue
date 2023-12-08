<script setup lang="ts">
import CreateServerModal from '@/components/modals/CreateServerModal.vue'
import EditServerModal from '@/components/modals/EditServerModal.vue'
import InviteModal from '@/components/modals/InviteModal.vue'
import MembersModal from '@/components/modals/MembersModal.vue'
import CreateChannelModal from '@/components/modals/CreateChannelModal.vue'
import EditChannelModal from '@/components/modals/EditChannelModal.vue'
</script>

<template>
  <div>
    <CreateServerModal />
    <EditServerModal />
    <InviteModal />
    <MembersModal />
    <CreateChannelModal />
    <EditChannelModal />
  </div>
</template>
