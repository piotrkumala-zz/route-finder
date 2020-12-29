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
  
### Połączenie Road
- Połączenie reprezentujące drogę pomiędzy miastami
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
  

## Instrukcja wdrożenia:
### Wymagania:
- Docker
- docker-compose
### Instrukcja krok po kroku:
1. Pobierz repozytorium aplikacji z Github, na przykład korzystając z komendy:
`git clone git@github.com:piotrkumala/route-finder.git`
1. Przejdź do głównego folderu repozytorium
1. Udostępnij porty kontenera bazy danych, w tym celu odkomentuj w `docker-compose.yml` te linijki:
   ```yaml
    #    ports: # remember to close ports in production, database should only be accessible from inside docker network
    #      - "7474:7474"
    #      - "7687:7687"
   ```
1. Uruchom komendę `docker-compose up -d`, zbuduje ona wszystkie obrazy i uruchomi kontenery
1. Przejdź do strony `localhost:7474`, zaloguj się do bazy danych korzystając z danych zawartych w `docker-compose.yml`:
    ```yaml
    - NEO4J_AUTH=neo4j/s3cr3t
    ```
   gdzie wartość przed `/` to nazwa użytkownika, a wartość po `/` to hasło
1. Korzystając z konsoli Cypher wykonaj te komendy:
   ```cypher 
   CREATE CONSTRAINT name_constraint ON (city:City) ASSERT city.Name IS UNIQUE
   CREATE CONSTRAINT latitude_constraint ON (city:City) ASSERT city.Latitude IS UNIQUE
   CREATE CONSTRAINT longitude_constraint ON (city:City) ASSERT city.Longitude IS UNIQUE
   ```
1. Zamknij porty kontenera bazy danych, aby zwiększyć bezpieczeństwo, w tym celu zakomentuj w `docker-compose.yml`
   ```yaml
    ports: # remember to close ports in production, database should only be accessible from inside docker network
      - "7474:7474"
      - "7687:7687"
   ```
1. Uruchom ponownie kontenery korzystając z `docker-compose up -d`
1. Przejdź do strony localhost:3000 aby zacząć korzystać z aplikacji