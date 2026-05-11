```javascript
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const path = require("path");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
extended:true
}));

app.use(express.static(
path.join(__dirname,"public")
));


// BREVO

const client =
SibApiV3Sdk.ApiClient.instance;

const apiKey =
client.authentications["api-key"];

apiKey.apiKey =
process.env.BREVO_API_KEY;

const tranEmailApi =
new SibApiV3Sdk.TransactionalEmailsApi();


// CONTACT FORM

app.post("/send-email", async(req,res)=>{

try{

const {
name,
email,
phone,
message
} = req.body;

await tranEmailApi.sendTransacEmail({

sender:{
email:"mm.giftboxes04@gmail.com",
name:"Moments & Memories"
},

to:[
{
email:"mm.giftboxes04@gmail.com"
}
],

subject:`💖 New Contact From ${name}`,

htmlContent:`

<div style="
font-family:Poppins;
padding:20px;
background:#fff7f5;
">

<h2 style="color:#c95b84;">
New Contact Message 💖
</h2>

<hr>

<p>
<strong>Name:</strong>
${name}
</p>

<p>
<strong>Email:</strong>
${email}
</p>

<p>
<strong>Phone:</strong>
${phone}
</p>

<p>
<strong>Message:</strong>
${message}
</p>

</div>

`

});

res.json({
success:true
});

}catch(error){

console.log(error);

res.status(500).json({
success:false
});

}

});


// HOME

app.get("/",(req,res)=>{

res.sendFile(
path.join(__dirname,"public","index.html")
);

});


// SERVER

const PORT =
process.env.PORT || 10000;

app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});
```
