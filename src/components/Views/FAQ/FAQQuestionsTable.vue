<template>
<div class="faq-questions">
    <h2>PYTANIA</h2>
    <button class="add-question" @click="openAddQuestionModal">DODAJ PYTANIE</button>

    <div class="faq-questions-list-container">
        <ul class="faq-questions-list">
            <li v-for="question in questions" :key="question.id" class="faq-question-item">
                <div class="faq-question-content">
                    <strong>ID:</strong> {{ question.id }}
                    <strong>ID SEKCJI:</strong> {{ question.section_id }}
                    <strong>PYTANIE:</strong> {{ question.question }}
                    <strong>ODPOWIEDŹ:</strong> {{ question.answer }}
                    <strong>DATA DODANIA:</strong> {{ formatDate(question.created_at) }}
                    <strong>DATA MODYFIKACJI:</strong> {{ formatDate(question.updated_at) }}
                </div>
                <div class="faq-question-actions">
                    <button class="action-button" @click="openEditQuestionModal(question)">EDYTUJ</button>
                    <button class="action-button" @click="confirmDeleteQuestion(question.id)">USUŃ</button>
                </div>
            </li>
        </ul>
    </div>

    <transition name="modal" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
        <div v-if="isModalVisible" class="modal-backdrop" @click.self="closeModal">
            <div class="modal">
                <h3>{{ isEditing ? 'EDYTUJ PYTANIE' : 'DODAJ PYTANIE' }}</h3>
                <div class="modal-inputs">
                    <input v-model="currentQuestion.section_id" placeholder="ID Sekcji" />
                    <input v-model="currentQuestion.question" placeholder="Pytanie" />
                    <textarea v-model="currentQuestion.answer" placeholder="Odpowiedź"></textarea>
                </div>
                <button class="send" @click="isEditing ? updateQuestionInStore() : createQuestion()">
                    {{ isEditing ? 'AKTUALIZUJ' : 'DODAJ' }}
                </button>
                <button class="send" @click="closeModal">ANULUJ</button>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            isModalVisible: false,
            isEditing: false,
            currentQuestion: {
                id: null,
                section_id: null,
                question: '',
                answer: '',
            },
        };
    },
    computed: {
        ...mapGetters(['getQuestions']),
        questions() {
            return this.getQuestions;
        },
    },
    methods: {
        ...mapActions(['addQuestion', 'updateQuestion', 'deleteQuestion', 'fetchQuestions']),

        async updateQuestionInStore() {
            try {
                await this.updateQuestion({
                    questionId: this.currentQuestion.id,
                    updatedData: {
                        section_id: this.currentQuestion.section_id,
                        question: this.currentQuestion.question,
                        answer: this.currentQuestion.answer,
                    },
                });
                Swal.fire('Sukces!', 'Pytanie zostało zaktualizowane.', 'success');
                this.closeModal();
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się zaktualizować pytania.', 'error');
            }
        },

        openAddQuestionModal() {
            this.isEditing = false;
            this.resetCurrentQuestion();
            this.isModalVisible = true;
        },

        openEditQuestionModal(question) {
            this.isEditing = true;
            this.currentQuestion = {
                ...question
            };
            this.isModalVisible = true;
        },

        resetCurrentQuestion() {
            this.currentQuestion = {
                id: null,
                section_id: null,
                question: '',
                answer: '',
            };
        },

        closeModal() {
            this.isModalVisible = false;
        },

        async createQuestion() {
            try {
                await this.addQuestion({
                    section_id: this.currentQuestion.section_id,
                    question: this.currentQuestion.question,
                    answer: this.currentQuestion.answer,
                });
                Swal.fire('Sukces!', 'Pytanie zostało dodane.', 'success');
                this.closeModal();
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się dodać pytania.', 'error');
            }
        },

        confirmDeleteQuestion(questionId) {
            Swal.fire({
                title: 'Czy na pewno chcesz usunąć to pytanie?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak, usuń!',
                cancelButtonText: 'Anuluj',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.handleDeleteQuestion(questionId);
                }
            });
        },

        async handleDeleteQuestion(questionId) {
            try {
                await this.deleteQuestion(questionId);
                Swal.fire('Usunięto!', 'Pytanie zostało usunięte.', 'success');
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się usunąć pytania.', 'error');
            }
        },

        formatDate(dateString) {
            return new Date(dateString).toLocaleString('pl-PL', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            });
        },

        beforeEnterModal(el) {
            el.style.opacity = 0;
        },
        enterModal(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 1;
            done();
        },
        leaveModal(el, done) {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = 0;
            setTimeout(done, 300);
        },
    },
    mounted() {
        this.fetchQuestions();
    },
};
</script>

<style lang="scss" scoped>
.faq-questions {
    margin: 20px;
}

.faq-questions-list-container {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
}

.faq-questions-list-container::-webkit-scrollbar {
    width: 8px;
}

.faq-questions-list-container::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
}

.faq-questions-list-container::-webkit-scrollbar-track {
    background: $scroll-track;
    border-radius: 10px;
}

.faq-questions-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.faq-question-item {
    border: 1px solid $footer-background;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 12px;
    transition: all 0.3s ease;
    text-align: left;
}

.faq-question-content {
    display: flex;
    flex-direction: column;
}

.faq-question-actions {
    margin-top: 10px;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $tertiary-color;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-inputs {
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

input {
    padding: 8px;
    font-size: 14px;
    border: 2px solid $primary-color;
    border-radius: 12px;
    background-color: $quaternary-color;
    color: $white;
    transition: border 0.3s ease;
    outline: none;
}

textarea {
    padding: 10px;
    font-size: 14px;
    border: 2px solid $primary-color;
    border-radius: 12px;
    background-color: $quaternary-color;
    color: $white;
    box-sizing: border-box;
    transition: border 0.3s ease;
    height: 120px;
    resize: none;
    outline: none;
    overflow-y: auto;
}

textarea::-webkit-scrollbar {
    width: 8px;
}

textarea::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
}

textarea::-webkit-scrollbar-track {
    background: $scroll-track;
    border-radius: 10px;
}

.send {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 6px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 16px;
    padding: 8px 16px;
    margin-top: 10px;
    width: 120px;
    transition: all 0.3s ease;
}

.send:last-child {
    margin-bottom: 10px;
}

.send:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.add-question,
.action-button {
    background-color: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    transition: color 0.3s ease;
}

.add-question:hover,
.action-button:hover {
    color: $primary-color;
}

@media (max-width: 768px) {
    .modal {
        width: 90%;
    }
}
</style>