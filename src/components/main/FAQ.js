import { Link } from 'react-router-dom';
import { Footer } from './Footer';



function showAnswer(event){

    var ar = document.getElementsByTagName("p");
    

    if(ar[event.currentTarget.id-1].hidden === true){
      ar[event.currentTarget.id-1].hidden = false;
      document.getElementById(event.currentTarget.id).innerHTML = "Ukryj odpowiedź"
    }else{
      ar[event.currentTarget.id-1].hidden = true;
      document.getElementById(event.currentTarget.id).innerHTML = "Zobacz odpowiedź"
    }
}

export function FAQ(){
    
  return <div id="container" style={{width:"100%"}}>
  <hr style={{marginTop: 80}}></hr>
  <h2 style={{textAlign:'center'}}>FAQ(Frequently Asked Questions), czyli najczęściej zadawane pytania.</h2>
  <h5 style={{textAlign:'center'}}>Znajdziejsz tutaj odpowiedzi na najbardziej nurtującie Cię pytania.</h5>
  <hr></hr>
  <h6><b>Pytania i odpowiedzi</b></h6>
  <ol>
    <li id="q1">Czy mogę wypożyczyć samochód bez kaucji? <a id="1" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Wypożyczalnia oferuje wynajem bez kaucji tylko stałym Klientom. Taką możliwość udostępniamy Klientom, którzy dokonali już trzykrotnego wynajmu naszych aut i przy każdym kolejnym wypożyczeniu wykupią opcję zniesienia udziału własnego w szkodzie.</p></li>
    <li id="q2">Jakie są wymogi do wynajęcia pojazdu? <a id="2" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Aby wypożyczyć auto w east rent należy mieć minimum 21 lat oraz posiadać ważne prawo jazdy minimum 1 rok. Oba warunki muszą zostać spełnione. </p></li>
    <li id="q3">Na jaki najkrótszy okres mogę wypożyczyć samochód? <a id="3" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Najkrótszym okresem wypożyczenia są 24 godziny. Koszt wypożyczenia każdego auta można sprawdzić na cenniku lub w szczegółach danego samochodu.</p></li>
    <li id="q4">Czy mogę wypożyczyć samochód - jestem osobą nie prowadzącą działalności gospodarczej? <a id="4" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Oferta wypożyczalni samochodów Białystok skierowana jest zarówno do osób prywatnych jak i firm. Warunkiem wynajęcia samochodu jest ukończone 21 lat (25 lat w przypadku McLaren 720S, Nissan GTR, Lamborghini Huracan, Ferrari 458 Italia, Lexus LFA, BMW M8, Audi R8) oraz posiadanie prawa jazdy przynajmniej 1 rok.</p></li>
    <li id="q5">W jakich godzinach możliwe jest wypożyczenie samochodu? <a id="5" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Nasze Biuro Obsługi Klienta w umożliwia kontakt z naszymi pracownikami w dni robocze w godzinach 7-19 i w soboty w godzinach 8:00 - 14:00.
      Odbiór lub zwrot auta w naszych wirtualnych biurach jest możliwy od poniedziałku do soboty w godzinach od 6:00 do 18:00.</p></li>
    <li id="q6">Czy mogę wypożyczyć konkretny model samochodu? <a id="6" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak. Aby zapoznać się z naszą zróżnciowaną ofertą ponad 100 samochodów prosimy udać się na stronę Flota.</p></li>
    <li id="q7">Czy mogę wypożyczyć samochód posiadając niepolskie prawo jazdy? <a id="7" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak, aby wypożyczyć pojazd należy posiadac międzynarodowe prawo jazdy, minimum 21 lat oraz posiadać dokument uprawniający kierowanie pojazdem minimum rok.</p></li>
    <li id="q8">Jak mogę zapłacić za wynajem auta? <a id="8" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Aby zapłacić za wynajem samochodu jest możliwość uregulowania rachunku za pomocą podłaczenia karty płątniczej lub zapłącenia gotówką w biuerze w godzinach pracy.</p></li>
    <li id="q9">Czy kierowcą może być inna osoba niż wynajmujący? <a id="9" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Nie, kierowcą pojazdu może być tylko osoba, która podpisuję umowę z wypożyczalnią.</p></li>
    <li id="q10">Czy mogę wyjechać wypożyczonym samochodem za granicę kraju? <a id="10" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Udostępniamy Państwu możliwość poruszania się wypożyczonym samochodem po całym terytorium Unii Europejskiej. Planowany wyjazd za granicę należy zgłosić przed wynajęciem samochodu. Wiąże się to z jednorazową opłatą w wysokości 300 zł autach osobowych lub 500 zł przy samochodach dostawczych.</p></li>
    <li id="q11">Czy auto, które wypożyczę będzie zatankowane? <a id="11" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak, każde auto na początku wynajmu jest zatankowane. W przypadku braku paliwa klient sam uzpełnia braki paliwa na swój koszt.</p></li>
    <li id="q12">Jak przygotować auto do zwrotu? <a id="12" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Nasze samochody zawsze wydajemy czyste oraz zatankowane do pełna. Zwracane auto powinno być zatankowane do pełna oraz czyste z zewnątrz i w środku. Najemca może wykupić „Pakiet myjnia – karoseria” zwalniający z konieczności mycia auta z zewnątrz przed zwrotem oraz „Pakiet myjnia – wnętrze” zwalniający z konieczności sprzątania auta w środku przed zwrotem.</p></li>
    <li id="q13">Czy mogę zwrócić pojazd w innym miejscu niż go odebrałem? <a id="13" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak, auto można zwrócić w każdym z naszych wirtualnych biur.</p></li>
    <li id="q14">Zapomniałem rzeczy z auta, które zostało zwrócone. Jak mogę je odebrać? <a id="14" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Należy skontaktować się z Biurem Obslugi Klienta wypożyczalni i podać wszelkie niezbędne informacje potrzebne do ustaelnia w jakim samochodze zostały zostawione rzeczy(i jakie).</p></li>
    <li id="q15">Kiedy zostanie mi zwrócona kaucja po zwrocie auta? Czy otrzymam potwierdzenie? <a id="15" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak, potwierdzenie wysyłamy drogą mailową oraz kaucja zostanie zwrócona do 3 dni po oddaniu auta w celu zweryfikownia czy auto jest w jak najlepszym  stanie.</p></li>
    <li id="q16">Gdzie mogę zapoznać się z regulaminem przed wynajmem? <a id="16" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Wystarczy przejśc do zakładki Regulamin.</p></li>
    <li id="q17">Czy za tankowanie klient płaci samodzielnie? <a id="17" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Tak, tankowanie jest po stronie wypożyczającego.</p></li>
    <li id="q18">Gdzie jest możliwość naładowania samochodu elektrycznego? <a id="18" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Samochód można naładować na stacji ładowania lub skorzystać z naszej ładowarki. ksozty obu tych opcji pokrywa wypożyczający.</p></li>
    <li id="q19">Co w przypadku, gdy zostało mi zrobione zdjęcie przez fotoradar? <a id="19" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">Po otrzymaniu wezwania do zapłaty, wypożyczalnia sutala tożsamość osoby kierującej pojazdem i mandat wysyłany jest drogą pocztową,.</p></li>
    <li id="q20">Samochód został skradziony podczas wynajmu, co mam zrobić? <a id="20" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">W takiej sytuacji należy jak najszybciej powiadomić policję oraz niezwłocznie skontaktować się z naszym Biurem Obslugi Klienta.</p></li>
    <li id="q21">Samochód się zepsuł nie podczas wyjazdu ani stluczki, co zrobić? <a id="21" href="javascript:void(0)" onClick={showAnswer}>Zobacz odpowiedź</a><p hidden="true">W takiej sytuacji należy zadzwonić do Biura Obslugi Klienta i postępować zgodnie z instrukcjami przekazywanymi przez korespondentów.</p></li>
  </ol>
  <p>Jeśli nie znalazł/ła Pan/Pani odpowiedźi na swoje pytanie, prosimy o <Link to="/kontakt">kontakt</Link>.</p>
  <br></br>
  <Footer></Footer>
</div>
}