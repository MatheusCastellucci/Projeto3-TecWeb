from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('admin/', include('notes.urls')),
    path('', include('notes.urls')),
]
