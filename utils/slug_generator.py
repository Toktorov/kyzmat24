import random
import string

from django.utils.text import slugify


def random_slug_generators(size=10, chars=string.ascii_lowercase + string.digits):
    return "".join(random.choice(chars) for _ in range(size))


def unique_slug_generators(instance, new_slug=None):
    if new_slug:
        slug = new_slug
    else:
        slug = slugify(instance.title, allow_unicode=True)

    Klass = instance.__class__  # Product
    qs_exists = Klass.objects.filter(slug=slug).exists()
    if qs_exists:
        new_slug = "{slug}-{randstr}".format(
            slug=slug,
            randstr=random_slug_generators(size=4)
        )
        return unique_slug_generators(instance, new_slug=new_slug)
    return slug