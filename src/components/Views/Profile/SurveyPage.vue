<template>
    <div class="survey-page">
      <p class="title">Witaj w załodze Cabbie!</p>
      <p class="second-title">Prosimy o wypełnienie formularza początkowego.</p>
  
      <div class="survey">
        <div class="question-container" id="first-question-container">
          <p class="question">Czy jesteś aktywnym kierowcą aplikacji Taxi?</p>
          <div class="button-group">
            <button class="answer-button" :class="{ active: selectedDriverOption === 'Tak' }" @click="setDriverOption('Tak')">Tak</button>
            <button class="answer-button" :class="{ active: selectedDriverOption === 'Nie' }" @click="setDriverOption('Nie')">Nie</button>
          </div>
        </div>
  
        <div class="question-container" id="car-question-container">
          <p class="question">Samochód:</p>
          <div class="button-group">
            <button class="answer-button" :class="{ active: selectedCarType === 'Własny' }" @click="setCarType('Własny')">Własny</button>
            <button class="answer-button" :class="{ active: selectedCarType === 'Chcę wynająć' }" @click="setCarType('Chcę wynająć')">Chcę wynająć</button>
          </div>
          <div class="additional-question" id="taxi-question">
            <p class="question">Czy posiada wpis TAXI w dowodzie?</p>
            <div class="button-group">
              <button class="additional-button" :class="{ active: selectedTaxiRegistry === 'Tak' }" @click="setTaxiRegistry('Tak')">Tak</button>
              <button class="additional-button" :class="{ active: selectedTaxiRegistry === 'Nie' }" @click="setTaxiRegistry('Nie')">Nie</button>
            </div>
          </div>
        </div>
  
        <div class="question-container">
          <p class="question">Jaki jest Twój obecny status zawodowy?</p>
          <div class="button-group">
            <button class="answer-button" :class="{ active: selectedJobStatus === 'Student' }" @click="setJobStatus('Student')">Student</button>
            <button class="answer-button" :class="{ active: selectedJobStatus === 'Inna umowa zlecenie' }" @click="setJobStatus('Inna umowa zlecenie')">Inna umowa zlecenie</button>
            <button class="answer-button" :class="{ active: selectedJobStatus === 'Umowa o pracę' }" @click="setJobStatus('Umowa o pracę')">Umowa o pracę</button>
            <button class="answer-button" :class="{ active: selectedJobStatus === 'B2B' }" @click="setJobStatus('B2B')">B2B</button>
            <button class="answer-button" :class="{ active: selectedJobStatus === 'Bezrobotny/a' }" @click="setJobStatus('Bezrobotny/a')">Bezrobotny/a</button>
          </div>
        </div>
  
        <div class="question-container">
          <p class="question">Jak szybko chcesz rozpocząć pracę?</p>
          <div class="button-group">
            <button class="answer-button" :class="{ active: selectedStartTime === 'Jak najszybciej' }" @click="setStartTime('Jak najszybciej')">Jak najszybciej</button>
            <button class="answer-button" :class="{ active: selectedStartTime === 'Do dwóch tygodni' }" @click="setStartTime('Do dwóch tygodni')">Do dwóch tygodni</button>
            <button class="answer-button" :class="{ active: selectedStartTime === 'Do miesiąca' }" @click="setStartTime('Do miesiąca')">Do miesiąca</button>
          </div>
        </div>
  
        <div class="question-container">
          <p class="question">Ile czasu tygodniowo chcesz przeznaczyć na pracę jako kierowca Taxi?</p>
          <input type="text" class="text-input" v-model="weeklyHours" placeholder="Wpisz przedział godzinowy">
        </div>
  
        <div class="question-container">
          <p class="question">Skąd dowiedziałeś się o Cabbie?</p>
          <div class="button-group">
            <button class="answer-button" :class="{ active: selectedSource === 'Facebook' }" @click="setSource('Facebook')">Facebook</button>
            <button class="answer-button" :class="{ active: selectedSource === 'Instagram' }" @click="setSource('Instagram')">Instagram</button>
            <button class="answer-button" :class="{ active: selectedSource === 'Google' }" @click="setSource('Google')">Google</button>
            <button class="answer-button" :class="{ active: selectedSource === 'Z polecenia' }" @click="setSource('Z polecenia')">Z polecenia</button>
            <button class="answer-button" :class="{ active: selectedSource === 'Inne' }" @click="setSource('Inne')">Inne</button>
          </div>
        </div>
        <button class="send" @click="submitSurvey">WYŚLIJ</button>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2';
  import apiService from '@/apiService';
  
  export default {
    data() {
      return {
        selectedDriverOption: null,
        selectedCarType: null,
        selectedTaxiRegistry: null,
        selectedJobStatus: null,
        selectedStartTime: null,
        weeklyHours: '',
        selectedSource: null,
        isActive: null,  // Track the active button
      };
    },
  
    methods: {
      setDriverOption(option) {
        this.selectedDriverOption = option;
      },
  
      setCarType(type) {
        this.selectedCarType = type;
        if (type === 'Własny') {
          document.getElementById('taxi-question').style.display = 'flex';
          setTimeout(() => {
            document.getElementById('taxi-question').classList.add('expand');
          }, 10);
          this.isActive = null;
        } else {
          const taxiQuestion = document.getElementById('taxi-question');
          taxiQuestion.classList.remove('expand');
          setTimeout(() => {
            taxiQuestion.style.display = 'none';
          }, 300);
          this.selectedTaxiRegistry = null;
          this.isActive = null;
        }
      },
  
      setTaxiRegistry(option) {
        this.selectedTaxiRegistry = option;
      },
  
      setJobStatus(status) {
        this.selectedJobStatus = status;
      },
  
      setStartTime(time) {
        this.selectedStartTime = time;
      },
  
      setSource(source) {
        this.selectedSource = source;
      },
  
      async submitSurvey() {
        const surveyAnswers = {
          isDriver: this.selectedDriverOption,
          carType: this.selectedCarType,
          taxiRegistry: this.selectedTaxiRegistry,
          jobStatus: this.selectedJobStatus,
          startTime: this.selectedStartTime,
          weeklyHours: this.weeklyHours,
          foundVia: this.selectedSource,
        };
  
        console.log(surveyAnswers); // Dodaj to, aby zobaczyć, co jest wysyłane
  
        try {
          await apiService.post('/submit-survey', surveyAnswers);
          Swal.fire({
            title: 'Dziękujemy!',
            text: 'Twoje odpowiedzi zostały zapisane.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push({ name: 'Home' }); // lub inna trasa
          });
        } catch (error) {
          Swal.fire({
            title: 'Błąd!',
            text: 'Wystąpił problem podczas zapisywania odpowiedzi.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    }
  };
  </script>

<style lang="scss" scoped>
.title {
    text-align: center;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
    margin-top: 100px;
    padding: 20px 0;
}

.second-title {
    text-align: center;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
    padding: 15px 0;
}

.survey {
    background-color: $secondary-color;
    height: auto;
    margin: 100px auto;
    max-width: 800px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.question-container {
    background-color: $secondary-color;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    padding: 20px;
    border-radius: 20px;
    margin: 20px 0;
}

.additional-question {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 80%;
    padding-bottom: 30px;
    padding-left: 50px;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: max-height 0.3s ease, opacity 0.3s ease;
}

.additional-question.expand {
    max-height: 500px;
    opacity: 1;
}

.question {
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    color: $title-light-font;
    margin-bottom: 10px;
}

.button-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.answer-button {
    padding: 10px 20px;
    background-color: $quaternary-color;
    color: $title-light-font;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.3s ease;
    max-width: 125px;
    text-align: left;
}

.answer-button:hover {
    background-color: $primary-color;
    color: $tertiary-color;
}

.answer-button.active {
    background-color: $primary-color;
    color: $tertiary-color;
}

.additional-button {
    padding: 10px 20px;
    background-color: $quaternary-color;
    color: $title-light-font;
    border: 0;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    transition: all 0.3s ease;
    max-width: 100px;
    text-align: left;
}

.additional-button:hover {
    background-color: $primary-color;
    color: $tertiary-color;
}

.additional-button.active {
    background-color: $primary-color;
    color: $tertiary-color;
}

.text-input {
    padding: 10px 20px;
    background-color: $text-container-color;
    color: $title-light-font;
    border: 2px solid transparent;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    width: 100%;
    max-width: 200px;
    margin: 5px 0;
}

.text-input::placeholder {
    color: $placeholder-color;
}

.text-input:focus {
    border-color: $primary-color;
    outline: none;
}

.send {
    background-color: $primary-color;
    color: $white;
    border: 2px solid $primary-color;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px 20px;
    transition: all 0.3s ease;
    margin-top: 20px;
}

.send:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

@media (max-width: 768px) {
    .title {
        font-size: 28px;
    }

    .second-title {
        font-size: 18px;
        padding: 20px;
    }

    .survey {
        margin: 50px auto;
        padding: 10px;
        max-width: 90%;
    }

    .question-container {
        width: 80%;
        padding: 15px;
        margin: 15px 0;
    }

    .question {
        font-size: 18px;
    }

    .answer-button {
        padding: 8px 16px;
        font-size: 14px;
        max-width: 125px;
    }

    .text-input {
        padding: 8px 16px;
    }

    .send {
        font-size: 16px;
        padding: 8px 16px;
        margin-top: 15px;
    }
}
</style>