from rest_framework import permissions

class UserPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.pk == request.user.pk)
        
class UserMediaContactPermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(obj.pk == request.user.pk)