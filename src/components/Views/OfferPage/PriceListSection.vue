<template>
<div class="price-list">
    <p class="title">CENNIK NASZYCH USŁUG</p>
    <div v-for="(block, index) in blocks" :key="index" class="price">
        <div class="text" :class="{ 'highlight': !block.price, 'white-text': block.price }">{{ block.title }}</div>
        <div class="text price-text">{{ block.price }}</div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            blocks: [{
                    title: 'Rozliczenie 1-3 aplikacji',
                    price: '50 zł',
                },
                {
                    title: 'Składka do Umowy Zlecenie (za tydzień, w którym jeździsz)',
                    price: '30 zł',
                },
                {
                    title: 'Obsługa Umowy Zlecenie',
                    price: '10 zł',
                },
                {
                    title: 'BRAK PROWIZJI OD TWOICH ZAROBKÓW',
                    price: '',
                }
            ],
        };
    },
};
</script>

<style lang="scss" scoped>
.price-list {
    background-image: url('@/assets/images/Group 40.png');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    .title {
        text-align: center;
        font-size: 36px;
        font-family: 'Roboto-Light', sans-serif;
        color: $primary-color;
    }

    .price {
        width: 60%;
        height: 50px;
        background-color: rgba(54, 52, 52, 0.7);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .text {
            margin: 5px 0;
        }

        .white-text {
            color: $white;
            font-size: 20px;
            font-family: 'Roboto-Light', sans-serif;
        }

        .price-text {
            color: $primary-color;
            font-size: 20px;
            font-family: 'Roboto-Extra-Light', sans-serif;
        }

        .highlight {
            color: $primary-color;
            font-size: 20px;
            font-family: 'Roboto-Light', sans-serif;
        }
    }

    @media (max-width: 768px) {
        .price {

            .white-text,
            .price-text,
            .highlight {
                font-size: 16px;
            }
        }
    }
}
</style>