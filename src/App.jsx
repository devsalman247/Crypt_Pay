import { useState, useEffect } from "react";
import transakSDK from "@transak/transak-sdk";
const {
	VITE_WYRE_API_KEY,
	VITE_WYRE_SECRET_KEY,
	VITE_TRANSAK_API_KEY,
	VITE_TRANSAK_API_KEY_2,
	VITE_TRANSAK_SECRET_KEY,
} = import.meta.env;

function App() {
	const [wallet_address, setWalletAddress] = useState("");
	const [email, setEmail] = useState("");

	const buy = () => {
		if (!email || !wallet_address) {
			alert("Please enter details!");
			return;
		}
		let transak = new transakSDK({
			apiKey: VITE_TRANSAK_API_KEY_2, // Your API Key
			environment: "STAGING", // STAGING/PRODUCTION
			widgetHeight: "660px",
			widgetWidth: "500px",
			// Examples of some of the customization parameters you can pass
			defaultCryptoCurrency: "BNB", // Example 'ETH'
			walletAddress: wallet_address, // Your customer's wallet address
			// themeColor: "[COLOR_HEX]", // App theme color
			// fiatCurrency: "GBP", // If you want to limit fiat selection eg 'GBP'
			email, // Your customer's email address
			redirectURL: "http://localhost:5173/", // Redirect URL of your app
		});

		transak.init();

		// To get all the events
		transak.on(transak.ALL_EVENTS, (data) => {
			console.log(data);
		});

		// This will trigger when the user marks payment is made.
		transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
			console.log(orderData);
			transak.close();
		});
	};

	useEffect(() => {
		// console.log(VITE_TRANSAK_API_KEY);
	}, []);

	return (
		<div className="flex justify-center items-center h-[100vh]">
			<div className="bg-neutral-200 flex flex-col p-6 gap-4 rounded-md">
				<label>Enter your email address:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="outline-none px-2 py-1 rounded-sm border-blue-400 border"
				/>
				<label>Enter your wallet address:</label>
				<input
					type="text"
					value={wallet_address}
					onChange={(e) => setWalletAddress(e.target.value)}
					className="outline-none px-2 py-1 rounded-sm border-blue-400 border"
				/>
				{/* <a
				href="https://global-stg.transak.com/?apiKey=your_api_key&cryptoCurrencyCode=MATIC"
				// onClick={() => buy()}
				className="bg-slate-500 text-white text-lg px-2 py-1 rounded-md">
				Buy Crypto
			</a> */}
				<button onClick={() => buy()} className="bg-slate-500 text-white text-lg px-2 py-1 rounded-md">
					Buy Crypto
				</button>
			</div>
		</div>
	);
}

export default App;
