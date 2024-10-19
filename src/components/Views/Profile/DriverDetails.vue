<template>
<div class="driver-details">
    <button v-if="getRole === 'admin'" class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
    </button>

    <p class="title">Dane kierowcy</p>
    <div class="input-row">
        <input type="text" placeholder="IMIĘ" v-model="user.first_name" class="input-field" :readonly="!isEditing" />
        <input type="text" placeholder="NAZWISKO" v-model="user.last_name" class="input-field" :readonly="!isEditing" />
    </div>

    <div class="input-row">
        <div class="input-container">
            <input type="text" placeholder="E-MAIL" v-model="user.email" class="input-field" readonly />
            <i v-if="!isEmailVerified" class="warning-icon fas fa-circle-exclamation" title="Nie zweryfikowano maila"></i>
            <i v-if="isEmailVerified" class="verified-icon fas fa-check-circle" title="E-mail zweryfikowany"></i>
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

    <div v-if="!isEmailVerified && getRole != 'admin'" class="resend-verification-container">
        <button class="resend-verification" @click="resendVerificationEmail(user.id)">Wyślij ponownie e-mail
            weryfikacyjny</button>
    </div>

    <div v-if="getRole != 'admin'" class="button-container">
        <button v-if="!isEditing" class="edit" @click="startEditing">EDYTUJ</button>
        <button v-if="isEditing" class="save" @click="saveChanges">ZAPISZ</button>
        <button v-if="isEditing" class="cancel" @click="cancelEditing">ANULUJ</button>
    </div>

    <p v-if="getRole != 'admin'" class="second-title">Dokumenty</p>
    <div v-if="getRole != 'admin'" class="documents">
        <p class="subtitle">Do wgrania</p>
        <ul class="document-list"></ul>
        <p class="subtitle">Do pobrania</p>
        <ul class="document-list">
            <li v-if="!isFormVerified"><a href="#link1">Kwestionariusze do wypełnienia</a></li>
            <li v-if="isFormVerified"><a href="#link2">Umowa Zlecenie</a></li>
        </ul>
    </div>

    <div class="verify-form-row" v-if="getRole === 'admin'">
        <p class="custom-label">CZY ZWERYFIKOWANY FORMULARZ OSOBOWY:</p>
        <div :class="['custom-dropdown', { open: dropdownOpen, 'success-bg': isFormVerified, 'warning-bg': !isFormVerified }]" @click="toggleDropdown">
            <div class="dropdown-selected">
                {{ isFormVerified ? 'TAK' : 'NIE' }}
            </div>
            <ul :class="['dropdown-list', { open: dropdownOpen }]">
                <li @click="selectOption(true)">TAK</li>
                <li @click="selectOption(false)">NIE</li>
            </ul>
        </div>
    </div>

    <div class="survey-answers-container" v-if="getRole === 'admin'">
        <div v-if="getUserSurveyData" @click="toggleAnswers">
            <p class="survey-title">ODPOWIEDZI Z ANKIETY</p>
            <div class="survey-answers" v-bind:class="{ 'slide-open': show }">
                <p class="survey-answer">1. Czy jesteś aktywnym kierowcą aplikacji Taxi? <strong class="survey-answer-highlight">{{ userSurveyData.isDriver }} </strong></p>
                <p class="survey-answer">2. Samochód <strong class="survey-answer-highlight">{{ userSurveyData.carType }}</strong></p>
                <p class="survey-answer" v-if="userSurveyData.taxtRegistry != null">2.1 Czy posiada wpis TAXI w dowodzie? <strong class="survey-answer-highlight">{{ userSurveyData.taxtRegistry }}</strong></p>
                <p class="survey-answer">3. Status <strong class="survey-answer-highlight">{{ userSurveyData.jobStatus }}</strong></p>
                <p class="survey-answer">4. Jak szybko chcesz rozpaczać pracę? <strong class="survey-answer-highlight">{{ userSurveyData.startTime }}</strong></p>
                <p class="survey-answer">5. Ile czasu Tygodniowo chcesz przeznaczyć na prace jak kierowca TAXI? <strong class="survey-answer-highlight">{{ userSurveyData.weeklyHours  }}</strong></p>
                <p class="survey-answer">6. Skąd się dowiedziałeś o Cabbie? <strong class="survey-answer-highlight">{{ userSurveyData.foundVia }}</strong></p>
            </div>
        </div>
        <div v-else class="empty-survey-container">
            <p class="empty-survey-title">
                UŻYTKOWNIK NIE WYPEŁNIŁ ANKIETY
            </p>
        </div>
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
            dropdownOpen: false,
            show: false
        };
    },
    computed: {
        ...mapGetters(['getUser', 'isEmailVerified', 'getRole', 'isFormVerified', 'getUserSurveyData']),
        user() {
            return this.getUser || {};
        },
        userSurveyData() {
            return this.getUserSurveyData;
        },
    },
    created() {
        const userId = this.$route.params.id;

        if (this.getRole === 'admin') {
            this.fetchUserById(userId);
        }

        if (this.getRole === 'admin') {
            this.$store.dispatch('fetchUserSurveyData', {
                userId
            });
        }
    },
    mounted() {
        if (this.getRole === 'admin') {
            setTimeout(() => {
                if (this.isFieldsEmpty()) {
                    this.showAlert();
                }
            }, 3000);
        }
    },
    methods: {
        ...mapActions(['fetchUser', 'fetchUserById', 'updateUser', 'resendVerificationEmail', 'updateFormVerificationStatus']),
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        async selectOption(value) {
            this.isFormVerified = value;
            this.dropdownOpen = false;
            const userId = this.user.id;

            try {
                await this.$store.dispatch('updateFormVerificationStatus', {
                    userId,
                    isVerified: value
                });
                Swal.fire({
                    title: 'Sukces!',
                    text: 'Status weryfikacji formularza został zaktualizowany.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                Swal.fire({
                    title: 'Błąd!',
                    text: error.message || 'Nie udało się zaktualizować statusu weryfikacji formularza.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            this.dropdownOpen = false;
        },
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
        async resendVerificationEmail(userId) {
            try {
                await this.$store.dispatch('resendVerificationEmail', userId);
                Swal.fire({
                    title: 'E-mail wysłany!',
                    text: 'Nowy e-mail weryfikacyjny został wysłany pomyślnie.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
            } catch (error) {
                console.error('Error resending verification email:', error);
                Swal.fire({
                    title: 'Błąd!',
                    text: 'Nie udało się wysłać ponownie e-maila weryfikacyjnego.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        showAlert() {
            Swal.fire({
                title: 'Uwaga!',
                text: 'Proszę wrócić do poprzedniej strony.',
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then(() => {
                this.goBack();
            });
        },
        isFieldsEmpty() {
            return !this.user.first_name && !this.user.last_name && !this.user.email && !this.user.phone_number && !this.user.pesel && !this.user.bank_name && !this.user.bank_account_number;
        },
        toggleAnswers() {
            this.show = !this.show;
        }
    },
};
</script>

<style lang="scss" scoped>
.driver-details {
    margin: 0 auto;
    max-width: 710px;
    padding: 20px;
}

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

.verify-form-row {
    display: flex;
    gap: 10px;
    margin-top: 30px;
    margin-left: 5px;
}

.input-row.last-row {
    margin-top: 30px;
}

.input-row.single {
    justify-content: left;
}

.input-container {
    position: relative;
}

.input-field {
    padding: 10px;
    width: 350px;
    font-size: 16px;
    font-family: 'Roboto-Light', sans-serif;
    border: 2px solid transparent;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $placeholder-color;
    transition: border 0.3s ease, background-color 0.3s ease, color 0.3s ease;
    outline: none;
    z-index: 1;
}

.input-field[readonly] {
    cursor: default;
}

.input-field:not([readonly]) {
    color: $white;
    cursor: text;
}

.input-field::placeholder {
    color: $placeholder-color;
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
    background-color: $secondary-color;
    color: $white;
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

.resend-verification-container {
    margin-top: 30px;
    text-align: left;
}

.resend-verification {
    margin-left: 5px;
    background: none;
    color: $title-light-font;
    border: none;
    font-family: 'Roboto-Light', sans-serif;
    font-size: 16px;
    cursor: pointer;
    padding: 0;
}

.resend-verification:hover {
    text-decoration: underline;
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
    color: $white;
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

.back-button {
    position: absolute;
    background-color: transparent;
    border: none;
    color: $primary-color;
    font-size: 18px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: color 0.3s ease;
}

.back-button i {
    margin-right: 5px;
}

.back-button:hover {
    color: $secondary-color;
}

.custom-label {
    font-size: 16px;
    color: $white;
    margin-right: 10px;
    font-family: 'Roboto-Light', sans-serif;
}

.custom-dropdown {
    font-family: 'Roboto-Light', sans-serif;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: $secondary-color;
    border: none;
    border-radius: 15px;
    color: $white;
    width: 100px;
    text-align: center;
    user-select: none;
    transition: border-radius 0.3s ease;
}

.custom-dropdown.open {
    border-radius: 15px 15px 0 0;
}

.dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: $secondary-color;
    border: none;
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 0 0 15px 15px;
    z-index: 10;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
}

.dropdown-list.open {
    max-height: 200px;
    opacity: 1;
}

.dropdown-list li {
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.dropdown-list li:hover {
    background-color: $primary-color;
}

.success-bg {
    background-color: $success-color;
}

.warning-bg {
    background-color: $warning-color;
}

.survey-answers-container {
    background-color: $tr_color;
    margin-top: 30px;
    border-radius: 15px;
    cursor: pointer;
}

.survey-title {
    font-family: 'Roboto-Light', sans-serif;
    color: $white;
    padding: 15px 0px 0px 0px;
    margin-left: 20px;
}

.survey-answers {
    background-color: $secondary-color;
    width: 100%;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.survey-answer {
    color: $footer-background;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-left: 20px;
    font-family: 'Roboto-Light', sans-serif;
    opacity: 1;
}

.survey-answer-highlight {
    color: $white;
}

.empty-survey-container {
    padding: 5px;
}

.empty-survey-title {
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    margin-left: 20px;
}

.survey-answers {
    max-height: 0px;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-open {
    max-height: 500px;
    opacity: 1;
}

@media (max-width: 768px) {
    .title {
        text-align: center;
    }

    .input-row,
    .verify-form-row {
        flex-direction: column;
    }

    .input-field {
        width: 100%;
    }

    .custom-dropdown {
        padding: 10px;
    }
}
</style>
