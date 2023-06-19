from django.urls import path
from . import views

urlpatterns = [
    path("gpt4/", views.gpt4_interaction, name="gpt4_interaction"),
]
