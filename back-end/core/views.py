from rest_framework import viewsets
from .models import User
from .serializer import PublicUserSerializer,CustomTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny

# User View Set (Here we will define the api endpoints for our user custom model)
class PublicUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    http_method_names = ['get','post']
    permission_classes = [IsAuthenticated]
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer