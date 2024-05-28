"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from app import views


urlpatterns = [
    path("", views.openHome),
    path("admin_login/", views.viewAdminLogin),
    path("admin_master/", views.viewAdminMaster),
    path("admin_login/", views.viewAdminLogin),
    path("admin_login_details/", views.loginAdminDetails),
    path("addAdmin_Master/", views.viewAdd_Admin_Master),
    path("addRecipe/", views.AddRecipe),
    path("addCategory/", views.AddCategory),
    path("addHotels/", views.AddHotels),
    path("category/", views.viewCategory),
    path("recipe/", views.viewRecipe),
    path("hotels/", views.viewHotels),
    path("start_predict/", views.predict),
    path("get_recipe_details/", views.getRecipeDetails),
    path("get_hotels/", views.getHotels),
    path("get_profile/", views.getProfile),
    path("logout/", views.logout),
    path("add_register/", views.newRegister, name="home"),
    path("check_web_login/", views.checkWebLogin, name="web_login"),
]
