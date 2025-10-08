from rest_framework import viewsets,status
from rest_framework.views import APIView
from .models import User,Deck,Flashcard
from .serializer import PublicUserSerializer,CustomTokenObtainPairSerializer,DeckSerializer,FlashCardSerializer,FlashcardReviewSerializer
from .services.ai_service import generate_flashcards

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response

from django.utils import timezone
from decimal import Decimal
from datetime import timedelta
from django.db.models import Q

import json


class AIAgentFlashcardsView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_text = request.data.get("text", "")
        if not user_text:
            return Response({"error": "No text provided"}, status=400)

        flashcards_raw = generate_flashcards(user_text)

        try:
            flashcards = json.loads(flashcards_raw)  # Parseamos JSON
        except:
            flashcards = {"error": "Invalid AI response", "raw": flashcards_raw}

        return Response({"flashcards": flashcards})


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
    
    def get_serializer_class(self):
        # 👇 Si la acción es "review", usamos un serializer distinto
        if self.action == "review":
            return FlashcardReviewSerializer
        return super().get_serializer_class()
    
    @action(detail=True, methods=["post"], url_path="review")
    def review(self, request, pk=None):
        """
        Endpoint para procesar la respuesta del usuario en una sesión de estudio.
        Espera un body con {"answer": "again" | "good" | "easy"}.
        Actualiza interval, ease_factor, due_date, streak, lapses, etc.
        """
        # ✅ Validamos el request con un serializer propio
        serializer = FlashcardReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        flashcard = self.get_object()
        answer = serializer.validated_data["answer"]

        now = timezone.now()

        # 🔹 Mini algoritmo de repetición espaciada
        if answer == "again":
            flashcard.status = "learning"  # 👈 cambia de "new" a "learning"
            flashcard.interval = 1
            flashcard.ease_factor = max(Decimal("1.3"), flashcard.ease_factor - Decimal("0.2"))
            flashcard.lapses += 1
            flashcard.streak = 0
            flashcard.due_date = now + timedelta(minutes=10)

        elif answer == "good":
            flashcard.status = "review"  # 👈 pasa a review
            flashcard.interval = max(1, int(flashcard.interval * float(flashcard.ease_factor)))
            flashcard.ease_factor = min(Decimal("2.5"), flashcard.ease_factor + Decimal("0.05"))
            flashcard.streak += 1
            flashcard.due_date = now + timedelta(days=flashcard.interval)

        elif answer == "easy":
            flashcard.status = "review"  # 👈 también pasa a review
            flashcard.interval = max(1, int(flashcard.interval * float(flashcard.ease_factor) * 1.5))
            flashcard.ease_factor = min(Decimal("3.0"), flashcard.ease_factor + Decimal("0.15"))
            flashcard.streak += 1
            flashcard.due_date = now + timedelta(days=flashcard.interval)
            
        flashcard.last_reviewed = now
        flashcard.save()

        # 👇 Respondemos con la flashcard actualizada
        return Response(FlashCardSerializer(flashcard).data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=["get"], url_path="study")
    def study_cards(self, request):
        """
        Returns only the flashcards that are NEW or due for review.
        Optionally filter by deck (?deck=<id>)
        """
        now = timezone.now()
        user = request.user
        deck_id = request.query_params.get("deck")

        filters = Q(deck__user=user) & (Q(status="new") | Q(status="learning", due_date__lte=now) | Q(status="review", due_date__lte=now))
        
        if deck_id:
            filters &= Q(deck_id=deck_id)

        cards = Flashcard.objects.filter(filters)
        serializer = FlashCardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)