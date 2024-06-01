#################################################################
# Testy wydajności by: ziomciopoziomcio (Jędrzej Niedzielski)   #
# Python: 3.9.17                                                #
# TYLKO DO UŻYTKU W CELACH TESTOWYCH                            #
# NIE UŻYWAĆ W PRODUKCJI                                        #
#################################################################

# Niezbędne biblioteki
import os
import subprocess
import time
import csv
import requests


# Ustawianie prędkości sieci
def set_network_speed(interface, speed):
    # Usuwanie starych reguł
    try:
        subprocess.check_call(['/usr/sbin/tc', 'qdisc', 'del', 'dev', interface, 'root'])
    except subprocess.CalledProcessError as e:
        print(f"Error when deleting qdisc: {e}")

    # Dodawanie nowych reguł
    try:
        subprocess.check_call(
            ['/usr/sbin/tc', 'qdisc', 'add', 'dev', interface, 'root', 'handle', '1:0', 'netem', 'rate', speed])
    except subprocess.CalledProcessError as e:
        print(f"Error when adding qdisc: {e}")


def reset_network_speed(interface):
    # Usuwanie reguł
    try:
        subprocess.check_call(['/usr/sbin/tc', 'qdisc', 'del', 'dev', interface, 'root'])
    except subprocess.CalledProcessError as e:
        print(f"Error when deleting qdisc: {e}")


def test_page_load_time(url, download_speed_limit):
    print(f"Testowana strona: {url}, limit: {download_speed_limit} KB/s")

    # Ustawienie prędkości sieci
    set_network_speed('enp0s3', f'{download_speed_limit}kbit')

    try:
        # Początek pomiaru czasu
        start_time = time.time()

        # Pobranie strony
        response = requests.get(url)

        # Koniec pomiaru czasu
        end_time = time.time()
    except Exception as e:
        print(f"Error: {e}")
        return -1
    finally:
        # Resetowanie prędkości sieci
        reset_network_speed('enp0s3')

    # Wyniki testu
    load_time = end_time - start_time
    print(f"Czas ładowania: {load_time}")
    return load_time


if __name__ == "__main__":

    print("#" * 50)
    print("Testy wydajności strony WWW by: ziomciopoziomcio")
    print("TYLKO DO UŻYTKU W CELACH TESTOWYCH")
    print("NIE UŻYWAĆ W PRODUKCJI")
    print("#" * 50)

    print("Test kontrolny, limit: 500 Mb/s")
    control = test_page_load_time("https://ziomciopoziomcio.github.io/TUL-HTML-project/", 500000000)
    print("Czas ładowania: ", control)

    # Lista stron do testowania
    urls = ["https://ziomciopoziomcio.github.io/TUL-HTML-project/",
            "https://ziomciopoziomcio.github.io/TUL-HTML-project/pages/londyn.html",
            "https://ziomciopoziomcio.github.io/TUL-HTML-project/pages/zapisy.html"]

    for url in urls:
        # Ustawienie parametrów testowych
        download_speed = 100
        # Tworzymy plik CSV dla każdej strony
        with open(f"{url.replace('https://', '').replace('/', '_')}.csv", "w", newline='') as file:
            writer = csv.writer(file)
            writer.writerow(["Download Speed (Mb/s)", "Load Time (s)"])

            while True:
                # Przeliczamy prędkość z Mb/s na KB/s
                download_speed_bytes = download_speed * 125000

                # Uruchomienie testu
                load_time = test_page_load_time(url, download_speed_bytes)

                # Zapis wyników
                writer.writerow([download_speed, load_time])

                # Obsługa błędu
                if load_time > 3 or download_speed < 0.0000000001:
                    break

                # Dwukrotne zmniejszenie prędkości
                download_speed /= 2
