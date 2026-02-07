const express = require('express');
const { router: pedidosRouter } = require('./Src/Routes/routes'); 

const app = express();
app.use(express.json());

app.use('/pedidos', pedidosRouter);

app.listen(3000, () => {
  console.log("Servidor de Pedidos corriendo en http://localhost:3000");
});