from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PublicUserViewSet

router = DefaultRouter()
router.register(r'users',PublicUserViewSet,basename='user')

urlpatterns = [
    path('',include(router.urls))
]