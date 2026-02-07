const { PedidosRepository } = require('../Repositorios/Pedidos');
const repo = new PedidosRepository();

function getAll(req, res) {
  res.json(repo.getAll());
}

function getById(req, res) {
  const id = Number(req.params.id);
  const pedido = repo.getById(id);
  if (!pedido) return res.status(404).json({ error: "Pedido no encontrado" });
  res.json(pedido);
}

function create(req, res) {
  const { producto, cantidad } = req.body;

  if (!producto || cantidad <= 0) {
    return res.status(400).json({ error: "Datos inválidos la cantidad debe ser mayor a 0" });
  }

  const nuevo = repo.create(producto, cantidad);
  res.status(201).json(nuevo);
}

function update(req, res) {
  const id = Number(req.params.id);
  const { estado } = req.body;
  const pedido = repo.getById(id);

  if (!pedido) return res.status(404).json({ error: "No encontrado" });

  if (pedido.estado !== "pendiente") {
    return res.status(400).json({ error: `No se puede modificar un pedido en estado ${pedido.estado}` });
  }

  const estadosValidos = ["confirmado", "cancelado"];
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: "Estado inválido solo se permite 'confirmado' o 'cancelado'" });
  }

  const actualizado = repo.updateEstado(id, estado);
  res.json(actualizado);
}

function remove(req, res) {
  const id = Number(req.params.id);
  const pedido = repo.getById(id);

  if (!pedido) return res.status(404).json({ error: "No encontrado" });

  if (pedido.estado !== "pendiente") {
    return res.status(400).json({ error: "Solo se pueden eliminar pedidos con estado 'pendiente'" });
  }

  repo.delete(id);
  res.status(204).send();
}

module.exports = { getAll, getById, create, update, remove };