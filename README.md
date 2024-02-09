curl -X POST \
http://localhost:3000/users/create \
-H 'Content-Type: application/json' \
-d '{
"name": "Matthieu",
"lastname": "Vachet",
"age": "33",
"email": "vachet.matthieu@icloud.com",
"password": "Portfolio012024"
}'

$body = @{
name = "Matthieu"
lastname = "Vachet"
age = "33"
email = "vachet.matthieu@icloud.com"
password = "Portfolio012024"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/v1/users/create -Method POST -Body $body -ContentType 'application/json'
#   A p i - R e s t - P o r t f o l i o  
 