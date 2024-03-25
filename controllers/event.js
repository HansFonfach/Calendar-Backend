const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.json({
      ok: true,
      msg: "evento guardado exitosamente",
      eventoGuardado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el adm",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    // Encuentra el documento por ID y actualízalo
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        error: "No se encontró el ejemplo con el ID proporcionado",
      });
    }

    //comprobamos si el usuario que está cambiando el evento es el mismo que lo creó
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    res.status(500).json({ error: "Hable con el administrador" });
  }
};

const eliminarEvento = async(req, res = response) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    // Encuentra el evento por ID 
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        error: "No se encontró el ejemplo con el ID proporcionado",
      });
    }

    //comprobamos si el usuario que está cambiando el evento es el mismo que lo creó
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permisos para editar este evento",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoId);

  
    res.json({
      ok: true,
      msg: 'Evento eliminado correctamente.',
      eventoEliminado,
      
    
    });
  } catch (error) {
    res.status(500).json({ error: "Hable con el administrador" });
  }
 
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
