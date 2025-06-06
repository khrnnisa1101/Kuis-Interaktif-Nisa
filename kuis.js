const soalContainer = document.getElementById("soal");
const jawabanContainer = document.getElementById("jawaban");
const hasilContainer = document.getElementById("hasil");
const timerContainer = document.getElementById("timer");
const skorContainer = document.getElementById("skor");
const restartBtn = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress-bar");
const benarAudio = document.getElementById("benar-audio");
const salahAudio = document.getElementById("salah-audio");

const pertanyaan = [
  { soal: "Apa ibu kota Indonesia?", jawaban: ["Jakarta", "Surabaya", "Bandung", "Medan"], jawabanBenar: "Jakarta" },
  { soal: "Apa ibu kota Jepang?", jawaban: ["Hiroshima", "Tokyo", "Kyoto", "Nagasaki"], jawabanBenar: "Tokyo" },
  { soal: "Apa ibu kota Thailand?", jawaban: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"], jawabanBenar: "Bangkok" },
  { soal: "Apa ibu kota Malaysia?", jawaban: ["Kuala Lumpur", "Penang", "Johor Bahru", "Putrajaya"], jawabanBenar: "Kuala Lumpur" },
  { soal: "Apa ibu kota Australia?", jawaban: ["Sydney", "Melbourne", "Canberra", "Brisbane"], jawabanBenar: "Canberra" },
  { soal: "Apa ibu kota Inggris?", jawaban: ["Manchester", "London", "Liverpool", "Birmingham"], jawabanBenar: "London" },
  { soal: "Apa ibu kota Prancis?", jawaban: ["Paris", "Lyon", "Marseille", "Nice"], jawabanBenar: "Paris" },
  { soal: "Apa ibu kota Amerika Serikat?", jawaban: ["New York", "Los Angeles", "Chicago", "Washington D.C."], jawabanBenar: "Washington D.C." },
  { soal: "Apa ibu kota Korea Selatan?", jawaban: ["Seoul", "Busan", "Incheon", "Daegu"], jawabanBenar: "Seoul" },
  { soal: "Apa ibu kota Jerman?", jawaban: ["Berlin", "Munich", "Frankfurt", "Hamburg"], jawabanBenar: "Berlin" },
];

let skor = 0;
let soalSaatIni = 0;
let waktu = 15;
let interval;

function updateSkor() {
  skorContainer.innerHTML = `<i class="fas fa-star"></i> Skor: ${skor}`;
}

function mulaiTimer() {
  waktu = 15;
  timerContainer.innerHTML = `<i class="fas fa-clock"></i> Waktu: ${waktu} detik`;
  clearInterval(interval);
  interval = setInterval(() => {
    waktu--;
    timerContainer.innerHTML = `<i class="fas fa-clock"></i> Waktu: ${waktu} detik`;
    if (waktu <= 0) {
      clearInterval(interval);
      soalSaatIni++;
      if (soalSaatIni < pertanyaan.length) {
        tampilkanSoal();
      } else {
        tampilkanHasil();
      }
    }
  }, 1000);
}

function updateProgressBar() {
  const persentase = ((soalSaatIni) / pertanyaan.length) * 100;
  progressBar.style.width = `${persentase}%`;
}

function tampilkanSoal() {
  const soal = pertanyaan[soalSaatIni];
  soalContainer.textContent = `Soal ${soalSaatIni + 1} dari ${pertanyaan.length}: ${soal.soal}`;
  jawabanContainer.innerHTML = "";

  soal.jawaban.forEach((jawaban) => {
    const tombol = document.createElement("button");
    tombol.textContent = jawaban;
    tombol.addEventListener("click", () => cekJawaban(jawaban));
    jawabanContainer.appendChild(tombol);
  });

  updateSkor();
  mulaiTimer();
  updateProgressBar();
}

function cekJawaban(jawaban) {
  const soal = pertanyaan[soalSaatIni];
  clearInterval(interval);
  if (jawaban === soal.jawabanBenar) {
    skor++;
    benarAudio.play();
  } else {
    salahAudio.play();
  }

  soalSaatIni++;
  if (soalSaatIni < pertanyaan.length) {
    tampilkanSoal();
  } else {
    tampilkanHasil();
  }
}

function tampilkanHasil() {
  soalContainer.textContent = "";
  jawabanContainer.innerHTML = "";
  timerContainer.textContent = "";
  skorContainer.textContent = "";
  hasilContainer.innerHTML = `<i class='fas fa-trophy'></i> Skor Akhir Anda: ${skor} dari ${pertanyaan.length}`;
  progressBar.style.width = `100%`;
}

function mulaiUlang() {
  skor = 0;
  soalSaatIni = 0;
  hasilContainer.innerHTML = "";
  tampilkanSoal();
}

restartBtn.addEventListener("click", mulaiUlang);
tampilkanSoal();
