import React, { createContext, useContext, useState, useEffect } from 'react';

const TrendingStocksContext = createContext();

export const useTrendingStocks = () => {
  return useContext(TrendingStocksContext); // Custom hook to access the trending stocks
};

export const TrendingStocksProvider = ({ children }) => {
  const [topStocks, setTopStocks] = useState([]);

  // Fetch trending stocks data
  const getTrendingStocks = async () => {
    const url = `https://yahoo-finance166.p.rapidapi.com/api/market/get-trending?language=en-US&quote_type=ALL&region=us`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'yahoo-finance166.p.rapidapi.com',
          'x-rapidapi-key': 'YOUR_API_KEY', // Use your API key here
        },
      });
      const data = await response.json();
      
      if (data.finance && data.finance.result && data.finance.result[0].quotes) {
        const quotes = data.finance.result[0].quotes;
        const topEquityStocks = quotes
          .filter((quote) => quote.quoteType === 'EQUITY')
          .slice(0, 5);
        
        setTopStocks(topEquityStocks); // Set the fetched trending stocks in state
      } else {
        console.log('No trending stocks found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getTrendingStocks(); // Fetch stocks on component mount
  }, []);

  return (
    <TrendingStocksContext.Provider value={{ topStocks }}>
      {children} {/* Make topStocks available to all child components */}
    </TrendingStocksContext.Provider>
  );
};
