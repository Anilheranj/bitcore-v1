onst btcPrice = document.getElementById("btcPrice");
const marketPrice = document.getElementById("marketPrice");
const btcChange = document.getElementById("btcChange");
const marketChange = document.getElementById("marketChange");

const connectWallet = document.getElementById("connectWallet");
const walletButton = document.getElementById("walletButton");

function formatUSD(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

async function loadBitcoinData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
    );

    if (!response.ok) {
      throw new Error("Bitcoin API request failed");
    }

    const data = await response.json();

    const price = data.bitcoin.usd;
    const change = data.bitcoin.usd_24h_change;

    btcPrice.textContent = formatUSD(price);
    marketPrice.textContent = formatUSD(price);

    const changeText =
      `${change >= 0 ? "+" : ""}${change.toFixed(2)}% 24h`;

    btcChange.textContent = changeText;
    marketChange.textContent = changeText;

  } catch (error) {
    console.error(error);

    btcPrice.textContent = "Unavailable";
    marketPrice.textContent = "Unavailable";
    btcChange.textContent = "Market data unavailable";
    marketChange.textContent = "--";
  }
}

function connectWalletHandler() {
  showMessage(
    "Wallet connection is not enabled yet. The next version will add real wallet integration."
  );
}

function showMessage(message) {
  alert(message);
}

function scrollToSection(id) {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({
      behavior: "smooth"
    });
  }
}

connectWallet.addEventListener("click", connectWalletHandler);
walletButton.addEventListener("click", connectWalletHandler);

loadBitcoinData();

setInterval(loadBitcoinData, 60000);
