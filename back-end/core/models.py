from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings

#Custom UserManager
class UserManager(BaseUserManager):
    def create_user(self, email, password,**extra_fields):
        if not email:
            raise ValueError("The email is required")
        if not password:
            raise ValueError("The password is required")
        
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    def create_superuser(self,email,password,**extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

#Custom UserModel
class User(AbstractBaseUser,PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50,unique=True,null=False,blank=False)
    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True
    )

    base_ease_factor = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        null=False,
        blank=False,
        default=Decimal("2.50"),
        validators=[
            MinValueValidator(Decimal("1.30")),
            MaxValueValidator(Decimal("5.00"))
        ]
    )

    date_joined = models.DateTimeField(default=timezone.now)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username"
    ]

    def __str__(self):
        return self.email
    
class Deck(models.Model):
    # 🎨 Inner class for predefined color choices
    # Using TextChoices allows us to store the HEX value in the DB
    class Color(models.TextChoices):
        RED = "#EF4444", "Red"
        BLUE = "#3B82F6", "Blue"
        GREEN = "#10B981", "Green"
        ORANGE = "#F59E0B", "Orange"
        PURPLE = "#9333EA", "Purple"
        ROSE = "#F43F5E", "Rose"

    # 👤 Relationship: one user → many decks
    # Every deck belongs to a specific user
    # related_name="decks" lets us query user.decks.all()
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,  # if user is deleted → delete their decks
        related_name="decks"
    )

    # 📖 Deck title (required field, max length 100 chars)
    title = models.CharField(max_length=100, null=False)

    # 📝 Optional description for the deck
    description = models.TextField(null=True)

    # 🎨 Deck color, limited to predefined choices above
    # Stored as a HEX value in the DB, defaults to Blue
    color = models.CharField(
        max_length=7,
        choices=Color.choices,
        default=Color.BLUE
    )

    # ⏰ Timestamps
    # created_at → set automatically on creation
    # updated_at → updated every time the object is saved
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # 🏷️ String representation (useful for admin & debugging)
    def __str__(self):
        return self.title

class Flashcard(models.Model):
    from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal


class Flashcard(models.Model):
    """
    Flashcard model represents a study card inside a deck.

    Each flashcard belongs to a Deck (and indirectly to a User via Deck).
    It stores the front (question/prompt) and back (answer) text, along with
    spaced repetition attributes used to schedule reviews.

    Fields:
    - deck: Foreign key to the Deck this flashcard belongs to.
    - front: Text for the question/prompt.
    - back: Text for the answer/solution.
    - created_at / updated_at: Auto-managed timestamps.
    - due_date: When the card is next scheduled for review.
    - last_reviewed: The last time the user studied this card.
    - interval: Days until the next review.
    - ease_factor: Growth multiplier for intervals (default 2.50, between 1.30–5.00).
    - streak: Number of consecutive correct reviews.
    - lapses: Number of times the card has been forgotten.
    - status: Current learning stage (new, learning, review, lapsed).
    """
    
    class Status(models.TextChoices):
        NEW = "new", "New"
        LEARNING = "learning", "Learning"
        REVIEW = "review", "Review"
        LAPSED = "lapsed", "Lapsed"

    deck = models.ForeignKey(
        "Deck",
        on_delete=models.CASCADE,
        related_name="flashcards"
    )

    front = models.TextField(null=False)   # Question / prompt
    back = models.TextField(null=False)    # Answer / solution

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    due_date = models.DateTimeField(null=True, blank=True)       # Next review date
    last_reviewed = models.DateTimeField(null=True, blank=True)  # Last review date

    interval = models.IntegerField(default=0)     # Days until next review
    ease_factor = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=Decimal("2.50"),
        validators=[
            MinValueValidator(Decimal("1.30")),
            MaxValueValidator(Decimal("5.00"))
        ]
    )
    streak = models.IntegerField(default=0)       # Consecutive correct answers
    lapses = models.IntegerField(default=0)       # Times user forgot the card

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.NEW
    )

    def __str__(self):
        return f"{self.front[:30]}..."