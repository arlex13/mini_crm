

from rest_framework import status, filters, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from api.serializers.facturas import FacturaSerializer
from api.models.facturas import Facturas
from api.models.productos import Productos

from django.db import transaction
# import json



class FacturaViewSet(viewsets.ModelViewSet):
    queryset = Facturas.objects.all()
    serializer_class = FacturaSerializer
    
    def get_permissions(self):
        permissions = []
        if self.action == "create":
            permissions.append(AllowAny)
        else:
            permissions.append(IsAuthenticated)

        return [p() for p in permissions]
    
    def create(self, request, *args, **kwargs):

        try:

            with transaction.atomic():
                
                
                data=request.data
                producto = Productos.objects.get(id=data['producto'])
               
                if(producto.cantidad >= int(data['cantidad']) and producto.cantidad > 0 and int(data['cantidad']) > 0):                  
                    producto.cantidad = producto.cantidad - int(data['cantidad'])  
                    producto.save()

                    total = producto.precio * int(data['cantidad'])
                    data["total"]=total
                    serializer = self.get_serializer(data=data) 
                    
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)     
                                      
                else:
                    return Response({"error":"No se tiene la cantidad solicitada"},
                             status=status.HTTP_404_NOT_FOUND)                  
           
        except Exception as e:
            return Response({'error': str(e)},
                            status=status.HTTP_404_NOT_FOUND)


