const express= require('express')
const urlRoute=require('./routes/url')
const {dbconection}=require('./connect')
const URL=require('./models/url')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
dbconection();
app.use(express.json());
app.use('/url',urlRoute)

// Habilitar CORS
app.use(cors());

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    
    console.log("🚀 ~ app.get ~ entry:", entry.redirectURL);
    console.log("🚀 ~ app.get ~ entry:", 'emtro');

    res.redirect(entry.redirectURL);
}); 




app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));





