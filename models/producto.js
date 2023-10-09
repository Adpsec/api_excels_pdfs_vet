class Producto {
    constructor(id, nombre, urlImagen, precio, marca, proveedor, categoria) {
        this.ID_Producto = id;
        this.Nombre = nombre;
        this.Url_imagen = urlImagen;
        this.Precio_Producto = precio;
        this.ID_Marca = marca;
        this.ID_Proveedor = proveedor;
        this.ID_Categoria = categoria;
    }
}

module.exports = Producto;
