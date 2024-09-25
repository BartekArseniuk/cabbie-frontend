<template>
<div class="create-blog">
    <h2>Dodaj wpis</h2>
    <div class="image-upload">
        <label class="file-upload">
            Wybierz obraz
            <input type="file" @change="onFileChange" accept="image/*" class="input-file" />
        </label>
        <span v-if="selectedFile" class="file-info">{{ selectedFile.name }}</span>
    </div>
    <div class="inputs">
        <input type="text" v-model="title" placeholder="Tytuł" class="input-field" />
        <input type="date" v-model="date" class="input-field" />
        <input type="text" v-model="author" placeholder="Autor" class="input-field" />
        <textarea v-model="content" placeholder="Treść" class="input-description"></textarea>
    </div>
    <div class="button-container">
        <button @click="addPost" class="send">Dodaj</button>
        <button @click="cancelAdding" class="send">Anuluj</button>
    </div>
</div>
</template>

<script>
import apiService from '@/apiService';
import Swal from 'sweetalert2';

export default {
    data() {
        return {
            images: [],
            title: '',
            date: this.getTodayDate(),
            author: '',
            content: '',
            selectedFile: null,
        };
    },
    methods: {
        getTodayDate() {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        },
        onFileChange(event) {
            const files = event.target.files;
            this.images = [];
            this.selectedFile = files[0];

            Array.from(files).forEach(file => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');

                        const scaleFactor = Math.min(400 / img.width, 400 / img.height);
                        canvas.width = img.width * scaleFactor;
                        canvas.height = img.height * scaleFactor;

                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        const base64 = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpeg);base64,/, '');
                        this.images.push(base64);
                    };
                };

                reader.onerror = (error) => {
                    console.error('Błąd podczas odczytu pliku:', error);
                };

                reader.readAsDataURL(file);
            });
        },

        async addPost() {
            const newPost = {
                title: this.title,
                date: this.date,
                author: this.author,
                content: this.content,
                image_base64: this.images.length > 0 ? this.images[0] : null,
            };

            try {
                await apiService.post('blogs', newPost);
                this.resetForm();
                Swal.fire({
                    title: 'Sukces!',
                    text: 'Wpis został dodany pomyślnie!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                this.$emit('add-post', newPost);
            } catch (error) {
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Wystąpił problem z dodawaniem wpisu. Spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },

        cancelAdding() {
            this.resetForm();
            this.$emit('cancel');
        },

        resetForm() {
            this.images = [];
            this.selectedFile = null;
            this.title = '';
            this.date = this.getTodayDate();
            this.author = '';
            this.content = '';
        },
    },
};
</script>

<style lang="scss" scoped>
.create-blog {
    max-width: 100%;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    padding: 15px;
    background-color: $secondary-color;
    border-radius: 8px;
    font-family: 'Roboto-Light', 'sans-serif';
    color: $white;
}

.image-upload {
    margin-bottom: 15px;
}

.file-upload {
    display: inline-block;
    padding: 8px 16px;
    background-color: $primary-color;
    color: $white;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.file-upload:hover {
    background-color: $tertiary-color;
}

.input-file {
    display: none;
}

.file-info {
    margin-top: 8px;
    margin-left: 8px;
    color: $white;
    font-size: 12px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.input-field {
    padding: 8px;
    font-size: 14px;
    border: 2px solid $primary-color;
    border-radius: 12px;
    background-color: $secondary-color;
    color: $white;
    transition: border 0.3s ease;
    outline: none;
}

.input-description {
    padding: 10px;
    font-size: 14px;
    border: 2px solid $primary-color;
    border-radius: 12px;
    background-color: $secondary-color;
    color: $white;
    transition: border 0.3s ease;
    height: 120px;
    resize: none;
    outline: none;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: $primary-color;
        border-radius: 8px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: darken($primary-color, 10%);
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }
}

.input-field::placeholder,
.input-description::placeholder {
    color: #ccc;
    font-size: 12px;
}

.button-container {
    margin-top: 15px;
    display: flex;
    gap: 8px;
    justify-content: center;
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
    width: 120px;
    transition: all 0.3s ease;
}

.send:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

@media (max-width: 768px) {
    .file-info {
        font-size: 10px;
    }

    .input-field,
    .input-description {
        font-size: 12px;
    }

    .send {
        font-size: 14px;
        padding: 6px 12px;
        width: 100px;
    }

    .button-container {
        gap: 5px;
    }
}
</style>