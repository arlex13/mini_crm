from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets
from api.viewsets.productos import ProductoViewSet
from api.viewsets.facturas import FacturaViewSet

from api.viewsets.reporte import ReporteProductoViewSet


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'producto', ProductoViewSet)
router.register(r'reporte_producto', ReporteProductoViewSet)
router.register(r'factura', FacturaViewSet)


urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
