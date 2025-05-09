from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LocationViewSet, VoiceCommandViewSet, RouteViewSet, TrafficIncidentViewSet, AlertViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'locations', LocationViewSet)
router.register(r'voice-commands', VoiceCommandViewSet)
router.register(r'routes', RouteViewSet)
router.register(r'traffic-incidents', TrafficIncidentViewSet)
router.register(r'alerts', AlertViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
