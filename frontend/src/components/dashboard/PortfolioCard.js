import React, { useEffect, useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts'; // Recharts for the graph

const PortfolioCard = ({ company, ticker, data, logo }) => {
  const [value, setValue] = useState(null); // State to store the stock price
  const [change, setChange] = useState({ raw: 0, fmt: "0.00" }); // State to store the change
  const positiveChange = change.raw >= 0;

  // Define gradient backgrounds based on performance
  const gradientClass = positiveChange
    ? 'bg-gradient-to-r from-green-400 to-green-200'
    : 'bg-gradient-to-r from-red-400 to-red-200';

  useEffect(() => {
    const url = `https://yahoo-finance166.p.rapidapi.com/api/stock/get-price?region=US&symbol=${ticker}`; // Use ticker for dynamic fetching

    fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
        'x-rapidapi-key': '458ae2599msh6d57efa7194ea3cp1506dajsnd7ed40cc694a'  // Replace with your actual API key
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Data received:', data);

      // Accessing the nested data inside the result
      const result = data?.quoteSummary?.result;

      if (result && result.length > 0) {
        const priceData = result[0].price;  // Accessing the first object in the result array
        if (priceData) {
          // Extract both raw and formatted prices
          if (priceData.regularMarketPrice) {
            const { raw } = priceData.regularMarketPrice; // Extract the raw price
            setValue(raw); // Update state with the raw price
          }
          if (priceData.regularMarketChange) {
            const { raw: changeRaw, fmt: changeFmt } = priceData.regularMarketChange; // Extract change raw and formatted
            setChange({ raw: changeRaw, fmt: changeFmt }); // Update state with the change
          }
        } else {
          console.log('Price data is not available');
        }
      } else {
        console.log('No results found');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, [ticker]); // Fetch when the ticker changes

  return (
    <div className={`rounded-lg p-4 shadow-md ${gradientClass} w-72 flex items-center`}>
      {/* Company Logo and Info */}
      <div className="flex items-center space-x-3">
        <img src={logo} alt={`${company} logo`} className="w-12 h-12" />
        <div>
          <h4 className="text-black font-semibold">{company}</h4>
          <span className="text-sm text-gray-500">{ticker}</span>
          <p className="text-gray-500 text-sm">Current Value</p>
          <h3 className="text-black font-bold">${value !== null ? value : 'Loading...'}</h3> {/* Display raw value or loading state */}

          {/* Change Indicator */}
          <div className={`text-sm ${positiveChange ? 'text-green-500' : 'text-red-500'} flex items-center`}>
            {positiveChange ? '⬆️' : '⬇️'} {change.fmt} {/* Display formatted change */}
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="ml-auto w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line type="monotone" dataKey="value" stroke={positiveChange ? '#4CAF50' : '#F44336'} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioCard;
