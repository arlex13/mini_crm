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

