from rest_framework import serializers
from api.models.facturas import Facturas


class FacturaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Facturas
        fields = "__all__"
        extra_kwargs = {'total': {'required': False}}

