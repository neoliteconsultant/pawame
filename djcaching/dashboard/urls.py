from django.conf.urls import url
from django.urls import path

from . import views

app_name = 'dashboard'

urlpatterns = [
    url(r'^$', views.dashboard, name="dashboard"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('landing', views.dashboard, name="landing"),
]
