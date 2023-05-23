from django.urls import path
from . import views

urlpatterns = [
    path('api/notes/<int:note_id>/', views.api_note),
    path('api/notes/', views.api_notes),
    path('api/token/', views.api_get_token), #para pegar o token a partir do username e password
    path('api/users/', views.api_user), #para criar um novo usuário
]
