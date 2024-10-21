<template>
<div class="faq-sections">
    <h2>SEKCJE</h2>
    <button class="add-section" @click="openAddSectionModal">DODAJ SEKCJĘ</button>

    <div class="faq-sections-list-container">
        <ul class="faq-sections-list">
            <li v-for="section in sections" :key="section.id" class="faq-section-item">
                <div class="faq-section-content">
                    <strong>ID:</strong> {{ section.id }}
                    <strong>Nazwa Sekcji:</strong> {{ section.title }}
                    <strong>DATA DODANIA:</strong> {{ formatDate(section.created_at) }}
                    <strong>DATA MODYFIKACJI:</strong> {{ formatDate(section.updated_at) }}
                </div>
                <div class="faq-section-actions">
                    <button class="action-button" @click="openEditSectionModal(section)">EDYTUJ</button>
                    <button class="action-button" @click="confirmDeleteSection(section.id)">USUŃ</button>
                </div>
            </li>
        </ul>
    </div>

    <transition name="modal" @before-enter="beforeEnterModal" @enter="enterModal" @leave="leaveModal">
        <div v-if="isModalVisible" class="modal-backdrop" @click.self="closeModal">
            <div class="modal">
                <h3>{{ isEditing ? 'EDYTUJ SEKCJĘ' : 'DODAJ SEKCJĘ' }}</h3>
                <div class="modal-inputs">
                    <input v-model="currentSection.title" placeholder="Nazwa Sekcji" />
                </div>
                <button class="send" @click="isEditing ? updateSectionInStore({ sectionId: currentSection.id, updatedData: { title: currentSection.title } }) : createSection()">
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
            currentSection: {
                id: null,
                title: '',
            },
        };
    },
    computed: {
        ...mapGetters(['getSections']),
        sections() {
            return this.getSections;
        },
    },
    methods: {
        ...mapActions(['addSection', 'updateSection', 'deleteSection', 'fetchSections']),

        async updateSectionInStore(data) {
            try {
                await this.updateSection(data);
                Swal.fire('Sukces!', 'Sekcja została zaktualizowana.', 'success');
                this.closeModal();
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się zaktualizować sekcji.', 'error');
            }
        },

        openAddSectionModal() {
            this.isEditing = false;
            this.currentSection = {
                id: null,
                title: ''
            };
            this.isModalVisible = true;
        },

        openEditSectionModal(section) {
            this.isEditing = true;
            this.currentSection = {
                ...section
            };
            this.isModalVisible = true;
        },

        closeModal() {
            this.isModalVisible = false;
        },

        async createSection() {
            try {
                await this.addSection({
                    title: this.currentSection.title
                });
                Swal.fire('Sukces!', 'Sekcja została dodana.', 'success');
                this.closeModal();
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się dodać sekcji.', 'error');
            }
        },

        confirmDeleteSection(sectionId) {
            Swal.fire({
                title: 'Czy na pewno chcesz usunąć tę sekcję?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak, usuń!',
                cancelButtonText: 'Anuluj',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.handleDeleteSection(sectionId);
                }
            });
        },

        async handleDeleteSection(sectionId) {
            try {
                await this.deleteSection(sectionId);
                Swal.fire('Usunięto!', 'Sekcja została usunięta.', 'success');
            } catch (error) {
                Swal.fire('Błąd', 'Nie udało się usunąć sekcji.', 'error');
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
        this.fetchSections();
    },
};
</script>

<style lang="scss" scoped>
.faq-sections {
    margin: 20px;
}

.faq-sections-list-container {
    max-height: 300px;
    overflow-y: auto;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
}

.faq-sections-list-container::-webkit-scrollbar {
    width: 8px;
}

.faq-sections-list-container::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
}

.faq-sections-list-container::-webkit-scrollbar-track {
    background: $scroll-track;
    border-radius: 10px;
}

.faq-sections-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.faq-section-item {
    border: 1px solid $footer-background;
    padding: 16px;
    margin-bottom: 10px;
    border-radius: 12px;
    transition: all 0.3s ease;
    text-align: left;
}

.faq-section-content {
    display: flex;
    flex-direction: column;
}

.faq-section-actions {
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

.add-section,
.action-button {
    background-color: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    transition: color 0.3s ease;
}

.add-section:hover,
.action-button:hover {
    color: $primary-color;
}

@media (max-width: 768px) {
    .modal {
        width: 90%;
    }
}
</style>