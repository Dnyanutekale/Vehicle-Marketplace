from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import BrandViewSet, VehicleViewSet, OrderViewSet, ReviewViewSet, WishlistViewSet, register_user, manage_wishlist, analytics_report

router = DefaultRouter()
router.register(r'brands', BrandViewSet)
router.register(r'vehicles', VehicleViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'reviews', ReviewViewSet)
router.register(r'wishlists', WishlistViewSet, basename='wishlist')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/register/', register_user, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('wishlist/toggle/<int:vehicle_id>/', manage_wishlist, name='manage_wishlist'),
    path('analytics/', analytics_report, name='analytics_report'),
]
