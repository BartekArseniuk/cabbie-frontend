<template>
<div class="contact">
    <p class="title">SKONTAKTUJ SIĘ Z NAMI</p>
    <form class="contact-form">
        <div class="input-row">
            <input type="text" placeholder="IMIĘ" class="input-field" />
            <input type="text" placeholder="NAZWISKO" class="input-field" />
            <input type="email" placeholder="E-MAIL" class="input-field" />
        </div>
        <textarea placeholder="TREŚĆ TWOJEJ WIADOMOŚCI" class="input-description"></textarea>
        <button class="send">WYŚLIJ</button>
    </form>
</div>
</template>

<style scoped>
.contact {
    height: auto;
    padding: 0 200px;
}

.title {
    text-align: left;
    font-size: 36px;
    font-family: 'Roboto-Light', sans-serif;
    color: #FFFFFF;
    margin-bottom: 20px;
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.input-row {
    display: flex;
    justify-content: space-between;
    gap: 40px;
}

.input-field {
    padding: 10px;
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: #363434;
    color: #FFFFFF;
    transition: all 0.3s ease;
    flex: 1;
}

.input-description {
    padding: 15px;
    font-size: 24px;
    font-family: 'Roboto-Light', sans-serif;
    border: none;
    border-radius: 15px;
    box-sizing: border-box;
    background-color: #363434;
    color: #FFFFFF;
    transition: all 0.3s ease;
    height: 150px;
    resize: none;
}

.input-field:hover,
.input-field:focus,
.input-description:hover,
.input-description:focus {
    border: 2px solid #FCB331;
    outline: none;
}

.send {
    background-color: #FCB331;
    color: white;
    border: 2px solid #FCB331;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 20px;
    padding: 10px 20px;
    width: 150px;
    margin-bottom: 50px;
    transition: all 0.3s ease;
    color: #1e1e1e;
}

.send:hover {
    color: #FFFFFF;
    background-color: #FCB331;
    border: 2px solid #1E1E1E;
}

@media (max-width: 768px) {
    .contact {
        height: auto;
        padding: 0 50px;
    }

    .input-row {
        flex-direction: column;
        gap: 10px;
    }

    .contact-form {
        gap: 10px;
    }
}
</style>