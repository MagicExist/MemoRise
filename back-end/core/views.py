from rest_framework import viewsets
from .models import User
from .serializer import PublicUserSerializer

# User View Set (Here we will define the api endpoints for our user custom model)
class PublicUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    http_method_names = ['get','post']
    