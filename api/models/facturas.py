from django.db import models

from api.models.productos import Productos

class Facturas(models.Model):
  
    nombre = models.CharField(max_length=50)
    direccion = models.CharField(max_length=150)
    telefono = models.CharField(max_length=10)

    producto = models.ForeignKey(Productos, on_delete=models.CASCADE,
                                 related_name="producto")

    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=12, decimal_places=2)

    creado = models.DateTimeField(auto_now_add=True)

