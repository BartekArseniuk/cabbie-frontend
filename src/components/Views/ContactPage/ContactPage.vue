<template>
    <div class="contact">
      <p class="title">KONTAKT</p>
      <p class="second-title">Odpowiedzi udzielimy na adres e-mail.</p>
      <main>
        <section id="contact">
          <ContactForm :showTitle="false" />
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import ContactForm from '@/components/Common/ContactForm.vue';
  </script>
  
  <style lang="scss" scoped>
  .title {
    text-align: center;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
    margin-top: 100px;
  }
  
  .second-title {
    text-align: center;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
    margin-bottom: 50px;
  }

  @media (max-width: 768px) {
    .second-title {
      font-size: 20px;
    }
  }
  </style>  