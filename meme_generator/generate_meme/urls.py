from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("cheese", views.cheese_index, name="index")
]

