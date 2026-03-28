from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.tokens import RefreshToken
from django.db.models import Sum, Count
from .models import Brand, Vehicle, Order, ManufacturingProcess, Review, Wishlist, VehicleColor, VehicleImage
from .serializers import (
    UserSerializer, BrandSerializer, VehicleSerializer,
    OrderSerializer, ManufacturingProcessSerializer, ReviewSerializer, WishlistSerializer
)

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer

class VehicleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        vehicle_id = self.request.data.get('vehicle_id')
        vehicle = Vehicle.objects.get(id=vehicle_id)
        serializer.save(user=self.request.user, vehicle=vehicle)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class WishlistViewSet(viewsets.ModelViewSet):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

@api_view(['POST', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def manage_wishlist(request, vehicle_id):
    wishlist, created = Wishlist.objects.get_or_create(user=request.user)
    try:
        vehicle = Vehicle.objects.get(id=vehicle_id)
    except Vehicle.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
    if request.method == 'POST':
        wishlist.vehicles.add(vehicle)
        return Response({'status': 'added', 'wishlist': WishlistSerializer(wishlist).data})
    elif request.method == 'DELETE':
        wishlist.vehicles.remove(vehicle)
        return Response({'status': 'removed', 'wishlist': WishlistSerializer(wishlist).data})

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def analytics_report(request):
    if not request.user.is_staff:
        return Response(status=403)
        
    total_orders = Order.objects.count()
    total_revenue = Order.objects.aggregate(total=Sum('vehicle__price'))['total'] or 0
    top_vehicles = Vehicle.objects.annotate(order_count=Count('order')).order_by('-order_count')[:5]
    
    return Response({
        'total_orders': total_orders,
        'total_revenue': total_revenue,
        'top_vehicles': VehicleSerializer(top_vehicles, many=True).data
    })

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register_user(request):
    data = request.data
    try:
        user = User.objects.create(
            username=data['username'],
            email=data['email'],
            password=make_password(data['password'])
        )
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserSerializer(user).data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=400)
