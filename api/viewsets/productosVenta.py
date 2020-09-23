from django.core.files import File

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, filters, viewsets
from rest_framework.response import Response

from api.serializers.productos import ProductoSerializer,ProductoLeerSerializer
from api.models.productos import Productos

import json



class ProductoVentaViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre","descripcion",)
    ordering_fields = ("nombre", "precio", )
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer
    
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProductoLeerSerializer
        else:
            return ProductoSerializer
    
    def get_permissions(self):
        permissions = []
        if self.action == "list":
            permissions.append(AllowAny)
        else:
            permissions.append(IsAuthenticated)
        return [p() for p in permissions]


