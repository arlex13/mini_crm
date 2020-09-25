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
        try:
            queryset = Productos.objects.filter(vendedor=request.user)

            TotalVentaMoneda = queryset.aggregate(
                a=Sum('producto__total'))

            TotalVentaCantidad = queryset.aggregate(
                a=Sum('producto__cantidad'))

            PromedioPrecio = queryset.aggregate(
                a=Avg('precio'))

            if (not PromedioPrecio["a"] ):          
                PromedioPrecio["a"]=0    
            
            if (not TotalVentaMoneda["a"] ):    
                TotalVentaMoneda["a"]=0
            
            if (not TotalVentaCantidad["a"] ):
                TotalVentaCantidad["a"]=0 

            return Response({"PromedioPrecio": round(PromedioPrecio["a"], 2), "TotalVentaMoneda": round(TotalVentaMoneda["a"], 2), "TotalVentaCantidad": TotalVentaCantidad["a"]})

        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)
