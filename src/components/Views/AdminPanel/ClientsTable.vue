<template>
<div class="user-table">
    <div class="filter-bar">
        <div class="filter-dropdown">
            <div class="filter-dropdown-trigger" @click="toggleDropdown">
                {{ selectedFilterLabel }}
                <span class="arrow" :class="{ 'open': isDropdownOpen }">▼</span>
            </div>
            <transition name="dropdown" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div class="filter-dropdown-list" v-if="isDropdownOpen">
                    <div v-for="(option, index) in filterOptions" :key="index" class="filter-dropdown-item" @click="selectFilter(option.value, option.label)">
                        {{ option.label }}
                    </div>
                </div>
            </transition>
        </div>
        <input type="text" v-model="filterValue" placeholder="WPISZ WARTOŚĆ..." class="filter-input" />
    </div>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>IMIĘ</th>
                    <th>NAZWISKO</th>
                    <th>PESEL</th>
                    <th>E-MAIL</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="user in paginatedUsers" :key="user.id">
                    <tr class="table-row" @click="toggleRow(user.id)">
                        <td>{{ user.id }}</td>
                        <td>{{ user.first_name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.pesel }}</td>
                        <td>
                            <div class="email-container">
                                <span class="email">{{ user.email }}</span>
                                <span class="email-status" :class="{
                                                verified: user.email_verified_at,
                                                unverified: !user.email_verified_at,
                                            }"></span>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="clickedUserId === user.id">
                        <td colspan="4" class="details-row">
                            <p class="last-documents">OSTATNI WPŁYW DOKUMENTÓW:</p>
                            <p class="is-settled">CZY ROZLICZONO:</p>
                        </td>
                        <td class="details-button-cell">
                            <button @click="showDetails(user.id)" class="details-button">PRZEJDŹ NA KONTO</button>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
    <div class="pagination-controls">
        <button class="pagination-button" @click="changePage(currentPage - 1)" :disabled="currentPage === 1" :class="{ 'active': currentPage > 1, 'disabled': currentPage === 1 }">
            <span class="arrow">&#8592;</span>
        </button>
        <span class="current-page">Strona {{ currentPage }} z {{ totalPages }}</span>
        <button class="pagination-button" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" :class="{ 'active': currentPage < totalPages, 'disabled': currentPage === totalPages }">
            <span class="arrow">&#8594;</span>
        </button>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";

export default {
    data() {
        return {
            selectedFilter: "id",
            selectedFilterLabel: "ID",
            filterValue: "",
            isDropdownOpen: false,
            filterOptions: [{
                    value: "id",
                    label: "ID"
                },
                {
                    value: "first_name",
                    label: "IMIĘ"
                },
                {
                    value: "last_name",
                    label: "NAZWISKO"
                },
                {
                    value: "pesel",
                    label: "PESEL"
                },
                {
                    value: "email",
                    label: "E-MAIL"
                },
            ],
            currentPage: 1,
            recordsPerPage: 10,
            clickedUserId: null,
        };
    },
    computed: {
        ...mapState({
            users: (state) => state.users,
            isAuthenticated: (state) => state.isAuthenticated,
        }),
        filteredUsers() {
            return this.users
                .filter((user) => {
                    if (!this.filterValue) return true;
                    return String(user[this.selectedFilter])
                        .toLowerCase()
                        .includes(this.filterValue.toLowerCase());
                });
        },
        paginatedUsers() {
            const start = (this.currentPage - 1) * this.recordsPerPage;
            return this.filteredUsers.slice(start, start + this.recordsPerPage);
        },
        totalPages() {
            return Math.ceil(this.filteredUsers.length / this.recordsPerPage);
        },
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                await this.$store.dispatch("fetchUsers");
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectFilter(value, label) {
            this.selectedFilter = value;
            this.selectedFilterLabel = label;
            this.isDropdownOpen = false;
        },
        changePage(page) {
            if (page < 1 || page > this.totalPages) return;
            this.currentPage = page;
        },
        toggleRow(userId) {
            this.clickedUserId = this.clickedUserId === userId ? null : userId;
        },
        showDetails(userId) {
            console.log(`Wyświetlanie szczegółów dla użytkownika: ${userId}`);
        },
        beforeEnter(el) {
            el.style.opacity = 0;
            el.style.transform = 'translateY(-10px)';
        },
        enter(el, done) {
            el.offsetHeight;
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
            done();
        },
        leave(el, done) {
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            el.style.opacity = 0;
            el.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                done();
            }, 300);
        },
    },
};
</script>

<style lang="scss" scoped>
.user-table {
    font-family: "Roboto-Light", sans-serif;
    margin: 20px;
}

.table-container {
    overflow-x: auto;
}

.filter-bar {
    display: flex;
    align-items: center;
    margin-bottom: 40px;
    background-color: $tr_color;
    border-radius: 12px;
    padding: 10px 15px;
}

.filter-dropdown {
    position: relative;
    width: 20%;
    cursor: pointer;
}

.filter-dropdown-trigger {
    padding: 10px;
    font-size: 14px;
    border: none;
    border-radius: 12px;
    background-color: transparent;
    color: $white;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.arrow {
    transition: transform 0.3s ease;
}

.arrow.open {
    transform: rotate(180deg);
}

.filter-dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: $tr_color;
    color: $white;
    border-radius: 0 0 12px 12px;
    z-index: 1000;
}

.filter-dropdown-item {
    padding: 10px;
    font-size: 14px;
    cursor: pointer;

    &:hover {
        background-color: $placeholder-color;
    }
}

.filter-input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    background-color: transparent;
    border: none;
    border-left: none;
    border-radius: 0 12px 12px 0;
    outline: none;
    color: $white;
}

table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    text-transform: uppercase;
}

th,
td {
    padding: 10px;
    text-align: left;
    font-size: 14px;
    border-right: 1px solid $footer-background;
}

th {
    height: 50px;
    background-color: $tr_color;
    color: #ffffff;
}

.table-row {
    height: 60px;
    background-color: $messages-color;
    color: #ffffff;
}

.table-row:hover {
    background-color: $placeholder-color;
    cursor: pointer;
}

td:last-child,
th:last-child {
    border-right: none;
}

.email-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.email {
    margin-right: 10px;
}

.email-status {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: $success-color;
}

.email-status.unverified {
    background-color: $warning-color;
}

.pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.pagination-button {
    padding: 10px 15px;
    border: none;
    border-radius: 12px;
    background-color: $tr_color;
    color: $white;
    font-size: 14px;
    cursor: pointer;
    margin: 0 5px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &.disabled {
        cursor: not-allowed;
        opacity: 0.5;
        background-color: $tr_color;
    }

    &.active {
        background-color: $primary-color;
    }

    &:hover:not(.disabled) {
        background-color: darken($tr_color, 10%);
        transform: scale(1.05);
    }
}

.current-page {
    margin: 0 10px;
    font-weight: bold;
    color: $white;
}

.details-row {
    background-color: $secondary-color;
    color: $white;
    text-align: left;
    height: 100px;
    padding-left: 20px;
    border: none;
}

.details-button-cell {
    background-color: $secondary-color;
    text-align: right;
    padding-right: 20px;
}

.details-button {
    background-color: transparent;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: $primary-color;
    }
}

@media (max-width: 768px) {
    .filter-dropdown {
        width: 80%;
    }

    table {
        font-size: 12px;
    }

    th,
    td {
        padding: 6px;
    }

    .email {
        margin-right: 10px;
    }
}
</style>