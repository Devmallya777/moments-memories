const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/api/contact", (req, res) => {
    console.log(req.body);
    res.json({ success: true });
});

app.post("/api/admin", (req, res) => {
    const { password } = req.body;

    if(password === "admin123"){
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => console.log("Server running"));