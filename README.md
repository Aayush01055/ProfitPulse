# ProfitPulse

A comprehensive financial analytics and business intelligence platform that combines predictive modeling, customer feedback management, and modern web interfaces to help businesses make data-driven decisions.

## 🚀 Features

- **Predictive Analytics**: Machine learning models for financial forecasting and business predictions
- **Customer Feedback Hub**: Real-time feedback collection and sentiment analysis
- **Modern Web Interface**: Responsive React-based frontend with TypeScript
- **Data Visualization**: Interactive charts and dashboards using Recharts
- **User Management**: Secure authentication and user session management
- **Real-time Insights**: Live data processing and analytics

## 📁 Project Structure

```
ProfitPulse/
├── feedback/                    # Customer feedback management system
│   ├── src/
│   │   ├── components/
│   │   │   ├── FeedbackForm.tsx     # Feedback collection interface
│   │   │   ├── FeedbackList.tsx     # Feedback display and management
│   │   │   └── InsightsDashboard.tsx # Analytics dashboard
│   │   └── store/
│   │       └── feedbackStore.ts     # State management with Zustand
│   └── integration-guide.md    # Backend integration documentation
├── webpage/                     # Landing page and marketing site
│   └── Webpage/
│       └── src/
│           └── components/
│               ├── Hero.tsx         # Hero section
│               ├── Features.tsx     # Features showcase
│               ├── Stats.tsx        # Statistics display
│               ├── CTA.tsx          # Call-to-action section
│               └── Navbar.tsx       # Navigation component
├── Predictive/                  # Machine learning and prediction engine
│   └── Predictive/
│       ├── Model/
│       │   ├── app.py              # Flask API server
│       │   ├── model.py            # Core ML model
│       │   ├── model1.py           # Firm prediction model
│       │   └── data/
│       │       └── financial_data.csv # Training data
│       ├── backend/
│       │   └── index.js            # Node.js backend
│       └── static/                 # Static assets
└── Refrence Data/               # Reference datasets
    ├── american_bankruptcy.csv     # Bankruptcy data
    ├── firm_data.financial_data.csv # Financial metrics
    ├── firm_data.company_statuses.csv # Company status data
    ├── firm_data.firm_prediction.csv # Prediction results
    └── firm_data.login_users.csv   # User data
```

## 🛠 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Recharts** for data visualization
- **React Hot Toast** for notifications
- **Zustand** for state management
- **Axios** for HTTP requests

### Backend
- **Flask** (Python) for ML API
- **Node.js** for web services
- **MongoDB** for data storage
- **Express.js** for REST APIs

