const mongoose = require('mongoose')

const dbconection = async() => {

    try {
    //cadena de conexion a base de datos
        await mongoose.connect("mongodb+srv://mean_user:jkadCVPDctegAsG9@cluster0.pgul1v9.mongodb.net/ShortURL?retryWrites=true&w=majority",{                    
     
        });
      
        console.log('Se esta subiendo bien')

    }catch(error){
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbconection
}
