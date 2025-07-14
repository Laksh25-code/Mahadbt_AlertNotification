
# Mahadbt Alert Notification

**Mahadbt_AlertNotification** is a notification utility for the Maharashtra Direct Benefit Transfer (DBT) platform. It monitors beneficiary scholarship disbursements and sends alerts (e.g., SMS, email) whenever relevant updates occur.

---

## 🧾 Table of Contents

1. [Features](#-features)  
2. [Getting Started](#-getting-started)  
3. [Configuration](#-configuration)  
4. [Usage](#-usage)  
5. [Architecture & Workflow](#-architecture--workflow)  
6. [Contributing](#-contributing)  
7. [License](#-license)  
8. [Contact](#-contact)  

---

## 💡 Features

- Polls the MahaDBT portal at configurable intervals
- Detects new or updated scholarship disbursements
- Sends alerts via:
  - SMS (e.g. Twilio or local gateway)
  - Email (SMTP or transactional service)
- Configurable user profiles and bank-account/Aadhaar mappings
- Logs transactions and alert history for audit

---

## 🛠️ Getting Started

### Prerequisites

- Node.js ≥12 (or Python ≥3, Java 8+, depending on implementation)
- A running DBT portal (or sandbox/API access)
- SMS gateway credentials or mail server/API details
- Access to a relational DB or lightweight storage (SQLite, MongoDB, etc.)

### Installation

```bash
git clone https://github.com/Laksh25-code/Mahadbt_AlertNotification.git
cd Mahadbt_AlertNotification
# If Node.js
npm install
# If Python
pip install -r requirements.txt
```

---

## ⚙️ Configuration

Copy the example config file and fill in with your settings:

```bash
cp config.example.json config.json
```

Key config sections:

- `db`: connection to local or remote storage for state
- `mahadbt`: polling endpoint, credentials (if any)
- `notifications`: providers and templates
- `interval`: how often the script checks (e.g. every 5 minutes)

Example snippet:

```json
{
  "mahadbt": {
    "url": "https://mahadbt.maharashtra.gov.in/api/scholarships",
    "auth": {
      "username": "...",
      "password": "..."
    }
  },
  "notifications": {
    "sms": {
      "provider": "Twilio",
      "accountSid": "...",
      "authToken": "..."
    },
    "email": {
      "smtpHost": "smtp.example.com",
      "port": 587,
      "user": "...",
      "pass": "..."
    }
  },
  "interval": 300
}
```

---

## ▶️ Usage

Start the alert engine with:

```bash
# Node.js
npm run start
# Or Python
python main.py
```

The service logs detected events and notifications. Alerts are sent automatically when new disbursements are identified.

For scheduled deployment, consider running under systemd, cron, or as a container.

---

## 🧠 Architecture & Workflow

1. **Polling**: Regularly fetch scholarship status via DBT portal/API.  
2. **State comparison**: Compare against stored state in DB.  
3. **Event detection**: Identify newly arrived funds or status changes.  
4. **Trigger alerts**: Send SMS/email based on template configurations.  
5. **Logging**: Store alert history and transaction logs for transparency.

---

## 🙌 Contributing

Contributions are welcome! Steps:

1. Fork the repo  
2. Create a feature branch (`git checkout -b feature/my-feature`)  
3. Implement and document your changes  
4. Submit a pull request

Please adhere to coding standards and provide tests where applicable.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 📞 Contact

For help or suggestions:  
- **Author**: Laksh25 & 117ABHISHEK 
- **GitHub**: https://github.com/Laksh25-code  
- **Project**: Mahadbt_AlertNotification

---

### ✅ Developer Notes (optional)

- Review MahaDBT behavior: response formats, polling frequency, edge cases
- Implement robust error handling and retry logic for failed alerts
- Ensure privacy and security of Aadhaar-linked data
- Add unit tests and CI pipeline for continuous quality
