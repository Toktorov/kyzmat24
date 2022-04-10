from rest_framework import permissions


class OwnerProfilePermissions(permissions.BasePermission):
    """
    Разрешение на уровне объекта, позволяющее обновлять и удалять только его собственный профиль
    """
    # def has_object_permission(self, request, view, obj):
    #     
    #     if request.method in permissions.SAFE_METHODS:
    #         return True

    #     # obj here is a UserProfile instance
    #     return obj.username == request.user

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
            
        return obj.username == request.user

class OwnerDeletePermissions(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            return obj.username == request.user
