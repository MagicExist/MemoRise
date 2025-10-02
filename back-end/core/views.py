from rest_framework import viewsets
from .models import User,Deck,Flashcard
from .serializer import PublicUserSerializer,CustomTokenObtainPairSerializer,DeckSerializer,FlashCardSerializer

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

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

    @action(detail=True, methods=["get"], permission_classes=[IsAuthenticated])
    def flashcards(self, request, pk=None):
        deck = self.get_object()  # ensures deck belongs to user
        flashcards = deck.flashcards.all()  # uses related_name from model
        serializer = FlashCardSerializer(flashcards, many=True)
        return Response(serializer.data)


class FlashCardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.all()
    serializer_class = FlashCardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Flashcard.objects.filter(deck__user=user)