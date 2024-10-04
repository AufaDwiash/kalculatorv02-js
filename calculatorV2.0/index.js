const readline = require("readline-sync");

let history = [];
let previousResult = 0;

function getNumberInput(promptMessage) {
  while (true) {
    let input = readline.question(promptMessage);
    let number = parseFloat(input);

    if (!isNaN(number)) {
      return number;
    } else {
      console.log("Input tidak valid. Harap masukkan angka yang benar.");
    }
  }
}

function getOperatorInput() {
  const requiredOperator = ["+", "-", "*", "/", "%", "sqrt", "sin", "cos", "tan"];
  while (true) {
    const operator = readline.question("Pilih operator (+,-,*,/,%,sqrt,sin,cos,tan): ");
    if (requiredOperator.includes(operator)) {
      return operator;
    } else {
      console.log("Operator tidak valid. Silakan pilih salah satu dari (+,-,*,/,% atau fungsi sqrt, sin, cos, tan).");
    }
  }
}

function processHasil(inputPertama, inputKedua, operator) {
  switch (operator) {
    case "+":
      return inputPertama + inputKedua;
    case "-":
      return inputPertama - inputKedua;
    case "*":
      return inputPertama * inputKedua;
    case "/":
      if (inputKedua === 0) {
        throw new Error("Angka kedua tidak boleh bernilai 0");
      }
      return inputPertama / inputKedua;
    case "%":
      return inputPertama % inputKedua;
    case "sqrt":
      return Math.sqrt(inputPertama);
    case "sin":
      return Math.sin(inputPertama);
    case "cos":
      return Math.cos(inputPertama);
    case "tan":
      return Math.tan(inputPertama);
    default:
      throw new Error("Operator tidak valid.");
  }
}

function mainMenu() {
  console.log("\nMenu Utama:");
  console.log("1. Kalkulasi");
  console.log("2. Lihat Riwayat");
  console.log("3. Keluar");
  const choice = readline.question("Pilih menu (1-3): ");

  switch (choice) {
    case "1":
      subMenuKalkulasi();
      break;
    case "2":
      lihatRiwayat();
      break;
    case "3":
      keluar();
      break;
    default:
      console.log("Pilihan tidak valid. Coba lagi.");
      mainMenu();
  }
}

function subMenuKalkulasi() {
  console.log("\nSub Menu Kalkulasi:");
  console.log("1. Kalkulasi Baru");
  console.log("2. Gunakan Hasil Sebelumnya");
  const choice = readline.question("Pilih (1/2): ");

  let angkaPertama;
  if (choice === "1") {
    angkaPertama = getNumberInput("Masukkan angka pertama: ");
  } else if (choice === "2") {
    angkaPertama = previousResult;
  } else {
    console.log("Pilihan tidak valid. Kembali ke menu utama.");
    mainMenu();
    return;
  }

  const operator = getOperatorInput();
  let angkaKedua;
  if (["+", "-", "*", "/", "%"].includes(operator)) {
    angkaKedua = getNumberInput("Masukkan angka kedua: ");
  }

  try {
    let hasil = processHasil(angkaPertama, angkaKedua, operator);
    console.log(`Hasilnya adalah: ${hasil}`);
    history.push(`${angkaPertama} ${operator} ${angkaKedua !== undefined ? angkaKedua : ""} = ${hasil}`);
    previousResult = hasil;
  } catch (e) {
    console.log(e.message);
  }

  mainMenu();
}

function lihatRiwayat() {
  console.log("\nRiwayat Kalkulasi:");
  if (history.length === 0) {
    console.log("Tidak ada riwayat kalkulasi.");
  } else {
    history.forEach((item, index) => {
      console.log(`${index + 1}. ${item}`);
    });
  }
  mainMenu();
}

function keluar() {
  const confirmExit = readline.question("Yakin ingin keluar? (yes/no): ");
  if (confirmExit.toLowerCase() === "yes") {
    console.log("Thanks :)");
    process.exit(); // Mengakhiri program
  } else {
    mainMenu();
  }
}

// Memulai program
mainMenu();
