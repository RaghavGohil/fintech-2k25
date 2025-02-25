"use client"
// pages/index.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';

interface FormData {
  month: string;
  day: string;
  time: string;
  amount: string;
  useChip: string;
  merchantName: string;
  merchantCity: string;
  merchantState: string;
  zip: string;
  mcc: string;
  error: number | null; // Only one error type allowed
}

interface ErrorOption {
  label: string;
  value: number;
}

const errorsOptions: ErrorOption[] = [
  { label: 'Bad CVV,', value: 1 },
  { label: 'Bad CVV,Insufficient Balance,', value: 2 },
  { label: 'Bad CVV,Technical Glitch,', value: 3 },
  { label: 'Bad Card Number,', value: 4 },
  { label: 'Bad Card Number,Bad CVV,', value: 5 },
  { label: 'Bad Card Number,Bad Expiration,', value: 6 },
  { label: 'Bad Card Number,Bad Card Expiration,Insufficient Balance,', value: 7 },
  { label: 'Bad Card Number,Bad Expiration,Technical Glitch,', value: 8 },
  { label: 'Bad Card Number,Insufficient Balance,', value: 9 },
  { label: 'Bad Card Number,Technical Glitch,', value: 10 },
  { label: 'Bad Expiration,', value: 11 },
  { label: 'Bad Expiration,Bad CVV,', value: 12 },
  { label: 'Bad Expiration,Insufficient Balance,', value: 13 },
  { label: 'Bad Expiration,Technical Glitch,', value: 14 },
  { label: 'Bad PIN,', value: 15 },
  { label: 'Bad PIN,Insufficient Balance,', value: 16 },
  { label: 'Bad PIN,Technical Glitch,', value: 17 },
  { label: 'Bad Zipcode,', value: 18 },
  { label: 'Bad Zipcode,Insufficient Balance,', value: 19 },
  { label: 'Bad Zipcode,Technical Glitch,', value: 20 },
  { label: 'Insufficient Balance,', value: 21 },
  { label: 'Insufficient Balance,Technical Glitch,', value: 22 },
  { label: 'Technical Glitch,', value: 23 },
];

const Home = () => {
  const [formData, setFormData] = useState<FormData>({
    month: '',
    day: '',
    time: '',
    amount: '',
    useChip: '',
    merchantName: '',
    merchantCity: '',
    merchantState: '',
    zip: '',
    mcc: '',
    error: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleErrorChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedError = parseInt(e.target.value, 10);
    setFormData({ ...formData, error: selectedError });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Browser validation will ensure all fields are filled because they are required.
    setLoading(true);
    setPredictionResult(null);
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log('Prediction result:', result);
      setPredictionResult(result.prediction === 0 ? "Not Fraud" : "Fraud");
    } catch (error) {
      console.error('Error in prediction:', error);
      setPredictionResult("Error occurred while predicting.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>Transaction Feature Form</title>
        <meta name="description" content="Enter transaction details" />
      </Head>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded shadow p-8">
          <h1 className="text-2xl font-bold mb-6 text-black">
            Transaction Feature Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Month */}
            <div>
              <label htmlFor="month" className="block text-black">
                Month
              </label>
              <input
                id="month"
                name="month"
                type="number"
                value={formData.month}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Day */}
            <div>
              <label htmlFor="day" className="block text-black">
                Day
              </label>
              <input
                id="day"
                name="day"
                type="number"
                value={formData.day}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-black">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="text"
                placeholder="HH:MM"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Amount */}
            <div>
              <label htmlFor="amount" className="block text-black">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="text"
                placeholder="$"
                value={formData.amount}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Use Chip */}
            <div>
              <label htmlFor="useChip" className="block text-black">
                Use Chip
              </label>
              <select
                id="useChip"
                name="useChip"
                value={formData.useChip}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              >
                <option value="">Select Transaction Type</option>
                <option value="Online Transaction">Online Transaction</option>
                <option value="Chip Transaction">Chip Transaction</option>
                <option value="Swipe Transaction">Swipe Transaction</option>
              </select>
            </div>
            {/* Merchant Name */}
            <div>
              <label htmlFor="merchantName" className="block text-black">
                Merchant Name
              </label>
              <input
                id="merchantName"
                name="merchantName"
                type="text"
                value={formData.merchantName}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Merchant City */}
            <div>
              <label htmlFor="merchantCity" className="block text-black">
                Merchant City
              </label>
              <input
                id="merchantCity"
                name="merchantCity"
                type="text"
                value={formData.merchantCity}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Merchant State */}
            <div>
              <label htmlFor="merchantState" className="block text-black">
                Merchant State
              </label>
              <input
                id="merchantState"
                name="merchantState"
                type="text"
                value={formData.merchantState}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Zip */}
            <div>
              <label htmlFor="zip" className="block text-black">
                Zip
              </label>
              <input
                id="zip"
                name="zip"
                type="text"
                value={formData.zip}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* MCC */}
            <div>
              <label htmlFor="mcc" className="block text-black">
                MCC
              </label>
              <input
                id="mcc"
                name="mcc"
                type="text"
                value={formData.mcc}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded p-2 text-black"
              />
            </div>
            {/* Errors (Radio Buttons) */}
            <div>
              <label className="block text-black mb-2">Errors?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {errorsOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-2 text-black"
                  >
                    <input
                      type="radio"
                      name="error"
                      value={option.value}
                      onChange={handleErrorChange}
                      checked={formData.error === option.value}
                      required
                      className="form-radio"
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          {/* Loading Spinner and Result */}
          <div className="mt-6">
            {loading && (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              </div>
            )}
            {!loading && predictionResult && (
              <div className="mt-4 text-center text-xl font-bold text-black">
                Prediction: {predictionResult}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
