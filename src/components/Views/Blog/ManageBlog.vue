<template>
<div>
    <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" mode="out-in">
        <div v-if="isAddingBlog || isEditingBlog" key="create-blog">
            <CreateBlog :blog="editingBlog" @add-post="handleAddPost" @update-post="handleUpdatePost" @cancel="cancelEditingOrAdding" />
        </div>
        <div v-else key="manage-blog" class="manage-blog">
            <h2>Zarządzaj blogiem</h2>

            <button class="close-button" @click="closeManageBlog">
                <i class="fas fa-times"></i>
            </button>

            <div class="button-container">
                <button @click="startAddingBlog">
                    <i class="fas fa-plus"></i> Dodaj
                </button>
            </div>

            <table class="blog-table">
                <thead>
                    <tr>
                        <th>Tytuł</th>
                        <th>Data dodania</th>
                        <th>Data modyfikacji</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="blog in paginatedBlogs" :key="blog.id">
                        <td>{{ blog.title }}</td>
                        <td>{{ formatDate(blog.created_at) }}</td>
                        <td>{{ formatDate(blog.updated_at) }}</td>
                        <td class="button-group">
                            <button @click="editBlog(blog)">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button @click="deleteBlog(blog.id)">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 0">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <span>Strona {{ currentPage + 1 }} z {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages - 1">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex';
import CreateBlog from './CreateBlog.vue';
import Swal from 'sweetalert2';

export default {
    components: {
        CreateBlog,
    },
    data() {
        return {
            isAddingBlog: false,
            isEditingBlog: false,
            editingBlog: null,
            currentPage: 0,
            pageSize: 3,
        };
    },
    computed: {
        ...mapGetters(['getBlogs']),
        paginatedBlogs() {
            const start = this.currentPage * this.pageSize;
            return this.getBlogs.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.getBlogs.length / this.pageSize);
        },
    },
    methods: {
        async fetchBlogs() {
            await this.$store.dispatch('fetchBlogs');
        },
        startAddingBlog() {
            this.isAddingBlog = true;
            this.editingBlog = null;
        },
        async handleAddPost(newPost) {
            const now = new Date().toISOString();
            try {
                await this.$store.dispatch('addBlog', {
                    ...newPost,
                    created_at: now,
                    updated_at: now,
                });
                this.isAddingBlog = false;
            } catch (error) {
                Swal.fire('Błąd!', error.message, 'error');
            }
        },
        cancelEditingOrAdding() {
            this.isAddingBlog = false;
            this.isEditingBlog = false;
            this.editingBlog = null;
        },
        editBlog(blog) {
            this.isEditingBlog = true;
            this.editingBlog = {
                ...blog,
            };
            this.isAddingBlog = false;
        },
        async handleUpdatePost(updatedPost) {
            try {
                await this.$store.dispatch('updateBlog', updatedPost);
                this.isEditingBlog = false;
                this.editingBlog = null;
            } catch (error) {
                Swal.fire('Błąd!', error.message, 'error');
            }
        },
        async deleteBlog(id) {
            const confirmation = await Swal.fire({
                title: 'Czy na pewno chcesz usunąć ten wpis?',
                text: 'Nie będziesz mógł tego cofnąć!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak, usuń!',
                cancelButtonText: 'Anuluj',
            });

            if (confirmation.isConfirmed) {
                try {
                    await this.$store.dispatch('deleteBlog', id);
                    Swal.fire('Usunięto!', 'Blog został usunięty.', 'success');
                } catch (error) {
                    Swal.fire('Błąd!', 'Nie udało się usunąć bloga.', 'error');
                }
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 0) {
                this.currentPage--;
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            return `${day}-${month}-${year} ${hours}:${minutes}`;
        },
        closeManageBlog() {
            this.$emit('close');
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'scale(0.95)';
        },
        enter(el, done) {
            el.offsetHeight; // trigger reflow
            el.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            el.style.opacity = 1;
            el.style.transform = 'scale(1)';
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            el.style.opacity = 0;
            el.style.transform = 'scale(0.95)';
            setTimeout(done, 300);
        }
    },
    mounted() {
        this.fetchBlogs();
    },
};
</script>

<style lang="scss" scoped>
.manage-blog {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    background-color: $secondary-color;
    padding: 15px;
    border-radius: 20px;
    position: relative;
    /* Added to position close button */
}

h2 {
    margin-bottom: 15px;
    font-size: 22px;
    color: $white;
}

.button-container {
    align-self: flex-start;
}

button {
    margin: 4px;
    background-color: $primary-color;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    color: $white;
    padding: 8px 12px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: darken($primary-color, 10%);
}

.blog-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.blog-table thead {
    background: $primary-color;
    color: $white;
}

.blog-table th,
.blog-table td {
    padding: 10px;
    text-align: left;
    font-size: 14px;
}

.blog-table tr:hover {
    background: rgba(255, 255, 255, 0.1);
}

.button-group {
    display: flex;
    gap: 8px;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 8px 0;
    flex-wrap: nowrap;
    overflow-x: auto;
}

.pagination button {
    margin: 0 6px;
    background: $primary-color;
    color: $white;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
}

.pagination button:disabled {
    background: rgba(255, 255, 255, 0.3);
}

.pagination button:hover:not(:disabled) {
    background: darken($primary-color, 10%);
}

@media (max-width: 768px) {
    .manage-blog {
        padding: 10px;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 10px;
    }

    .blog-table {
        width: 100%;
        overflow-x: auto;
        display: block;
    }

    .blog-table th,
    .blog-table td {
        font-size: 12px;
        padding: 6px;
    }

    .pagination {
        flex-wrap: nowrap;
    }

    .pagination button {
        padding: 4px 6px;
        font-size: 12px;
    }

    .button-group {
        gap: 4px;
    }

    button {
        font-size: 12px;
        padding: 6px 10px;
    }
}

.close-button {
    position: absolute;
    background: none;
    border: none;
    color: $primary-color;
    font-size: 24px;
    cursor: pointer;
    right: 10px;
    top: 10px;
}

.close-button:hover {
    background-color: initial;
}
</style>