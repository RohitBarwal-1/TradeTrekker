# TradeTrekker - Stock Market Analyzer

TradeTrekker is a stock market analysis platform that provides real-time market data, stock tracking, and visual analytics to help users make informed investment decisions.

## Features

### 1. Stock Dashboard
- View **Top Gainers**, **Top Losers**, and **Most Active** stocks in real-time.
- Provides key details such as price changes, percentage gain/loss, and trading volume.

### 2. Watchlist
- Create a personalized watchlist to track favorite stocks.
- Displays real-time price updates and trends for selected stocks.

### 3. Expand Stock & View Graph & Fundamentals
- Click on a stock to view detailed price trends and historical data.
- Interactive graphs for better stock analysis.
- Display fundamental details such as market cap, P/E ratio, dividend yield, and more.

## Tech Stack
- **Frontend**: React (TailAdmin UI)
- **Backend**: FastAPI/Django
- **Database**: MongoDB
- **Authentication**: JWT, OAuth
- **Caching**: Redis (if applicable)
- **Data Processing**: Pandas

## Setup Instructions

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/tradetrekker.git
   cd tradetrekker/backend
   ```
2. Create a virtual environment and install dependencies:
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Start the backend server:
   ```sh
   uvicorn main:app --reload  # FastAPI
   # OR
   python manage.py runserver  # Django
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd tradetrekker/frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm start
   ```

## API Endpoints
- **Authentication**: `/api/auth/signup`, `/api/auth/signin`
- **Stock Data**: `/api/stocks/top-gainers`, `/api/stocks/top-losers`, `/api/stocks/most-active`
- **Watchlist**: `/api/watchlist`
- **Stock Details & Graphs**: `/api/stocks/{symbol}`

## Future Enhancements
- Implement AI-based stock predictions.
- Add social sentiment analysis.
- Enable portfolio management features.

## Contributing
Feel free to fork this repository and submit pull requests for improvements.

## License
MIT License

