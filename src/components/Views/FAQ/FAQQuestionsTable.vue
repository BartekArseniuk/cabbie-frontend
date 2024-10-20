<template>
<div class="faq-questions">
    <h2>PYTANIA</h2>
    <button class="add-question" @click="openAddQuestionModal">DODAJ PYTANIE</button>

    <div class="faq-questions-list-container">
        <ul class="faq-questions-list">
            <li v-for="question in questions" :key="question.id" class="faq-question-item">
                <div class="faq-question-content">
                    <strong>ID:</strong> {{ question.id }}<br />
                    <strong>ID SEKCJI:</strong> {{ question.section_id }}<br />
                    <strong>PYTANIE:</strong> {{ question.question }}<br />
                    <strong>ODPOWIEDŹ:</strong> {{ question.answer }}<br />
                    <strong>DATA DODANIA:</strong> {{ formatDate(question.created_at) }}<br />
                    <strong>DATA MODYFIKACJI:</strong> {{ formatDate(question.updated_at) }}<br />
                </div>
                <div class="faq-question-actions">
                    <button class="action-button" @click="openEditQuestionModal(question)">EDYTUJ</button>
                    <button class="action-button" @click="deleteQuestion(question.id)">USUŃ</button>
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
                <button class="send" @click="isEditing ? updateQuestion() : createQuestion()">
                    {{ isEditing ? 'AKTUALIZUJ' : 'DODAJ' }}
                </button>
                <button class="send" @click="closeModal">ANULUJ</button>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
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
                created_at: '',
                updated_at: '',
            },
            questions: [{
                    id: 1,
                    section_id: 1,
                    question: 'Co to jest FAQ?',
                    answer: 'Cabbie zapewnia kompleksową obsługę dla kierowców, w tym prowadzenie konta, ułatwianie współpracy z platformami takimi jak Uber, Bolt i Free Now, oraz bezpieczne rozliczanie na podstawie danych z tych aplikacji. Dodatkowo, oferujemy udział w akcjach promocyjnych, gdzie nasi kierowcy mogą zdobywać atrakcyjne rabaty i nagrody za aktywne uczestnictwo.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 2,
                    section_id: 1,
                    question: 'Jak mogę dodać pytanie?',
                    answer: 'Możesz dodać pytanie klikając przycisk "DODAJ PYTANIE".',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 3,
                    section_id: 2,
                    question: 'Jak edytować pytanie?',
                    answer: 'Aby edytować pytanie, kliknij przycisk "Edytuj" obok pytania.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 4,
                    section_id: 2,
                    question: 'Czy mogę usunąć pytanie?',
                    answer: 'Tak, klikając przycisk "Usuń".',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 5,
                    section_id: 3,
                    question: 'Jakie są zalety FAQ?',
                    answer: 'FAQ pomaga szybko znaleźć odpowiedzi na popularne pytania.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 6,
                    section_id: 3,
                    question: 'Jak dodać sekcję FAQ?',
                    answer: 'Musisz skontaktować się z administratorem.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 7,
                    section_id: 4,
                    question: 'Jak mogę zgłosić problem?',
                    answer: 'Skontaktuj się z nami przez formularz kontaktowy.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 8,
                    section_id: 4,
                    question: 'Jakie informacje są potrzebne?',
                    answer: 'Podaj szczegóły dotyczące problemu.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 9,
                    section_id: 5,
                    question: 'Gdzie mogę znaleźć więcej informacji?',
                    answer: 'Zajrzyj do sekcji Kontakt.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    id: 10,
                    section_id: 5,
                    question: 'Czy FAQ jest dostępne w innych językach?',
                    answer: 'Tak, FAQ jest dostępne w wielu językach.',
                    created_at: new Date(),
                    updated_at: new Date()
                },
            ],
        };
    },
    methods: {
        openAddQuestionModal() {
            this.isEditing = false;
            this.currentQuestion = {
                id: null,
                section_id: null,
                question: '',
                answer: '',
                created_at: '',
                updated_at: '',
            };
            this.isModalVisible = true;
        },
        openEditQuestionModal(question) {
            this.isEditing = true;
            this.currentQuestion = {
                ...question,
            };
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        formatDate(dateString) {
            return new Date(dateString).toLocaleString();
        },
        createQuestion() {
            const newId = this.questions.length ? Math.max(...this.questions.map((q) => q.id)) + 1 : 1;
            this.questions.push({
                ...this.currentQuestion,
                id: newId,
                created_at: new Date(),
                updated_at: new Date(),
            });
            this.closeModal();
        },
        updateQuestion() {
            const index = this.questions.findIndex((q) => q.id === this.currentQuestion.id);
            if (index !== -1) {
                this.questions[index] = {
                    ...this.currentQuestion,
                    updated_at: new Date(),
                };
            }
            this.closeModal();
        },
        deleteQuestion(id) {
            if (confirm('Czy na pewno chcesz usunąć to pytanie?')) {
                this.questions = this.questions.filter((question) => question.id !== id);
            }
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