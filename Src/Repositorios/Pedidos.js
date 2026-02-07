class PedidosRepository {
  constructor() {
    this.pedidos = [];
    this.nextId = 1;
  }

  getAll() {
    return this.pedidos;
  }

  getById(id) {
    return this.pedidos.find(p => p.id === id);
  }

  create(producto, cantidad) {
    const nuevoPedido = {
      id: this.nextId++,
      producto,
      cantidad,
      estado: "pendiente"
    };
    this.pedidos.push(nuevoPedido);
    return nuevoPedido;
  }

  updateEstado(id, nuevoEstado) {
    const pedido = this.getById(id);
    if (pedido) {
      pedido.estado = nuevoEstado;
      return pedido;
    }
    return null;
  }

  delete(id) {
    const index = this.pedidos.findIndex(p => p.id === id);
    if (index !== -1) {
      return this.pedidos.splice(index, 1)[0];
    }
    return null;
  }
}

module.exports = { PedidosRepository };