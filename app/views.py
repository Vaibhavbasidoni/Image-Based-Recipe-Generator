from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from app.models import AdminMaster
from app.models import Category
from app.models import Recipe
from app.models import Hotels
from app.models import Register
from django.core.mail import send_mail
import os
from django.conf import settings

import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model


# Create your views here.
def openWebLogin(request):
    return render(request, "web/login.html")


def openRegister(request):
    return render(request, "web/register.html")


def openHome(request):
    return render(request, "web/index.html")


def viewCategory(request):
    return render(request, "admin/category.html")


def viewRecipe(request):
    return render(request, "admin/recipe.html")


def viewHotels(request):
    return render(request, "admin/hotels.html")


def openLogin(request):
    return render(request, "admin_files/index.html", {})


def logout(request):
    return render(request, "admin_files/index.html", {})


def openUsers(request):
    return render(request, "admin_files/users.html", {})


def viewAdminLogin(request):
    return render(request, "admin/admin_login.html")


def loginAdminDetails(request):
    if AdminMaster.objects.filter(
        ad_email=request.POST["txtEmail"],
        ad_password=request.POST["txtPassword"],
        ad_status=0,
    ).count():
        data = AdminMaster.objects.filter(ad_email=request.POST["txtEmail"]).values()
        data = list(data)
        dictValue = data[0]
        request.session["email"] = dictValue["ad_email"]
        request.session["role"] = dictValue["ad_role"]
        request.session["name"] = dictValue["ad_name"]
        return HttpResponse(dictValue["ad_role"])
    else:
        return HttpResponse("0")


def viewAdminMaster(request):
    return render(request, "admin/admin_master.html")


def viewAdminLogin(request):
    return render(request, "admin/admin_login.html")


