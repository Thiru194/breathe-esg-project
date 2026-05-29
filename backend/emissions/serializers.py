
from rest_framework import serializers
from .models import EmissionRecord

class EmissionSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmissionRecord
        fields = '__all__'
