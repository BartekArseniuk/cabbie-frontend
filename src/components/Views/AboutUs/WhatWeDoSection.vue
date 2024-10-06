<template>
<div class="what-we-do">
    <p class="title">{{ titles.main }}</p>
    <p class="description">{{ descriptions.main }}</p>
    <p class="description">{{ descriptions.additional }}</p>
    <p class="description">{{ descriptions.secondAdditional }}</p>
    <p class="second-title">{{ titles.approach }}</p>
    <div class="our-approach">
        <div class="approach-column" v-for="(item, index) in approachItems" :key="index">
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
                main: 'Cabbie to lokalny partner rozliczeniowy dla aplikacji Bolt, Free Now i Uber. Od lat wspieramy kierowców na Podlasiu oraz ich rozwój, oferując przejrzyste i nowoczesne rozwiązania redukując do minimum koszty ponoszone przez kierowcę.',
                additional: 'Nasi współpracownicy to kierowcy korzystający z aplikacji przewozowych, którzy cenią sobie, bezpieczeństwo finansowe oraz kulturę pracy a także rozwój swoich umiejętności.',
                secondAdditional: 'Dzięki obranej strategii oraz młodemu, ambitnemu zespołowi Cabbie, w której kładziemy nacisk na dynamiczny rozwój firmy. Niebawem zawitamy w takich miastach jak Biała Podlaska, Łomża oraz Ełk.'
            },
            approachItems: [{
                    text: 'Chcemy aby każdy kierowca współpracujący z nami miał prosty wgląd do zarobków, młody zespół skupiający się na rozwoju całego ekosystemu marki, umożliwia to innym, chętnym do pracy rozwijać się, a za pomoc w rozwoju marki Cabbie, każdy zostanie sprawiedliwie wynagrodzony.'
                },
                {
                    text: 'Rozwój i partnerstwo to fundamenty spajające Cabbie. Dołącz do nas i zacznij kształtować swoją pryszłość za pomocą wspólnie wytyczonych celów, ambicji oraz pomysłów, jedziemy na jednym wózku.'
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
    margin-top: 50px;
}

.second-title {
    color: $primary-color;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 36px;
    text-align: center;
    margin-bottom: 100px;
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
    width: 100%;
    margin-top: 30px;
}

.approach-column {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
}

@media (max-width: 768px) {
    .our-approach {
        flex-direction: column;
    }

    .second-title {
        margin-bottom: 0;
        padding-left: 20px;
        padding-right: 20px;
    }

    .description {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>
