const express= require('express');
const urlRoute=require('./routes/url');
const {dbconection}=require('./connect');
const URL=require('./models/url');
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors');

// Habilitar CORS
const ACCEPTED_ORIGINS = ['http://localhost:4200','https://url-shortener-ochre-six.vercel.app']; // Actualiza con tus dominios permitidos

// Middleware CORS
app.use(cors({
  origin: function (origin, callback) {
    // Si el origen está en la lista de dominios permitidos o es undefined, permite el acceso
    if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

dbconection();
app.use(express.json());
app.use('/url',urlRoute);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    
    console.log("🚀 ~ app.get ~ entry:", entry.redirectURL);
    console.log("🚀 ~ app.get ~ entry:", 'emtro');

    res.redirect(entry.redirectURL);
}); 

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
