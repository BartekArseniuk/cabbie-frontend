<template>
<div>
    <CreateBlog v-if="isAddingBlog || isEditingBlog" :blog="editingBlog" @add-post="handleAddPost" @update-post="handleUpdatePost" @cancel="cancelEditingOrAdding" />

    <div v-else class="manage-blog">
        <h2>Zarządzaj blogiem</h2>

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
</div>
</template>

<script>
import apiService from '@/apiService';
import Swal from 'sweetalert2';
import CreateBlog from './CreateBlog.vue';

export default {
    components: {
        CreateBlog,
    },
    data() {
        return {
            isAddingBlog: false,
            isEditingBlog: false,
            editingBlog: null,
            blogs: [],
            currentPage: 0,
            pageSize: 3,
        };
    },
    computed: {
        paginatedBlogs() {
            const start = this.currentPage * this.pageSize;
            return this.blogs.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.blogs.length / this.pageSize);
        },
    },
    methods: {
        async fetchBlogs() {
            try {
                const response = await apiService.get('blogs');
                this.blogs = response.data;
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        },
        startAddingBlog() {
            this.isAddingBlog = true;
            this.editingBlog = null;
        },
        handleAddPost(newPost) {
            const now = new Date().toISOString();
            this.blogs.push({
                ...newPost,
                created_at: now,
                updated_at: now,
            });
            this.isAddingBlog = false;
            this.$emit('update-blogs');
        },
        cancelEditingOrAdding() {
            this.isAddingBlog = false;
            this.isEditingBlog = false;
            this.editingBlog = null;
        },
        editBlog(blog) {
            this.isEditingBlog = true;
            this.editingBlog = {
                ...blog
            };
            this.isAddingBlog = false;
        },
        async handleUpdatePost(updatedPost) {
            await apiService.put(`blogs/${updatedPost.id}`, updatedPost);
            const index = this.blogs.findIndex(blog => blog.id === updatedPost.id);
            if (index !== -1) {
                this.blogs[index] = {
                    ...updatedPost,
                    updated_at: new Date().toISOString()
                };
            }
            this.isEditingBlog = false;
            this.editingBlog = null;
        },
        async deleteBlog(id) {
            const confirmation = await Swal.fire({
                title: 'Czy na pewno chcesz usunąć ten wpis?',
                text: "Nie będziesz mógł tego cofnąć!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Tak, usuń!',
                cancelButtonText: 'Anuluj'
            });

            if (confirmation.isConfirmed) {
                try {
                    const blogExists = this.blogs.some(blog => blog.id === id);
                    if (!blogExists) {
                        Swal.fire('Błąd!', 'Blog nie istnieje.', 'error');
                        return;
                    }

                    await apiService.delete(`blogs/${id}`);
                    this.blogs = this.blogs.filter(blog => blog.id !== id);
                    Swal.fire('Usunięto!', 'Blog został usunięty.', 'success');
                    this.fetchBlogs();
                    this.$emit('update-blogs');
                } catch (error) {
                    console.error('Error deleting blog:', error);
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
    border-radius: 8px;
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
</style>