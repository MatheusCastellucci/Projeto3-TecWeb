from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    cidade = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)