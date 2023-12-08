<script setup lang="ts">
import { Menu } from 'lucide-vue-next'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { VisuallyHidden } from 'radix-vue'
import { Button } from '@/components/ui/button'
import NavigationSidebar from '@/components/navigation/NavigationSidebar.vue'
import ServerSidebar from '@/components/server/ServerSidebar.vue'

interface MobileToggleProps {
  serverId: string
}
const props = defineProps<MobileToggleProps>()
</script>
<template>
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" class="md:hidden">
        <Menu />
      </Button>
    </SheetTrigger>
    <SheetContent side="left" class="p-0 flex gap-0">
      <VisuallyHidden asChild>
        <SheetTitle />
        <SheetDescription />
      </VisuallyHidden>
      <div class="w-[72px]">
        <NavigationSidebar />
      </div>
      <ServerSidebar :serverId="props.serverId" />
    </SheetContent>
  </Sheet>
</template>
