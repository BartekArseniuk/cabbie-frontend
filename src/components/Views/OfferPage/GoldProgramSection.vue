<template>
    <div id="gold-program">
        <div id="text-container">
            <p class="title">ZŁOTY PROGRAM</p>
            <p class="description">
                Nasz akcja promocyjna <span class="highlight">“Złoty program”</span> zapewnia zredukowanie kosztu
                rozliczenia na stałe.  
            </p>
            <p class="description">
                <span class="highlight">Jeden Polecony kierowca = złotówka mniej od ceny rozliczenia</span>
            </p>
            <p class="description">
                Liczba miejsc mocno ograniczona, liczy się kolejność rejestracji w panelu Cabbie
            </p>
            <a class="regulations" href="">Regulamin akcji</a>
        </div>
    </div>
</template>

<style lang="scss" scoped>

#gold-program {
    width: 100%;
    height: auto;
    margin: 20px 0px 60px 0px ;
}

#text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.title {
    font-size: 32px;
    font-family: 'Roboto-Light', sans-serif;
    color: $primary-color;
}

.description {
    width: 80%;
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
}

.highlight {
  color: $primary-color;
  font-weight: bold;
}

.regulations {
    font-size: 24px;
    font-family: 'Roboto-Extra-Light', sans-serif;
    color: $title-light-font;
}
</style>