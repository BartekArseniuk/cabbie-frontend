<template>
<div class="FAQ">
    <p class="title">CZĘSTO ZADAWANE PYTANIA</p>

    <button class="admin-button" v-if="getRole === 'admin'" @click="openManageModal">
        <i class="fas fa-cog"></i> ZARZĄDZAJ
    </button>

    <transition name="modal" @before-enter="beforeEnterOverlay" @enter="enterOverlay" @leave="leaveOverlay">
        <div v-if="showManageModal" class="modal-backdrop" @click.self="closeManageModal">
            <transition name="modal-content" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
                <div class="modal">
                    <ManageFAQ @close="closeManageModal" @selectOption="handleOptionSelection" />
                </div>
            </transition>
        </div>
    </transition>

    <main>
        <div class="faq-section" v-for="(section, sectionIndex) in faqSections" :key="sectionIndex">
            <h3 class="faq-section-title" @click="toggleSection(sectionIndex)">
                <i :class="['fas', activeSection === sectionIndex ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i>
                {{ section.title }}
            </h3>
            <div v-show="activeSection === sectionIndex" class="faq-answers">
                <div class="faq-question" v-for="(question, questionIndex) in section.questions" :key="questionIndex" @click="toggleAnswer(question.key)">
                    <p>
                        <i :class="['fas', activeAnswer === question.key ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i>
                        {{ question.text }}
                    </p>
                    <div v-show="activeAnswer === question.key" class="faq-answer">
                        <p>{{ question.answer }}</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";
import ManageFAQ from "./ManageFAQ.vue";

export default {
    components: {
        ManageFAQ,
    },
    data() {
        return {
            activeAnswer: null,
            activeSection: null,
            showManageModal: false,
            faqSections: [{
                    title: "O Nas",
                    questions: [{
                            key: "question1",
                            text: "Czym zajmuje się firma Cabbie?",
                            answer: "Cabbie to innowacyjna platforma łącząca kierowców z aplikacjami przewozowymi...",
                        },
                        {
                            key: "question2",
                            text: "Jakie usługi oferuje Cabbie?",
                            answer: "Cabbie zapewnia kompleksową obsługę dla kierowców...",
                        },
                        {
                            key: "question3",
                            text: "W jakich miastach znajdę Cabbie?",
                            answer: "Cabbie obecnie znajdziesz w: Białymstoku, Białej Podlaskiej...",
                        },
                    ],
                },
                {
                    title: "Umowy z Cabbie",
                    questions: [{
                        key: "question4",
                        text: "Jakie umowy muszę podpisać?",
                        answer: "Rozpoczynając współpracę z Cabbie, masz kilka opcji do wyboru...",
                    }, ],
                },
            ],
        };
    },
    methods: {
        toggleAnswer(answer) {
            this.activeAnswer = this.activeAnswer === answer ? null : answer;
        },
        toggleSection(sectionIndex) {
            this.activeSection = this.activeSection === sectionIndex ? null : sectionIndex;
        },
        openManageModal() {
            this.showManageModal = true;
        },
        closeManageModal() {
            this.showManageModal = false;
        },
        handleKeyDown(event) {
            if (event.key === "Escape") {
                this.closeManageModal();
            }
        },
        handleOptionSelection(option) {
            if (option === "sections") {
                console.log("Zarządzanie sekcjami");
            } else if (option === "questions") {
                console.log("Zarządzanie pytaniami");
            }
        },
        beforeEnterOverlay(el) {
            el.style.opacity = 0;
            el.style.visibility = "visible";
        },
        enterOverlay(el, done) {
            el.offsetHeight;
            el.style.transition = "opacity 0.3s ease";
            el.style.opacity = 1;
            done();
        },
        leaveOverlay(el, done) {
            el.style.transition = "opacity 0.3s ease";
            el.style.opacity = 0;
            setTimeout(done, 300);
        },
        beforeEnterModal(el) {
            el.style.transform = "scale(0.7)";
            el.style.opacity = 0;
        },
        enterModal(el, done) {
            el.offsetHeight;
            el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
            el.style.transform = "scale(1)";
            el.style.opacity = 1;
            done();
        },
        leaveModal(el, done) {
            el.style.transition = "transform 0.3s ease, opacity 0.3s ease";
            el.style.transform = "scale(0.7)";
            el.style.opacity = 0;
            setTimeout(done, 300);
        },
    },
    computed: {
        ...mapGetters(["getRole"]),
    },
    mounted() {
        window.addEventListener("keydown", this.handleKeyDown);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
    },
};
</script>

<style lang="scss" scoped>
.FAQ {
    margin-bottom: 50px;
    position: relative;
}

.title {
    font-family: "Roboto-Light", sans-serif;
    text-align: center;
    font-size: 36px;
    color: $primary-color;
    margin-top: 100px;
    padding: 80px 0;
}

main {
    margin-left: 50px;
}

.faq-section-title {
    color: $primary-color;
    font-family: "Roboto-Light", sans-serif;
    cursor: pointer;
}

.faq-question {
    width: 75%;
    cursor: pointer;
    color: $white;
    margin-left: 25px;
    font-family: "Roboto-Light", sans-serif;
}

.faq-answer {
    width: 75%;
    margin-left: 25px;
    font-family: "Roboto-Extra-Light", sans-serif;
}

.admin-button {
    font-size: 18px;
    color: $white;
    font-family: "Roboto-Light", sans-serif;
    font-weight: 800;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background: none;
    text-transform: uppercase;
    transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.admin-button:hover {
    color: $primary-color;
}

.modal-backdrop {
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

.modal {
    width: 90%;
    max-width: 900px;
    padding: 15px;
}

@media (max-width: 768px) {
    main {
        margin-left: 20px;
    }
}
</style>