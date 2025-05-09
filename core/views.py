from django.shortcuts import render
from rest_framework import viewsets
from .models import User, Location, VoiceCommand, Route, TrafficIncident, Alert
from .serializers import UserSerializer, LocationSerializer, VoiceCommandSerializer, RouteSerializer, TrafficIncidentSerializer, AlertSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class VoiceCommandViewSet(viewsets.ModelViewSet):
    queryset = VoiceCommand.objects.all()
    serializer_class = VoiceCommandSerializer

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer

class TrafficIncidentViewSet(viewsets.ModelViewSet):
    queryset = TrafficIncident.objects.all()
    serializer_class = TrafficIncidentSerializer

class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.all()
    serializer_class = AlertSerializer
