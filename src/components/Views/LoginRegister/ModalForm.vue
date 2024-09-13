<template>
<transition @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
    <div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <transition @before-enter="beforeEnterForm" @enter="enterForm" @leave="leaveForm">
                <component :is="currentForm" @login="handleLogin" @register="handleRegister" @switch-form="toggleForm" />
            </transition>
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
            closingModal: false,
        };
    },
    watch: {
        isVisible(val) {
            if (val) {
                this.isLogin = true;
            }
        }
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
        handleLogin(credentials) {
            console.log('Logging in with', credentials);
            this.closeModal();
        },
        handleRegister(credentials) {
            console.log('Registering with', credentials);
            this.closeModal();
        },
        closeModal() {
            if (!this.closingModal) {
                this.closingModal = true;
                this.isLogin = true;
                this.$emit('close');
            }
        },
        beforeEnterOverlay(el) {
            el.style.opacity = 0;
        },
        enterOverlay(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leaveOverlay(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            setTimeout(() => {
                this.closingModal = false;
                done();
            }, 300);
        },
        beforeEnterForm(el) {
            el.style.opacity = 0;
        },
        enterForm(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leaveForm(el, done) {
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
</style>