const moment = require("moment"); //npm i moment

const isDate = (value) => {
  console.log(value);
  if (!value) {
    return false;
  }
  const fecha = moment(value); //isValid es una funcion propia de moment
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
    isDate
}
