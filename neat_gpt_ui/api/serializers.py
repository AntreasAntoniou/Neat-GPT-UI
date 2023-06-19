from rest_framework import serializers


class Gpt4Serializer(serializers.Serializer):
    prompt = serializers.CharField()
