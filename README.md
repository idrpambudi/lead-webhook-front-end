# lead-webhook-front-end

The front-end code for Privyr take-home building website assignment. The code is built using NextJS.

Accessible through this link: https://lead-webhook-front-end.herokuapp.com


Add lead via webhook cURL command sample
``` bash
curl --location --request POST 'https://lead-webhook.herokuapp.com/webhook/81dc9bdb52d04dc20036dbd8313ed055/lead' \
--header 'Content-Type: application/json' \
--data-raw '{
	"Name": "Indra12",
	"Email": "ii@gmail.com",
	"Phone": "+628",
	"Others": {
        "Address": "Street No. 9"
    }
}'
```

## Highlighted Features
- **Paginated list of leads**
- **Accept any arbitrary user ID**
- **Flexible additional fields**

## Unhandled Edge Cases
- **Different additional fields among rows. The listed additional fields based on the fetched data on the first page only**
- **Webhook path collision. The webhook path is generated based on the MD5 of userID and there is a very small chance of collision**

## MySQL Credentials 
Supposed to be a secret though. Hosted on Railway free tier.
``` bash
MYSQLHOST=containers-us-west-57.railway.app
MYSQLPORT=6987
MYSQLPASSWORD=jOvO9okCvW38FLVRXVCN
MYSQLDATABASE=railway
MYSQLUSER=root
MYSQL_URL=mysql://${{ MYSQLUSER }}:${{ MYSQLPASSWORD }}@${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQLDATABASE }}
```

## To Be Noted
- The page change transition is slow due to slow MySQL query response time