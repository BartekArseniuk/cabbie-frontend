<template>
<div class="create-blog">
    <h2>{{ isEditing ? 'Edytuj wpis' : 'Dodaj wpis' }}</h2>

    <div class="image-upload">
        <label class="file-upload">
            Wybierz obraz
            <input type="file" @change="onFileChange" accept="image/*" class="input-file" />
        </label>
        <span v-if="selectedFile" class="file-info">{{ selectedFile.name }}</span>
    </div>

    <div class="inputs">
        <input type="text" v-model="title" placeholder="Tytuł" class="input-field" />
        <input type="date" v-model="date" class="input-field" readonly />
        <input type="text" v-model="author" placeholder="Autor" class="input-field" />
        <textarea v-model="content" placeholder="Treść" class="input-description"></textarea>
    </div>

    <div class="button-container">
        <button @click="submitPost" class="send">{{ isEditing ? 'Zapisz' : 'Dodaj' }}</button>
        <button @click="cancelAdding" class="send">Anuluj</button>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from 'vuex';
import Swal from 'sweetalert2';

export default {
    props: {
        blog: {
            type: Object,
            default: null
        },
    },
    data() {
        return {
            title: this.blog ? this.blog.title : '',
            date: this.blog ? this.blog.date : this.getTodayDate(),
            author: this.blog ? this.blog.author : '',
            content: this.blog ? this.blog.content : '',
            selectedFile: null,
            images: [],
            validationErrors: {},
        };
    },
    computed: {
        isEditing() {
            return !!this.blog;
        }
    },
    methods: {
        ...mapActions(['addBlog', 'updateBlog']),

        getTodayDate() {
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
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
        async submitPost() {
            const newPost = {
                title: this.title,
                date: this.date,
                author: this.author,
                content: this.content,
                image_base64: this.images.length > 0 ? this.images[0] : null,
            };

            try {
                if (this.isEditing) {
                    await this.$store.dispatch('updateBlog', {
                        ...newPost,
                        id: this.blog.id
                    });
                } else {
                    await this.$store.dispatch('addBlog', newPost);
                }

                this.resetForm();
                Swal.fire({
                    title: 'Sukces!',
                    text: this.isEditing ? 'Wpis został zaktualizowany pomyślnie!' : 'Wpis został dodany pomyślnie!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.cancelAdding();
                });
            } catch (error) {
                let errorMessage = 'Wystąpił problem z ' + (this.isEditing ? 'aktualizowaniem' : 'dodawaniem') + ' wpisu. Spróbuj ponownie.';

                if (error.response && error.response.data && error.response.data.message) {
                    errorMessage = error.response.data.message;
                }

                Swal.fire({
                    title: 'Błąd!',
                    text: errorMessage,
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },

        resetForm() {
            this.title = '';
            this.date = this.getTodayDate();
            this.author = '';
            this.content = '';
            this.selectedFile = null;
            this.images = [];
            this.validationErrors = {};
        },
        cancelAdding() {
            this.resetForm();
            this.$emit('cancel');
        },
    },
};
</script>

<style lang="scss" scoped>
.create-blog {
    position: relative;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    padding: 15px;
    background-color: $secondary-color;
    border-radius: 20px;
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
    background-color: $quaternary-color;
    color: $white;
    transition: border 0.3s ease;
    outline: none;
}

.input-description {
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

.input-description::-webkit-scrollbar {
    width: 8px;
}

.input-description::-webkit-scrollbar-thumb {
    background-color: $primary-color;
    border-radius: 10px;
}

.input-description::-webkit-scrollbar-track {
    background: $scroll-track;
    border-radius: 10px;
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
    .create-blog {
        width: 90%;
    }

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