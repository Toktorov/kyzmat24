from django.core.validators import RegexValidator

phone_validator = RegexValidator(
    regex=r'^(\+996)\d{9}$',
    message="You should write +996[code][number]"
)