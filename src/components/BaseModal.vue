<template>
    <!-- The 'names' given to this transitions are also their class names incase of css-styling -->
    <Teleport to="body">
    <Transition name="modal-outer">
        <div v-show="sendModalActive"
            class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8">
            <Transition name="modal-inner">
                <div v-if="sendModalActive" class="p-4 bg-white self-start mt-32">
                    <!-- Slots enable you to create reusable components that can accept dynamic content from the parent component. They are especially useful when you want to create components that have a consistent structure but allow for variations in their content. -->
                    <slot />
                    <!-- I created a container(modal) that can be closed but I want to make it reusable, that's why I used SLOT instead -->
                    <button @click="$emit('close-modal')" class="text-white mt-8 bg-blue-700 py-2 px-6">Close</button>
                </div>
            </Transition>
        </div>
    </Transition>
    </Teleport>
</template>

<script setup>
// Emit this into the parent component (SiteNavigation.vue) so I can close the modal there.
defineEmits(["close-modal"])


defineProps({
    sendModalActive: {
        type: Boolean,
        default: false
    },
})
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
    opacity: 0;
}

.modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
}

.modal-inner-leave-to {
    transform: scale(0.8);
}
</style>
