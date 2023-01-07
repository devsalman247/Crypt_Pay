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
	const buy = () => {
		let transak = new transakSDK({
			apiKey: VITE_TRANSAK_API_KEY_2, // Your API Key
			environment: "STAGING", // STAGING/PRODUCTION
			widgetHeight: "660px",
			widgetWidth: "500px",
			// Examples of some of the customization parameters you can pass
			defaultCryptoCurrency: "MATIC", // Example 'ETH'
			walletAddress: "0x59EF24f97230DC13Fe8B4dD9f35a757e0a1Ad29b", // Your customer's wallet address
			// themeColor: "[COLOR_HEX]", // App theme color
			// fiatCurrency: "GBP", // If you want to limit fiat selection eg 'GBP'
			email: "muhammadsalman2471006@gmail.com", // Your customer's email address
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
			{/* <a
				href="https://global-stg.transak.com/?apiKey=71d9cc91-826d-41b6-b6ba-7d8962a9c3e0&cryptoCurrencyCode=MATIC"
				// onClick={() => buy()}
				className="bg-slate-500 text-white text-lg px-2 py-1 rounded-md">
				Buy Crypto
			</a> */}
			<button onClick={() => buy()} className="bg-slate-500 text-white text-lg px-2 py-1 rounded-md">
				Buy Crypto
			</button>
		</div>
	);
}

export default App;
