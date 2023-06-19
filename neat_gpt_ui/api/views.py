import openai
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import Gpt4Serializer

# Create your views here.


# Replace with your actual GPT-4 API key
openai.api_key = ""


@api_view(["POST"])
def gpt4_interaction(request):
    serializer = Gpt4Serializer(data=request.data)

    if serializer.is_valid():
        prompt = serializer.validated_data["prompt"]

        # Use GPT-4 API to complete the prompt
        response = openai.Completion.create(
            engine="gpt-4",
            prompt=prompt,
            n=1,
            max_tokens=100,
            temperature=0.5,
        )

        return Response(
            {"response": response.choices[0].text.strip()},
            status=status.HTTP_200_OK,
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
