const { Schema, model } = require("mongoose");

const EventoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId, //hace referencia a moongose
    ref: "Usuario",
    required: true,
  },
});

//esto es para modificar el json que vemos desde postman
EventoSchema.method('toJSON', function(){
 const {__v, _id , ...object} =  this.toObject();  //extraigo el __v y el _id para no mostrarn en el json (postman)
 object.id = _id; //renombro el _id que veo en el json por id
 return object;
})

module.exports = model("Evento", EventoSchema); //lo llamo Usuario al schema
