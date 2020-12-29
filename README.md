# Dokumentacja projektu z przedmiotu "Przetwarzanie danych w chmurach obliczeniowych"

## Opis aplikacji

 Aplikacja pozwalająca na znajdowanie najszybszej trasy przejazdu pomiędzy miastami. 
 Dane miast i dróg są przechowywane w bazie grafowej Neo4j. 
 Za interakcje z bazą danych dopowiada serwerowa aplikacja w technologii .NET 5.0, interakcje z bazą danych korzystają z biblioteki Neo4jClient.
 Interfejs użytkownika jest udostępniany przez SPA napisaną w TypeSrict, korzystając z bibilioteki React.
 Aplikacja jest zoptymalizowana do uruchamiania w formie kontenerów Docker, korzystając z docker-compose.
 
## Wymagania stawiane aplikacji:
- Dodawanie miast oraz dróg pomiędzy miastami
- Znajdowanie najszybszej drogi pomiędzy miastami
- Szybkość i niezawodność działania


## Schemat bazy danych:

### Węzeł City
- Węzeł reprezentujący miasto na mapie
- Struktura:
    ``` yaml
    Name: nazwa miasta
    Latitude: szerokość geograficzna na której leży miasto
    Longitude: długość geograficzna na której leży miasto
    Guid: unikalny identyfikator miasta, generowany automatycznie
    ```
  
### Połącznie Road
- Połącznie reprezentujące drogę pomiędzy miastami
- Struktura:
    ```yaml
    Distance: długość drogi w kilometrach
    Type: rodzaj drogi, określa ograniczenie prędkości używane w wyliczaniu czasu przejazdu, dozwolone wartości
      - teren zabudowany: dozwolona prędkość to 50 km/h
      - teren niezabudowany: dozwolona prędkość to 90 km/h
      - droga ekspresowa: dozwolona prędkość to 120 km/h
      - autostrada: dozwolona prędkość to 140 km/h
    Cost: czas przejazdu podczas jazdy zgodnej z ograniczeniem prędkości
    ```