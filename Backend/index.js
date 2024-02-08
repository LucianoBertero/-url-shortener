const express= require('express')
const urlRoute=require('./routes/url')
const {dbconection}=require('./connect')
const URL=require('./models/url')
const app = express();
const PORT = 8001;

dbconection();
app.use(express.json());
app.use('/url',urlRoute)



app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    
    console.log("🚀 ~ app.get ~ entry:", entry.redirectURL);
    console.log("🚀 ~ app.get ~ entry:", 'emtro');

    res.redirect(entry.redirectURL);
}); 




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
