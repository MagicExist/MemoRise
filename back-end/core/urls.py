from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import PublicUserViewSet,DeckViewSet,FlashCardViewSet,AIAgentFlashcardsView

router = DefaultRouter()
router.register(r'users',PublicUserViewSet,basename='user')
router.register(r'decks',DeckViewSet,basename="deck")
router.register(r'flashcards',FlashCardViewSet,basename="flashcard")

urlpatterns = [
    path('',include(router.urls)),
    path('ai/flashcards/', AIAgentFlashcardsView.as_view(), name='ai-flashcards')
]