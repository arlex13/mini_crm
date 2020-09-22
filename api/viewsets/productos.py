from django.core.files import File

from django_filters.rest_framework import DjangoFilterBackend

from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status, filters, viewsets
from rest_framework.response import Response

from api.serializers.productos import ProductoSerializer
from api.models.productos import Productos

import json



class ProductoViewSet(viewsets.ModelViewSet):
    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre", "precio", "cantidad",)
    queryset = Productos.objects.all()
    serializer_class = ProductoSerializer

    def get_queryset(self):
        queryset = Productos.objects.filter(vendedor= self.request.user.id)        
        return queryset


    def create(self, request, *args, **kwargs):
        data = json.loads(request.data['data'])
        data["vendedor"] = request.user.id
        # print("1 datossss request.data", data)
        imagen = request.data.get('imagen')
        if imagen is not None:
            data['imagen'] = File(imagen)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=False)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        data = json.loads(request.data['data'])
        data["vendedor"] = request.user.id
        imagen = request.data.get('imagen')
        instance = self.get_object()

        if imagen is not None:
            data['imagen'] = File(imagen)
        else:
            data['imagen'] = instance.imagen
        partial = kwargs.pop('partial', True)

        serializer = self.get_serializer(
            instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}
        return Response(serializer.data)  


    def get_permissions(self):
        permissions = []
        if self.action == "todos":
            permissions.append(AllowAny)
        else:
            permissions.append(IsAuthenticated)
        return [p() for p in permissions]

    @action(detail=False, methods=['get'])
    def todos(self, request, *args, **kwargs):
        queryset = Productos.objects.all()
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer =  self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)