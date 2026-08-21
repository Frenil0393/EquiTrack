export const MOCK_USER = {
  name: 'Frenil Vaghasia',
  email: 'test@example.com'
};

export const MOCK_MARKET_OVERVIEW = {
  status: 'Market Open',
  sp500: { price: 24350.50, change: 0.75, name: 'NIFTY 50' },
  nasdaq: { price: 80519.34, change: 0.85, name: 'SENSEX' },
  dow: { price: 51240.10, change: 1.20, name: 'NIFTY BANK' }
};

export const MOCK_STOCKS = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', price: 2980.45, change: 1.2, dayHigh: 3010.0, dayLow: 2955.1, description: 'Reliance Industries Limited is an Indian multinational conglomerate, headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.' },
  { symbol: 'TCS', name: 'Tata Consultancy Services', price: 4120.20, change: 0.5, dayHigh: 4150.0, dayLow: 4100.5, description: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai.' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: 1650.50, change: -1.2, dayHigh: 1675.0, dayLow: 1640.0, description: 'HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is Indias largest private sector bank by assets.' },
  { symbol: 'INFY', name: 'Infosys Ltd', price: 1520.30, change: -0.8, dayHigh: 1540.0, dayLow: 1515.5, description: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.' },
  { symbol: 'ITC', name: 'ITC Limited', price: 435.70, change: 2.1, dayHigh: 440.2, dayLow: 430.0, description: 'ITC Limited is an Indian multinational conglomerate company headquartered in Kolkata. ITC has a diversified presence across industries such as FMCG, hotels, software, packaging, paperboards, specialty papers and agribusiness.' }
];

export const MOCK_TOP_GAINERS = [MOCK_STOCKS[4], MOCK_STOCKS[0], MOCK_STOCKS[1]];
export const MOCK_TOP_LOSERS = [MOCK_STOCKS[2], MOCK_STOCKS[3]];
export const MOCK_SUGGESTED = [MOCK_STOCKS[0], MOCK_STOCKS[2], MOCK_STOCKS[4]];

export const MOCK_WATCHLIST = [
  { symbol: 'RELIANCE', addedOn: '2026-08-16' },
  { symbol: 'HDFCBANK', addedOn: '2026-08-17' }
];

export const generateMockChartData = (days) => {
  const data = [];
  let basePrice = 1500;
  for (let i = days; i >= 0; i--) {
    basePrice = basePrice + (Math.random() - 0.4) * 20;
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(basePrice.toFixed(2))
    });
  }
  return data;
};
