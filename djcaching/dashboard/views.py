from django.shortcuts import render


def dashboard(request):
    username = "Tony Afula"
    return render(request, 'dashboard/dashboard.html', {"username": username})
