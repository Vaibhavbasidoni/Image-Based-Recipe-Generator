import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.models import load_model

# Define constants
IMAGE_SIZE = (150, 150)
NUM_CLASSES = 40  # Number of categories in your dataset

# Load the saved model
model = load_model("recipe_model.h5")


# Load and preprocess the single test image
def preprocess_image(image_path, target_size):
    img = load_img(image_path, target_size=target_size)
    img_array = img_to_array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array


# Define the path to your single test image
image_path = "aloo_gobi1.jpg"

# Preprocess the single test image
test_image = preprocess_image(image_path, IMAGE_SIZE)

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

# Print the predicted class label
print("Predicted Dish:", predicted_class_label)
