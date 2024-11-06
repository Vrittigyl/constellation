import React, { useState } from 'react';
import Sidebar from '../sidebar';
import PortfolioCard from './PortfolioCard';
import SectorPieChart from './SectorPieChart';
import Wishlist from './Wishlist';
import StockCard from './AppleStockCard';  // Import the StockCard component
import StockExchange from './StockExchange';
import Transaction from './Transaction';
import SearchButton from './Search';

const portfolioData = [
  {
    company: 'Apple Inc',
    ticker: 'AAPL',
    value: 203.65,
    change: 111.01,
    data: {
      '1D': [{ value: 200 }, { value: 202 }, { value: 204 }, { value: 203 }],
      '5D': [{ value: 198 }, { value: 201 }, { value: 205 }, { value: 203 }],
      '1M': [{ value: 190 }, { value: 195 }, { value: 200 }, { value: 203 }],
      '6M': [{ value: 180 }, { value: 185 }, { value: 190 }, { value: 203 }],
      '1Y': [{ value: 150 }, { value: 175 }, { value: 190 }, { value: 203 }],
      '5Y': [{ value: 120 }, { value: 150 }, { value: 180 }, { value: 203 }],
      'Max': [{ value: 50 }, { value: 100 }, { value: 150 }, { value: 203 }],
    },
    logo: 'https://logo.clearbit.com/apple.com',
    previousClose: 199.00,
    open: 202.00,
    marketCap: '3.2T',
    high: 205.00,
    low: 198.00,
    peRatio: 28.50,
    divYield: '1.2%',
    week52High: 220.00,
    week52Low: 160.00,
  },
  {
    company: 'Amazon Inc',
    ticker: 'AMZN',
    value: 323.65,
    change: 125.20,
    data: {
      '1D': [{ value: 320 }, { value: 325 }, { value: 328 }, { value: 323 }],
      '5D': [{ value: 318 }, { value: 322 }, { value: 326 }, { value: 323 }],
      '1M': [{ value: 310 }, { value: 315 }, { value: 320 }, { value: 323 }],
      '6M': [{ value: 300 }, { value: 310 }, { value: 320 }, { value: 323 }],
      '1Y': [{ value: 280 }, { value: 300 }, { value: 320 }, { value: 323 }],
      '5Y': [{ value: 250 }, { value: 280 }, { value: 310 }, { value: 323 }],
      'Max': [{ value: 150 }, { value: 200 }, { value: 250 }, { value: 323 }],
    },
    logo: 'https://logo.clearbit.com/amazon.com',
    previousClose: 320.00,
    open: 321.00,
    marketCap: '1.7T',
    high: 325.00,
    low: 315.00,
    peRatio: 30.10,
    divYield: '0.5%',
    week52High: 350.00,
    week52Low: 280.00,
  },
  // Add more stocks if needed
];

// Example data for the pie chart
const sectorData = [
  { sector: 'Technology', value: 600 },
  { sector: 'E-Commerce', value: 300 },
  { sector: 'Finance', value: 200 },
];

// Example Wishlist Data
const wishlistItems = [
  { item: 'Tesla Inc', price: '$300.00', logo: 'https://logo.clearbit.com/tesla.com' },
  { item: 'Microsoft Corp', price: '$250.50', logo: 'https://logo.clearbit.com/microsoft.com' },
  { item: 'Netflix Inc', price: '$420.75', logo: 'https://logo.clearbit.com/netflix.com' },
];

const Dashboard = () => {
  const [selectedStock, setSelectedStock] = useState(portfolioData[0]);  // Default to the first stock

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <div className="flex-1 p-6 relative">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Welcome Back Arthur Sjorgen</h1>
            <p className="text-gray-400">Happy to see you again, get an update of your assets today, good luck!</p>
          </div>

          {/* Place SearchButton component in the top-right corner */}
          <div className="absolute top-6 right-6">
            <SearchButton />
          </div>
        </div>

        {/* Portfolio Cards Section */}
        <div className="bg-gray-800 p-4 rounded-lg mt-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Top Stocks</h2>
          <div className="flex space-x-4 mb-6 overflow-x-auto">
            {portfolioData.map((stock, index) => (
              <div
                key={index}
                onClick={() => setSelectedStock(stock)}
                className="cursor-pointer"
              >
                <PortfolioCard
                  company={stock.company}
                  ticker={stock.ticker}
                  logo={stock.logo}
                  value={stock.value}
                  change={stock.change}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Selected Stock Card and Pie Chart */}
        <div className="flex justify-between space-x-6 mt-6">
          <div className="w-2/3">
            <StockCard stockData={selectedStock} />
          </div>
          <div className="w-1/3">
            <div className="bg-gray-800 p-4 rounded-lg">
              <SectorPieChart data={sectorData} />
            </div>
          </div>
        </div>

        {/* Wishlist, StockExchange, and Transaction */}
        <div className="flex mt-6 space-x-6">
          <div className="w-1/3">
            <Wishlist items={wishlistItems} />
          </div>
          <div className="w-2/3 flex space-x-6">
            <div className="w-1/2">
              <StockExchange />
            </div>
            <div className="w-1/2">
              <Transaction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;