<template>
<div class="FAQ">
    <p class="title">CZĘSTO ZADAWANE PYTANIA</p>
    
    <main>
        <div class="faq-section">
            <h3 class="faq-section-title">O Nas</h3>
            <div class="faq-answers">
                <div class="faq-question" @click="toggleAnswer('question1')">
                    <p> <i :class="['fas', activeAnswer === 'question1' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czym zajmuje się firma Cabbie?</p>
                    <div v-show="activeAnswer === 'question1'" class="faq-answer">
                        <p>
                            Cabbie to innowacyjna platforma łącząca kierowców z aplikacjami przewozowymi (BOLT, UBER, FREE NOW). Oferujemy kompleksowe rozwiązania w obsłudze i rozliczaniu kierowców, tworząc efektywne i przyjazne środowisko pracy.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question2')">
                    <p> <i :class="['fas', activeAnswer === 'question2' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jakie usługi oferuje Cabbie?</p>
                    <div v-show="activeAnswer === 'question2'" class="faq-answer">
                        <p>
                            Cabbie zapewnia kompleksową obsługę dla kierowców, w tym prowadzenie konta, ułatwianie współpracy z platformami takimi jak Uber, Bolt i Free Now, oraz bezpieczne rozliczanie na podstawie danych z tych aplikacji. Dodatkowo, oferujemy udział w akcjach promocyjnych, gdzie nasi kierowcy mogą zdobywać atrakcyjne rabaty i nagrody za aktywne uczestnictwo.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question3')">
                    <p> <i :class="['fas', activeAnswer === 'question3' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> W jakich miastach znajdę Cabbie?</p>
                    <div v-show="activeAnswer === 'question3'" class="faq-answer">
                        <p>
                            Cabbie obecnie znajdziesz w:
                            <ul>
                                <li>Białymstoku</li>
                                <li> Białej Podlaskiej</li>
                                <li>już wkrótce dołączymy do miasta Ełk i Łomża</li>
                            </ul>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="faq-section">
            <h3 class="faq-section-title">Umowy z Cabbie</h3>
            <div class="faq-answers">
                <div class="faq-question" @click="toggleAnswer('question4')">
                    <p> <i :class="['fas', activeAnswer === 'question4' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jakie umowy muszę podpisać?</p>
                    <div v-show="activeAnswer === 'question4'" class="faq-answer">
                        <p>
                            Rozpoczynając współpracę z Cabbie, masz kilka opcji do wyboru:
                            <ul>
                                <li>Umowa zlecenie – dla studentów</li>
                                <li>Umowa zlecenie + umowa najmu</li>
                                <li>Współpraca B2B – jeśli prowadzisz własną działalność gospodarczą</li>
                            </ul>
                            Wybierz to, co najlepiej odpowiada Twoim potrzebom!
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question5')">
                    <p> <i :class="['fas', activeAnswer === 'question5' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czy mogę rozwiązać umowę zlecenie lub najmu w dowolnym momencie?</p>
                    <div v-show="activeAnswer === 'question5'" class="faq-answer">
                        <p>
                            Tak, obie umowy mogą być rozwiązane z odpowiednim okresem wypowiedzenia, zgodnie z zapisami umowy. Zawsze warto wcześniej zapoznać się z warunkami dotyczącymi wypowiedzenia.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question6')">
                    <p> <i :class="['fas', activeAnswer === 'question6' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jak mogę zawrzeć umowę z Cabbie?</p>
                    <div v-show="activeAnswer === 'question6'" class="faq-answer">
                        <p>
                            Aby zawrzeć umowę:
                            <ol>
                                <li> Zarejestruj się na platformie Cabbie</li>
                                <li>Dostarcz nam wymagane dokumenty</li>
                                <li>Podpisz umowę elektronicznie przez system Autenti</li>
                            </ol>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="faq-section">
            <h3 class="faq-section-title">Rejestracja i zarządzanie kontem</h3>
            <div class="faq-answers">
                <div class="faq-question" @click="toggleAnswer('question7')">
                    <p> <i :class="['fas', activeAnswer === 'question7' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jak mogę zarejestrować konto w Cabbie?</p>
                    <div v-show="activeAnswer === 'question7'" class="faq-answer">
                        <p>
                            Aby zarejestrować konto, wystarczy wypełnić formularz na naszej stronie internetowej i zaakceptować regulamin. Po rejestracji otrzymasz wiadomość e-mail z linkiem weryfikacyjnym.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question8')">
                    <p> <i :class="['fas', activeAnswer === 'question8' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czy mogę w każdej chwili zrezygnować z korzystania z platformy? </p>
                    <div v-show="activeAnswer === 'question8'" class="faq-answer">
                        <p>
                            Tak, korzystanie z platformy Cabbie jest dobrowolne, a użytkownik może w każdej chwili zrezygnować z umowy z zachowaniem okresu wypowiedzenia.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question9')">
                    <p> <i :class="['fas', activeAnswer === 'question9' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Kiedy i jak mogę zgłosić reklamację?</p>
                    <div v-show="activeAnswer === 'question9'" class="faq-answer">
                        <p>
                            Reklamacje można zgłaszać pisemnie na adres Organizatora lub elektronicznie na adres e-mail biuro@cabbie.pl Reklamacja powinna precyzyjnie opisywać sytuację oraz zawierać żądania Użytkownika. Rozpatrzenie reklamacji następuje w terminie do 14 dni.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question10')">
                    <p> <i :class="['fas', activeAnswer === 'question10' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jakie są koszty obsługi panelu Cabbie?</p>
                    <div v-show="activeAnswer === 'question10'" class="faq-answer">
                        <p>
                            16,99 zł miesięcznie za korzystanie z portalu kierowcy „Cabbie”, jeśli jesteś aktywnym kierowcą.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question11')">
                    <p> <i :class="['fas', activeAnswer === 'question11' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jak mogę zaktualizować swoje dane lub dokumenty oraz zgłosić zmiany dotyczące moich danych osobowych lub pojazdu?</p>
                    <div v-show="activeAnswer === 'question11'" class="faq-answer">
                        <p>
                            Swoje dane i dokumenty możesz zaktualizować po zalogowaniu się na konto w sekcji „Dane i dokumenty”. Ponadto, wszelkie zmiany dotyczące danych osobowych lub pojazdu należy zgłosić do Cabbie w ciągu 3 dni od ich zaistnienia, co obejmuje również sytuacje związane z ubezpieczeniami społecznymi i zaliczkami na podatek dochodowy.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question12')">
                    <p> <i :class="['fas', activeAnswer === 'question12' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jak Cabbie dba o bezpieczeństwo moich danych osobowych?</p>
                    <div v-show="activeAnswer === 'question12'" class="faq-answer">
                        <p>
                            W Cabbie priorytetowo traktujemy bezpieczeństwo danych. Stosujemy zaawansowane protokoły szyfrowania, aby zapewnić ochronę wszystkich danych osobowych i transakcyjnych. Dodatkowo, nasze działania są zgodne z przepisami RODO, co gwarantuje najwyższe standardy ochrony prywatności.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="faq-section">
            <h3 class="faq-section-title">Podpis Autenti</h3>
            <div class="faq-answers">
                <div class="faq-question" @click="toggleAnswer('question13')">
                    <p> <i :class="['fas', activeAnswer === 'question13' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czym jest Autenti?</p>
                    <div v-show="activeAnswer === 'question13'" class="faq-answer">
                        <p>
                            Autenti to platforma do zdalnego podpisywania dokumentów, umożliwiająca składanie podpisu elektronicznego online. Dzięki niej można szybko i bezpiecznie podpisywać umowy, eliminując potrzebę drukowania i skanowania dokumentów. Autenti jest zgodna z obowiązującymi przepisami prawnymi, co czyni elektroniczne podpisy równoważnymi z podpisami własnoręcznymi.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question14')">
                    <p> <i :class="['fas', activeAnswer === 'question14' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czy podpis elektroniczny na platformie Cabbie jest bezpieczny?</p>
                    <div v-show="activeAnswer === 'question14'" class="faq-answer">
                        <p>
                            Tak, Cabbie korzysta z rozwiązań Autenti, które zapewniają zaawansowane technologie szyfrowania, kwalifikowane znaczniki czasu oraz pieczęcie elektroniczne. Dzięki temu każda transakcja jest zabezpieczona przed nieautoryzowanymi zmianami.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question15')">
                    <p> <i :class="['fas', activeAnswer === 'question15' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jakie metody weryfikacji tożsamości są stosowane?</p>
                    <div v-show="activeAnswer === 'question15'" class="faq-answer">
                        <p>
                            Podstawową metodą weryfikacji tożsamości jest adres e-mail, ale możliwe jest również dodanie dodatkowych metod, takich jak weryfikacja za pomocą SMS-ów (kod OTP). To zapewnia dodatkowy poziom zabezpieczeń.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="faq-section">
            <h3 class="faq-section-title">Podatki</h3>
            <div class="faq-answers">
                <div class="faq-question" @click="toggleAnswer('question16')">
                    <p> <i :class="['fas', activeAnswer === 'question16' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Co to jest VAT i jakie stawki obowiązują w branży transportowej?</p>
                    <div v-show="activeAnswer === 'question16'" class="faq-answer">
                        <p>
                            W branży transportowej wyróżniamy dwie główne stawki VAT:
                            <ul>
                                <li>8% – dotyczy usług przewozu osób oraz przewozów TAXI.</li>
                                <li>23% – odnosi się do pozostałych usług w branży transportowej.</li>
                            </ul>
                            Pamiętaj, że odpowiednia stawka VAT jest istotna dla prawidłowego rozliczania usług transportowych!
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question17')">
                    <p> <i :class="['fas', activeAnswer === 'question17' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Jak mogę zmniejszyć swój podatek?</p>
                    <div v-show="activeAnswer === 'question17'" class="faq-answer">
                        <p>
                            Możesz skutecznie zmniejszyć swój podatek, korzystając z faktur kosztowych związanych z naszą współpracą.
                            Wystarczy, że zbierzesz faktury na takie wydatki jak paliwo, przegląd auta czy wymiana opon.
                            Zgodnie z umową, to my zajmiemy się rozliczeniem podatku VAT, a Ty otrzymasz zwrot kosztów w ramach okresowego rozliczenia.
                        </p>
                    </div>
                </div>
                <div class="faq-question" @click="toggleAnswer('question18')">
                    <p> <i :class="['fas', activeAnswer === 'question18' ? 'fa-chevron-up' : 'fa-chevron-down', 'arrow-icon']"></i> Czy posiadam ubezpieczenie zdrowotne w ZUS, jeśli współpracuję z Cabbie?</p>
                    <div v-show="activeAnswer === 'question18'" class="faq-answer">
                        <p>
                            Tak, jak najbardziej! Jeśli podpisałeś z nami umowę zlecenie, jesteś zarejestrowany w ZUS,
                            co oznacza, że masz zapewnione ubezpieczenie zdrowotne. Co więcej, możesz również ubezpieczyć swoją rodzinę na swoje nazwisko.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import {
    mapGetters,
} from "vuex";
export default {
    data() {
        return {
            activeAnswer: null,
        };
    },
    methods: {
        toggleAnswer(answer) {
            this.activeAnswer = this.activeAnswer === answer ? null : answer;
        }
    },
    computed: {
        ...mapGetters(["getRole"]),
    }
};
</script>

<style lang="scss" scoped>
.FAQ {
    margin-bottom: 50px;
}

.title {
    font-family: 'Roboto-Light', sans-serif;
    text-align: center;
    font-size: 36px;
    color: $primary-color;
    margin-top: 100px;
    padding: 50px 0;
}

main {
    margin-left: 50px;
}

.faq-section-title {
    color: $primary-color;
    font-family: 'Roboto-Light', sans-serif;
}

.faq-question {
    width: 75%;
    cursor: pointer;
    color: $white;
    margin-left: 25px;
    font-family: 'Roboto-Light', sans-serif;
}

.faq-answer {
    width: 75%;
    margin-left: 25px;
    font-family: 'Roboto-Extra-Light', sans-serif;
}

i {
    color: $primary-color;
}

.admin-button {
    font-size: 18px;
    color: $white;
    font-family: 'Roboto-Light', sans-serif;
    font-weight: 800;
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    border: none;
    background: none;
    text-transform: uppercase;
    transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.admin-button:hover {
    color: $primary-color;
}

@media (max-width: 768px) {
    main {
        margin-left: 20px;
    }
}
</style>