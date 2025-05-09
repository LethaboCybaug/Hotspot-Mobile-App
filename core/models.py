from django.db import models
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=20)
    role = models.CharField(max_length=20)

class Location(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()

class VoiceCommand(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    command_text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    intent = models.CharField(max_length=100)

class Route(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    origin_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='origin_routes')
    destination_location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='destination_routes')
    estimated_time = models.TimeField()

class TrafficIncident(models.Model):
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    incident_type = models.CharField(max_length=100)
    severity = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField()

class Alert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    alert_type = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    related_incident = models.ForeignKey(TrafficIncident, on_delete=models.SET_NULL, null=True, blank=True)

