<template>
<transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <component :is="currentForm" @login="handleLogin" @register="handleRegister" @switch-form="toggleForm" />
        </div>
    </div>
</transition>
</template>

<script>
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

export default {
    props: {
        isVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isLogin: true,
        };
    },
    computed: {
        currentForm() {
            return this.isLogin ? LoginForm : RegisterForm;
        },
    },
    methods: {
        toggleForm() {
            this.isLogin = !this.isLogin;
        },
        handleLogin() {
            this.closeModal();
        },
        handleRegister() {
            this.closeModal();
        },
        closeModal() {
            this.$emit('close');
        },
        beforeEnter(el) {
            el.style.opacity = 0;
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            done();
        },
    },
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
}

.modal-content {
    background-color: $tertiary-color;
    padding: 30px;
    border-radius: 15px;
    width: 500px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>