from django.db import models
from django.contrib.auth.models import User


class Productos(models.Model):

    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='Imagen', null=True, blank=True)

    precio = models.DecimalField(max_digits=12, decimal_places=2)
    cantidad = models.PositiveIntegerField()

    vendedor = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='productos')
        
    creado = models.DateTimeField(auto_now_add=True)
