from django.db import models

# Create your models here.
class TelegramUser(models.Model):
    user_id = models.CharField(
        max_length=100,
        verbose_name="ID user"
    )
    username = models.CharField(
        max_length=255,
        verbose_name="Имя пользователя"
    )
    first_name = models.CharField(
        max_length=255,
        verbose_name="Имя"
    )
    last_name = models.CharField(
        max_length=255,
        verbose_name="Фамилия"
    )
    chat_id = models.CharField(
        max_length=100,
        verbose_name="Chat ID"
    )
    created = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата регистрации"
    )

    def __str__(self):
        return self.username 
    
    class Meta:
        verbose_name = "Пользователь телеграм"
        verbose_name_plural = "Пользователи телеграма"