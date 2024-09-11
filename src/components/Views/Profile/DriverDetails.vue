<template>
<div class="driver-details">
    <p class="title">Dane kierowcy</p>
    <div class="input-row">
        <input type="text" placeholder="IMIĘ" v-model="user.first_name" class="input-field" :readonly="!isEditing" />
        <input type="text" placeholder="NAZWISKO" v-model="user.last_name" class="input-field" :readonly="!isEditing" />
    </div>
    <div class="input-row">
        <input type="text" placeholder="E-MAIL" v-model="user.email" class="input-field" :readonly="!isEditing" />
        <input type="text" placeholder="NR TELEFONU" v-model="user.phone_number" class="input-field" :readonly="!isEditing" />
    </div>
    <div class="input-row single">
        <input type="text" placeholder="NR PESEL" v-model="user.pesel" class="input-field pesel" :readonly="!isEditing" />
    </div>
    <div class="input-row last-row">
        <input type="text" placeholder="NAZWA BANKU" v-model="user.bank_name" class="input-field" :readonly="!isEditing" />
        <input type="text" placeholder="NR KONTA BANKU" v-model="user.bank_account_number" class="input-field" :readonly="!isEditing" />
    </div>
    <div class="button-container">
        <button v-if="!isEditing" class="edit" @click="startEditing">EDYTUJ</button>
        <button v-if="isEditing" class="save" @click="saveChanges">ZAPISZ</button>
        <button v-if="isEditing" class="cancel" @click="cancelEditing">ANULUJ</button>
    </div>
    <p class="second-title">Dokumenty</p>
    <div class="documents">
        <p class="subtitle">Do wgrania</p>
        <ul class="document-list">
        </ul>
        <p class="subtitle">Do pobrania</p>
        <ul class="document-list">
            <li><a href="#link1" target="_blank">Umowa Zlecenie + Kwestionariusze do wypełnienia</a></li>
            <li><a href="#link2" target="_blank">Umowa Najmu</a></li>
        </ul>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import {
    mapGetters,
    mapActions
} from 'vuex';

export default {
    data() {
        return {
            isEditing: false,
            originalUser: {},
        };
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            return this.getUser || {};
        },
    },
    methods: {
        ...mapActions(['fetchUser', 'updateUser']),
        startEditing() {
            this.isEditing = true;
            this.originalUser = {
                ...this.user
            };
        },
        async saveChanges() {
            try {
                await this.updateUser(this.user);
                this.isEditing = false;
                Swal.fire({
                    title: 'Sukces!',
                    text: 'Dane zostały zaktualizowane pomyślnie.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Error updating user:', error);
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Wystąpił problem z aktualizacją danych. Spróbuj ponownie.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },
        cancelEditing() {
            this.user = {
                ...this.originalUser
            };
            this.isEditing = false;
        },
    },
    mounted() {
        this.fetchUser();
    },
};
</script>  

<style lang="scss" scoped>
.title,
.second-title,
.subtitle {
    text-align: left;
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    margin-top: 50px;
    margin-left: 0;
}

.input-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
}

.input-row.last-row {
    margin-top: 50px;
}

.input-row.single {
    justify-content: left;
}

.input-field {
    padding: 10px;
    width: 400px;
    font-size: 16px;
    font-family: 'Roboto-Light', sans-serif;
    border: 2px solid transparent;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $placeholder-color;
    transition: border 0.3s ease;
    outline: none;
}

.input-field[readonly] {
    cursor: not-allowed;
}

.input-field:not([readonly]) {
    color: $white;
    cursor: text;
}

.input-field::placeholder {
    color: $placeholder-color;
}

.input-field.pesel {
    width: 400px;
    max-width: 100%;
}

.edit {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px 20px;
    margin-top: 50px;
    transition: all 0.3s ease;
}

.edit:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.save {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px 20px;
    margin-top: 50px;
    transition: all 0.3s ease;
}

.save:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.cancel {
    background-color: $quaternary-color;
    color: $white;
    border: 2px solid $quaternary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px 20px;
    margin-top: 50px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.cancel:hover {
    color: #fff;
    background-color: $remind-password;
    border: 2px solid $quaternary-color;
}

.button-container {
    display: flex;
    justify-content: center;
}

.second-title {
    margin-top: 50px;
}

.documents {
    margin-left: 30px;
    margin-bottom: 50px;
}

.subtitle {
    font-size: 20px;
    margin-top: 30px;
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
}

.document-list {
    list-style-type: none;
    padding-left: 20px;
    margin-bottom: 20px;
}

.document-list li {
    margin-bottom: 10px;
    font-family: 'Roboto-Light', sans-serif;
    font-size: 16px;
    color: $white;
}

a {
    color: $title-light-font;
    text-decoration: none;
    font-size: 16px;
    font-family: 'Roboto-Light', sans-serif;
}

a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .title {
        text-align: center;
    }

    .input-row {
        flex-direction: column;
    }

    .input-field {
        width: auto;
    }
}
</style>