<template>
<div class="modal">
    <h2>ZARZĄDZAJ FAQ</h2>
    <button class="sections" @click="selectOption('sections')">SEKCJE</button>
    <button class="questions" @click="selectOption('questions')">PYTANIA</button>
    <button class="close-button" @click="$emit('close')">&times;</button>

    <div v-if="selectedOption === 'sections'">
        <FAQSectionsTable :sections="sections" @create-section="createSection" @update-section="updateSection" @delete-section="deleteSection" />
    </div>

    <div v-if="selectedOption === 'questions'">
        <FAQQuestionsTable :questions="questions" @create-question="createQuestion" @update-question="updateQuestion" @delete-question="deleteQuestion" />
    </div>
</div>
</template>
    
<script>
import FAQSectionsTable from './FAQSectionsTable.vue';
import FAQQuestionsTable from './FAQQuestionsTable.vue';

export default {
    components: {
        FAQSectionsTable,
        FAQQuestionsTable,
    },
    props: {
        sections: Array,
        questions: Array,
    },
    data() {
        return {
            selectedOption: 'sections',
        };
    },
    methods: {
        selectOption(option) {
            this.selectedOption = option;
        },
        createSection(section) {
            this.$emit('create-section', section);
        },
        updateSection(section) {
            this.$emit('update-section', section);
        },
        deleteSection(id) {
            this.$emit('delete-section', id);
        },
        createQuestion(question) {
            this.$emit('create-question', question);
        },
        updateQuestion(question) {
            this.$emit('update-question', question);
        },
        deleteQuestion(id) {
            this.$emit('delete-question', id);
        },
    },
};
</script>

<style lang="scss" scoped>
.modal {
    font-family: 'Roboto-Light', sans-serif;
    background-color: $tertiary-color;
    color: $white;
    padding: 20px;
    border-radius: 20px;
    text-align: center;
    position: relative;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: $primary-color;
}

.sections,
.questions {
    margin: 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 12px;
}

.sections:hover,
.questions:hover {
    background-color: $primary-color;
}
</style>