"use strict";

      (function () {
        const gamblingReels = [
          "🍎",
          "🍒",
          "🍇",
          "🍊",
          "🍓",
          "🍐",
          "🍌",
          "🍉",
          "🍑",
          "🍈",
          "🍋",
          "7️⃣",
        ];
        const betReels = [1, 5, 10, 25, 50, 100, 500, 1000, 2000, 3000, 5000];
        const getMoney = document.getElementById("get-money");
        const betMoney = document.getElementById("money-bet");
        const bankMoney = document.getElementById("dinero-banco");
        const subirApuesta = document.getElementById("subir-apuesta");
        const bajarApuesta = document.getElementById("bajar-apuesta");
        const slotUno = document.getElementById("slot-uno");
        const slotDos = document.getElementById("slot-dos");
        const slotTres = document.getElementById("slot-tres");

        let bank = 1000; // Dinero en el banco
        let bet = betReels[0]; // Apuesta mínima inicial

        // Inicialización de valores en la interfaz
        bankMoney.textContent = `${bank} $`;
        betMoney.textContent = `${bet} $`;

        // Evento para añadir dinero al banco
        getMoney.addEventListener("click", () => {
          bank += 1000;
          bankMoney.textContent = `${bank} $`;
        });

        // Función para subir la apuesta
        function subirApuestaFunction() {
          const currentIndex = betReels.indexOf(bet);
          if (currentIndex !== -1 && currentIndex < betReels.length - 1) {
            const nextBet = betReels[currentIndex + 1];
            if (nextBet <= bank) {
              bet = nextBet;
              betMoney.textContent = `${bet} $`;
            } else {
              console.log("No tienes suficiente dinero para esta apuesta.");
            }
          } else {
            console.log("Ya estás en la apuesta máxima.");
          }
        }

        // Función para bajar la apuesta
        function bajarApuestaFunction() {
          const currentIndex = betReels.indexOf(bet);
          if (currentIndex > 0) {
            bet = betReels[currentIndex - 1];
            betMoney.textContent = `${bet} $`;
          } else {
            console.log("Ya estás en la apuesta mínima.");
          }
        }

        // Asociar las funciones a los botones
        subirApuesta.addEventListener("click", subirApuestaFunction);
        bajarApuesta.addEventListener("click", bajarApuestaFunction);

        // Función para llenar un slot con elementos aleatorios
        function fillSlot(slot, reel) {
          slot.innerHTML = ""; // Clear previous content

          for (let i = 0; i < 1; i++) {
            const slotContent = document.createElement("div");
            slotContent.className = "slot-item";
            let randomIndex = Math.floor(Math.random() * reel.length);
            let randomElement = reel[randomIndex];
            slotContent.textContent = randomElement;
            slot.appendChild(slotContent);
          }
        }

        // Inicializar los slots
        function initSlots() {
          if (bet > bank) {
            console.log("No tienes suficiente dinero para esta apuesta.");
            return;
          } else {
            bank -= bet;
            bankMoney.textContent = `${bank} $`;
            fillSlot(slotUno, gamblingReels);
            fillSlot(slotDos, gamblingReels);
            fillSlot(slotTres, gamblingReels);
          }
        }
        // Función para verificar si se ganó
        function checkWin(results) {
          console.log("Resultados:", results);
          if (results.every((item) => item === "7️⃣")) {
            const winnings = bet * 20;
            bank += winnings;
            bankMoney.textContent = `${bank} $`;
            console.log(`¡Felicidades! Ganaste ${winnings} $`);
          } else {
            console.log("Intenta de nuevo.");
          }
        }

        // Asociar el evento de giro a un botón de apostar
        document
          .querySelector(".container-apostar-class")
          .addEventListener("click", initSlots);
      })();