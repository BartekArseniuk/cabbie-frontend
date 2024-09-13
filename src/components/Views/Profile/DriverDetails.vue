<template>
<div class="driver-details">
    <p class="title">Dane kierowcy</p>
    <div class="input-row">
        <input type="text" placeholder="IMIĘ" v-model="user.first_name" class="input-field" :readonly="!isEditing" />
        <input type="text" placeholder="NAZWISKO" v-model="user.last_name" class="input-field" :readonly="!isEditing" />
    </div>
    <div class="input-row">
        <div class="input-container">
            <input type="text" placeholder="E-MAIL" v-model="user.email" class="input-field" :readonly="!isEditing" />
            <i v-if="dataLoaded && !isEmailVerified" class="warning-icon fas fa-circle-exclamation" title="Nie zweryfikowano maila"></i>
            <i v-if="dataLoaded && isEmailVerified" class="verified-icon fas fa-check-circle" title="E-mail zweryfikowany"></i>
        </div>
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
            dataLoaded: false
        };
    },
    computed: {
        ...mapGetters(['getUser']),
        user() {
            return this.getUser || {};
        },
        isEmailVerified() {
            return !!this.user.email_verified_at;
        }
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
    async mounted() {
        await this.fetchUser();
        this.dataLoaded = true;
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

.input-container {
    position: relative;
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
    z-index: 1;
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

.warning-icon,
.verified-icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    cursor: pointer;
    z-index: 1;
}

.warning-icon {
    color: $warning-color;
}

.verified-icon {
    color: $success-color;
}

.warning-icon::after,
.verified-icon::after {
    content: attr(title);
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translateY(-50%) translateX(-10px);
    padding: 5px;
    background-color: #333;
    color: #fff;
    border-radius: 3px;
    white-space: nowrap;
    font-family: 'Roboto-Extra-Light', sans-serif;
    font-size: 15px;
    display: none;
}

.warning-icon:hover::after,
.verified-icon:hover::after {
    display: block;
}

.edit,
.save,
.cancel {
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

.edit:hover,
.save:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

.cancel {
    background-color: $quaternary-color;
    border: 2px solid $quaternary-color;
    margin-left: 10px;
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
        width: 100%;
    }
}
</style>