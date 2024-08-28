<template>
    <div class="offer">
      <p class="title">CO CI OFERUJEMY?</p>
      <div class="row">
        <div class="col" v-for="(offer, index) in offers" :key="index">
          <img :src="offer.image" :alt="offer.title">
          <p class="offer-title">{{ offer.title }}</p>
          <p class="description">{{ offer.description }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Załaduj obrazy
  import trustImage from '@/assets/images/trust.svg';
  import researchBookImage from '@/assets/images/Research Book.svg';
  import employeeRateImage from '@/assets/images/Employee Rate.svg';
  
  // Lista ofert z załadowanymi obrazami
  const offers = ref([
    {
      image: trustImage,
      title: 'ZAUFANIE',
      description: 'Budujemy relacje oparte na zaufaniu i partnerskiej współpracy.'
    },
    {
      image: researchBookImage,
      title: 'TRANSPARENTNOŚĆ',
      description: 'Stawiamy na przejrzystość w rozliczeniach i działaniu.'
    },
    {
      image: employeeRateImage,
      title: 'WSPÓLNY ROZWÓJ',
      description: 'Dążymy do ciągłego rozwoju, zarówno floty jak i naszej marki.'
    }
  ]);
  </script>
  
  <style lang="scss" scoped>
  .offer {
    padding: 20px 0;
  }
  
  .title {
    text-align: center;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
  }
  
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 60px;
  }
  
  .col {
    flex: 1;
    max-width: 250px;
    text-align: center;
  }
  
  img {
    max-width: 100%;
    height: auto;
    transform: scale(0.7);
  }
  
  .offer-title {
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    font-size: 24px;
  }
  
  .description {
    color: $white;
    font-family: 'Roboto-Extra-Light', sans-serif;
    font-size: 18px;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    .offer {
      padding: 10px 0;
    }
  
    .title {
      font-size: 30px;
    }
  
    img {
      transform: scale(0.8);
    }
  
    .offer-title {
      font-size: 20px;
    }
  
    .description {
      font-size: 16px;
      padding: 15px;
    }
  
    .row {
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  
    .col {
      max-width: 100%;
    }
  }
  </style>  