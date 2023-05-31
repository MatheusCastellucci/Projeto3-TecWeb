from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    cidade = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)

    def __str__(self):
        return f"{self.user.username} - {self.cidade}"