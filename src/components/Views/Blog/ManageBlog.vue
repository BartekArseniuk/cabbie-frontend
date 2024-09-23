<template>
<div>
    <CreateBlog v-if="isAddingBlog" @add-post="handleAddPost" @cancel="cancelAdding" />

    <div v-else class="manage-blog">
        <h2>Zarządzaj blogiem</h2>

        <div class="button-container">
            <button @click="isAddingBlog = true">
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
                        <button @click="editBlog(blog.id)">
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
            blogs: [],
            currentPage: 0,
            pageSize: 5,
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
        handleAddPost(newPost) {
            const now = new Date().toISOString();
            this.blogs.push({
                title: newPost.title,
                created_at: now,
                updated_at: now,
            });
            this.isAddingBlog = false;
            this.fetchBlogs();
        },
        cancelAdding() {
            this.isAddingBlog = false;
        },
        editBlog() {

        },
        async deleteBlog(id) {
            const confirmation = await Swal.fire({
                title: 'Czy na pewno chcesz usunąć tę aktualność?',
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
    padding: 20px;
    border-radius: 8px;
}

h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: $white;
}

.button-container {
    align-self: flex-start;
}

button {
    margin: 5px;
    background-color: $primary-color;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 18px;
    color: $white;
    padding: 10px 15px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: darken($primary-color, 10%);
}

.blog-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    border-radius: 8px;
    overflow: hidden;
}

.blog-table thead {
    background: $primary-color;
    color: $white;
}

.blog-table th,
.blog-table td {
    padding: 12px 15px;
    text-align: left;
}

.blog-table tr:hover {
    background: rgba(255, 255, 255, 0.1);
}

.button-group {
    display: flex;
    gap: 10px;
}

.pagination {
    display: flex;
    align-items: center;
    margin: 10px 0;
}

.pagination button {
    margin: 0 10px;
    background: $primary-color;
    color: $white;
    padding: 5px 10px;
    border-radius: 10px;
}

.pagination button:disabled {
    background: rgba(255, 255, 255, 0.3);
}

.pagination button:hover:not(:disabled) {
    background: darken($primary-color, 10%);
}

@media (max-width: 768px) {

    .blog-table th,
    .blog-table td {
        font-size: 12px;
        padding: 8px;
    }

    .pagination button {
        padding: 5px 8px;
    }

    .button-group {
        gap: 5px;
    }

    button {
        font-size: 14px;
        padding: 8px 12px;
    }
}
</style>