### Machine Learning
- **Python** with scikit-learn/pandas
- **TensorFlow/PyTorch** (inferred from structure)
- **Data preprocessing** and **feature engineering**

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python (v3.8 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ProfitPulse
   ```

2. **Install main dependencies**
   ```bash
   npm install
   ```

3. **Set up the feedback system**
   ```bash
   cd feedback
   npm install
   pip install -r backend-requirements.txt
   ```

4. **Set up the landing page**
   ```bash
   cd ../webpage/Webpage
   npm install
   ```

5. **Set up the predictive engine**
   ```bash
   cd ../../Predictive/Predictive
   pip install flask pandas scikit-learn numpy pymongo
   cd backend
   npm install
   ```

### Running the Application

1. **Start the landing page**
   ```bash
   cd webpage/Webpage
   npm run dev
   # Runs on http://localhost:5173
   ```

2. **Start the feedback system**
   ```bash
   cd feedback
   npm run dev
   # Runs on http://localhost:5174 (or next available port)
   ```

3. **Start the ML prediction API**
   ```bash
   cd Predictive/Predictive/Model
   python model.py
   # Runs on http://localhost:3000
   ```

4. **Start the Node.js backend** (if needed)
   ```bash
   cd Predictive/Predictive/backend
   npm start
   # Runs on http://localhost:4000
   ```

### MongoDB Setup

#### Option 1: Docker Setup (Recommended)
Use the provided Docker Compose setup for easy MongoDB deployment with UI:

```bash
# Start MongoDB with UI
./mongodb.sh start

# Check status
./mongodb.sh status

# Stop services
./mongodb.sh stop

# View logs
./mongodb.sh logs

# Reset database (removes all data)
./mongodb.sh reset

# Create backup
./mongodb.sh backup
```

**Access URLs:**
- MongoDB: `mongodb://localhost:27017`
- MongoDB UI: http://localhost:8081
  - Username: `profitpulse`
  - Password: `admin123`

**Database Credentials:**
- Database: `firm_data`
- Admin User: `admin`
- Admin Password: `profitpulse123`

#### Importing Full CSV Data
To import all your CSV reference data into MongoDB:

```bash
# Install required Python packages
pip install pandas pymongo

# Run the import script
python import_data.py
```

This script will:
- Convert all CSV files to JSON format
- Import them into appropriate MongoDB collections
- Create backup JSON files in the `Refrence Data/` directory
- Add sample feedback data
- Create necessary indexes

**Supported CSV Files:**
- `firm_data.financial_data.csv` → `financial_data` collection
- `firm_data.firm_prediction.csv` → `firm_prediction` collection  
- `firm_data.company_statuses.csv` → `company_statuses` collection
- `firm_data.login_users.csv` → `login_users` collection
- `american_bankruptcy.csv` → `american_bankruptcy` collection

#### Option 2: Manual MongoDB Installation

Ensure MongoDB is running on the default port (27017). The application expects a database named `firm_data` with the following collections:
- Financial data
- Company statuses
- User information
- Prediction results

## 🔧 Configuration

### Environment Variables
Create `.env` files in respective directories:

**Feedback System (`feedback/.env`)**
```env
VITE_API_URL=http://localhost:4000
VITE_ML_API_URL=http://localhost:5000
```

**Predictive Engine**
```env
MONGODB_URI=mongodb://localhost:27017/firm_data
FLASK_ENV=development
```

## 📊 API Endpoints

### Prediction API (Flask)
- `GET /` - Serve the prediction interface
- `POST /predict` - Make financial predictions
  ```json
  {
    "revenue": 1500000,
    "expenses": 500000,
    "market_cap": 1800000
  }
  ```

### Feedback API
- `GET /getusername` - Get current user information
- `POST /logout` - User logout
- `POST /feedback` - Submit feedback
- `GET /feedback` - Retrieve feedback data

## 🧪 Development

### Code Style
- **ESLint** configuration for JavaScript/TypeScript
- **Prettier** for code formatting
- **TypeScript** strict mode enabled

### Building for Production
```bash
# Build feedback system
cd feedback && npm run build

# Build landing page
cd webpage/Webpage && npm run build

# Prepare ML model for production
cd Predictive/Predictive/Model && python -m flask run --host=0.0.0.0
```

## 📈 Features in Detail

### Predictive Analytics
- Financial forecasting using machine learning
- Company bankruptcy risk assessment
- Revenue and profit predictions
- Market cap analysis

### Feedback Management
- Real-time feedback collection
- Sentiment analysis using TextBlob
- Interactive dashboards with Recharts
- Email notifications (Flask-Mail integration)

### User Experience
- Modern, responsive design with Tailwind CSS
- Real-time notifications
- Secure user authentication
- Cross-platform compatibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Integration Guide](feedback/integration-guide.md)
- [API Documentation](#api-endpoints)
- [Development Setup](#development)

## 🐛 Troubleshooting

### Common Issues
1. **Port conflicts**: Ensure ports 3000, 4000, 5000, 5173, 5174 are available
2. **MongoDB connection**: Verify MongoDB is running and accessible
3. **Python dependencies**: Use virtual environments for Python packages
4. **CORS issues**: Check CORS configuration in Flask app

### Support
For issues and questions, please open an issue in the repository or contact the development team.

---

Built with ❤️ for better business intelligence and customer insights.
