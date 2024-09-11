<template>
<div class="driver-details">
    <p class="title">Dane kierowcy</p>
    <div class="input-row">
        <input type="text" placeholder="IMIĘ" class="input-field" />
        <input type="text" placeholder="NAZWISKO" class="input-field" />
    </div>
    <div class="input-row">
        <input type="text" placeholder="E-MAIL" class="input-field" />
        <input type="text" placeholder="NR TELEFONU" class="input-field" />
    </div>
    <div class="input-row single">
        <input type="text" placeholder="NR PESEL" class="input-field pesel" />
    </div>
    <div class="input-row last-row">
        <input type="text" placeholder="NAZWA BANKU" class="input-field" />
        <input type="text" placeholder="NR KONTA BANKU" class="input-field" />
    </div>
    <div class="button-container">
        <button class="edit">EDYTUJ</button>
    </div>

    <p class="second-title">Dokumenty</p>
    <div class="documents">
        <p class="subtitle">Do wgrania</p>
        <ul class="document-list">
        </ul>
        <p class="subtitle">Do pobrania</p>
        <ul class="document-list">
            <li><a href="#link1" target="_blank">Umowa Zlecenie + Kwestionariusze do wypełnienia</a></li>
            <li><a href="#link2" target="_blank">Umowa Najmu</a></li>
        </ul>
    </div>
</div>
</template>

<style lang="scss" scoped>
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

.input-row.last-row {
    margin-top: 50px;
}

.input-row.single {
    justify-content: left;
}

.input-field {
    padding: 10px;
    width: 400px;
    font-size: 16px;
    font-family: 'Roboto-Light', sans-serif;
    border: 2px solid transparent;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: $secondary-color;
    color: $white;
    transition: border 0.3s ease;
    outline: none;
}

.input-field.pesel {
    width: 400px;
    max-width: 100%;
}

.edit {
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

.edit:hover {
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
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

@media (max-width: 768px) {
    .title {
        text-align: center;
    }

    .input-row {
        flex-direction: column;
    }

    .input-field {
        width: auto;
    }
}
</style>
