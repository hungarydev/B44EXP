User Schema Editor
role
(
text
, required
)
The role of the user in the app

Options: admin, user
email
(
text
, required
)
The email of the user

full_name
(
text
, required
)
The full name of the user

phone
(
text
)
Client phone number

address
(
text
)
Client address

date_of_birth
(
date
)
liquidity
(
number
)
Available investment capital

risk_profile
(
text
)
Options: conservative, moderate, aggressive
trading_experience
(
text
)
Options: novice, average, advanced
account_status
(
text
)
Default: "pending"
Options: pending, approved, active, suspended
account_balance
(
number
)
Default: 0
total_profit_loss
(
number
)
Default: 0
kyc_status
(
text
)
Default: "pending"
Options: pending, submitted, approved, rejected