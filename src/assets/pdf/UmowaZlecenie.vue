<template>
    <div id="container">
        <h2>Umowa Zlecenie</h2>
        <div id="pdf">
            <p>
                UmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowaUmowa
            </p>
            <p>
                Umowa
            </p>
            <p>
                Umowa
            </p>
            <p>
                Umowa
            </p>
        </div>
        <button class="button" type="submit" @click="exportToPdf">Pobierz umowę</button>
    </div>
      
</template>

<script>
import html2pdf from 'html2pdf.js';

export default {
  methods: {
    exportToPdf() {
        html2pdf(document.getElementById('pdf'), {
            margin: 1,
            filename: 'umowa_zlecenie.pdf',
        });
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto-Light', 'sans-serif';
}

h2 {
    color: $white;
}

#pdf {
    border-radius: 20px;
    background-color: $white;
    width: 100%;
    margin-bottom: 10px;
    overflow-wrap: break-word;
}

#pdf p {
    margin: 30px;
}

.button {
    cursor: pointer;
    font-family: 'Roboto-Light', 'sans-serif';
    font-size: 18px;
    padding: 10px;
    border-radius: 15px;
    color: $tertiary-color;
    background-color: $primary-color;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.button:hover {
    color: $white;
    background-color: $primary-color;
    border: 2px solid $tertiary-color;
}

</style>