def viewAdd_Admin_Master(request):
    if request.POST["action"] == "add":
        if (
            AdminMaster.objects.filter(
                ad_mobile=request.POST["txtMobileNo"],
                ad_email=request.POST["txtEmail"],
                ad_status=0,
            ).count()
            == 0
        ):
            AdminMaster.objects.create(
                ad_name=request.POST["txtName"],
                ad_mobile=request.POST["txtMobileNo"],
                ad_email=request.POST["txtEmail"],
                ad_password=request.POST["txtPassword"],
                ad_role=request.POST["txtRole"],
            )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = AdminMaster.objects.filter(ad_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = AdminMaster.objects.filter(ad_id=request.POST["id"]).update(
            ad_name=request.POST["txtName1"],
            ad_mobile=request.POST["txtMobileNo1"],
            ad_email=request.POST["txtEmail1"],
        )

    elif request.POST["action"] == "delete":
        data = AdminMaster.objects.filter(ad_id=request.POST["id"]).update(
            ad_status="1"
        )

    return HttpResponse()


def AddCategory(request):
    if request.POST["action"] == "add":
        if (
            Category.objects.filter(
                ct_category=request.POST["txtName"],
                ct_status=0,
            ).count()
            == 0
        ):
            Category.objects.create(
                ct_category=request.POST["txtName"],
            )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = Category.objects.filter(ct_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = Category.objects.filter(ct_id=request.POST["id"]).update(
            ct_category=request.POST["txtName1"],
        )

    elif request.POST["action"] == "delete":
        data = Category.objects.filter(ct_id=request.POST["id"]).update(ct_status="1")

    return HttpResponse()


def AddRecipe(request):
    if request.POST["action"] == "add":
        recipe_name = request.POST["txtRecipeName"]
        recipe_steps = request.POST["txtSteps"]

        if (
            Recipe.objects.filter(
                rc_recipe=recipe_name,
                rc_status=0,
            ).count()
            == 0
        ):
            Recipe.objects.create(
                rc_category=request.POST["txtCategory"],
                rc_recipe=recipe_name,
                rc_steps=recipe_steps,
                rc_video=request.POST["txtVideo"],
            )

            # Get all email addresses from the Register table
            recipients = Register.objects.values_list("rg_email", flat=True)

            # Send email to each recipient using settings
            for recipient_email in recipients:
                send_mail(
                    subject=recipe_name,
                    message="",
                    html_message=recipe_steps,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[recipient_email],
                    fail_silently=False,
                )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = Recipe.objects.filter(rc_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = Recipe.objects.filter(rc_id=request.POST["id"]).update(
            rc_category=request.POST["txtCategory1"],
            rc_recipe=request.POST["txtRecipeName1"],
            rc_steps=request.POST["txtSteps1"],
            rc_video=request.POST["txtVideo1"],
        )

    elif request.POST["action"] == "delete":
        data = Recipe.objects.filter(rc_id=request.POST["id"]).update(rc_status="1")

    return HttpResponse()


def AddHotels(request):
    if request.POST["action"] == "add":
        if (
            Hotels.objects.filter(
                ht_name=request.POST["txtHotel"],
                ht_area=request.POST["txtArea"],
                ht_city=request.POST["txtCity"],
                ht_recipe=request.POST["txtRecipe"],
                ht_status=0,
            ).count()
            == 0
        ):
            Hotels.objects.create(
                ht_name=request.POST["txtHotel"],
                ht_area=request.POST["txtArea"],
                ht_city=request.POST["txtCity"],
                ht_recipe=request.POST["txtRecipe"],
            )
        else:
            return HttpResponse("10")

    elif request.POST["action"] == "getData":
        data = Hotels.objects.filter(ht_status="0").values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values

    elif request.POST["action"] == "update":
        data = Hotels.objects.filter(ht_id=request.POST["id"]).update(
            ht_name=request.POST["txtHotel1"],
            ht_area=request.POST["txtArea1"],
            ht_city=request.POST["txtCity1"],
            ht_recipe=request.POST["txtRecipe1"],
        )

    elif request.POST["action"] == "delete":
        data = Hotels.objects.filter(ht_id=request.POST["id"]).update(ht_status="1")

    return HttpResponse()


def addRegister(request):
    if Register.objects.filter(rg_email=request.POST["txtEmail"]).count() == 0:
        Register.objects.create(
            rg_name=request.POST["txtName"],
            rg_mobile=request.POST["txtMobileNo"],
            rg_email=request.POST["txtEmail"],
            rg_city=request.POST["txtCity"],
            rg_area=request.POST["txtArea"],
            rg_password=request.POST["txtPassword"],
        )
        return HttpResponse(0)
    else:
        return HttpResponse(10)


def checkWebLogin(request):
    if (
        Register.objects.filter(
            rg_email=request.POST["txtEmail"], rg_password=request.POST["txtPassword"]
        ).count()
        == 0
    ):
        return HttpResponse(10)

    else:
        request.session["web_email"] = request.POST["txtEmail"]
        return HttpResponse(0)


def checkAdminLogin(request):
    if AdminMaster.objects.filter(
        ad_email=request.POST["txtEmail"],
        ad_password=request.POST["txtPassword"],
        ad_status="0",
    ).count():
        products_json = AdminMaster.objects.filter(
            ad_email=request.POST["txtEmail"]
        ).values()
        data = list(products_json)
        dictValue = data[0]
        request.session["email"] = dictValue["ad_email"]
        request.session["role"] = dictValue["ad_role"]
        request.session["name"] = dictValue["ad_name"]
        return HttpResponse(dictValue["ad_role"])
    else:
        return HttpResponse("0")


def preprocess_image(image_path, target_size):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array


def predict(request):
    IMAGE_SIZE = (150, 150)
    model_path = os.path.join(settings.STATICFILES_DIRS[0], "recipe_model.h5")
    model = load_model(model_path)

    # Save the uploaded image to a temporary location
    uploaded_file = request.FILES["fileInput"]
    temp_image_path = os.path.join(settings.MEDIA_ROOT, uploaded_file.name)
    with open(temp_image_path, "wb") as temp_file:
        temp_file.write(uploaded_file.read())

    # Preprocess the image from the temporary location
    test_image = preprocess_image(temp_image_path, IMAGE_SIZE)

    # Make predictions using the model
    predictions = model.predict(test_image)

    # Interpret the predictions
    class_mapping = {
        0: "Aloo Gobi",
        1: "Barfi",
        2: "Biryani",
        3: "Butter Chicken",
        4: "Chana Masala",
        5: "Chapati",
        6: "Chicken 65",
        7: "Chicken bhuna masala",
        8: "Chicken Kolhapuri",
        9: "Chicken Lollipop",
        10: "Chicken Tikka Masala",
        11: "Chilli Prawns",
        12: "Chole Bhature",
        13: "Dal Tadka",
        14: "Dosa",
        15: "Gajar Ka Halwa",
        16: "Gobi Manchurian",
        17: "Gulab Jamun",
        18: "Idli",
        19: "Kachori",
        20: "Kadai Chicken",
        21: "Kheer",
        22: "Lassi",
        23: "Masala Chaas",
        24: "Medu Vada",
        25: "Misal Pav",
        26: "Momos",
        27: "Mutton Donne Biryani",
        28: "Mutton Laal Maas",
        29: "Mysore Pak",
        30: "Naan",
        31: "Pakoda",
        32: "Pani Puri",
        33: "Paratha",
        34: "Pav Bhaji",
        35: "Prawn curry",
        36: "Ras Malai",
        37: "Samosa",
        38: "Tandoori",
        39: "Vada Pav",
    }

    predicted_class_index = np.argmax(predictions[0])
    predicted_class_label = class_mapping.get(predicted_class_index, "Unknown")

    # Delete the temporary file
    os.remove(temp_image_path)

    # Return the predicted class label as an HTTP response
    return HttpResponse(predicted_class_label)


def getRecipeDetails(request):
    data = Recipe.objects.filter(
        rc_recipe=request.POST["recipeName"], rc_status=0
    ).values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def getHotels(request):
    recipe_name = request.POST.get("recipeName", "")
    data = Hotels.objects.filter(ht_recipe__icontains=recipe_name).values()
    data = list(data)
    values = JsonResponse(data, safe=False)
    return values


def checkWebLogin(request):
    if Register.objects.filter(
        rg_email=request.POST["txtEmail"], rg_password=request.POST["txtPassword"]
    ).count():
        request.session["web_email"] = request.POST["txtEmail"]
        return HttpResponse("1")
    else:
        return HttpResponse("10")


def newRegister(request):
    if Register.objects.filter(
        rg_email=request.POST["txtEmail"], rg_mobile=request.POST["txtMobileNo"]
    ).count():
        return HttpResponse("10")
    else:
        lclID = Register.objects.count()
        lclNewID = lclID + 1

        Register.objects.create(
            rg_id=lclNewID,
            rg_name=request.POST["txtName"],
            rg_mobile=request.POST["txtMobileNo"],
            rg_email=request.POST["txtEmail"],
            rg_password=request.POST["txtPassword"],
            rg_area=request.POST["txtArea"],
            rg_city=request.POST["txtCity"],
        )

        return HttpResponse("0")


def getProfile(request):
    if "web_email" in request.session:
        data = Register.objects.filter(rg_email=request.session["web_email"]).values()
        data = list(data)
        values = JsonResponse(data, safe=False)
        return values
    else:
        return JsonResponse(
            {"error": "web_email session variable not found", "status": 400}
        )


def logout(request):
    request.session.flush()
    return HttpResponse(0)
