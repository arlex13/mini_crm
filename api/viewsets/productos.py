from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework import status, filters, viewsets

from api.serializers.productos import ProductoSerializer

from api.models.productos import Productos


class ProductoViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre", "precio", "cantidad",)
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

    def pre_save(self, obj):
        obj.imagen = self.request.FILES.get('imagen')
