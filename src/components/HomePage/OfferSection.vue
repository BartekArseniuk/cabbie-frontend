<template>
    <div class="offer">
        <p class="title">CO CI OFERUJEMY?</p>
        <div class="row">
            <div class="col">
                <img src="@/assets/images/trust.svg" alt="Trust">
                <p class="offer-title">ZAUFANIE</p>
                <p class="description">Budujemy relacje oparte na zaufaniu i partnerskiej współpracy.</p>
            </div>
            <div class="col">
                <img src="@/assets/images/Research Book.svg" alt="Research Book">
                <p class="offer-title">TRANSPARENTNOŚĆ</p>
                <p class="description">Stawiamy na przejrzystość w rozliczeniach i działaniu.</p>
            </div>
            <div class="col">
                <img src="@/assets/images/Employee Rate.svg" alt="Employee Rate">
                <p class="offer-title">WSPÓLNY ROZWÓJ</p>
                <p class="description">Dążymy do ciągłego rozwoju, zarówno floty jak i naszej marki.</p>
            </div>
        </div>
    </div>
</template>

  
<style scoped>
.offer {
    padding: 20px 0;
}

.title {
    text-align: center;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: #FCB331;
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
    color: #FFFFFF;
    font-family: 'Roboto-Light', sans-serif;
    font-size: 24px;
}

.description {
    color: #FFFFFF;
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