from rest_framework import serializers
from .models import Report


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ['id', 'city', 'state', 'country']