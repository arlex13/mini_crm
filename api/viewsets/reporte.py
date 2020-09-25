from django.core.files import File
from django.db.models import Sum, Avg


from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, filters, viewsets
from rest_framework.response import Response

from api.serializers.productos import ProductoSerializer, ProductoReporteSerializer
from api.models.productos import Productos

import json
from rest_framework.viewsets import GenericViewSet


class ReporteProductoViewSet(GenericViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre", "precio", "totalDinero", "totalVendido")
    queryset = Productos.objects.all()
    serializer_class = ProductoReporteSerializer

    def get_queryset(self):
        queryset = Productos.objects.filter(vendedor=self.request.user)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = Productos.objects.filter(
            vendedor=request.user).values(
                'id', 'nombre', 'precio').annotate(
                totalDinero=Sum('producto__total'),
                totalVendido=Sum('producto__cantidad'))

        queryset = self.filter_queryset(queryset)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def total(self, request, *args, **kwargs):
        # queryset = Productos.objects.all()

        # queryset = self.filter_queryset(queryset)
        # page = self.paginate_queryset(queryset)
        # if page is not None:
        #     serializer = ProductoLeerSerializer(page, many=True)
        #     return self.get_paginated_response(serializer.data)

        # serializer = ProductoLeerSerializer(queryset, many=True)

        return Response({"TotalVentaMoneda": "55", "TotalVentaCantidad": "10", "PromedioPrecio": "5"})
