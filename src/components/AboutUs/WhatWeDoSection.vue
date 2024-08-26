<template>
    <div class="what-we-do">
        <p class="title">CZYM SIĘ ZAJMUJEMY?</p>
        <p class="description">Cabbie to lokalny partner rozliczeniowy dla aplikacji Bolt, Free Now i Uber. 
            Od lat wspieramy kierowców w Białymstoku, oferując przejrzyste i nowoczesne rozwiązania</p>
        <p class="description">Nasi klienci to kierowcy korzystający z aplikacji przewozowych, którzy cenią sobie transparentność, sprawność i partnerstwo.</p>
        <p class="second-title">NASZE PODEJŚCIE DO WSPÓŁPRACY</p>
        <div class="our-approach">
            <div class="first-column">
                <p class="description">Rozwój floty</p>
                <p class="description">Posiadamy własną flotę samochodów, w tym nowoczesne modele, co pozwala nam zapewnić kierowcom sprawną i zróżnicowaną ofertę pojazdów do pracy.</p>
            </div>
            <div class="second-column">
                <p class="description">Transparentne rozliczenia</p>
                <p class="description">W Cabbie stawiamy na przejrzystość w rozliczeniach, nie pobierając prowizji od zarobków kierowcy. Dzięki temu kierowcy mogą liczyć na uczciwe warunki współpracy.</p>
            </div>
        </div>
    </div>
</template>
    
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
        margin-top: 100px
    }

    .second-title {
        color: $primary-color;
        font-family: 'Roboto-Light', 'sans-serif';
        font-size: 36px;
        text-align: center;
        margin-top: 100px
    }

    .description {
        font-size: 20px;
        font-family: 'Roboto-Extra-Light', sans-serif;
        color: $white;
        text-align: center;
        padding-left: 100px;
        padding-right: 100px;
    }
    
    .our-approach{
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