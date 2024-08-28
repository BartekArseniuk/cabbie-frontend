<template>
<div class="what-we-do">
    <p class="title">{{ titles.main }}</p>
    <p class="description">{{ descriptions.main }}</p>
    <p class="description">{{ descriptions.additional }}</p>
    <p class="second-title">{{ titles.approach }}</p>
    <div class="our-approach">
        <div class="approach-column" v-for="(item, index) in approachItems" :key="index">
            <p class="description">{{ item.title }}</p>
            <p class="description">{{ item.text }}</p>
        </div>
    </div>
</div>
</template>

  
<script>
export default {
    data() {
        return {
            titles: {
                main: 'CZYM SIĘ ZAJMUJEMY?',
                approach: 'NASZE PODEJŚCIE DO WSPÓŁPRACY'
            },
            descriptions: {
                main: 'Cabbie to lokalny partner rozliczeniowy dla aplikacji Bolt, Free Now i Uber. Od lat wspieramy kierowców w Białymstoku, oferując przejrzyste i nowoczesne rozwiązania.',
                additional: 'Nasi klienci to kierowcy korzystający z aplikacji przewozowych, którzy cenią sobie transparentność, sprawność i partnerstwo.'
            },
            approachItems: [{
                    title: 'Rozwój floty',
                    text: 'Posiadamy własną flotę samochodów, w tym nowoczesne modele, co pozwala nam zapewnić kierowcom sprawną i zróżnicowaną ofertę pojazdów do pracy.'
                },
                {
                    title: 'Transparentne rozliczenia',
                    text: 'W Cabbie stawiamy na przejrzystość w rozliczeniach, nie pobierając prowizji od zarobków kierowcy. Dzięki temu kierowcy mogą liczyć na uczciwe warunki współpracy.'
                }
            ]
        };
    }
}
</script>

    
<style lang="scss" scoped>
.what-we-do {
    background-image: url('@/assets/images/Group_27.png');
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    overflow: hidden;
    flex-direction: column;
}

.title {
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 42px;
    text-align: center;
    margin-top: 100px;
}

.second-title {
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 36px;
    text-align: center;
}

.description {
    font-size: 20px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $white;
    text-align: center;
    padding-left: 100px;
    padding-right: 100px;
}

.our-approach {
    display: flex;
    flex-direction: row;
}

@media (max-width: 768px) {
    .our-approach {
        flex-direction: column;
    }

    .second-title {
        padding-left: 20px;
        padding-right: 20px;
    }

    .description {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>