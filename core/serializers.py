from rest_framework import serializers
from .models import User, Location, VoiceCommand, Route, TrafficIncident, Alert

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class VoiceCommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoiceCommand
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class TrafficIncidentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrafficIncident
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'
