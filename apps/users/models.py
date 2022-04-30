from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from utils.validator import phone_validator
from twilio.rest import Client
import random

# Create your models here.
class UserManager(BaseUserManager):

    def create_user(self, username, email, password=None, **kwargs):
        """Create and return a `User` with an email, phone number, username and password."""
        if username is None:
            raise TypeError('Users must have a username.')
        if email is None:
            raise TypeError('Users must have an email.')

        user = self.model(username=username, email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, email, password):
        """
        Create and return a `User` with superuser (admin) permissions.
        """
        if password is None:
            raise TypeError('Superusers must have a password.')
        if email is None:
            raise TypeError('Superusers must have an email.')
        if username is None:
            raise TypeError('Superusers must have an username.')

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user

class User(AbstractUser):
    username = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank = True, null = True, default="Пользователь не добавил описание")
    profile_image = models.ImageField(upload_to='profiles', blank=True, null=True)
    location = models.CharField(max_length=250, blank = True, null = True, default="Пользователь не добавил местоположение")
    another = models.TextField(blank = True, null = True)
    phone_number = models.CharField(
        max_length=255,
        validators=[phone_validator],
        blank=True, null=True
    )
    password = models.CharField(max_length=100)
    random_code = random.randint(1000, 9999)

    def __str__(self):
        return f"{self.username} -- {self.description}"

    def save(self, *args, **kwargs):
        #if test_result is less than 80 execute this
        if self.phone_number:
            #twilio code
            
            account_sid = 'ACa6774feff3b9de0e840a9a988ac75684'
            auth_token = '46524fdde811f18eea6868ac70a89951'
            client = Client(account_sid, auth_token)

            message = client.messages.create(
                                        body=f'Your code {self.random_code}',
                                        from_='+18452506710',
                                        to='+996772343206' 
                                    )

            print(message.sid)
        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

class ConfirmationNumber(User):
    code = models.IntegerField()
    verify_number = models.BooleanField(default=False)

    def verify(self, *args, **kwargs):
        if self.code == self.random_code:
            self.verify == True 
        else:
            self.verify == False 


class Contact(models.Model):
    name = models.CharField(max_length = 100)
    src = models.CharField(max_length = 250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Контакт"
        verbose_name_plural = "Контакты"
        
class Media(models.Model):
    name = models.CharField(max_length = 100, verbose_name="Имя")
    src = models.CharField(max_length = 250)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = "Медиа"
        verbose_name_plural = "Медиа"