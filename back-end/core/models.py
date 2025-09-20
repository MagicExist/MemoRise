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