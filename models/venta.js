class Venta {
    constructor(id, fecha, vendedor, total, subtotal, iva, sucursal) {
        this.ID_Venta = id;
        this.Fecha_Venta = fecha;
        this.ID_Vendedor = vendedor;
        this.Importe_Total = total;
        this.Subtotal = subtotal;
        this.IVA = iva;
        this.ID_Sucursal = sucursal;
    }
}

module.exports = Venta;
