from rest_framework import viewsets
from .models import User,Deck,Flashcard
from .serializer import PublicUserSerializer,CustomTokenObtainPairSerializer,DeckSerializer,FlashCardSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny

# User View Set (Here we will define the api endpoints for our user custom model)
class PublicUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = PublicUserSerializer
    http_method_names = ['get','post']
    
    def get_permissions(self):
        if self.action == "create":  # POST
            return [AllowAny()]
        return [IsAuthenticated()]
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class DeckViewSet(viewsets.ModelViewSet):
    queryset = Deck.objects.all()
    serializer_class = DeckSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Only return decks that belong to the authenticated user
        return Deck.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the deck's user to the logged-in user
        serializer.save(user=self.request.user)


class FlashCardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Flashcard.objects.filter(deck__user=user)