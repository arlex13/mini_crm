from rest_framework import serializers
from api.models.productos import Productos


class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Productos
        fields = "__all__"

class ProductoLeerSerializer(serializers.ModelSerializer):
    vendedor = serializers.StringRelatedField()

    class Meta:
        model = Productos
        fields = "__all__"

class ProductoReporteSerializer(serializers.ModelSerializer):
    totalVendido = serializers.SerializerMethodField()
    totalDinero = serializers.SerializerMethodField()
    class Meta:
        model = Productos
        fields = ('id', 'nombre', 'precio','totalVendido','totalDinero' )

    def get_totalVendido(self, obj):
        if obj['totalVendido'] is not None:
            return obj['totalVendido']
        else:
            return 0

    def get_totalDinero(self, obj):
        if obj['totalDinero'] is not None:
            return obj['totalDinero']
        else:
            return 0
    


